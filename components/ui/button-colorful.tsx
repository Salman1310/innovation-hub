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
        "group relative h-11 overflow-hidden rounded-lg border-0 px-6 text-[#002855] font-semibold",
        "bg-[#FFCD00]",
        "shadow-[0_4px_16px_rgba(255,205,0,0.3)]",
        "transition-all duration-200 hover:bg-[#E5B800]",
        "hover:shadow-[0_6px_20px_rgba(255,205,0,0.4)]",
        className,
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-[#002855]">{label}</span>
        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#002855]/30">
          <ArrowUpRight className="h-3 w-3 text-[#002855]" />
        </div>
      </div>
    </Button>
  )
}

export { ButtonColorful }
