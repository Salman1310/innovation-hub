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
        "group relative h-11 overflow-hidden px-5",
        "bg-zinc-900 text-white hover:bg-zinc-900",
        "transition-all duration-200 hover:scale-[1.03]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
          "opacity-45 blur transition-opacity duration-500 group-hover:opacity-85",
        )}
      />
      <div className="relative flex items-center justify-center gap-2">
        <span className="text-white">{label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-white/90" />
      </div>
    </Button>
  )
}

export { ButtonColorful }
