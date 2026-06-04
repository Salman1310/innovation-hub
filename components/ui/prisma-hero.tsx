"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface WordsPullUpProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const WordsPullUp = ({ text, className = "", style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
          </motion.span>
        )
      })}
    </div>
  )
}

const navItems = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Our Story", href: "/story" },
  { label: "News Feed", href: "/feed" },
  { label: "Connect", href: "#connect" },
]

export function PrismaHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => ["future", "AI-first", "useful", "live", "scalable"], [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        {/* Navbar */}
        <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-10">
          <Image src="/sunlife_logo.png" alt="Sun Life" width={140} height={40} className="h-9 w-auto brightness-0 invert" />
          <div className="hidden items-center gap-6 md:flex lg:gap-10">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium transition-colors md:text-sm"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFCD00")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium transition-colors md:text-sm"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFCD00")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">

            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-bold leading-[0.85] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="block text-[8vw] text-white/90 sm:text-[7vw] md:text-[6vw]">
                  <WordsPullUp text="We build what's" />
                </span>
                <span className="relative mt-2 block h-[1.1em] overflow-hidden text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw]">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute left-0 top-0 whitespace-nowrap font-extrabold"
                      style={{ color: "#FFCD00" }}
                      initial={{ opacity: 0, y: 80 }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -80 : 80, opacity: 0 }
                      }
                    >
                      {title}.
                    </motion.span>
                  ))}
                </span>
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-white/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.4 }}
              >
                Sun Life&apos;s SLGS Innovation is where breakthrough ideas become real products — fast.
                We experiment, prototype, and scale solutions that make insurance smarter, advisors
                sharper, and client experiences effortless.
              </motion.p>

              <motion.a
                href="#dashboard"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium text-[#002855] transition-all hover:gap-3 sm:text-base"
                style={{ background: "#FFCD00" }}
              >
                Explore Dashboard
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#002855] transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-[#FFCD00]" />
                </span>
              </motion.a>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 border-t border-white/20 pt-4"
              >
                {[
                  { value: "51+", label: "Total POCs" },
                  { value: "12", label: "In Production" },
                  { value: "40+", label: "Startup Partners" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="text-xl font-bold text-[#FFCD00]" style={{ fontFamily: "var(--font-display)" }}>
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-white/60">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
