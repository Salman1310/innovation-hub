"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ButtonColorful } from "@/components/ui/button-colorful"

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["agile.", "disruptive.", "transformative.", "enterprise-ready.", "ecosystem-led."],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full flex flex-col gap-8 items-start justify-center">
      <div className="flex gap-3 flex-col items-start">
        <h1
          className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "#1F2A2E" }}
        >
          <span className="block">Innovation that&apos;s</span>
          <span className="relative mt-1 block h-[1.12em] w-full overflow-hidden">
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute left-0 top-0 whitespace-nowrap font-extrabold"
                style={{
                  color: "#ECAB23",
                  WebkitTextFillColor: "#ECAB23",
                }}
                initial={{ opacity: 0, y: 80 }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -80 : 80, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ fontFamily: "var(--font-main)", color: "#5B6770" }}
        >
          De-mystifying emerging technologies, co-creating with startups, and solving
          for business with an agile, disruptive &amp; transformative mindset. 51+ POCs executed.
          12 in production. Serving Asia, Canada, US &amp; International Hubs.
        </p>
      </div>

      <div className="pointer-events-auto flex flex-col sm:flex-row gap-4">
        <ButtonColorful
          label="Explore Portfolio"
          className="h-12 px-8 text-base"
          onClick={() => document.getElementById("poc-gallery")?.scrollIntoView({ behavior: "smooth" })}
        />
        <ButtonColorful
          label="View Dashboard"
          className="h-12 px-8 text-base"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        />
      </div>

    </div>
  )
}

export { AnimatedHero }
