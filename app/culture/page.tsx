"use client"

import Link from "next/link"
import { CulturePage } from "@/components/ui/culture-page"

export default function Culture() {
  return (
    <>
      <Link
        href="/"
        className="fixed top-6 left-8 z-50 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(236,171,35,0.2)",
          color: "#ECAB23",
        }}
      >
        Back to Hub
      </Link>
      <CulturePage />
    </>
  )
}
