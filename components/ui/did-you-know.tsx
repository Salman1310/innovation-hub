"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Lightbulb, X } from "lucide-react"

interface Fact {
  text: string
  highlight?: string
}

interface DidYouKnowProps {
  facts: Fact[]
  interval?: number
  className?: string
}

export function DidYouKnow({ facts, interval = 6000, className }: DidYouKnowProps) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [hasAutoShown, setHasAutoShown] = useState(false)

  // Auto-show once after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true)
      setHasAutoShown(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Auto-cycle facts while open
  useEffect(() => {
    if (!open) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % facts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [open, facts.length, interval])

  const fact = facts[index]

  return (
    <div className={`fixed bottom-8 right-8 z-40 ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        {open ? (
          /* Expanded bubble */
          <motion.div
            key={`fact-${index}`}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative max-w-xs overflow-hidden rounded-2xl p-[1px]"
            style={{
              background: "linear-gradient(135deg, rgba(108,92,231,0.4), rgba(0,206,201,0.3), rgba(162,155,254,0.2))",
            }}
          >
            <div
              className="relative rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Shimmer */}
              <div
                className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 20% 30%, rgba(108,92,231,0.08) 0%, transparent 60%)",
                }}
              />

              {/* Close → collapses to circle */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#f0effe] text-[#6c5ce7] transition-all hover:bg-[#6c5ce7] hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>

              {/* Header */}
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}
                >
                  <Lightbulb className="h-3.5 w-3.5 text-white" />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.15em] text-[#6c5ce7]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Did you know?
                </span>
              </div>

              {/* Fact */}
              <p className="pr-4 text-sm leading-relaxed text-[#1a1a2e]">
                {fact.text}
              </p>

              {/* Highlight */}
              {fact.highlight && (
                <div
                  className="mt-2.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: "rgba(108,92,231,0.08)",
                    color: "#6c5ce7",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00cec9]" />
                  {fact.highlight}
                </div>
              )}

              {/* Progress dots */}
              <div className="mt-3 flex gap-1.5">
                {facts.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 16 : 6,
                      background: i === index ? "#6c5ce7" : "rgba(108,92,231,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : hasAutoShown ? (
          /* Collapsed circle button */
          <motion.button
            key="collapsed-btn"
            type="button"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              setIndex((prev) => (prev + 1) % facts.length)
              setOpen(true)
            }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
              boxShadow: "0 4px 20px rgba(108,92,231,0.35)",
            }}
          >
            <Lightbulb className="h-5 w-5 text-white" />
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "#6c5ce7" }} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
