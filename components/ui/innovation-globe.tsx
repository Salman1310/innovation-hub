"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import type { PortfolioGlobeResponse, PortfolioStageMarker } from "@/lib/poc-portfolio-types"

interface TooltipState {
  marker: PortfolioStageMarker
  x: number
  y: number
}

const INITIAL_PHI = 0.55
const INITIAL_THETA = 0.26
const AUTO_ROTATE_STEP = 0.0003
const GLOBE_RADIUS = 0.8
const GLOBE_MARKER_ELEVATION = 0.05

function projectMarker(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  size: number,
): { x: number; y: number; visible: boolean } {
  const latR = (lat * Math.PI) / 180
  const lngR = (lng * Math.PI) / 180 - Math.PI
  const latitudeScale = Math.cos(latR)

  const point = [
    -latitudeScale * Math.cos(lngR),
    Math.sin(latR),
    latitudeScale * Math.sin(lngR),
  ] as const

  const elevatedRadius = GLOBE_RADIUS + GLOBE_MARKER_ELEVATION
  const elevatedPoint = point.map((value) => value * elevatedRadius)

  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)
  const cosPhi = Math.cos(phi)
  const sinPhi = Math.sin(phi)

  const projectedX = cosPhi * elevatedPoint[0] + sinPhi * elevatedPoint[2]
  const projectedY = sinPhi * sinTheta * elevatedPoint[0] + cosTheta * elevatedPoint[1] - cosPhi * sinTheta * elevatedPoint[2]
  const projectedZ = -sinPhi * cosTheta * elevatedPoint[0] + sinTheta * elevatedPoint[1] + cosPhi * cosTheta * elevatedPoint[2]

  const screenX = ((projectedX + 1) / 2) * size
  const screenY = ((1 - projectedY) / 2) * size
  const visible = projectedZ >= 0 || projectedX * projectedX + projectedY * projectedY >= GLOBE_RADIUS * GLOBE_RADIUS

  return { x: screenX, y: screenY, visible }
}

function getMarkerTextColor(stage: string) {
  return stage === "Prototyping" || stage === "Showcase" ? "#0E3846" : "#FFFFFF"
}

function GlobeStateCard({ title, body, loading = false }: { title: string; body: string; loading?: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,_rgba(236,171,35,0.28)_0%,_rgba(255,255,255,0)_68%)] blur-3xl" />
      <div className="absolute inset-[10%] rounded-full border border-[#D9E4E7] bg-white/70 shadow-[0_30px_80px_rgba(14,56,70,0.12)] backdrop-blur-xl" />
      <div className="relative flex h-full items-center justify-center px-10 text-center">
        <div className="max-w-xs">
          {loading ? (
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-[#ECAB23]/30 border-t-[#ECAB23] animate-spin" />
          ) : null}
          <p className="text-sm font-semibold text-[#0E3846]" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#5B6770]">{body}</p>
        </div>
      </div>
    </div>
  )
}

export function InnovationGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const livePhiRef = useRef(INITIAL_PHI)
  const liveThetaRef = useRef(INITIAL_THETA)
  const tooltipRef = useRef<TooltipState | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoRotateRef = useRef(true)

  const [data, setData] = useState<PortfolioGlobeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [canvasSize, setCanvasSize] = useState(400)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [showLegend, setShowLegend] = useState(true)

  useEffect(() => {
    autoRotateRef.current = isAutoRotating
  }, [isAutoRotating])

  useEffect(() => {
    const abortController = new AbortController()

    const loadPortfolio = async () => {
      try {
        const response = await fetch("/api/pocs", {
          cache: "no-store",
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error("Workbook-backed portfolio globe is unavailable.")
        }

        const nextData = (await response.json()) as PortfolioGlobeResponse
        setData(nextData)
        setError(null)
      } catch (loadError) {
        if (abortController.signal.aborted) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : "Unable to load portfolio globe.")
      }
    }

    loadPortfolio()

    return () => abortController.abort()
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = { x: event.clientX, y: event.clientY }
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing"
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }

    pointerInteracting.current = null

    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab"
    }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerInteracting.current) {
        return
      }

      dragOffset.current = {
        phi: (event.clientX - pointerInteracting.current.x) / 300,
        theta: (event.clientY - pointerInteracting.current.y) / 1000,
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
    if (!data || !canvasRef.current) {
      return
    }

    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationFrame = 0
    let phi = INITIAL_PHI

    const updateDots = (totalPhi: number, totalTheta: number) => {
      const size = canvas.offsetWidth
      if (size === 0) {
        return
      }

      data.markers.forEach((marker, index) => {
        const element = dotRefs.current[index]
        if (!element) {
          return
        }

        const [lat, lng] = marker.location
        const position = projectMarker(lat, lng, totalPhi, totalTheta, size)

        if (position.visible) {
          element.style.left = `${position.x}px`
          element.style.top = `${position.y}px`
          element.style.opacity = "1"
          element.style.pointerEvents = "auto"
          element.style.display = "flex"
        } else {
          element.style.opacity = "0"
          element.style.pointerEvents = "none"
        }
      })

      if (tooltipRef.current) {
        const [lat, lng] = tooltipRef.current.marker.location
        const tooltipPosition = projectMarker(lat, lng, totalPhi, totalTheta, size)

        if (tooltipPosition.visible) {
          const nextTooltip = {
            ...tooltipRef.current,
            x: tooltipPosition.x,
            y: tooltipPosition.y,
          }
          tooltipRef.current = nextTooltip
          setTooltip(nextTooltip)
        } else {
          tooltipRef.current = null
          setTooltip(null)
        }
      }
    }

    const init = () => {
      const width = canvas.offsetWidth
      if (width === 0 || globe) {
        return
      }

      setCanvasSize(width)

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: INITIAL_PHI,
        theta: INITIAL_THETA,
        dark: 0,
        diffuse: 1.25,
        mapSamples: 18000,
        mapBrightness: 5,
        baseColor: [0.955, 0.972, 0.985],
        markerColor: [0.925, 0.671, 0.137],
        glowColor: [1, 0.952, 0.84],
        opacity: 1,
        markers: [],
        arcs: [],
      })

      const animate = () => {
        if (autoRotateRef.current && !pointerInteracting.current) {
          phi += AUTO_ROTATE_STEP
        }

        const totalPhi = phi + phiOffsetRef.current + dragOffset.current.phi
        const totalTheta = INITIAL_THETA + thetaOffsetRef.current + dragOffset.current.theta

        livePhiRef.current = totalPhi
        liveThetaRef.current = totalTheta

        globe?.update({ phi: totalPhi, theta: totalTheta })
        updateDots(totalPhi, totalTheta)
        animationFrame = requestAnimationFrame(animate)
      }

      animate()
      canvas.style.opacity = "1"
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          resizeObserver.disconnect()
          init()
        }
      })

      resizeObserver.observe(canvas)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      globe?.destroy()
    }
  }, [data])

  const handleDotEnter = useCallback((marker: PortfolioStageMarker) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    const size = canvasRef.current?.offsetWidth ?? 400
    const [lat, lng] = marker.location
    const markerPosition = projectMarker(lat, lng, livePhiRef.current, liveThetaRef.current, size)
    const nextTooltip = { marker, x: markerPosition.x, y: markerPosition.y }

    tooltipRef.current = nextTooltip
    setTooltip(nextTooltip)
  }, [])

  const handleDotLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      tooltipRef.current = null
      setTooltip(null)
    }, 180)
  }, [])

  const handleTooltipEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  const handleTooltipLeave = useCallback(() => {
    tooltipRef.current = null
    setTooltip(null)
  }, [])

  if (!data && !error) {
    return (
      <GlobeStateCard
        title="Loading portfolio globe"
        body="Syncing workbook data and preparing the market-stage view for the POC portfolio."
        loading
      />
    )
  }

  if (error || !data) {
    return (
      <GlobeStateCard
        title="Portfolio globe unavailable"
        body={error ?? "The workbook-backed globe could not be prepared."}
      />
    )
  }

  const tooltipOnLeft = tooltip ? tooltip.x > canvasSize * 0.58 : false

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4 pt-4 select-none">
      <style>{`
        @keyframes portfolio-dot-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-center gap-3 px-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-full border border-white/70 bg-white/82 px-3 py-1.5 text-[11px] font-medium text-[#5B6770] shadow-[0_8px_24px_rgba(14,56,70,0.08)] backdrop-blur-md">
            {data.marketCount} market clusters
          </div>
          <div className="rounded-full border border-white/70 bg-white/82 px-3 py-1.5 text-[11px] font-medium text-[#5B6770] shadow-[0_8px_24px_rgba(14,56,70,0.08)] backdrop-blur-md">
            Drag to explore
          </div>
          <button
            type="button"
            onClick={() => setShowLegend((currentValue) => !currentValue)}
            className="rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[11px] font-semibold text-[#0E3846] shadow-[0_8px_24px_rgba(14,56,70,0.08)] backdrop-blur-md transition hover:bg-white"
          >
            {showLegend ? "Hide legend" : "Show legend"}
          </button>
          <button
            type="button"
            onClick={() => setIsAutoRotating((currentValue) => !currentValue)}
            className="rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[11px] font-semibold text-[#0E3846] shadow-[0_8px_24px_rgba(14,56,70,0.08)] backdrop-blur-md transition hover:bg-white"
          >
            {isAutoRotating ? "Pause rotation" : "Resume rotation"}
          </button>
        </div>
      </div>

      <div
        className="grid items-center gap-4"
        style={{
          gridTemplateColumns: showLegend ? "minmax(0, 560px) 108px" : "minmax(0, 560px)",
        }}
      >
      <div className="relative mx-auto aspect-square w-full max-w-[560px]">
        <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,_rgba(236,171,35,0.28)_0%,_rgba(255,255,255,0)_70%)] blur-3xl" />
        <div className="absolute inset-[7%] rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.94)_0%,_rgba(225,236,240,0.9)_48%,_rgba(201,216,220,0.65)_100%)] shadow-[0_32px_90px_rgba(14,56,70,0.16)]" />

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          className="relative z-10 h-full w-full rounded-full"
          style={{
            cursor: "grab",
            opacity: 0,
            transition: "opacity 0.9s ease",
            touchAction: "none",
            display: "block",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-20">
        {data.markers.map((marker, index) => {
          const markerSize = Math.min(18 + marker.count * 2.5, 34)

          return (
            <div
              key={marker.id}
              ref={(element) => {
                dotRefs.current[index] = element
              }}
              onMouseEnter={() => handleDotEnter(marker)}
              onMouseLeave={handleDotLeave}
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: markerSize,
                height: markerSize,
                borderRadius: "9999px",
                backgroundColor: marker.color,
                color: getMarkerTextColor(marker.stage),
                fontSize: marker.count > 9 ? 10 : 11,
                fontWeight: 700,
                lineHeight: 1,
                boxShadow: `0 0 0 4px ${marker.color}22, 0 10px 24px ${marker.color}55`,
                transition: "opacity 0.2s ease",
                animation: "portfolio-dot-pulse 2.8s ease-in-out infinite",
                pointerEvents: "auto",
                transform: "translate(-50%, -50%)",
              }}
            >
              {marker.count}
            </div>
          )
        })}

          {tooltip ? (
            <div
              onMouseEnter={handleTooltipEnter}
              onMouseLeave={handleTooltipLeave}
              className="pointer-events-auto absolute z-30 w-[280px] overflow-hidden rounded-2xl border border-[#D9E4E7] bg-white/96 shadow-[0_22px_48px_rgba(14,56,70,0.18)] backdrop-blur-xl"
              style={{
                left: tooltipOnLeft ? tooltip.x - 12 : tooltip.x + 16,
                top: Math.max(8, tooltip.y - 22),
                transform: tooltipOnLeft ? "translateX(-100%)" : undefined,
              }}
            >
            <div className="border-b border-[#E8EEF0] px-4 py-3" style={{ background: `${tooltip.marker.color}14` }}>
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{
                    background: tooltip.marker.color,
                    color: getMarkerTextColor(tooltip.marker.stage),
                  }}
                >
                  {tooltip.marker.stage}
                </span>
                <span className="text-sm font-semibold text-[#0E3846]">{tooltip.marker.marketLabel}</span>
              </div>
              <p className="mt-2 text-xs text-[#5B6770]">
                {tooltip.marker.count} POCs in this stage · {tooltip.marker.marketTotal} total POCs in this market
              </p>
            </div>

            <div className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {tooltip.marker.stageBreakdown.map((stageTotal) => (
                  <span
                    key={`${tooltip.marker.id}-${stageTotal.stage}`}
                    className="inline-flex items-center gap-1 rounded-full border border-[#E6ECEE] px-2.5 py-1 text-[11px] font-medium text-[#35515A]"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: stageTotal.color }}
                    />
                    {stageTotal.stage}
                    <span className="font-bold text-[#0E3846]">{stageTotal.count}</span>
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7F98A1]">
                  Sample POCs
                </p>
                <div className="mt-2 space-y-1.5">
                  {tooltip.marker.samplePocs.map((samplePoc) => (
                    <p key={samplePoc} className="text-xs leading-relaxed text-[#35515A]">
                      {samplePoc}
                    </p>
                  ))}
                </div>
              </div>

              {tooltip.marker.rawMarkets.length > 1 ? (
                <div className="mt-3 border-t border-[#EEF3F5] pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7F98A1]">
                    Workbook labels
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5B6770]">
                    {tooltip.marker.rawMarkets.join(" · ")}
                  </p>
                </div>
              ) : null}
            </div>
            </div>
          ) : null}
        </div>
      </div>

      {showLegend ? (
      <div className="pointer-events-none flex flex-col items-end gap-1.5 justify-self-end pr-1">
        {data.stageTotals.map((stageTotal) => (
          <div
            key={stageTotal.stage}
            className="flex items-center gap-2 rounded-lg border border-white/60 bg-white/90 px-3 py-1.5 shadow-[0_4px_16px_rgba(14,56,70,0.08)] backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stageTotal.color }} />
            <span className="text-[11px] font-semibold leading-tight text-[#1F2A2E]" style={{ fontFamily: "var(--font-main)" }}>
              {stageTotal.stage}
            </span>
            <span className="rounded-md bg-[#F0F4F5] px-1.5 py-0.5 text-[11px] font-bold text-[#0E3846]" style={{ fontFamily: "var(--font-mono)" }}>
              {stageTotal.count}
            </span>
          </div>
        ))}
      </div>
      ) : null}
      </div>
    </div>
  )
}
