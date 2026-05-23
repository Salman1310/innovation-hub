"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowUpRight, BarChart3, Filter, RadioTower } from "lucide-react"
import { AnimatedHero } from "@/components/ui/animated-hero"
import { AntigravityField } from "@/components/AntigravityField"
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
  FUN_FACTS
} from "@/lib/data"
import type { MarketKey } from "@/lib/data"


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

function ImpactBars() {
  const max = Math.max(...BUSINESS_IMPACT.map((item) => item.value))

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Business impact</p>
          <h3 className="text-lg font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
            POCs by market and unit
          </h3>
        </div>
        <BarChart3 className="h-5 w-5 text-[#ECAB23]" />
      </div>
      <div className="space-y-4">
        {BUSINESS_IMPACT.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-[#5B6770]">
              <span>{item.label}</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{item.value}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#FFF7E3]">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / max) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                style={{ background: "linear-gradient(90deg, #ECAB23, #F8D56A)" }}
              />
            </div>
          </div>
        ))}
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
  const markets: MarketKey[] = ["All", "Asia", "Canada", "SLGS", "US", "Other"]
  const filteredPocs = useMemo(
    () => (activeMarket === "All" ? POCS : POCS.filter((poc) => poc.market === activeMarket)),
    [activeMarket],
  )

  return (
    <div className="mb-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">
            <Filter className="h-3.5 w-3.5" />
            By market
          </p>
          <h3 className="text-2xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
            Innovation Portfolio
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {markets.map((market) => (
            <button
              key={market}
              type="button"
              onClick={() => setActiveMarket(market)}
              className="cursor-pointer rounded-full border px-4 py-2 text-xs font-bold transition-all"
              style={{
                background: activeMarket === market ? "#ECAB23" : "rgba(255,255,255,0.72)",
                borderColor: activeMarket === market ? "#ECAB23" : "rgba(236,171,35,0.18)",
                color: activeMarket === market ? "#fff" : "#5B6770",
              }}
            >
              {market}
            </button>
          ))}
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

export default function Home() {
  return (
    <main className="grain bg-aurora min-h-screen overflow-x-hidden">
      <nav className="flex items-center justify-between border-b border-[rgba(236,171,35,0.18)] px-8 py-4" style={{ background: "#FFF8EC" }}>
        <div className="flex items-center">
          <Image src="/sunlife_logo.png" alt="Sun Life" width={200} height={56} className="h-14 w-auto" priority />
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#5B6770] md:flex">
          {[
            { label: "Dashboard", href: "#dashboard" },
            { label: "Our Story", href: "/story" },
            { label: "News Feed", href: "/feed" },
            { label: "Connect", href: "#connect" },
          ].map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-[#ECAB23]">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="transition-colors hover:text-[#ECAB23]">
                {item.label}
              </a>
            ),
          )}
        </div>

      </nav>

      <section className="relative min-h-screen pb-12 pt-12">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="container relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-2">
            <AnimatedHero />
            <div className="hidden lg:block">
              <AntigravityField />
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
              Our Key <span className="gradient-text">Focus Areas</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Operational Efficiency", desc: "Aids in reducing/transforming the operational tasks for our ops teams", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80" },
              { title: "Client/Advisor Experience", desc: "Improve clients and advisor experience across all touchpoints", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&auto=format&fit=crop&q=80" },
              { title: "Tech Modernization", desc: "Upgrade from legacy systems to use modern technology", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80" },
              { title: "Sales & Distribution", desc: "Leverage technology for better outreach, sales and overall distribution", img: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&auto=format&fit=crop&q=80" },
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
            <ImpactBars />
            <div className="glass-card p-6">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Growth</p>
                  <h3 className="text-xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                    Cumulative Active POCs
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0E5665]/10 px-3 py-1 text-xs font-bold text-[#0E5665]">
                  <RadioTower className="h-3.5 w-3.5" />
                  2025 portfolio peak
                </div>
              </div>
              <div className="relative h-52 pb-6">
                <svg viewBox="0 0 600 200" className="h-full w-full" preserveAspectRatio="none" style={{ marginBottom: "24px" }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ECAB23" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ECAB23" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,195 L85,191 L170,178 L255,148 L340,130 L425,125 L510,120 L600,120 L600,200 L0,200 Z"
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                  <motion.path
                    d="M0,195 L85,191 L170,178 L255,148 L340,130 L425,125 L510,120 L600,120"
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
                  {[
                    { x: 0, y: 195, val: "2" },
                    { x: 85, y: 191, val: "4" },
                    { x: 170, y: 178, val: "9" },
                    { x: 255, y: 148, val: "19" },
                    { x: 340, y: 130, val: "22" },
                    { x: 425, y: 125, val: "24" },
                    { x: 510, y: 120, val: "26" },
                  ].map((pt, i) => (
                    <motion.circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="5"
                      fill="#ECAB23"
                      stroke="#FFF"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.3 }}
                    />
                  ))}
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] font-medium text-[#5B6770]" style={{ fontFamily: "var(--font-mono)" }}>
                  {["2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((y) => (
                    <span key={y}>{y}</span>
                  ))}
                </div>
                <div className="absolute top-0 right-2 rounded-full bg-[#FFF7E3] px-3 py-1 text-xs font-bold text-[#ECAB23]" style={{ fontFamily: "var(--font-mono)" }}>
                  26 active POCs
                </div>
              </div>
            </div>
          </div>

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

      <section
        className="overflow-hidden py-6"
        style={{
          background: "linear-gradient(135deg, #1F2A2E 0%, #0E3846 50%, #1F2A2E 100%)",
        }}
      >
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, repeat) =>
            [
              "49 active POCs",
              "12 in production",
              "6 prototypes moving",
              "8 markets active",
              "16 Gen AI entries",
              "3 scaling to production",
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
          <p className="max-w-md text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
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
