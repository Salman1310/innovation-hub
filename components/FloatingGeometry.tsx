"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const POC_CARDS = [
  {
    icon: "⚡",
    title: "AI Classifier",
    status: "Live",
    statusColor: "#00cec9",
    progress: 100,
    delay: 0,
  },
  {
    icon: "🧠",
    title: "LLM Pipeline",
    status: "In Review",
    statusColor: "#fdcb6e",
    progress: 75,
    delay: 0.4,
  },
  {
    icon: "📊",
    title: "Data Mesh",
    status: "Live",
    statusColor: "#00cec9",
    progress: 100,
    delay: 0.8,
  },
  {
    icon: "🔮",
    title: "Vision API",
    status: "Building",
    statusColor: "#fd79a8",
    progress: 40,
    delay: 1.2,
  },
]

const SHAPES = [
  { cx: 60, cy: 80, r: 55, color: "#6c5ce7", opacity: 0.08, delay: 0 },
  { cx: 200, cy: 40, r: 35, color: "#00cec9", opacity: 0.10, delay: 0.5 },
  { cx: 280, cy: 160, r: 45, color: "#fd79a8", opacity: 0.08, delay: 1.0 },
  { cx: 130, cy: 220, r: 28, color: "#6c5ce7", opacity: 0.12, delay: 1.5 },
  { cx: 320, cy: 80, r: 22, color: "#fdcb6e", opacity: 0.10, delay: 0.8 },
]

function HexShape({ x, y, size, color, delay }: { x: number; y: number; size: number; color: string; delay: number }) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`
  }).join(" ")

  return (
    <motion.polygon
      points={points}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      opacity={0.25}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.15, 0.35, 0.15],
        scale: [1, 1.05, 1],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  )
}

export function FloatingGeometry() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      container.style.setProperty("--mx", `${x * 20}px`)
      container.style.setProperty("--my", `${y * 20}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] flex items-center justify-center"
      style={{ "--mx": "0px", "--my": "0px" } as React.CSSProperties}
    >
      {/* Background glow blobs */}
      <div
        className="absolute inset-0 overflow-hidden rounded-3xl"
        style={{ transform: "translate(var(--mx), var(--my))" }}
      >
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 300,
            height: 300,
            top: "10%",
            left: "20%",
            background: "radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 200,
            height: 200,
            bottom: "20%",
            right: "15%",
            background: "radial-gradient(circle, rgba(0,206,201,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-2xl"
          style={{
            width: 150,
            height: 150,
            top: "50%",
            right: "25%",
            background: "radial-gradient(circle, rgba(253,121,168,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* SVG geometric shapes */}
      <motion.div
        className="absolute inset-0"
        style={{ transform: "translate(calc(var(--mx) * 0.5), calc(var(--my) * 0.5))" }}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full opacity-60"
          style={{ position: "absolute", inset: 0 }}
        >
          {/* Background circles */}
          {SHAPES.map((s, i) => (
            <motion.circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={s.color}
              opacity={s.opacity}
              animate={{ cy: [s.cy - 8, s.cy + 8, s.cy - 8] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
            />
          ))}

          {/* Hexagons */}
          <HexShape x={80} y={100} size={50} color="#6c5ce7" delay={0} />
          <HexShape x={280} y={280} size={38} color="#00cec9" delay={0.7} />
          <HexShape x={320} y={120} size={28} color="#fd79a8" delay={1.3} />
          <HexShape x={160} y={340} size={22} color="#6c5ce7" delay={0.4} />

          {/* Triangle outlines */}
          <motion.polygon
            points="200,50 260,150 140,150"
            fill="none"
            stroke="#a29bfe"
            strokeWidth="1"
            opacity={0.3}
            animate={{ opacity: [0.15, 0.4, 0.15], rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 100px" }}
          />

          {/* Grid dots */}
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <motion.circle
                key={`${row}-${col}`}
                cx={50 + col * 75}
                cy={50 + row * 75}
                r={2}
                fill="#6c5ce7"
                opacity={0.2}
                animate={{ opacity: [0.1, 0.35, 0.1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: (row * 5 + col) * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))
          )}
        </svg>
      </motion.div>

      {/* Floating POC Cards */}
      <div className="relative z-10 flex flex-col gap-4 w-72">
        {POC_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 60 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: card.delay + 0.3 },
              x: { duration: 0.6, delay: card.delay + 0.3 },
              y: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              },
            }}
            className="group cursor-pointer"
          >
            <div
              className="rounded-2xl p-4 transition-all duration-300 group-hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(108,92,231,0.15)",
                boxShadow: "0 4px 24px rgba(108,92,231,0.08), 0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{card.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-[#1a1a2e] text-sm">{card.title}</div>
                  <div
                    className="text-xs font-medium mt-0.5"
                    style={{ color: card.statusColor }}
                  >
                    ● {card.status}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-[#f0effe] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: card.statusColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%` }}
                  transition={{ duration: 1.2, delay: card.delay + 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating accent pill */}
      <motion.div
        className="absolute top-8 right-8 z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="px-4 py-2 rounded-full text-xs font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #6c5ce7, #00cec9)",
            boxShadow: "0 4px 16px rgba(108,92,231,0.35)",
          }}
        >
          ✦ Innovation Lab
        </div>
      </motion.div>
    </div>
  )
}
