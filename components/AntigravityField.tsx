"use client"
import { useEffect, useRef, useCallback } from "react"
import { Zap, Brain, Database, Eye } from "lucide-react"

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
  pulsePhase: number
  pulseSpeed: number
}

const COLORS = [
  "108,92,231",   // purple
  "162,155,254",  // light purple
  "0,206,201",    // teal
  "253,121,168",  // pink
  "253,203,110",  // gold
]

export function AntigravityField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const dprRef = useRef(1)

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 4500)
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    dprRef.current = dpr

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      particlesRef.current = initParticles(rect.width, rect.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener("mousemove", handleMouse)
    canvas.addEventListener("mouseleave", handleLeave)

    let time = 0
    const INFLUENCE_RADIUS = 150
    const PUSH_FORCE = 8
    const RETURN_SPEED = 0.015
    const DAMPING = 0.95
    const LINE_DIST = 90

    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      time++

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Pulse
        p.pulsePhase += p.pulseSpeed
        const pulse = Math.sin(p.pulsePhase) * 0.15 + 1

        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < INFLUENCE_RADIUS && dist > 0) {
          const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_FORCE
          const angle = Math.atan2(dy, dx)
          p.vx += Math.cos(angle) * force * 0.15
          p.vy += Math.sin(angle) * force * 0.15
        }

        // Spring back to origin with organic drift
        const driftX = Math.sin(time * 0.008 + p.pulsePhase) * 0.08
        const driftY = Math.cos(time * 0.006 + p.pulsePhase * 1.3) * 0.08
        p.vx += (p.originX - p.x) * RETURN_SPEED + driftX
        p.vy += (p.originY - p.y) * RETURN_SPEED + driftY

        // Damping
        p.vx *= DAMPING
        p.vy *= DAMPING

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Draw particle
        const drawOpacity = p.opacity * pulse
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${drawOpacity})`
        ctx.fill()

        // Glow for larger particles
        if (p.radius > 2) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${p.color},${drawOpacity * 0.08})`
          ctx.fill()
        }
      }

      // Connection lines between nearby particles
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(108,92,231,${alpha})`
            ctx.stroke()
          }
        }
      }

      // Cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, INFLUENCE_RADIUS
        )
        gradient.addColorStop(0, "rgba(108,92,231,0.06)")
        gradient.addColorStop(0.5, "rgba(0,206,201,0.03)")
        gradient.addColorStop(1, "rgba(108,92,231,0)")
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, INFLUENCE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouse)
      canvas.removeEventListener("mouseleave", handleLeave)
    }
  }, [initParticles])

  return (
    <div className="relative w-full h-full min-h-[600px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none" }}
      />

      {/* Floating POC cards overlaid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="flex flex-col gap-4 w-72 pointer-events-auto">
          {[
            { icon: Zap, title: "AI Classifier", status: "Live", color: "#00cec9", progress: 100 },
            { icon: Brain, title: "LLM Pipeline", status: "In Review", color: "#fdcb6e", progress: 75 },
            { icon: Database, title: "Data Mesh", status: "Live", color: "#00cec9", progress: 100 },
            { icon: Eye, title: "Vision API", status: "Building", color: "#fd79a8", progress: 40 },
          ].map((card, i) => (
            <div
              key={card.title}
              className="group cursor-pointer rounded-2xl p-4 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(108,92,231,0.12)",
                boxShadow: "0 4px 24px rgba(108,92,231,0.06)",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: `${card.color}15`,
                    color: card.color
                  }}
                >
                  <card.icon className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-[#1a1a2e] text-sm">{card.title}</div>
                  <div className="text-xs font-medium" style={{ color: card.color }}>
                    ● {card.status}
                  </div>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-[#f0effe] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ background: card.color, width: `${card.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
