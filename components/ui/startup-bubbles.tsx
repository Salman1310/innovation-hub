"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

interface Startup {
  name: string
  sector: string
  desc: string
  tag: string
  size: number
  logoSrc?: string
  svg: string
}

function localLogo(fileName: string) {
  return `/startup-logos/${fileName}.png`
}

const GRADS = [
  "linear-gradient(135deg,#FFCD00,#FFE8A1)",
  "linear-gradient(135deg,#DFF6FA,#9EDDE5)",
  "linear-gradient(135deg,#EAF3FF,#BDD9F7)",
  "linear-gradient(135deg,#FFF4D6,#FFD76C)",
  "linear-gradient(135deg,#E6F7F1,#9EE2D2)",
  "linear-gradient(135deg,#EAF3FF,#BCD3EF)",
  "linear-gradient(135deg,#FFF7E1,#FFE39B)",
  "linear-gradient(135deg,#DFF6FA,#B8EAF0)",
  "linear-gradient(135deg,#F4F8FF,#D1E0F6)",
  "linear-gradient(135deg,#FFF0C8,#FFD45A)",
]

const ICON_COLORS = [
  "#002855", "#0E5665", "#002855", "#0E5665",
  "#002855", "#0E5665", "#002855", "#0E5665",
  "#002855", "#0E5665",
]

const STARTUPS: Startup[] = [
  { name: "Onfido", sector: "Identity Verification", desc: "Electronic customer verification with automated identity document processing — live in Asia for E-KYC.", tag: "E-KYC", size: 144, logoSrc: localLogo("onfido"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 4 L38 10 L38 24 C38 32 32 39 24 42 C16 39 10 32 10 24 L10 10 Z" stroke="FILL" stroke-width="3" fill="none" stroke-linejoin="round"/><line x1="18" y1="24" x2="22" y2="28" stroke="FILL" stroke-width="3" stroke-linecap="round"/><line x1="22" y1="28" x2="30" y2="20" stroke="FILL" stroke-width="3" stroke-linecap="round"/></svg>` },
  { name: "Denodo", sector: "Data Virtualization", desc: "Data virtualization layer unifying siloed sources for faster business intelligence — powering Fastrack Business Insights.", tag: "Real-time BI", size: 136, logoSrc: localLogo("denodo"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="14" height="14" rx="3" fill="FILL"/><rect x="26" y="8" width="14" height="14" rx="3" fill="FILL" opacity=".7"/><rect x="8" y="26" width="14" height="14" rx="3" fill="FILL" opacity=".7"/><rect x="26" y="26" width="14" height="14" rx="3" fill="FILL" opacity=".4"/></svg>` },
  { name: "MootUp", sector: "Metaverse", desc: "Immersive metaverse platform for virtual events, training, and stakeholder engagement across Asia markets.", tag: "Virtual Events", size: 128, logoSrc: localLogo("mootup"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="8" fill="FILL"/><circle cx="24" cy="24" r="16" stroke="FILL" stroke-width="3" opacity=".4"/><circle cx="24" cy="24" r="22" stroke="FILL" stroke-width="2" opacity=".2"/></svg>` },
  { name: "Synthesia", sector: "Gen AI Video", desc: "AI-powered video generation for training and communication content — scaling into production for Asia.", tag: "Video AI", size: 124, logoSrc: localLogo("synthesia"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><polygon points="6,24 22,6 22,18 42,18 42,30 22,30 22,42" fill="FILL"/></svg>` },
  { name: "Binah.Ai", sector: "Health Tech", desc: "Facial analytics platform for health risk scoring and wellness assessment using just a smartphone camera.", tag: "Wellness AI", size: 118, logoSrc: localLogo("binah-ai"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="10" stroke="FILL" stroke-width="3.5"/><path d="M18 30 Q24 40 30 30" stroke="FILL" stroke-width="3.5" fill="none" stroke-linecap="round"/><line x1="24" y1="6" x2="24" y2="2" stroke="FILL" stroke-width="3" stroke-linecap="round"/></svg>` },
  { name: "Staple.Ai", sector: "Computer Vision", desc: "AI-enabled vision tech for extracting data from expression of interest forms — document intelligence at scale.", tag: "Data Extraction", size: 112, logoSrc: localLogo("staple-ai"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="8" width="28" height="36" rx="4" stroke="FILL" stroke-width="3"/><line x1="19" y1="20" x2="29" y2="20" stroke="FILL" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="15" x2="24" y2="25" stroke="FILL" stroke-width="3" stroke-linecap="round"/><line x1="16" y1="30" x2="32" y2="30" stroke="FILL" stroke-width="2.5" stroke-linecap="round"/></svg>` },
  { name: "Wiz.Ai", sector: "Conversational AI", desc: "Humanoid talkbot for customer service and query resolution — NLP-powered virtual assistant.", tag: "Talkbot", size: 108, logoSrc: localLogo("wiz-ai"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><path d="M12 36 C12 28 8 20 16 14 C20 11 24 12 24 12 C24 12 28 11 32 14 C40 20 36 28 36 36" stroke="FILL" stroke-width="3" fill="none" stroke-linecap="round"/><line x1="18" y1="36" x2="30" y2="36" stroke="FILL" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="12" x2="24" y2="20" stroke="FILL" stroke-width="2.5" stroke-linecap="round"/></svg>` },
  { name: "UnBlu", sector: "Co-Browsing", desc: "AI-powered co-browsing platform for real-time client assistance across digital channels.", tag: "Client Experience", size: 104, logoSrc: localLogo("unblu"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="12" width="40" height="28" rx="5" stroke="FILL" stroke-width="3"/><line x1="4" y1="20" x2="44" y2="20" stroke="FILL" stroke-width="3"/><rect x="10" y="27" width="8" height="5" rx="2" fill="FILL"/></svg>` },
  { name: "Digital Owl", sector: "Med Tech", desc: "AI summarization of medical documents for faster claims processing and underwriting decisions.", tag: "Medical AI", size: 102, logoSrc: localLogo("digital-owl"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><polyline points="4,24 12,24 16,14 22,34 28,18 33,28 36,24 44,24" stroke="FILL" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { name: "Vertalo", sector: "Blockchain", desc: "Blockchain-based asset tokenization platform — validating new business models for the Canada market.", tag: "Tokenization", size: 98, logoSrc: localLogo("vertalo"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><polygon points="24,4 28,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 20,18" fill="FILL"/></svg>` },
  { name: "Persistent", sector: "Data Platform", desc: "Low-code data platform partner enabling centralized operational data hubs and collaborative innovation delivery.", tag: "Data Hub", size: 96, logoSrc: localLogo("persistent"),
    svg: `<svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="24" rx="20" ry="7" stroke="FILL" stroke-width="3"/><ellipse cx="24" cy="24" rx="20" ry="7" stroke="FILL" stroke-width="3" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7" stroke="FILL" stroke-width="3" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="4" fill="FILL"/></svg>` },
  { name: "MdotM", sector: "Investment AI", desc: "ML models for predictive investment analytics and portfolio optimization across Asia markets.", tag: "Predictive Models", size: 92,
    svg: `<svg viewBox="0 0 48 48" fill="none"><polyline points="4,36 16,20 26,28 44,8" stroke="FILL" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="36,8 44,8 44,16" stroke="FILL" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { name: "Findability Sciences", sector: "AI/NLP", desc: "Computer vision and NLP for transforming claim forms through intelligent document processing.", tag: "Claim AI", size: 88,
    svg: `<svg viewBox="0 0 48 48" fill="none"><polygon points="24,4 44,38 4,38" stroke="FILL" stroke-width="3" fill="none" stroke-linejoin="round"/><line x1="24" y1="18" x2="24" y2="28" stroke="FILL" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="33" r="2" fill="FILL"/></svg>` },
]

interface Node {
  x: number
  y: number
  r: number
  s: Startup
}

function layoutBubbles(width: number, height: number): Node[] {
  const sorted = [...STARTUPS].sort((a, b) => b.size - a.size)
  const OVERLAP = -3
  const nodes: Node[] = []
  const cx = width * 0.5
  const cy = height * 0.5

  for (const s of sorted) {
    const r = s.size / 2 + 4
    let bestX = cx
    let bestY = cy

    if (nodes.length === 0) {
      nodes.push({ x: cx, y: cy, r, s })
      continue
    }

    let bestDist = Infinity
    let placed = false
    const steps = 800

    for (let t = 0; t < steps * 6; t++) {
      const angle = t * 2.39996
      const dist = (t / steps) * Math.max(width, height) * 0.7
      const x = cx + Math.cos(angle) * dist
      const y = cy + Math.sin(angle) * dist

      if (x - r < 4 || x + r > width - 4 || y - r < 4 || y + r > height - 4) continue

      let ok = true
      for (const n of nodes) {
        if (Math.hypot(x - n.x, y - n.y) < r + n.r + OVERLAP) { ok = false; break }
      }
      if (!ok) continue

      const dCenter = Math.hypot(x - cx, y - cy)
      if (dCenter < bestDist) {
        bestDist = dCenter
        bestX = x
        bestY = y
        placed = true
        if (t > 50) break
      }
    }

    if (!placed) {
      for (let attempt = 0; attempt < 1000; attempt++) {
        const angle = Math.random() * Math.PI * 2
        const dist = (attempt / 1000) * Math.max(width, height) * 0.5 + r
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist
        if (x - r < 4 || x + r > width - 4 || y - r < 4 || y + r > height - 4) continue
        let ok = true
        for (const n of nodes) {
          if (Math.hypot(x - n.x, y - n.y) < r + n.r + OVERLAP) { ok = false; break }
        }
        if (ok) { bestX = x; bestY = y; break }
      }
    }

    nodes.push({ x: bestX, y: bestY, r, s })
  }

  for (let iter = 0; iter < 80; iter++) {
    let moved = false
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const dx = cx - n.x
      const dy = cy - n.y
      const d = Math.hypot(dx, dy) || 1
      const step = Math.min(2, d * 0.04)
      const nx2 = n.x + (dx / d) * step
      const ny2 = n.y + (dy / d) * step

      let ok = true
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        if (Math.hypot(nx2 - nodes[j].x, ny2 - nodes[j].y) < n.r + nodes[j].r + OVERLAP) {
          ok = false; break
        }
      }
      if (ok && nx2 - n.r > 4 && nx2 + n.r < width - 4 && ny2 - n.r > 4 && ny2 + n.r < height - 4) {
        n.x = nx2; n.y = ny2; moved = true
      }
    }
    if (!moved) break
  }

  return nodes
}

function Bubble({ node, index }: { node: Node; index: number }) {
  const grad = GRADS[index % GRADS.length]
  const iconColor = ICON_COLORS[index % ICON_COLORS.length]
  const innerSz = node.s.size
  const ringTotal = innerSz + 8
  const iconFrameSz = Math.max(30, Math.floor(innerSz * 0.36))
  const nameScale = node.s.name.length > 16 ? 0.052 : node.s.name.length > 11 ? 0.062 : 0.072
  const namePx = Math.max(6, Math.floor(innerSz * nameScale))
  const svgStr = node.s.svg.replace(/FILL/g, iconColor)
  const showTag = innerSz >= 132
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(node.s.logoSrc) && !logoFailed

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: node.x,
        top: node.y,
        transform: "translate(-50%, -50%)",
        zIndex: Math.round(node.s.size),
      }}
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.04,
      }}
      whileHover={{ scale: 1.1, zIndex: 9000 }}
    >
      <div
        className="rounded-full p-[4px] transition-all duration-300"
        style={{
          width: ringTotal,
          height: ringTotal,
          background: grad,
          filter: "drop-shadow(0 10px 24px rgba(0,40,85,0.16)) drop-shadow(0 18px 38px rgba(0,40,85,0.1))",
        }}
      >
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-full border border-white/15"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(252,248,236,0.98) 100%)",
            backdropFilter: "blur(14px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div
            className="absolute inset-[16%] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,205,0,0.12) 0%, rgba(255,255,255,0) 72%)" }}
          />
          <div
            className="absolute left-[14%] top-[10%] h-[26%] w-[38%] -rotate-[30deg] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.84) 0%, transparent 78%)" }}
          />
          <div
            className="relative z-[1] flex items-center justify-center rounded-full"
            style={{ width: iconFrameSz, height: iconFrameSz }}
          >
            {showLogo ? (
              <div
                className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px] border border-[#002855]/10 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(0,40,85,0.12)]"
                style={{ padding: Math.max(5, Math.floor(iconFrameSz * 0.14)) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local bubble logos still need direct sizing and fallback control */}
                <img
                  src={node.s.logoSrc}
                  alt={`${node.s.name} logo`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  onError={() => setLogoFailed(true)}
                />
              </div>
            ) : (
              <>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,205,0,0.18) 0%, transparent 72%)" }}
                />
                <div dangerouslySetInnerHTML={{ __html: svgStr }} />
              </>
            )}
          </div>
          <div
            className="relative z-[1] text-center font-bold uppercase leading-tight"
            style={{ fontSize: namePx, color: "#002855", letterSpacing: "0.55px", lineHeight: 1.08, padding: "0 12%", wordBreak: "break-word" }}
          >
            {node.s.name}
          </div>
          {showTag ? (
            <div className="relative z-[1] rounded-full border border-[#0E5665]/10 bg-[#0E5665]/6 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#0E5665]">
              {node.s.tag}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export function StartupBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [tooltip, setTooltip] = useState<{ s: Startup; x: number; y: number } | null>(null)

  const doLayout = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    if (w > 0 && h > 0) {
      setNodes(layoutBubbles(w, h))
    }
  }, [])

  useEffect(() => {
    doLayout()
    window.addEventListener("resize", doLayout)
    return () => window.removeEventListener("resize", doLayout)
  }, [doLayout])

  return (
    <section className="relative overflow-hidden bg-[#F7F3E7]" style={{ isolation: "isolate", zIndex: 0 }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,205,0,0.16),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(14,86,101,0.1),transparent_24%),linear-gradient(135deg,#FCFAF2_0%,#F6F0DD_52%,#EEF7F8_100%)]" />
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(rgba(0,40,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,40,85,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#FFCD00]/10 blur-3xl" />
      <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-[#0E5665]/10 blur-3xl" />

      <div className="relative z-10 flex min-h-[760px] flex-col lg:flex-row">
      <div className="relative z-10 flex w-full min-w-[300px] shrink-0 flex-col justify-center border-b border-[#002855]/8 bg-white/72 px-8 py-12 backdrop-blur-xl lg:w-[34%] lg:border-b-0 lg:border-r lg:px-[52px]">
        <div
          className="absolute -bottom-[100px] -left-[60px] h-[280px] w-[280px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,205,0,0.18) 0%, transparent 70%)" }}
        />
        <h2
          className="mb-5 text-[clamp(36px,4.2vw,58px)] font-bold leading-[1.14] text-[#002855]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Engagements<br />with <em className="not-italic text-[#FFCD00]">Startups</em>
        </h2>
        <p className="mb-7 max-w-[380px] text-lg leading-[1.78] text-[#516675]">
          Sun Life actively engages with a curated constellation of high-impact startups reshaping health, wealth, and financial well-being for millions.
        </p>
        <div className="mb-8 flex gap-6">
          <div className="flex flex-col">
            <span className="text-[34px] font-bold leading-none text-[#002855]" style={{ fontFamily: "var(--font-display)" }}>40+</span>
            <span className="mt-1 text-[13px] uppercase tracking-[1.2px] text-[#5A6278]">Partners</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[34px] font-bold leading-none text-[#002855]" style={{ fontFamily: "var(--font-display)" }}>4</span>
            <span className="mt-1 text-[13px] uppercase tracking-[1.2px] text-[#5A6278]">Accelerators</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[34px] font-bold leading-none text-[#002855]" style={{ fontFamily: "var(--font-display)" }}>51+</span>
            <span className="mt-1 text-[13px] uppercase tracking-[1.2px] text-[#5A6278]">POCs</span>
          </div>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border border-[#002855]/10 bg-white/86 px-5 py-2.5 text-[14.5px] font-medium tracking-[0.3px] text-[#0E5665] shadow-[0_10px_24px_rgba(0,40,85,0.08)]">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#FFCD00]" />
          Hover any startup to explore
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[12%] h-[420px] w-[420px] rounded-full border border-[#002855]/7" />
          <div className="absolute left-[18%] top-[22%] h-[280px] w-[280px] rounded-full border border-[#002855]/5" />
          <div className="absolute right-[10%] top-[18%] h-[340px] w-[340px] rounded-full border border-[#002855]/6" />
          <div className="absolute bottom-[14%] left-[16%] h-56 w-56 rounded-full bg-[#FFCD00]/6 blur-3xl" />
          <div className="absolute bottom-[10%] right-[14%] h-64 w-64 rounded-full bg-[#0E5665]/7 blur-3xl" />
        </div>

        <div className="pointer-events-none absolute left-8 top-8 rounded-full border border-[#002855]/8 bg-white/84 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5A6278] shadow-[0_8px_18px_rgba(0,40,85,0.06)]">
          Innovation partner constellation
        </div>

        <div ref={containerRef} className="relative min-h-[560px] flex-1 lg:min-h-[760px]">
        {nodes.map((node) => (
          <div
            key={node.s.name}
            onMouseEnter={(e) => setTooltip({ s: node.s, x: e.clientX, y: e.clientY })}
            onMouseMove={(e) => setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
            onMouseLeave={() => setTooltip(null)}
          >
            <Bubble node={node} index={STARTUPS.indexOf(node.s)} />
          </div>
        ))}
        </div>
      </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-[9999] min-w-[190px] max-w-[250px] rounded-[16px] border border-[#002855]/10 bg-white/96 px-5 py-4 text-[#002855] shadow-[0_18px_48px_rgba(0,40,85,0.16)] backdrop-blur-xl"
          style={{
            left: tooltip.x + 18,
            top: tooltip.y + 16,
            transform: tooltip.x + 260 > (typeof window !== "undefined" ? window.innerWidth : 1400) ? "translateX(-290px)" : undefined,
          }}
        >
          <div className="mb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-[#FFCD00]">{tooltip.s.name}</div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[1.8px] text-[#0E5665]">{tooltip.s.sector}</div>
          <div className="text-[13px] leading-[1.57] text-[#445C6A]">{tooltip.s.desc}</div>
          <span className="mt-2.5 inline-block rounded-full bg-[rgba(255,205,0,0.14)] px-3 py-0.5 text-[11px] font-semibold tracking-[0.3px] text-[#FFCD00]">
            {tooltip.s.tag}
          </span>
        </div>
      )}
    </section>
  )
}
