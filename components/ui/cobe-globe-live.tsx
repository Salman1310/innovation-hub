"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"
import { formatDistanceToNow } from "date-fns"
import type { NewsArticle } from "@/lib/types"
import type { NewsSource } from "@/lib/sources"

interface GlobeLiveProps {
  articles: NewsArticle[]
  sources: NewsSource[]
  onSourceClick?: (sourceId: string) => void
  className?: string
}

interface ActiveMarker {
  sourceId: string
  sourceName: string
  location: [number, number]
  category: "AI" | "Insurance"
  city: string
  count: number
  latestArticles: NewsArticle[]
}

interface TooltipState {
  marker: ActiveMarker
  x: number
  y: number
}

// Convert lat/lng to a 3D unit-sphere vector then apply globe rotation.
// Returns screen-space x/y (0..canvasSize) and whether the point faces the viewer.
function projectMarker(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  size: number
): { x: number; y: number; visible: boolean } {
  const latR = (lat * Math.PI) / 180
  const lngR = (lng * Math.PI) / 180

  // Geographic → Cartesian
  const px = Math.cos(latR) * Math.cos(lngR)
  const py = Math.sin(latR)
  const pz = Math.cos(latR) * Math.sin(lngR)

  // Rotate around Y by -phi (globe spin)
  const cosPhi = Math.cos(-phi)
  const sinPhi = Math.sin(-phi)
  const rx = px * cosPhi - pz * sinPhi
  const ry = py
  const rz = px * sinPhi + pz * cosPhi

  // Rotate around X by theta (vertical tilt)
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)
  const fx = rx
  const fy = ry * cosTheta - rz * sinTheta
  const fz = ry * sinTheta + rz * cosTheta

  // Orthographic projection — globe fills ~95 % of the canvas
  const scale = size * 0.95 * 0.5
  const screenX = (fx + 1) * scale + size * 0.025
  const screenY = (-fy + 1) * scale + size * 0.025

  return { x: screenX, y: screenY, visible: fz > 0 }
}

export function GlobeLive({ articles, sources, onSourceClick, className = "" }: GlobeLiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const livePhiRef = useRef(0)
  const liveThetaRef = useRef(0.2)

  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const tooltipRef = useRef<TooltipState | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Build active markers: sources that have articles in the last 24 h
  const cutoff = Date.now() - 24 * 60 * 60 * 1000
  const markerMap = new Map<string, ActiveMarker>()

  for (const source of sources) {
    const sourceArticles = articles
      .filter((a) => a.sourceId === source.id && new Date(a.pubDate).getTime() > cutoff)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

    if (sourceArticles.length > 0) {
      markerMap.set(source.id, {
        sourceId: source.id,
        sourceName: source.name,
        location: source.location,
        category: source.category,
        city: source.city,
        count: sourceArticles.length,
        latestArticles: sourceArticles.slice(0, 3),
      })
    }
  }
  const activeMarkers = Array.from(markerMap.values())

  // DOM refs for each overlay dot — direct manipulation avoids 60fps React re-renders
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function updateDots(totalPhi: number, totalTheta: number) {
      const size = canvas.offsetWidth
      if (size === 0) return

      activeMarkers.forEach((marker, i) => {
        const el = dotRefs.current[i]
        if (!el) return
        const [lat, lng] = marker.location
        const pos = projectMarker(lat, lng, totalPhi, totalTheta, size)
        // Depth fade: markers near the edge of the visible face get dimmer
        if (pos.visible) {
          el.style.left = pos.x + "px"
          el.style.top = pos.y + "px"
          el.style.opacity = "1"
          el.style.pointerEvents = "auto"
          el.style.display = "flex"
        } else {
          el.style.opacity = "0"
          el.style.pointerEvents = "none"
        }
      })

      // Also reposition the tooltip if one is open
      if (tooltipRef.current) {
        const m = tooltipRef.current.marker
        const [lat, lng] = m.location
        const pos = projectMarker(lat, lng, totalPhi, totalTheta, size)
        if (pos.visible) {
          tooltipRef.current = { ...tooltipRef.current, x: pos.x, y: pos.y }
          setTooltip({ ...tooltipRef.current })
        } else {
          tooltipRef.current = null
          setTooltip(null)
        }
      }
    }

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 8,
        baseColor: [0.88, 0.93, 0.94],   // ~#E0EEF1 — Sun Life teal-tinted globe
        markerColor: [0.055, 0.337, 0.396],
        glowColor: [0.87, 0.93, 0.93],
        markers: [], // HTML overlays handle markers instead
        arcs: [],
        arcColor: [0.3, 0.6, 1.0],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.85,
      })

      function animate() {
        if (!isPausedRef.current) phi += 0.003
        const totalPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const totalTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta
        livePhiRef.current = totalPhi
        liveThetaRef.current = totalTheta
        globe!.update({ phi: totalPhi, theta: totalTheta })
        updateDots(totalPhi, totalTheta)
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles.length, sources.length])

  const handleDotEnter = useCallback(
    (marker: ActiveMarker, i: number) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      const size = canvasRef.current?.offsetWidth ?? 400
      const [lat, lng] = marker.location
      const pos = projectMarker(lat, lng, livePhiRef.current, liveThetaRef.current, size)
      const state: TooltipState = { marker, x: pos.x, y: pos.y }
      tooltipRef.current = state
      setTooltip(state)
    },
    []
  )

  const handleDotLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      tooltipRef.current = null
      setTooltip(null)
    }, 200)
  }, [])

  const handleTooltipEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  }, [])

  const handleTooltipLeave = useCallback(() => {
    tooltipRef.current = null
    setTooltip(null)
  }, [])

  // Determine tooltip placement: flip left if too close to right edge
  const canvasSize = canvasRef.current?.offsetWidth ?? 400
  const tooltipOnLeft = tooltip ? tooltip.x > canvasSize * 0.6 : false

  return (
    <div ref={containerRef} className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          50% { box-shadow: 0 0 0 5px transparent; opacity: 0.85; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
          display: "block",
        }}
      />

      {/* Overlay container — same size as canvas, absolutely stacked on top */}
      <div
        ref={overlayRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {activeMarkers.map((marker, i) => {
          const isAI = marker.category === "AI"
          // AI → Sun Life Teal  |  Insurance → Sun Life Yellow
          const dotColor = isAI ? "#0E5665" : "#ECAB23"
          const ringColor = isAI ? "rgba(14,86,101,0.30)" : "rgba(236,171,35,0.35)"
          const dotSize = Math.min(10 + marker.count * 1.5, 20)

          return (
            <div
              key={marker.sourceId}
              ref={(el) => { dotRefs.current[i] = el }}
              onMouseEnter={() => handleDotEnter(marker, i)}
              onMouseLeave={handleDotLeave}
              onClick={() => {
                onSourceClick?.(marker.sourceId)
                if (marker.latestArticles[0]?.url) {
                  window.open(marker.latestArticles[0].url, "_blank", "noopener,noreferrer")
                }
              }}
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                backgroundColor: dotColor,
                boxShadow: `0 0 0 3px ${ringColor}, 0 0 10px ${dotColor}88`,
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.15s",
                zIndex: 10,
                color: dotColor,
                animation: "dot-pulse 2s ease-in-out infinite",
                pointerEvents: "auto",
              }}
            />
          )
        })}

        {/* Hover tooltip */}
        {tooltip && (
          <div
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
            style={{
              position: "absolute",
              left: tooltipOnLeft ? tooltip.x - 8 : tooltip.x + 14,
              top: Math.max(8, tooltip.y - 20),
              transform: tooltipOnLeft ? "translateX(-100%)" : undefined,
              width: 248,
              background: "#FFFFFF",
              border: "1px solid #C9D8DC",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(14,56,70,0.14)",
              zIndex: 50,
              pointerEvents: "auto",
              overflow: "hidden",
              fontFamily: '"SunLifeText", "Helvetica Neue", Calibri, sans-serif',
            }}
          >
            {/* Header — navy bar */}
            <div
              style={{
                padding: "10px 12px 8px",
                borderBottom: "1px solid #DDE6E9",
                background: tooltip.marker.category === "AI" ? "#EBF5F7" : "#FFF7E3",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: tooltip.marker.category === "AI" ? "#FFFFFF" : "#0E3846",
                    background: tooltip.marker.category === "AI" ? "#0E5665" : "#ECAB23",
                    padding: "2px 7px",
                    borderRadius: 4,
                  }}
                >
                  {tooltip.marker.category}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0E3846" }}>
                  {tooltip.marker.sourceName}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#5B6770" }}>
                📍 {tooltip.marker.city} &nbsp;·&nbsp; {tooltip.marker.count} article{tooltip.marker.count !== 1 ? "s" : ""} today
              </div>
            </div>

            {/* Article list */}
            <div style={{ padding: "6px 0" }}>
              {tooltip.marker.latestArticles.map((article, idx) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "7px 12px",
                    textDecoration: "none",
                    borderBottom: idx < tooltip.marker.latestArticles.length - 1 ? "1px solid #EEF3F5" : "none",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#EBF5F7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: "#0E3846",
                      lineHeight: 1.4,
                      marginBottom: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontFamily: '"SunLifeDisplay", "Helvetica Neue", Calibri, sans-serif',
                    }}
                  >
                    {article.title}
                  </div>
                  {article.description && idx === 0 && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#5B6770",
                        lineHeight: 1.4,
                        marginBottom: 3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {article.description}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: "#9BB5BC" }}>
                    {formatDistanceToNow(new Date(article.pubDate), { addSuffix: true })}
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "5px 12px 7px",
                borderTop: "1px solid #DDE6E9",
                background: "#F5F9FA",
                fontSize: 10,
                color: "#5B6770",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Click dot to filter feed</span>
              <span style={{ color: "#0E5665", fontWeight: 600 }}>↗ opens article</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full px-4 py-2 text-xs pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(6px)",
          border: "1px solid #C9D8DC",
          boxShadow: "0 2px 8px rgba(14,56,70,0.10)",
          fontFamily: '"SunLifeText","Helvetica Neue",Calibri,sans-serif',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#0E5665" }} />
          <span style={{ color: "#0E3846", fontWeight: 600 }}>AI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#ECAB23" }} />
          <span style={{ color: "#0E3846", fontWeight: 600 }}>Insurance</span>
        </div>
        <span style={{ color: "#C9D8DC" }}>|</span>
        <span style={{ color: "#5B6770" }}>{activeMarkers.length} active sources</span>
      </div>
    </div>
  )
}
