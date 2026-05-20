"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { AuroraBackground } from "@/components/ui/aurora-background"

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image"
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

function ScrollExpandMedia({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  title = "Impact Dashboard",
  date = "Innovation AI Portfolio",
  scrollToExpand = "Dashboard opens below",
  children,
}: ScrollExpandMediaProps) {
  return (
    <div className="relative overflow-hidden">
      <AuroraBackground className="min-h-0 px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,92,231,0.22),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(0,206,201,0.18),transparent_34%)]" />
        <div className="relative z-10 grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[#1a1a2e]"
          >
            <p className="mb-4 inline-flex rounded-full border border-[#6c5ce7]/20 bg-[#f0effe] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#6c5ce7] backdrop-blur">
              {date}
            </p>
            <h2
              className="text-5xl font-bold leading-[0.95] md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#555580] md:text-lg">
              Scroll into a live-feeling portfolio view with POC signals, production status,
              market impact, and activity trends.
            </p>
            <p className="mt-6 text-sm font-semibold text-[#6c5ce7]">{scrollToExpand}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-white/20 bg-black/20 shadow-[0_34px_110px_rgba(0,206,201,0.22)]"
          >
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 94vw, 760px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050516]/78 via-[#0b1025]/42 to-[#00cec9]/20" />
            <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-3">
              {[
                ["80", "POCs tracked"],
                ["12", "In production"],
                ["27", "Gen AI entries"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur text-white">
                  <p className="text-3xl font-bold">{value}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </AuroraBackground>

      <section className="relative z-10 px-8 py-24 md:py-28">{children}</section>
    </div>
  )
}

export default ScrollExpandMedia
