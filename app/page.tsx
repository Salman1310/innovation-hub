"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowUpRight, Filter, PieChart, RadioTower } from "lucide-react"
import { AnimatedHero } from "@/components/ui/animated-hero"
import { Spotlight } from "@/components/ui/spotlight"
import { InnovationGlobe } from "@/components/ui/innovation-globe"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { DidYouKnow } from "@/components/ui/did-you-know"
import { StartupBubbles } from "@/components/ui/startup-bubbles"

import {
  METRICS,
  BUSINESS_IMPACT,
  POCS,
  TREND_BADGES,
  TICKER_ITEMS,
  FUN_FACTS,
  IMPACT_HIGHLIGHTS,
  IDEA_TO_IMPACT,
  PARTNERSHIPS,
  CULTURE_METRICS,
  FRAMEWORK_STAGES,
  FRAMEWORK_GUARDRAILS,
  FRAMEWORK_OUTPUTS,
  GUIDING_PRINCIPLES,
  FUTURE_ROADMAP,
} from "@/lib/data"
import type { MarketKey } from "@/lib/data"
import {
  Trophy, Shield, Clock, TrendingUp,
  Lightbulb, Users, Heart, Award,
  Sparkles, CheckCircle, Megaphone, Target,
  ArrowRight, Building2, GraduationCap, Rocket, Zap,
} from "lucide-react"


function CountUp({
  value,
  suffix = "",
  prefix = "",
  color,
}: {
  value: number
  suffix?: string
  prefix?: string
  color: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const frames = 52
    const tick = () => {
      frame += 1
      const progress = 1 - Math.pow(1 - frame / frames, 3)
      setDisplay(Math.round(value * progress))
      if (frame < frames) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <span ref={ref} style={{ color }}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

function ImpactPieChart() {
  const total = BUSINESS_IMPACT.reduce((sum, item) => sum + item.value, 0)
  const PIE_COLORS = ["#ECAB23", "#0E5665", "#F8D56A", "#E85D75", "#4ECDC4"]
  const radius = 80
  const cx = 100
  const cy = 100

  const slices = BUSINESS_IMPACT.map((item, i) => {
    const angle = (item.value / total) * 360
    const startAngle = BUSINESS_IMPACT
      .slice(0, i)
      .reduce((sum, currentItem) => sum + (currentItem.value / total) * 360, -90)
    const endAngle = startAngle + angle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const largeArc = angle > 180 ? 1 : 0

    const x1 = cx + radius * Math.cos(startRad)
    const y1 = cy + radius * Math.sin(startRad)
    const x2 = cx + radius * Math.cos(endRad)
    const y2 = cy + radius * Math.sin(endRad)

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`

    const midAngle = (startAngle + endAngle) / 2
    const midRad = (midAngle * Math.PI) / 180
    const labelRadius = radius * 0.55
    const labelX = cx + labelRadius * Math.cos(midRad)
    const labelY = cy + labelRadius * Math.sin(midRad)
    const pct = Math.round((item.value / total) * 100)

    return (
      <g key={item.label}>
        <motion.path
          d={d}
          fill={PIE_COLORS[i % PIE_COLORS.length]}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        />
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="700"
          style={{ fontFamily: "var(--font-mono)", pointerEvents: "none" }}
        >
          {pct}%
        </text>
      </g>
    )
  })

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Business impact</p>
          <h3 className="text-lg font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
            POCs by market and unit
          </h3>
        </div>
        <PieChart className="h-5 w-5 text-[#ECAB23]" />
      </div>
      <div className="flex items-center justify-center gap-6">
        <svg viewBox="0 0 200 200" className="h-48 w-48 shrink-0">
          {slices}
        </svg>
        <div className="space-y-3">
          {BUSINESS_IMPACT.map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              <span className="text-xs font-semibold text-[#5B6770]">{item.label}</span>
              <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: PIE_COLORS[i % PIE_COLORS.length] }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LiveTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TICKER_ITEMS.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="glass-card mb-8 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E5665] opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#0E5665]" />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={TICKER_ITEMS[index]}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold text-[#1F2A2E]"
          >
            {TICKER_ITEMS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <span className="text-xs text-[#5B6770]" style={{ fontFamily: "var(--font-mono)" }}>
        live portfolio pulse
      </span>
    </div>
  )
}

function PocGallery() {
  const [activeMarket, setActiveMarket] = useState<MarketKey>("All")
  const [activeStatus, setActiveStatus] = useState("All")
  const markets: MarketKey[] = ["All", "Asia", "Canada", "SLGS", "US", "Other"]
  const statuses = ["All", "In Production", "Scaling into Production", "Prototyping", "Exploration", "Bookshelf", "Showcase"]
  const filteredPocs = useMemo(
    () => POCS.filter((poc) => {
      const marketMatch = activeMarket === "All" || poc.market === activeMarket
      const statusMatch = activeStatus === "All" || poc.status === activeStatus
      return marketMatch && statusMatch
    }),
    [activeMarket, activeStatus],
  )

  return (
    <div id="poc-gallery" className="mb-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">
            <Filter className="h-3.5 w-3.5" />
            Innovation Portfolio
          </p>
          <h3 className="text-2xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
            {filteredPocs.length} POCs
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={activeMarket}
            onChange={(e) => setActiveMarket(e.target.value as MarketKey)}
            className="cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.72)",
              borderColor: "rgba(236,171,35,0.18)",
              color: "#5B6770",
            }}
          >
            {markets.map((market) => (
              <option key={market} value={market}>
                {market === "All" ? "All Markets" : market}
              </option>
            ))}
          </select>
          <select
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
            className="cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.72)",
              borderColor: "rgba(236,171,35,0.18)",
              color: "#5B6770",
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Stages" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredPocs.map((poc) => (
            <motion.article
              layout
              key={poc.name}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.25 }}
              className="glass-card group cursor-pointer p-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(236,171,35,0.18)]"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4 className="text-sm font-bold text-[#1F2A2E] transition-colors group-hover:text-[#ECAB23]">
                  {poc.name}
                </h4>
                <span
                  className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    color: poc.statusColor,
                    background: `${poc.statusColor}18`,
                  }}
                >
                  {poc.status}
                </span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-[#5B6770]">{poc.desc}</p>
              <div className="flex items-center justify-between gap-4 text-[10px]">
                <span
                  className="rounded-full bg-[#FFF7E3] px-2 py-0.5 font-medium text-[#ECAB23]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {poc.tech}
                </span>
                <span className="text-[#5B6770]">{poc.partner}</span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const ICON_MAP: Record<string, React.ReactNode> = {
  trophy: <Trophy className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  lightbulb: <Lightbulb className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
  "check-circle": <CheckCircle className="h-5 w-5" />,
  megaphone: <Megaphone className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
}

function ImpactHighlights() {
  return (
    <div className="mb-12">
      <div className="mb-6 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Measurable Outcomes</p>
        <h3 className="text-2xl font-bold text-[#1F2A2E] md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Impact <span className="gradient-text">Highlights</span>
        </h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {IMPACT_HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={item.label}
            className="glass-card group p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(236,171,35,0.15)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF7E3] text-[#ECAB23]">
              {ICON_MAP[item.icon]}
            </div>
            <p className="mb-1 text-2xl font-bold text-[#0E5665]" style={{ fontFamily: "var(--font-display)" }}>
              {item.value}
            </p>
            <p className="mb-1 text-sm font-bold text-[#1F2A2E]">{item.label}</p>
            <p className="text-xs text-[#5B6770]">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function IdeaToImpactTimeline() {
  return (
    <div className="mb-12">
      <div className="mb-6 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Production Journey</p>
        <h3 className="text-2xl font-bold text-[#1F2A2E] md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Idea to <span className="gradient-text">Impact</span>
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#5B6770]">12 POCs in production — each started as an experiment.</p>
      </div>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ECAB23] via-[#4ECDC4] to-[#0E5665] md:left-1/2" />
        {IDEA_TO_IMPACT.map((item, i) => (
          <motion.div
            key={`${item.year}-${item.name}`}
            className={`relative mb-6 flex items-start gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:gap-8`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className={`hidden md:block md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "text-right" : "text-left"}`}>
              <div className="glass-card inline-block p-4">
                <p className="text-xs font-bold text-[#ECAB23]" style={{ fontFamily: "var(--font-mono)" }}>{item.year}</p>
                <p className="text-sm font-bold text-[#1F2A2E]">{item.name}</p>
                <p className="text-xs text-[#5B6770]">{item.desc}</p>
                <span className="mt-1 inline-block rounded-full bg-[#FFF7E3] px-2 py-0.5 text-[10px] font-medium text-[#ECAB23]">{item.market}</span>
              </div>
            </div>
            <div className="absolute left-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#ECAB23] bg-white md:left-1/2 md:-translate-x-1/2" />
            <div className="ml-12 md:hidden">
              <div className="glass-card p-4">
                <p className="text-xs font-bold text-[#ECAB23]" style={{ fontFamily: "var(--font-mono)" }}>{item.year}</p>
                <p className="text-sm font-bold text-[#1F2A2E]">{item.name}</p>
                <p className="text-xs text-[#5B6770]">{item.desc}</p>
                <span className="mt-1 inline-block rounded-full bg-[#FFF7E3] px-2 py-0.5 text-[10px] font-medium text-[#ECAB23]">{item.market}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PartnershipEcosystem() {
  const categories = [
    { key: "startups" as const, label: "Startups", icon: <Rocket className="h-5 w-5" />, color: "#ECAB23" },
    { key: "accelerators" as const, label: "Accelerators", icon: <Zap className="h-5 w-5" />, color: "#4ECDC4" },
    { key: "academia" as const, label: "Academia", icon: <GraduationCap className="h-5 w-5" />, color: "#0E5665" },
    { key: "enterprise" as const, label: "Enterprise", icon: <Building2 className="h-5 w-5" />, color: "#E85D75" },
  ]

  return (
    <section className="px-8 py-24">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Ecosystem-Led Approach</p>
          <h2 className="text-4xl font-bold text-[#1F2A2E] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Partnership <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#5B6770]">
            Startups for speed, global partners for scale, academia for depth.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const data = PARTNERSHIPS[cat.key]
            return (
              <motion.div
                key={cat.key}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${cat.color}18`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: cat.color, fontFamily: "var(--font-display)" }}>{data.count}</p>
                    <p className="text-xs font-semibold text-[#5B6770]">{cat.label}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.examples.map((name) => (
                    <span key={name} className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-[#5B6770]" style={{ borderColor: `${cat.color}30` }}>
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CultureSection() {
  return (
    <section className="px-8 py-24" style={{ background: "linear-gradient(180deg, #f8f9fc 0%, #FFF7E3 100%)" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Building from Within</p>
          <h2 className="text-4xl font-bold text-[#1F2A2E] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Innovation <span className="gradient-text">Culture</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#5B6770]">
            From zero innovation challenges to 7-8 ideation drives annually — 35% of POCs now built internally.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CULTURE_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF7E3] text-[#ECAB23]">
                {ICON_MAP[metric.icon]}
              </div>
              <p className="text-3xl font-bold text-[#0E5665]" style={{ fontFamily: "var(--font-display)" }}>{metric.value}</p>
              <p className="mt-1 text-sm font-medium text-[#5B6770]">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OperatingFramework() {
  return (
    <section className="px-8 py-24" style={{ background: "#f8f9fc" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#E6ECEE] bg-white shadow-[0_8px_40px_rgba(14,56,70,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image
            src="/framework.png"
            alt="Innovation Hub Operating Framework — Ideas Funnel to Exploration to Scaling for Enterprise"
            width={1920}
            height={1080}
            className="h-auto w-full"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  )
}

function GuidingPrinciplesSection() {
  return (
    <section className="px-8 py-24" style={{ background: "#f8f9fc" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Prioritization Criteria</p>
          <h2 className="text-4xl font-bold text-[#1F2A2E] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Guiding <span className="gradient-text">Principles</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#5B6770]">
            How we choose opportunities from the pipeline — each evaluated across six dimensions.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GUIDING_PRINCIPLES.map((principle, i) => (
            <motion.div
              key={principle.title}
              className="glass-card group flex items-start gap-4 p-6 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(236,171,35,0.12)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `${principle.color}15`, color: principle.color }}
              >
                {ICON_MAP[principle.icon]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F2A2E]">{principle.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-[#5B6770]">{principle.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FutureRoadmap() {
  return (
    <section className="px-8 py-24" style={{ background: "linear-gradient(135deg, #1F2A2E 0%, #0E3846 50%, #1F2A2E 100%)" }}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F8D56A]">What&apos;s Next</p>
          <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Future <span style={{ color: "#ECAB23" }}>Roadmap</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Shifting from isolated use cases to building enterprise-level AI capabilities.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FUTURE_ROADMAP.map((item, i) => (
            <motion.div
              key={item.title}
              className="group rounded-2xl border border-white/10 p-6 transition-all hover:border-[#ECAB23]/30 hover:bg-white/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECAB23]/20 text-sm font-bold text-[#ECAB23]">
                {i + 1}
              </div>
              <h4 className="mb-2 text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h4>
              <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const cumulativePocSeries = [
    { year: "2020", value: 4 },
    { year: "2021", value: 9 },
    { year: "2022", value: 19 },
    { year: "2023", value: 24 },
    { year: "2024", value: 34 },
    { year: "2025", value: 45 },
    { year: "2026", value: 51 },
  ]
  const cumulativeChartWidth = 620
  const cumulativeChartHeight = 220
  const cumulativeChartMargin = { top: 22, right: 30, bottom: 34, left: 30 }
  const cumulativeChartFloor = cumulativeChartHeight - cumulativeChartMargin.bottom
  const cumulativeChartRange = cumulativeChartFloor - cumulativeChartMargin.top
  const cumulativeMaxValue = Math.max(...cumulativePocSeries.map((item) => item.value))
  const cumulativeChartStep =
    (cumulativeChartWidth - cumulativeChartMargin.left - cumulativeChartMargin.right) /
    (cumulativePocSeries.length - 1)
  const cumulativeChartPoints = cumulativePocSeries.map((item, index) => ({
    ...item,
    x: cumulativeChartMargin.left + cumulativeChartStep * index,
    y: cumulativeChartFloor - (item.value / cumulativeMaxValue) * cumulativeChartRange,
  }))
  const cumulativeLinePath = cumulativeChartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")
  const cumulativeAreaPath = `${cumulativeLinePath} L ${cumulativeChartPoints[cumulativeChartPoints.length - 1].x},${cumulativeChartFloor} L ${cumulativeChartPoints[0].x},${cumulativeChartFloor} Z`

  return (
    <main className="grain bg-aurora min-h-screen overflow-x-hidden">
      <section className="relative h-screen w-full overflow-hidden bg-[#f8f9fc]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#ECAB23" />

        {/* Navbar */}
        <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-10">
          <Image src="/sunlife_logo.png" alt="Sun Life" width={140} height={40} className="h-9 w-auto" />
          <div className="hidden items-center gap-6 md:flex lg:gap-10">
            {[
              { label: "Dashboard", href: "#dashboard" },
              { label: "Our Story", href: "/story" },
              { label: "Culture", href: "/culture" },
              { label: "News Feed", href: "/feed" },
              { label: "Connect", href: "#connect" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-medium text-[#1F2A2E]/75 transition-colors hover:text-[#ECAB23] md:text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero: left content + right Spline robot */}
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto flex max-w-7xl items-center px-6 md:px-10">
            {/* Left side — text content */}
            <div className="flex-1">
              <AnimatedHero />
            </div>

            {/* Right side — Interactive Globe */}
            <div className="hidden flex-1 lg:block relative">
              <div className="relative h-[600px] w-full ml-8">
                <InnovationGlobe />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#1F2A2E] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Key <span className="gradient-text">Themes</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#5B6770]">
              We focus innovation efforts across three core themes anchored to Sun Life&apos;s purpose and growth agenda.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Client & Advisor Experience", desc: "Improving client onboarding, advisor productivity, and engagement across all touchpoints and markets", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&auto=format&fit=crop&q=80" },
              { title: "Operational Efficiency", desc: "Reducing and transforming operational tasks through automation, AI, and process innovation", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80" },
              { title: "Strategic Initiatives", desc: "Emerging tech experiments aligned to Sun Life's long-term business strategy and competitive positioning", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
            ].map((area, i) => (
              <motion.div
                key={area.title}
                className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${area.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A2E] via-[#1F2A2E]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="mb-2 text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    {area.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {area.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-0">
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=85"
          bgImageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=85"
          title="Impact Dashboard"
          date="Innovation AI Portfolio"
          scrollToExpand="Scroll to open dashboard"
          textBlend
        >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <div
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{
                background: "linear-gradient(135deg, #FFF7E3, #FFF7E3)",
                color: "#ECAB23",
                border: "1px solid rgba(236,171,35,0.15)",
              }}
            >
              The Numbers
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#1F2A2E] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Impact <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#5B6770]">
              Real portfolio signals shaped into an interactive leadership view.
            </p>
          </div>

          <LiveTicker />

          <div className="mb-8 grid gap-3 md:grid-cols-3">
            {TREND_BADGES.map((badge) => (
              <div key={badge.label} className="glass-card flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: badge.tone }}>
                    {badge.value}
                  </p>
                  <p className="text-sm font-semibold text-[#1F2A2E]">{badge.label}</p>
                </div>
                <ArrowUpRight className="h-5 w-5" style={{ color: badge.tone }} />
              </div>
            ))}
          </div>

          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {METRICS.map((metric) => (
              <div key={metric.label} className="glass-card cursor-default p-5 text-center transition-transform hover:scale-105">
                <div className="mb-1 text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  <CountUp value={metric.value} suffix={metric.suffix} color={metric.color} />
                </div>
                <div className="text-xs font-medium text-[#5B6770]">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <ImpactPieChart />
            <div className="glass-card p-6">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Growth</p>
                  <h3 className="text-xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                    Cumulative POCs Executed
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0E5665]/10 px-3 py-1 text-xs font-bold text-[#0E5665]">
                  <RadioTower className="h-3.5 w-3.5" />
                  2026 portfolio peak
                </div>
              </div>
              <div className="relative h-56 overflow-visible rounded-2xl border border-[#D9E4E7] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,247,227,0.42)_100%)] px-2 pt-2">
                <svg viewBox={`0 0 ${cumulativeChartWidth} ${cumulativeChartHeight}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ECAB23" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ECAB23" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((tick) => {
                    const y = cumulativeChartFloor - cumulativeChartRange * tick

                    return (
                      <line
                        key={tick}
                        x1={cumulativeChartMargin.left}
                        x2={cumulativeChartWidth - cumulativeChartMargin.right}
                        y1={y}
                        y2={y}
                        stroke="rgba(14,86,101,0.12)"
                        strokeDasharray="6 8"
                      />
                    )
                  })}
                  <motion.path
                    d={cumulativeAreaPath}
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                  <motion.path
                    d={cumulativeLinePath}
                    fill="none"
                    stroke="#ECAB23"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  {cumulativeChartPoints.map((point, index) => (
                    <motion.g
                      key={point.year}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.18 + index * 0.12, duration: 0.28 }}
                    >
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="5.5"
                        fill="#ECAB23"
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                      <text
                        x={point.x}
                        y={point.y - 14}
                        textAnchor="middle"
                        fill="#0E5665"
                        fontSize="11"
                        fontWeight="700"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {point.value}
                      </text>
                      <text
                        x={point.x}
                        y={cumulativeChartHeight - 8}
                        textAnchor="middle"
                        fill="#5B6770"
                        fontSize="10"
                        fontWeight="500"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {point.year}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF7E3] px-3 py-1.5 text-xs font-bold text-[#ECAB23] shadow-[0_8px_20px_rgba(236,171,35,0.14)]" style={{ fontFamily: "var(--font-mono)" }}>
                  51+ POCs executed by 2026
                </div>
                <p className="text-xs font-medium text-[#5B6770]">
                  Portfolio grew from 4 POCs in 2020 to 51+ executed in 2026 — 22% adoption rate.
                </p>
                </div>
            </div>
          </div>

          <ImpactHighlights />

          <IdeaToImpactTimeline />

          {/* Aurora-tinted dashboard content area */}
          <AuroraBackground className="min-h-0 -mx-8 px-8 py-12 rounded-3xl">
            <div className="relative z-10 w-full">
              <PocGallery />
            </div>
          </AuroraBackground>
        </div>
        </ScrollExpandMedia>
      </section>

      <StartupBubbles />

      <OperatingFramework />

      <GuidingPrinciplesSection />

      <PartnershipEcosystem />

      <CultureSection />

      <FutureRoadmap />

      <section
        className="overflow-hidden py-6"
        style={{
          background: "linear-gradient(135deg, #1F2A2E 0%, #0E3846 50%, #1F2A2E 100%)",
        }}
      >
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, repeat) =>
            [
              "51+ POCs executed",
              "12 in production",
              "40+ startup partners",
              "22% adoption rate",
              "CAD 360M+ fraud prevented",
              "1,080 hrs capacity saved",
            ].map((item, i) => (
              <span
                key={`${repeat}-${i}`}
                className="inline-flex items-center gap-3 text-sm font-medium text-white/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: i % 2 === 0 ? "#ECAB23" : "#0E5665" }} />
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      <DidYouKnow facts={FUN_FACTS} interval={6000} />

      <FooterCTA />
    </main>
  )
}

function IdeaModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", acf2: "", email: "", team: "", idea: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.acf2 || !form.email || !form.team || !form.idea) return
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "var(--font-main)",
  }

  const fields: { key: keyof typeof form; label: string; placeholder: string; type?: string }[] = [
    { key: "name", label: "Full Name", placeholder: "Jane Smith" },
    { key: "acf2", label: "ACF2 ID", placeholder: "JS12345" },
    { key: "email", label: "Email ID", placeholder: "jane.smith@sunlife.com", type: "email" },
    { key: "team", label: "Team Name", placeholder: "Group Benefits" },
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,12,18,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl p-8"
        style={{ background: "#0E3846", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="py-4 text-center">
            <div className="mb-4 text-5xl">&#127881;</div>
            <h3 className="mb-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Idea received!</h3>
            <p className="mb-6 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Thanks <strong className="text-white">{form.name}</strong> from <strong className="text-white">{form.team}</strong>. We&apos;ll be in touch within 48 hours.
            </p>
            <button onClick={onClose} className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
              style={{ background: "#FFCD00", color: "#002855" }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Submit your idea</h3>
                <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>We prototype fast. Ideas welcome.</p>
              </div>
              <button onClick={onClose} className="mt-1 text-xl leading-none text-white/40 hover:text-white">&#10005;</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {fields.map(({ key, label, placeholder, type }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: "#FFCD00" }}>{label}</label>
                  <input
                    type={type ?? "text"}
                    style={inputStyle}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "#FFCD00" }}>Your Idea</label>
                <textarea rows={3} style={{ ...inputStyle, resize: "none" }}
                  placeholder="What problem does it solve? What could it look like?"
                  value={form.idea} onChange={(e) => setForm((f) => ({ ...f, idea: e.target.value }))} />
              </div>
              <button type="submit"
                className="mt-2 w-full rounded-full py-3 text-sm font-bold transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "#FFCD00", color: "#002855", boxShadow: "0 4px 20px rgba(255,205,0,0.35)" }}>
                Submit Idea &rarr;
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}

function FooterCTA() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <footer id="connect" className="relative overflow-hidden" style={{ minHeight: 240 }}>
        <div className="absolute inset-0 bg-[url('/footer-bg.png')] bg-cover bg-center" />
        <div className="absolute inset-0" style={{ background: "rgba(10,20,28,0.75)" }} />

        <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-8 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#F8D56A" }}>
            Sun Life Innovation Hub
          </p>
          <h2 className="text-5xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            Don&apos;t wait.<br />
            <span style={{ color: "#FFCD00" }}>Innovate.</span>
          </h2>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
            Got a breakthrough idea? We prototype fast — bring it to us.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{ background: "#FFCD00", color: "#002855", boxShadow: "0 8px 32px rgba(255,205,0,0.35)" }}
          >
            Submit Your Idea &rarr;
          </button>
        </div>

        <div className="relative z-10 border-t px-8 py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
            <div className="flex items-center">
              <Image src="/sunlife_logo.png" alt="Sun Life" width={120} height={34} className="h-8 w-auto brightness-0 invert" />
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Built by the Innovation Lab &middot; May 2026</p>
            <div className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>
              v1.1.0
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {open && <IdeaModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
