"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { Spotlight } from "@/components/ui/spotlight"
import {
  Lightbulb,
  Rocket,
  Users,
  Globe,
  Mic2,
  Trophy,
  Sparkles,
  Calendar,
  MessageCircle,
  Presentation,
  FlaskConical,
  PartyPopper,
  Play,
  ArrowRight,
} from "lucide-react"

const STATS = [
  { label: "Participants", value: "1000+" },
  { label: "Countries", value: "7" },
  { label: "Startups Showcased", value: "15+" },
  { label: "Years Running", value: "4" },
]

const HERO_SIGNAL_STRIP = [
  "Founder demos",
  "Experience Center",
  "Pitch day",
  "Expert sessions",
  "Recognition",
  "Innovation Summit",
  "Cross-market energy",
  "Startup exposure",
]

const PURPOSES = [
  {
    icon: Lightbulb,
    title: "Intrapreneurship",
    text: "Give every employee the platform to think like a founder - pitch ideas, prototype solutions, and see them through.",
    color: "#ECAB23",
  },
  {
    icon: Globe,
    title: "Startup Exposure",
    text: "Bring the energy of the startup world inside Sun Life. Real founders, real demos, real conversations about what comes next.",
    color: "#0E5665",
  },
  {
    icon: MessageCircle,
    title: "Cross-Team Collaboration",
    text: "Break silos. Innovation Month brings together engineers, business teams, and leaders from 7 countries to solve shared problems.",
    color: "#E85D75",
  },
]

const CULTURE_ORBIT_ITEMS = [
  {
    title: "Ideation Challenge",
    subtitle: "Pitch and prototype",
    icon: Lightbulb,
    color: "#ECAB23",
    left: "14%",
    top: "16%",
    connectorLength: 188,
    connectorAngle: -138,
  },
  {
    title: "Art of Possible",
    subtitle: "Live startup demos",
    icon: Rocket,
    color: "#0E5665",
    left: "85%",
    top: "17%",
    connectorLength: 192,
    connectorAngle: -42,
  },
  {
    title: "Recognition",
    subtitle: "Celebrate the builders",
    icon: Trophy,
    color: "#4ECDC4",
    left: "8%",
    top: "49%",
    connectorLength: 182,
    connectorAngle: 180,
  },
  {
    title: "Fireside Chats",
    subtitle: "Leaders in conversation",
    icon: Mic2,
    color: "#E85D75",
    left: "91%",
    top: "55%",
    connectorLength: 184,
    connectorAngle: 8,
  },
  {
    title: "Life as a Startup",
    subtitle: "Founders tell the real story",
    icon: FlaskConical,
    color: "#A29BFE",
    left: "15%",
    top: "79%",
    connectorLength: 184,
    connectorAngle: 136,
  },
  {
    title: "Meet the Expert",
    subtitle: "Specialist insights",
    icon: Users,
    color: "#F8D56A",
    left: "84%",
    top: "81%",
    connectorLength: 188,
    connectorAngle: 48,
  },
]

const PROGRAMS = [
  {
    icon: Lightbulb,
    title: "Ideation Challenge",
    eyebrow: "Employee-led ideas",
    description: "Company-wide idea submission on curated business problems. Judged by panels, mentored finalists compete in a grand finale with prizes.",
    signals: ["Problem statements", "Mentored finalists", "Grand pitch day"],
    color: "#ECAB23",
    layout: "lg:col-span-2",
  },
  {
    icon: Rocket,
    title: "Art of Possible",
    eyebrow: "Founder demos",
    description: "Startup founders demo cutting-edge technologies — AI, blockchain, health-tech — that could be adopted across Sun Life.",
    signals: ["Live product demos", "Q&A with founders", "Adoption scouting"],
    color: "#0E5665",
    layout: "lg:col-span-2",
  },
  {
    icon: Mic2,
    title: "Fireside Chats",
    eyebrow: "Leadership conversations",
    description: "Industry leaders and Sun Life executives in open conversation on AI/ML, innovation strategy, and emerging trends.",
    signals: ["Open dialogue", "Trend signals", "Real operator stories"],
    color: "#E85D75",
    layout: "",
  },
  {
    icon: Presentation,
    title: "Panel Discussions",
    eyebrow: "Cross-market perspective",
    description: "Cross-market leadership panels exploring how innovation shapes insurance — from ChatGPT to predictive AI.",
    signals: ["Regional voices", "Insurance future", "Practical debate"],
    color: "#4ECDC4",
    layout: "",
  },
  {
    icon: FlaskConical,
    title: "Life as a Startup",
    eyebrow: "Founder journey",
    description: "Startup founders share their journeys — the wins, the pivots, and what it takes to build from zero.",
    signals: ["Founder truth", "Pivots and lessons", "Entrepreneurial mindset"],
    color: "#A29BFE",
    layout: "",
  },
  {
    icon: Users,
    title: "Meet the Expert",
    eyebrow: "Specialist sessions",
    description: "Domain experts share deep insights on AI/ML, asset management, and how they're reshaping the industry.",
    signals: ["Deep expertise", "Insurance relevance", "Applied AI"],
    color: "#F8D56A",
    layout: "",
  },
  {
    icon: Sparkles,
    title: "Experience Center",
    eyebrow: "Hands-on exploration",
    description: "Hands-on innovation — VR demos, Gen AI booths, DIY workshops, and interactive POC showcases.",
    signals: ["VR + Gen AI booths", "DIY workshops", "Interactive showcases"],
    color: "#0E5665",
    layout: "lg:col-span-2",
  },
]

const TIMELINE_EVENTS = [
  {
    phase: "Week 1",
    title: "Launch & Ideation Kickoff",
    description: "Innovation Month opens with the challenge launch, teaser content, leadership energy, and a clear invitation to participate.",
    icon: Lightbulb,
    color: "#ECAB23",
    moments: ["Teaser films", "Leadership kickoff", "Problem statements"],
  },
  {
    phase: "Week 2",
    title: "Showcase & Explore",
    description: "Startup demos, Art of Possible sessions, and hands-on activations make emerging technology feel tangible.",
    icon: Rocket,
    color: "#0E5665",
    moments: ["Founder demos", "Experience Center", "Emerging tech booths"],
  },
  {
    phase: "Week 3",
    title: "Learn & Discuss",
    description: "Fireside chats, expert talks, and panel discussions expand the conversation from inspiration to practical insight.",
    icon: Mic2,
    color: "#E85D75",
    moments: ["Masterclasses", "Fireside chats", "Cross-market panels"],
  },
  {
    phase: "Week 4",
    title: "Pitch & Celebrate",
    description: "The month builds into a visible finish line: jury moments, final pitches, ceremony, and Innovation Summit recognition.",
    icon: PartyPopper,
    color: "#4ECDC4",
    moments: ["Final pitches", "Jury day", "Felicitation ceremony"],
  },
]

const YEARLY_EVOLUTION = [
  {
    year: "2021",
    title: "The Foundation",
    color: "#ECAB23",
    highlights: ["First Ideation Challenge launched", "Art of Possible with 4 startups", "Fireside chats with Yatra.com founder", "Ideate with Leaders sessions"],
  },
  {
    year: "2022",
    title: "Startup Week",
    color: "#0E5665",
    highlights: ["Dedicated Startup Week format introduced", "Panel discussions on OpenAI/ChatGPT", "Cross-market leadership engagement", "Innovation Masterclass added"],
  },
  {
    year: "2023",
    title: "Full Month, Full Scale",
    color: "#E85D75",
    highlights: ["Month-long programming structure", "1000+ participants across 7 countries", "Experience Center with VR & Gen AI", "Closing ceremony with Sun Life CEO"],
  },
  {
    year: "2024",
    title: "Innovation Summit",
    color: "#4ECDC4",
    highlights: ["Elevated to Innovation Summit format", "Formal felicitation ceremony with Tarun Sareen keynote", "Recognition across GitHub CoPilot Hackathon, TechCoFest, and SunVibe", "India and Philippines champions celebrated"],
  },
]

const RECOGNITION_ITEMS = [
  {
    category: "Hackathons",
    description: "The culture page should make technical builders visible - from sprint energy to final-stage applause.",
    color: "#ECAB23",
    examples: ["TechCoFest 2024", "GitHub CoPilot Hackathon", "SunVibe - Geeky Coder Challenge"],
  },
  {
    category: "Ideation Challenge",
    description: "Recognition validates that ideas matter - not just polished code, but bold thinking and business relevance too.",
    color: "#0E5665",
    examples: ["People's Choice Award", "Grand Finale Winners", "Best Cross-Functional Idea"],
  },
  {
    category: "Innovation Summit",
    description: "The summit turns individual wins into a shared culture signal for the whole organization.",
    color: "#E85D75",
    examples: ["InnerSource Code Catalysts", "SunVibe - Unleash SLM Power", "Innovation Champion Network"],
  },
]

const IMPACT_HIGHLIGHTS = [
  { icon: Users, stat: "1000+", label: "Employees participated across sessions", color: "#ECAB23" },
  { icon: Globe, stat: "7", label: "Countries represented in panels and challenges", color: "#0E5665" },
  { icon: Rocket, stat: "15+", label: "Startups showcased cutting-edge tech", color: "#E85D75" },
  { icon: Mic2, stat: "20+", label: "Expert speakers and industry leaders", color: "#4ECDC4" },
  { icon: Lightbulb, stat: "50+", label: "Ideas submitted per Ideation Challenge", color: "#A29BFE" },
  { icon: Calendar, stat: "4", label: "Years of continuous innovation programming", color: "#F8D56A" },
]

const SUMMIT_2024_SIGNAL_STRIP = [
  "Innovation Summit Felicitation Ceremony",
  "Keynote by Tarun Sareen",
  "Day-2 award ceremony",
  "India + Philippines champions",
]

const SUMMIT_2024_SPOTLIGHTS = [
  {
    icon: Presentation,
    title: "Leadership stage",
    text: "The 2024 archive opens with a formal Innovation Summit and Felicitation Ceremony, anchored by keynote remarks from Tarun Sareen, Managing Director, Sun Life Global Solutions.",
    color: "#0E5665",
  },
  {
    icon: Trophy,
    title: "Recognition widened",
    text: "The summit celebrated hackathons, innovation challenges, idea-volume champions, and savings-impact contributors instead of limiting the spotlight to a single winner lane.",
    color: "#ECAB23",
  },
  {
    icon: Globe,
    title: "Cross-market visibility",
    text: "The ceremony surfaces champion groups from both India and the Philippines, making the 2024 edition feel like a broader SLGS moment rather than a single-site event.",
    color: "#E85D75",
  },
]

const SUMMIT_2024_RECOGNITION_LANES = [
  {
    title: "GitHub CoPilot Hackathon",
    detail: "Recognition included teams such as Code Catalysts 1 and InnerSource.",
    color: "#ECAB23",
  },
  {
    title: "TechCoFest 2024",
    detail: "TechCoFest winners were highlighted as a major summit celebration lane, including teams like Kafka Nights.",
    color: "#4ECDC4",
  },
  {
    title: "SunVibe Challenges",
    detail: "Multiple SunVibe tracks were recognized, including Unleash the Power of your SLM, Geeky Coder Challenge, and SunAngel.",
    color: "#0E5665",
  },
  {
    title: "Broader champion awards",
    detail: "US IT - Tech X, Elevate Cloud Tech Hackathon, Operations Innovation Challenge, idea champions, and savings-impact champions all appeared in the ceremony.",
    color: "#A29BFE",
  },
]

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ECAB23]">{label}</p>
      <h2 className="text-3xl font-bold text-[#1F2A2E] md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5B6770] md:text-base">{description}</p> : null}
    </div>
  )
}

function OrbitFeatureCard({
  item,
  index,
  reduceMotion,
  className = "",
}: {
  item: (typeof CULTURE_ORBIT_ITEMS)[number]
  index: number
  reduceMotion: boolean
  className?: string
}) {
  const verticalDrift = index % 2 === 0 ? -7 : 7
  const horizontalDrift = index % 2 === 0 ? 2.5 : -2.5
  const rotationDrift = index % 2 === 0 ? -0.65 : 0.65

  return (
    <motion.div
      className={`relative z-[6] w-full min-w-0 max-w-[164px] transform-gpu overflow-hidden rounded-[22px] border border-white/70 bg-white/88 p-3 shadow-[0_18px_40px_rgba(14,56,70,0.12)] backdrop-blur-xl ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, verticalDrift * 0.45, verticalDrift, verticalDrift * 0.45, 0],
              x: [0, horizontalDrift, 0, -horizontalDrift, 0],
              rotate: [0, rotationDrift, 0, -rotationDrift, 0],
              scale: [1, 1.008, 1.014, 1.008, 1],
            }
      }
      transition={{ duration: 10 + index * 0.65, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.025, y: -2, transition: { type: "spring", stiffness: 220, damping: 20 } }}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.color}18` }}>
          <item.icon className="h-4 w-4" style={{ color: item.color }} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F2A2E]">{item.title}</p>
          <p className="text-[11px] leading-tight text-[#5B6770]">{item.subtitle}</p>
        </div>
      </div>
    </motion.div>
  )
}

function OrbitCenterCard({ reduceMotion, className = "" }: { reduceMotion: boolean; className?: string }) {
  return (
    <motion.div
      className={`relative z-[10] w-full max-w-[236px] transform-gpu overflow-hidden rounded-[32px] border border-white/75 bg-white/90 p-5 shadow-[0_28px_90px_rgba(14,56,70,0.14)] backdrop-blur-xl sm:p-6 ${className}`}
      animate={reduceMotion ? undefined : { y: [0, -4, 0], scale: [1, 1.004, 1] }}
      transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.015, transition: { type: "spring", stiffness: 220, damping: 20 } }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,247,227,0.96) 0%, rgba(255,255,255,0.9) 52%, rgba(255,255,255,0.7) 100%)" }}
      />
      <div className="relative">
        <span className="inline-flex rounded-full border border-[#ECAB23]/20 bg-[#FFF7E3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E5665]">
          Innovation Month
        </span>
        <h3 className="mt-4 text-2xl font-bold leading-[1.02] text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
          A live season of ideas, demos, founders, and recognition.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5B6770]">
          Designed to make innovation visible, social, and participatory across Sun Life teams.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            ["50+", "Ideas"],
            ["20+", "Sessions"],
            ["4", "Years"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-[#ECAB23]/12 bg-white/70 px-3 py-2">
              <p className="text-lg font-bold text-[#0E5665]" style={{ fontFamily: "var(--font-mono)" }}>
                {value}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5B6770]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function HeroOrbit({ reduceMotion }: { reduceMotion: boolean }) {
  const leftOrbitItems = [CULTURE_ORBIT_ITEMS[0], CULTURE_ORBIT_ITEMS[2], CULTURE_ORBIT_ITEMS[4]]
  const rightOrbitItems = [CULTURE_ORBIT_ITEMS[1], CULTURE_ORBIT_ITEMS[3], CULTURE_ORBIT_ITEMS[5]]

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="relative md:min-h-[500px]">
        <motion.div
          className="absolute left-1/2 top-[11rem] hidden h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 md:top-1/2 md:block"
          animate={reduceMotion ? undefined : { scale: [0.98, 1.02, 0.98], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[11rem] hidden h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ECAB23]/16 md:top-1/2 md:block"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-[11rem] hidden h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#0E5665]/18 md:top-1/2 md:block"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute left-1/2 top-[11rem] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:top-1/2"
          style={{ background: "radial-gradient(circle, rgba(236,171,35,0.26) 0%, rgba(236,171,35,0.08) 42%, transparent 74%)" }}
        />
        <div
          className="absolute left-1/2 top-[11rem] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:top-1/2"
          style={{ background: "radial-gradient(circle, rgba(14,86,101,0.18) 0%, transparent 72%)" }}
        />
        <motion.div
          className="absolute left-1/2 top-[11rem] h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ECAB23]/18 md:top-1/2"
          animate={reduceMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[11rem] h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0E5665]/14 md:top-1/2"
          animate={reduceMotion ? undefined : { scale: [1.05, 0.95, 1.05], opacity: [0.14, 0.32, 0.14] }}
          transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut" }}
        />

        {[{ left: "24%", top: "5%", delay: 0.2 }, { left: "86%", top: "32%", delay: 0.8 }, { left: "69%", top: "8%", delay: 1.4 }, { left: "33%", top: "86%", delay: 2.1 }].map((spark, index) => (
          <motion.div
            key={`spark-${index}`}
            className="pointer-events-none absolute z-[1] hidden md:block"
            style={{ left: spark.left, top: spark.top }}
            animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.85, 1.15, 0.85], y: [0, -10, 0] }}
            transition={{ duration: 4.4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: spark.delay }}
          >
            <Sparkles className="h-4 w-4 text-[#ECAB23]/85" />
          </motion.div>
        ))}

        <div className="relative z-[4] flex flex-col items-center gap-4 pt-10 md:hidden">
          <OrbitCenterCard reduceMotion={reduceMotion} />
          <div className="grid w-full max-w-[360px] grid-cols-2 gap-3 px-2">
            {CULTURE_ORBIT_ITEMS.map((item, index) => (
              <OrbitFeatureCard key={item.title} item={item} index={index} reduceMotion={reduceMotion} className="max-w-none" />
            ))}
          </div>
        </div>

        <div className="relative z-[4] hidden min-h-[500px] md:block">
          <div className="absolute left-1/2 top-1/2 z-[8] -translate-x-1/2 -translate-y-1/2">
            <OrbitCenterCard reduceMotion={reduceMotion} />
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-[360px] -translate-x-[292px] -translate-y-1/2 flex-col justify-between lg:h-[390px] lg:-translate-x-[308px]">
            {leftOrbitItems.map((item, index) => (
              <OrbitFeatureCard key={item.title} item={item} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>

          <div className="absolute left-1/2 top-1/2 flex h-[360px] translate-x-[128px] -translate-y-1/2 flex-col justify-between lg:h-[390px] lg:translate-x-[144px]">
            {rightOrbitItems.map((item, index) => (
              <OrbitFeatureCard key={item.title} item={item} index={index + leftOrbitItems.length} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MomentumRibbon({ reduceMotion }: { reduceMotion: boolean }) {
  const ribbonItems = [...HERO_SIGNAL_STRIP, ...HERO_SIGNAL_STRIP]

  return (
    <div className="relative z-10 mt-12 overflow-hidden rounded-full border border-white/70 bg-white/70 px-2 py-2 shadow-[0_18px_45px_rgba(14,56,70,0.08)] backdrop-blur-xl">
      <motion.div
        className="flex min-w-max items-center gap-3"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {ribbonItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-3 px-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ECAB23]/16 bg-white/78 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1F2A2E]">
              <span className="h-2 w-2 rounded-full bg-[#ECAB23]" />
              {item}
            </span>
            <span className="text-[#0E5665]/35">+</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ProgramCard({
  program,
  index,
  reduceMotion,
}: {
  program: (typeof PROGRAMS)[number]
  index: number
  reduceMotion: boolean
}) {
  const featured = program.layout.includes("col-span-2")

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[28px] border p-6 shadow-[0_18px_60px_rgba(14,56,70,0.08)] ${program.layout}`}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,247,227,0.76) 100%)",
        borderColor: `${program.color}24`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-3xl" style={{ background: program.color }} />
      <div className="relative flex h-full flex-col">
        <div className="mb-8">
          <span
            className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ backgroundColor: `${program.color}16`, color: program.color }}
          >
            {program.eyebrow}
          </span>
          <program.icon className={`mt-5 ${featured ? "h-9 w-9" : "h-7 w-7"}`} style={{ color: program.color }} />
          <h3
            className={`mt-4 font-bold text-[#1F2A2E] ${featured ? "text-2xl leading-[1.02]" : "text-lg leading-tight"}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {program.title}
          </h3>
          <p className={`mt-3 leading-relaxed text-[#5B6770] ${featured ? "max-w-xl text-sm" : "text-xs"}`}>
            {program.description}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {program.signals.map((signal) => (
            <span
              key={signal}
              className="rounded-full border border-[#1F2A2E]/8 bg-white/70 px-3 py-1 text-[11px] font-medium text-[#5B6770]"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export function CulturePage() {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8f9fc]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground className="min-h-[92svh] justify-start px-6 pb-24 pt-28 md:px-10">
          <Spotlight className="left-0 -top-40 md:left-36 md:-top-28" fill="#ECAB23" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(ellipse at 18% 18%, rgba(236,171,35,0.22) 0%, transparent 40%), radial-gradient(ellipse at 78% 32%, rgba(14,86,101,0.12) 0%, transparent 42%), radial-gradient(ellipse at 50% 100%, rgba(248,213,106,0.16) 0%, transparent 44%)",
            }}
          />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-[#1F2A2E]"
            >
              <p className="mb-4 inline-flex rounded-full border border-[#ECAB23]/30 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#0E5665] backdrop-blur-md">
                Culture and Participation
              </p>
              <h1
                className="max-w-3xl text-5xl font-bold leading-[0.92] md:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Innovation culture
                <br />
                that feels <span className="gradient-text">alive</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5B6770] md:text-lg">
                Innovation Month is where Sun Life Global Solutions turns curiosity into visible momentum - with founder demos, expert talks, employee ideas, and a finish line that celebrates the people building what comes next.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#month-structure"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0E5665] px-7 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#0E5665]/92"
                >
                  See the month unfold
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#recognition"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ECAB23]/25 bg-white/78 px-7 py-3 text-sm font-bold text-[#1F2A2E] transition-all hover:scale-[1.02] hover:border-[#ECAB23]/40"
                >
                  Jump to recognition
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-full border px-5 py-2 shadow-[0_10px_30px_rgba(14,56,70,0.08)]"
                    style={{
                      background: "rgba(255,255,255,0.82)",
                      borderColor: "rgba(236,171,35,0.22)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span className="mr-2 text-lg font-bold text-[#0E5665]" style={{ fontFamily: "var(--font-mono)" }}>
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium text-[#5B6770]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="relative"
            >
              <HeroOrbit reduceMotion={reduceMotion} />
            </motion.div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <MomentumRibbon reduceMotion={reduceMotion} />
          </div>
        </AuroraBackground>
      </section>

      {/* Why It Exists */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="Purpose"
            title="Why We Run It"
            description="Innovation Month is designed to make experimentation visible, social, and repeatable across Sun Life Global Solutions."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {PURPOSES.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass-card group relative overflow-hidden p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl" style={{ background: item.color }} />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.color}14` }}>
                    <item.icon className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                <h3 className="mb-2 text-lg font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5B6770]">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Conduct */}
      <section className="px-6 py-24 md:px-10" style={{ background: "linear-gradient(180deg, #fffdf6 0%, #eef4f6 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="Programs"
            title="What We Conduct"
            description="Not one event format. A layered culture system built from founder energy, expert learning, hands-on discovery, and employee participation."
          />
          <div className="grid gap-5 lg:auto-rows-[minmax(220px,1fr)] lg:grid-cols-4">
            {PROGRAMS.map((program, i) => (
              <ProgramCard
                key={program.title}
                program={program}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How The Month Unfolds */}
      <section id="month-structure" className="relative overflow-hidden px-6 py-24 md:px-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(circle at 20% 20%, rgba(236,171,35,0.08) 0%, transparent 26%), radial-gradient(circle at 82% 72%, rgba(14,86,101,0.08) 0%, transparent 30%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading
              label="Structure"
              title="How The Month Unfolds"
              description="The experience builds week by week, moving from invitation to exploration, then to learning, and finally to a visible finish line."
            />
            <div className="glass-card overflow-hidden p-6">
              <p className="text-sm font-semibold text-[#1F2A2E]">From kickoff to finale</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6770]">
                The best version of this page should feel like the month itself - building momentum, revealing more as you scroll, and ending in celebration.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Launch", "Startup demos", "Expert talks", "Finale"].map((chip) => (
                  <span key={chip} className="rounded-full border border-[#ECAB23]/15 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0E5665]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {TIMELINE_EVENTS.map((event, i) => (
              <motion.article
                key={event.phase}
                className="relative overflow-hidden rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-[0_22px_70px_rgba(14,56,70,0.10)] backdrop-blur-xl"
                initial={{ opacity: 0, x: 24, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-0 h-full w-1.5" style={{ background: `linear-gradient(180deg, ${event.color} 0%, rgba(255,255,255,0) 100%)` }} />
                <div className="absolute right-5 top-4 text-6xl font-black opacity-[0.06]" style={{ color: event.color }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${event.color}14` }}>
                      <event.icon className="h-6 w-6" style={{ color: event.color }} />
                    </div>
                    <div>
                      <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ backgroundColor: `${event.color}16`, color: event.color }}>
                        {event.phase}
                      </span>
                      <h3 className="mt-3 text-2xl font-bold leading-[1.04] text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#5B6770] md:text-base">{event.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {event.moments.map((moment) => (
                      <span key={moment} className="rounded-full border border-[#1F2A2E]/8 bg-white px-3 py-1 text-[11px] font-medium text-[#5B6770]">
                        {moment}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Highlights */}
      <section className="px-6 py-20 md:px-10" style={{ background: "linear-gradient(180deg, #f0f4f8 0%, #f8f9fc 100%)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            label="Impact"
            title="Signature Highlights"
            description="Proof that the culture shows up at scale - in participation, founder access, speaker exposure, and repeat momentum."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT_HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.label}
                className="relative overflow-hidden rounded-2xl border border-[#ECAB23]/10 bg-white p-5 shadow-[0_12px_34px_rgba(14,56,70,0.06)]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-15 blur-2xl" style={{ background: item.color }} />
                <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}14` }}>
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0E5665]" style={{ fontFamily: "var(--font-mono)" }}>
                    {item.stat}
                  </p>
                  <p className="text-xs text-[#5B6770]">{item.label}</p>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Celebration */}
      <section id="recognition" className="relative overflow-hidden px-6 py-24 md:px-10">
        <div
          className="absolute inset-0 opacity-75"
          style={{ background: "radial-gradient(circle at 16% 30%, rgba(236,171,35,0.08) 0%, transparent 24%), radial-gradient(circle at 82% 72%, rgba(232,93,117,0.08) 0%, transparent 28%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="self-start lg:sticky lg:top-24">
            <SectionHeading
              label="Recognition"
              title="Celebrating Our Innovators"
              description="Recognition is part of the culture system. It makes experimentation visible, gives teams a finish line, and turns wins into momentum."
            />
            <div className="overflow-hidden rounded-[30px] border border-[#ECAB23]/18 bg-white/88 p-6 shadow-[0_22px_70px_rgba(14,56,70,0.10)] backdrop-blur-xl">
              <span className="inline-flex rounded-full border border-[#ECAB23]/18 bg-[#FFF7E3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0E5665]">
                Innovation Summit
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-[1.04] text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                Felicitation is part of the experience, not an afterthought.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5B6770] md:text-base">
                From hackathons to idea challenges, the month closes with visible recognition for the people who built, pitched, and pushed ideas forward.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Hackathons", "Ideas", "Panels", "Summit"].map((chip) => (
                  <span key={chip} className="rounded-full border border-[#1F2A2E]/8 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6770]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {RECOGNITION_ITEMS.map((item, i) => (
              <motion.article
                key={item.category}
                className="relative overflow-hidden rounded-[28px] border bg-white/88 p-6 shadow-[0_18px_60px_rgba(14,56,70,0.08)] backdrop-blur-xl"
                style={{ borderColor: `${item.color}24` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-3xl" style={{ background: item.color }} />
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: item.color }}>
                        Recognition lane
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                        {item.category}
                      </h3>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.color}16` }}>
                      <Trophy className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-[#5B6770]">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-full border px-3 py-1 text-[11px] font-medium"
                        style={{ borderColor: `${item.color}24`, backgroundColor: `${item.color}12`, color: "#1F2A2E" }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Across Years */}
      <section className="px-6 py-24 md:px-10" style={{ background: "linear-gradient(180deg, #f8f9fc 0%, #eef4f6 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            label="Journey"
            title="Evolution Across Years"
            description="Each year adds a new layer - ideas, founders, expert insight, hands-on showcases, and finally a full summit experience."
          />
          <div className="relative mt-14">
            <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-[#ECAB23]/50 via-[#0E5665]/35 to-[#E85D75]/35 lg:block" />
            <div className="grid gap-6 lg:grid-cols-4">
            {YEARLY_EVOLUTION.map((year, i) => (
              <motion.article
                key={year.year}
                className={`relative overflow-visible rounded-[30px] border bg-white/88 p-6 pt-12 shadow-[0_18px_60px_rgba(14,56,70,0.08)] backdrop-blur-xl ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}
                style={{ borderColor: `${year.color}24` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              >
                <span
                  className="absolute -right-2 -top-2 text-6xl font-bold opacity-[0.05]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {year.year}
                </span>
                <div
                  className="absolute left-6 top-0 z-10 inline-flex -translate-y-1/2 rounded-full border px-4 py-1.5 text-sm font-bold shadow-[0_8px_30px_rgba(14,56,70,0.08)]"
                  style={{ backgroundColor: "white", borderColor: `${year.color}26`, color: year.color, fontFamily: "var(--font-mono)" }}
                >
                  {year.year}
                </div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: year.color }}>
                  Phase {i + 1}
                </p>
                <h3 className="mb-3 text-xl font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                  {year.title}
                </h3>
                <ul className="space-y-1.5">
                  {year.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[11px] leading-tight text-[#5B6770]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: year.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2024 Summit */}
      <section id="summit-2024" className="relative overflow-hidden px-6 py-24 md:px-10">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 18% 24%, rgba(78,205,196,0.12) 0%, transparent 26%), radial-gradient(circle at 82% 18%, rgba(236,171,35,0.12) 0%, transparent 24%), linear-gradient(180deg, rgba(240,244,248,0.74) 0%, rgba(248,249,252,0.96) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            label="2024 Summit"
            title="Innovation Summit 2024 gave the culture a bigger stage."
            description="The 2024 ceremony archive shows a more formal summit moment: leadership keynote, a wider recognition canvas, and multiple challenge lanes celebrated across the organization."
          />

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <motion.article
              className="relative overflow-hidden rounded-[34px] border border-[#4ECDC4]/20 bg-white/88 p-7 shadow-[0_22px_70px_rgba(14,56,70,0.10)] backdrop-blur-xl md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#4ECDC4]/20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  {SUMMIT_2024_SIGNAL_STRIP.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-[#1F2A2E]/8 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6770]"
                    >
                      {signal}
                    </span>
                  ))}
                </div>

                <div className="mt-7 max-w-3xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4ECDC4]">From month to summit</p>
                  <h3 className="mt-3 text-2xl font-bold leading-[1.04] text-[#1F2A2E] md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                    A visible ceremony layer now sits on top of the innovation program.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#5B6770] md:text-base">
                    The 2024 materials move beyond a generic closing moment. They frame the experience as an Innovation Summit and Felicitation Ceremony with leadership presence, named challenge tracks, and champion recognition across multiple performance lenses.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {SUMMIT_2024_SPOTLIGHTS.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="rounded-[24px] border bg-white/86 p-5 shadow-[0_14px_34px_rgba(14,56,70,0.06)]"
                      style={{ borderColor: `${item.color}22` }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${item.color}16` }}>
                        <item.icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <h4 className="mt-4 text-lg font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5B6770]">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.article>

            <motion.aside
              className="relative overflow-hidden rounded-[34px] border border-[#ECAB23]/18 bg-white/88 p-6 shadow-[0_22px_70px_rgba(14,56,70,0.10)] backdrop-blur-xl md:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="absolute -left-12 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-[#ECAB23]/14 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ECAB23]">Highlight video</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                  2024 Innovation Summit Film
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5B6770] md:text-base">
                  A look back at the Innovation Hub journey — our people, partnerships, and the POCs that made it to production.
                </p>

                <div className="mt-6 aspect-video overflow-hidden rounded-[28px] border border-[#0E5665]/12 shadow-[0_16px_48px_rgba(14,56,70,0.12)]">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/summit-2024.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </motion.aside>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SUMMIT_2024_RECOGNITION_LANES.map((lane, index) => (
              <motion.article
                key={lane.title}
                className="rounded-[26px] border bg-white/88 p-5 shadow-[0_16px_44px_rgba(14,56,70,0.08)] backdrop-blur-xl"
                style={{ borderColor: `${lane.color}22` }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
                  style={{ backgroundColor: `${lane.color}14`, color: lane.color }}
                >
                  Summit lane
                </span>
                <h4 className="mt-4 text-lg font-bold text-[#1F2A2E]" style={{ fontFamily: "var(--font-display)" }}>
                  {lane.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#5B6770]">{lane.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 pb-28 pt-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-[40px] border border-[#ECAB23]/18 px-8 py-16 shadow-[0_30px_100px_rgba(14,56,70,0.12)]"
            style={{ background: "linear-gradient(135deg, rgba(255,247,227,0.96) 0%, rgba(255,255,255,0.95) 45%, rgba(14,86,101,0.08) 100%)" }}
          >
            <div className="absolute inset-0 bg-dot-grid opacity-20" />
            <div className="absolute left-1/2 top-0 h-52 w-52 -translate-x-1/2 rounded-full bg-[#ECAB23]/16 blur-3xl" />
            <div className="absolute bottom-0 right-10 h-36 w-36 rounded-full bg-[#0E5665]/10 blur-3xl" />
          <motion.div
            className="relative mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PartyPopper className="mx-auto mb-6 h-12 w-12 text-[#ECAB23]" />
            <h2
              className="mb-4 text-3xl font-bold text-[#1F2A2E] md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Idea Could Shape the Next Innovation Month
            </h2>
            <p className="mb-8 text-lg text-[#5B6770]">
              Innovation isn&apos;t reserved for a team - it&apos;s for everyone. Whether it&apos;s a bold new product idea, a process improvement, or a wild experiment, there&apos;s a stage for it here.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {["Pitch an idea", "See a demo", "Join a panel", "Celebrate wins"].map((chip) => (
                <span key={chip} className="rounded-full border border-[#1F2A2E]/8 bg-white/78 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5B6770] shadow-[0_8px_18px_rgba(14,56,70,0.05)]">
                  {chip}
                </span>
              ))}
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E5665] px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#0E5665]/90"
            >
              Explore the Innovation Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
