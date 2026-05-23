"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ButtonColorful } from "@/components/ui/button-colorful"

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["future", "AI-first", "useful", "live", "scalable"],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full flex flex-col gap-8 py-20 lg:py-0 items-start justify-center">
      <div className="flex gap-3 flex-col">
        <h1
          className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#1F2A2E]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="block">We build</span>
          <span className="block">what&apos;s</span>
          <span className="relative mt-1 block h-[1.12em] w-full overflow-hidden">
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute left-0 top-0 whitespace-nowrap font-extrabold"
                style={{
                  color: "#FFCD00",
                  WebkitTextFillColor: "#FFCD00",
                }}
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

        <p
          className="text-lg md:text-xl leading-relaxed text-[#5B6770] max-w-xl"
          style={{ fontFamily: "var(--font-main)" }}
        >
          Sun Life&apos;s SLGS Innovation is where breakthrough ideas become real products — fast.
          We experiment, prototype, and scale solutions that make insurance smarter, advisors
          sharper, and client experiences effortless.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <ButtonColorful
          label="Explore POCs"
          className="h-12 px-8 text-base"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        />
        <ButtonColorful
          label="View Dashboard"
          className="h-12 px-8 text-base"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>

      <div className="flex gap-8 pt-4 border-t border-[#ECAB23]/35 w-full">
        {[
          { value: "49", label: "Active POCs" },
          { value: "12", label: "In Production" },
          { value: "16", label: "Gen AI POCs" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold text-[#ECAB23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </span>
            <span className="text-sm text-[#5B6770]">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { AnimatedHero }
