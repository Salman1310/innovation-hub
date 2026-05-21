"use client"

import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonColorfulProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
}

function ButtonColorful({
  className,
  label = "Explore Components",
  ...props
}: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "group relative h-11 overflow-hidden border px-5 text-[#1f2a2e]",
        "border-[rgba(14,56,70,0.08)] bg-[linear-gradient(180deg,#ead18b_0%,#d99a24_100%)]",
        "shadow-[0_12px_28px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.34)]",
        "transition-all duration-200 hover:scale-[1.03] hover:bg-[linear-gradient(180deg,#efd895_0%,#dca23a_100%)]",
        "hover:shadow-[0_12px_28px_rgba(0,0,0,0.22),0_0_36px_rgba(217,154,36,0.12),inset_0_1px_0_rgba(255,255,255,0.34)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-80 transition-opacity duration-300 group-hover:opacity-100",
        )}
      />
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-[#1f2a2e]">{label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-[#1f2a2e]" />
      </div>
    </Button>
  )
}

export { ButtonColorful }
