"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { Activity, ArrowUpRight, BarChart3, CircleDot, Filter, RadioTower, Sparkles } from "lucide-react"
import { AnimatedHero } from "@/components/ui/animated-hero"
import { AntigravityField } from "@/components/AntigravityField"
import { TeamCarousel } from "@/components/ui/testimonial"
import type { TeamMember } from "@/components/ui/testimonial"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import { ButtonColorful } from "@/components/ui/button-colorful"
import { DidYouKnow } from "@/components/ui/did-you-know"

type FilterKey = "All" | "AI-ML" | "Web3" | "Data" | "Infra"

type PocCard = {
  name: string
  desc: string
  status: string
  statusColor: string
  unit: string
  tech: string[]
  impact: string
  category: Exclude<FilterKey, "All">
  featured?: boolean
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Sachin Mathur",
    role: "Innovation Team Leader",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    description:
      "Guiding the Innovation Hub vision and helping the team turn promising ideas into practical enterprise impact.",
  },
  {
    id: 2,
    name: "Prashant Agarwal",
    role: "Principal Solution Designer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description:
      "Designing solution paths that connect business problems, emerging technology, and scalable delivery patterns.",
  },
  {
    id: 3,
    name: "Shelza Jindal",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    description:
      "Leading high-impact Gen AI and automation POCs from intake through production readiness.",
  },
  {
    id: 4,
    name: "Karthik Ramadurai",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&h=150&fit=crop&crop=face",
    description:
      "Scaling AI, analytics, and workflow modernization concepts across multiple markets.",
  },
  {
    id: 5,
    name: "Chandan Singh",
    role: "Innovation Hub Owner",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    description:
      "Supporting emerging technology experiments and cross-functional delivery momentum.",
  },
]

const METRICS = [
  { value: 80, label: "Total POCs", suffix: "", color: "#6c5ce7" },
  { value: 12, label: "In Production", suffix: "", color: "#00cec9" },
  { value: 6, label: "Prototyping", suffix: "", color: "#a29bfe" },
  { value: 8, label: "Markets", suffix: "", color: "#fd79a8" },
  { value: 5, label: "Core Leaders", suffix: "", color: "#fdcb6e" },
  { value: 8, label: "Tech Streams", suffix: "+", color: "#00cec9" },
]

const STATUS_BREAKDOWN = [
  { label: "Live", value: 12, color: "#00cec9" },
  { label: "In Review", value: 4, color: "#fdcb6e" },
  { label: "Building", value: 7, color: "#a29bfe" },
  { label: "Completed", value: 26, color: "#6c5ce7" },
]

const BUSINESS_IMPACT = [
  { label: "Asia", value: 29, color: "#6c5ce7" },
  { label: "Canada / CAN", value: 15, color: "#00cec9" },
  { label: "SLGS", value: 13, color: "#fd79a8" },
  { label: "US Ops", value: 4, color: "#fdcb6e" },
  { label: "Other Markets", value: 19, color: "#a29bfe" },
]

const ACTIVITY_HEATMAP = [
  { label: "2021", values: [3, 1, 0, 0] },
  { label: "2022", values: [6, 1, 0, 2] },
  { label: "2023", values: [8, 2, 0, 1] },
  { label: "2024", values: [10, 9, 2, 0] },
  { label: "2025", values: [4, 5, 0, 0] },
  { label: "2026", values: [0, 1, 0, 0] },
]

const POCS: PocCard[] = [
  {
    name: "Audio Analytics - Pinnacle Care",
    desc: "AI-powered call analytics for advisor coaching and contact-center quality assurance.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "US Pinnacle Care",
    tech: ["AI/ML", "NLP", "Python"],
    impact: "Live in production",
    category: "AI-ML",
    featured: true,
  },
  {
    name: "E-KYC with Onfido",
    desc: "Electronic customer verification with automated identity document processing.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Singapore",
    tech: ["Computer Vision", "AI/ML"],
    impact: "Faster onboarding",
    category: "AI-ML",
  },
  {
    name: "CSR Automation",
    desc: "Automates customer service request handling to reduce repetitive manual work.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Gen AI", "Python"],
    impact: "60% less manual work",
    category: "AI-ML",
  },
  {
    name: "Fastrack Business Insights",
    desc: "Data virtualization layer unifying siloed sources for faster business intelligence.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Denodo", "Data", "Python"],
    impact: "Real-time BI",
    category: "Data",
  },
  {
    name: "Asset Tokenization",
    desc: "Blockchain experiment for asset tokenization and new business model exploration.",
    status: "Completed",
    statusColor: "#6c5ce7",
    unit: "CAN",
    tech: ["Blockchain", "Web3"],
    impact: "New model validated",
    category: "Web3",
  },
  {
    name: "Knowledge Management Q&A",
    desc: "Gen AI search over internal documents to speed up knowledge discovery.",
    status: "Bookshelf",
    statusColor: "#a29bfe",
    unit: "CAN",
    tech: ["Gen AI", "RAG"],
    impact: "Productivity lift",
    category: "AI-ML",
  },
  {
    name: "Sun Canvas",
    desc: "Solar energy planning and visualization tool for sustainable infrastructure projects.",
    status: "Production",
    statusColor: "#00cec9",
    unit: "Asia",
    tech: ["Computer Vision", "Python"],
    impact: "Green planning",
    category: "Data",
  },
  {
    name: "Low Code Data API Platform",
    desc: "Reusable platform for exposing governed data APIs across teams.",
    status: "Bookshelf",
    statusColor: "#a29bfe",
    unit: "Asia",
    tech: ["API", "Platform"],
    impact: "Reusable infra",
    category: "Infra",
  },
  {
    name: "Agentic AI Evaluation",
    desc: "Exploration of autonomous workflow agents for complex operational tasks.",
    status: "Prototyping",
    statusColor: "#fdcb6e",
    unit: "SLGS",
    tech: ["Agentic AI", "Automation"],
    impact: "Next-gen workflow",
    category: "AI-ML",
  },
]

const TREND_BADGES = [
  { label: "Portfolio scaled from a 2020 team foundation", value: "up", tone: "#00cec9" },
  { label: "15 active production-scale signals", value: "live", tone: "#6c5ce7" },
  { label: "Gen AI leads the portfolio", value: "27", tone: "#fd79a8" },
]

const TICKER_ITEMS = [
  "Live pulse: 12 POCs in production",
  "Pipeline: 6 prototypes currently shaping up",
  "Portfolio: 80 POCs tracked across the innovation pipeline",
  "Leadership: Sachin Mathur and Prashant Agarwal shaping the innovation path",
]

const FUN_FACTS = [
  { text: "27 out of 80 POCs in our portfolio use Gen AI — making it the single biggest tech stream in Innovation Hub.", highlight: "Gen AI = #1 stream" },
  { text: "Audio Analytics for Pinnacle Care went from idea to production in under 12 weeks, now live across US contact centres.", highlight: "12-week sprint" },
  { text: "Our POCs span 8 markets — Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS.", highlight: "8 markets reached" },
  { text: "29 POCs were explored and dropped — that's how we learn fast. Only the best ideas survive to production.", highlight: "29 smart failures" },
  { text: "Asset Tokenization was our first Blockchain POC — validating new business models for the Canada market.", highlight: "Web3 experiment" },
  { text: "Shelza Jindal, Karthik Ramadurai, and Chandan Singh together own the majority of the active portfolio.", highlight: "3 IH owners" },
  { text: "E-KYC with Onfido reduced customer onboarding time by automating identity document verification in Singapore.", highlight: "Faster KYC" },
  { text: "The Innovation Hub team started in 2020 — from a small experiment to 80 POCs tracked in 6 years.", highlight: "6 years of innovation" },
]

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

function DonutChart() {
  const total = STATUS_BREAKDOWN.reduce((sum, item) => sum + item.value, 0)
  const circumference = 2 * Math.PI * 42
  const segments = STATUS_BREAKDOWN.reduce<Array<(typeof STATUS_BREAKDOWN)[number] & { dash: string; offset: number }>>(
    (acc, item) => {
      const previousLength = acc.reduce((sum, segment) => {
        const [segmentLength] = segment.dash.split(" ").map(Number)
        return sum + segmentLength
      }, 0)
      const length = (item.value / total) * circumference
      return [
        ...acc,
        {
          ...item,
          dash: `${length} ${circumference - length}`,
          offset: -previousLength,
        },
      ]
    },
    [],
  )

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c5ce7]">Status mix</p>
          <h3 className="text-lg font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
            POC status breakdown
          </h3>
        </div>
        <CircleDot className="h-5 w-5 text-[#6c5ce7]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
        <svg viewBox="0 0 100 100" className="mx-auto h-40 w-40 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(108,92,231,0.10)" strokeWidth="12" />
          {segments.map((item) => {
            return (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={item.dash}
                strokeDashoffset={item.offset}
                strokeLinecap="round"
              />
            )
          })}
        </svg>
        <div className="space-y-3">
          {STATUS_BREAKDOWN.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                <span className="font-medium text-[#555580]">{item.label}</span>
              </div>
              <span className="font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-mono)" }}>
                {item.value}
              </span>
            </div>
          ))}
          <p className="pt-2 text-xs leading-relaxed text-[#8888aa]">
            Breakdown excludes explored-and-dropped items so the chart focuses on live, reviewed, building, and completed work.
          </p>
        </div>
      </div>
    </div>
  )
}

function ImpactBars() {
  const max = Math.max(...BUSINESS_IMPACT.map((item) => item.value))

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c5ce7]">Business impact</p>
          <h3 className="text-lg font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
            POCs by market and unit
          </h3>
        </div>
        <BarChart3 className="h-5 w-5 text-[#6c5ce7]" />
      </div>
      <div className="space-y-4">
        {BUSINESS_IMPACT.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-[#555580]">
              <span>{item.label}</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{item.value}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#f0effe]">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / max) * 100}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ background: `linear-gradient(90deg, ${item.color}, #a29bfe)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityHeatmap() {
  const max = Math.max(...ACTIVITY_HEATMAP.flatMap((row) => row.values))
  const quarters = ["Q1", "Q2", "Q3", "Q4"]

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c5ce7]">Activity timeline</p>
          <h3 className="text-lg font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
            Monthly-style POC activity
          </h3>
        </div>
        <Activity className="h-5 w-5 text-[#6c5ce7]" />
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-[64px_repeat(4,minmax(0,1fr))] gap-2 text-xs font-semibold text-[#8888aa]">
          <span />
          {quarters.map((quarter) => (
            <span key={quarter} className="text-center">
              {quarter}
            </span>
          ))}
        </div>
        {ACTIVITY_HEATMAP.map((row) => (
          <div key={row.label} className="grid grid-cols-[64px_repeat(4,minmax(0,1fr))] gap-2">
            <span className="self-center text-xs font-bold text-[#555580]" style={{ fontFamily: "var(--font-mono)" }}>
              {row.label}
            </span>
            {row.values.map((value, index) => {
              const opacity = value === 0 ? 0.08 : 0.2 + (value / max) * 0.8
              return (
                <div
                  key={`${row.label}-${quarters[index]}`}
                  title={`${row.label} ${quarters[index]}: ${value} POCs`}
                  className="h-10 rounded-lg border border-[#6c5ce7]/10"
                  style={{ background: `rgba(108, 92, 231, ${opacity})` }}
                />
              )
            })}
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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00cec9] opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00cec9]" />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={TICKER_ITEMS[index]}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold text-[#1a1a2e]"
          >
            {TICKER_ITEMS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <span className="text-xs text-[#8888aa]" style={{ fontFamily: "var(--font-mono)" }}>
        live portfolio pulse
      </span>
    </div>
  )
}

function PocGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All")
  const filters: FilterKey[] = ["All", "AI-ML", "Web3", "Data", "Infra"]
  const filteredPocs = useMemo(
    () => (activeFilter === "All" ? POCS : POCS.filter((poc) => poc.category === activeFilter)),
    [activeFilter],
  )

  return (
    <div className="mb-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6c5ce7]">
            <Filter className="h-3.5 w-3.5" />
            Filterable gallery
          </p>
          <h3 className="text-2xl font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
            Recent POCs from the portfolio
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className="cursor-pointer rounded-full border px-4 py-2 text-xs font-bold transition-all"
              style={{
                background: activeFilter === filter ? "#6c5ce7" : "rgba(255,255,255,0.72)",
                borderColor: activeFilter === filter ? "#6c5ce7" : "rgba(108,92,231,0.18)",
                color: activeFilter === filter ? "#fff" : "#555580",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredPocs.map((poc) => (
            <motion.article
              layout
              key={poc.name}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`glass-card group cursor-pointer p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(108,92,231,0.18)] ${
                poc.featured ? "md:col-span-2" : ""
              }`}
            >
              {poc.featured && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a1a2e] px-3 py-1 text-xs font-bold text-white">
                  <Sparkles className="h-3.5 w-3.5 text-[#fdcb6e]" />
                  Featured POC
                </div>
              )}
              <div className="mb-3 flex items-start justify-between gap-4">
                <h4 className="text-base font-bold text-[#1a1a2e] transition-colors group-hover:text-[#6c5ce7]">
                  {poc.name}
                </h4>
                <span
                  className="whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold"
                  style={{
                    color: poc.statusColor,
                    background: `${poc.statusColor}18`,
                  }}
                >
                  {poc.status}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-[#555580]">{poc.desc}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {poc.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#f0effe] px-2 py-0.5 text-[10px] font-medium text-[#6c5ce7]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-[#555580]">{poc.unit}</span>
                <span className="font-semibold text-[#6c5ce7]">{poc.impact}</span>
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
      <nav className="glass-card fixed left-0 right-0 top-0 z-50 flex items-center justify-between rounded-none border-x-0 border-t-0 px-8 py-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #6c5ce7, #00cec9)" }}
          >
            IH
          </div>
          <span className="text-lg font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
            Innovation Hub
          </span>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#555580] md:flex">
          {[
            { label: "Team", href: "#team" },
            { label: "Dashboard", href: "#dashboard" },
            { label: "Our Story", href: "/story" },
          ].map((item) =>
            item.href.startsWith("/") ? (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-[#6c5ce7]">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="transition-colors hover:text-[#6c5ce7]">
                {item.label}
              </a>
            ),
          )}
        </div>

        <ButtonColorful
          label="Launch Dashboard"
          className="hidden md:inline-flex"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        />
      </nav>

      <section className="relative min-h-screen pb-12 pt-24">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="container relative z-10 mx-auto max-w-7xl px-8">
          <div className="grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-2">
            <AnimatedHero />
            <div className="hidden lg:block">
              <AntigravityField />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#555580]">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#6c5ce7]/50 to-transparent" />
        </div>
      </section>

      <section id="team" className="px-8 py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{
                background: "linear-gradient(135deg, #f0effe, #e8f8f8)",
                color: "#6c5ce7",
                border: "1px solid rgba(108,92,231,0.15)",
              }}
            >
              Innovation Is For Everyone
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#1a1a2e] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Your Idea Could Be <span className="gradient-text">Next</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#555580]">
              Innovation isn&apos;t reserved for a special team — it starts with you. Got a bold idea that could change how we work? We&apos;ll help you build it.
            </p>
          </div>

          <div className="flex justify-center">
            <TeamCarousel members={TEAM_MEMBERS} className="max-w-sm" />
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
                background: "linear-gradient(135deg, #f0effe, #e8f8f8)",
                color: "#6c5ce7",
                border: "1px solid rgba(108,92,231,0.15)",
              }}
            >
              The Numbers
            </div>
            <h2 className="mb-4 text-4xl font-bold text-[#1a1a2e] md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Impact <span className="gradient-text">Dashboard</span>
            </h2>
            <p className="mx-auto max-w-xl text-[#555580]">
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
                  <p className="text-sm font-semibold text-[#1a1a2e]">{badge.label}</p>
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
                <div className="text-xs font-medium text-[#555580]">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Aurora-tinted dashboard content area */}
          <div className="relative -mx-8 px-8 py-12 overflow-hidden rounded-3xl">
            {/* Aurora background layers */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  background: `
                    radial-gradient(ellipse 90% 60% at 15% 10%, rgba(108,92,231,0.4) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 50% at 85% 25%, rgba(0,206,201,0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 80% 60% at 50% 95%, rgba(162,155,254,0.25) 0%, transparent 55%)
                  `,
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.07] animate-aurora"
                style={{
                  backgroundImage: `repeating-linear-gradient(100deg, rgba(59,130,246,0.18) 10%, rgba(165,180,252,0.12) 15%, rgba(125,211,252,0.1) 20%, rgba(221,214,254,0.12) 25%, rgba(56,189,248,0.1) 30%)`,
                  backgroundSize: "300% 200%",
                }}
              />
            </div>

            <div className="relative z-10">
              <PocGallery />

              <div className="mb-12 grid gap-6 lg:grid-cols-3">
                <DonutChart />
                <ImpactBars />
                <ActivityHeatmap />
              </div>
            </div>
          </div>

          <div className="glass-card mt-12 p-8">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6c5ce7]">Trend line</p>
                <h3 className="text-xl font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
                  POCs Delivered - Year over Year
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00cec9]/10 px-3 py-1 text-xs font-bold text-[#008f8b]">
                <RadioTower className="h-3.5 w-3.5" />
                2025 portfolio peak
              </div>
            </div>
            <div className="flex h-48 items-end gap-6">
              {[
                { year: "2023", count: 18, pct: 23 },
                { year: "2024", count: 38, pct: 49 },
                { year: "2025", count: 80, pct: 100 },
                { year: "2026", count: 14, pct: 18, label: "YTD" },
              ].map((bar) => (
                <div key={bar.year} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-sm font-bold text-[#6c5ce7]" style={{ fontFamily: "var(--font-mono)" }}>
                    {bar.count}
                  </span>
                  <motion.div
                    className="w-full rounded-t-lg"
                    initial={{ height: 20 }}
                    whileInView={{ height: `${bar.pct}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      background: "linear-gradient(180deg, #6c5ce7 0%, #a29bfe 100%)",
                      minHeight: 20,
                    }}
                  />
                  <span className="text-xs font-medium text-[#555580]">
                    {bar.year}
                    {bar.label ? ` ${bar.label}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </ScrollExpandMedia>
      </section>

      <section
        className="overflow-hidden py-6"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%)",
        }}
      >
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, repeat) =>
            [
              "80 POCs tracked",
              "12 in production",
              "6 prototypes moving",
              "8 markets active",
              "27 Gen AI entries",
              "5 core leaders",
            ].map((item, i) => (
              <span
                key={`${repeat}-${i}`}
                className="inline-flex items-center gap-3 text-sm font-medium text-white/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: i % 2 === 0 ? "#6c5ce7" : "#00cec9" }} />
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      <DidYouKnow facts={FUN_FACTS} interval={6000} />

      <footer className="border-t border-[#6c5ce7]/10 px-8 py-16">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6c5ce7, #00cec9)" }}
            >
              IH
            </div>
            <span className="font-bold text-[#1a1a2e]" style={{ fontFamily: "var(--font-display)" }}>
              Innovation Hub
            </span>
          </div>

          <p className="text-sm text-[#555580]">Built by the Innovation Lab - portfolio view, May 2026</p>

          <div className="rounded-full bg-[#f0effe] px-3 py-1 text-xs font-medium text-[#6c5ce7]" style={{ fontFamily: "var(--font-mono)" }}>
            v1.1.0
          </div>
        </div>
      </footer>
    </main>
  )
}
