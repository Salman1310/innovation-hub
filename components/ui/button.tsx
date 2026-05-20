"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#6c5ce7] text-white hover:bg-[#5a4bd1] shadow-[0_4px_20px_rgba(108,92,231,0.3)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border-2 border-[#6c5ce7] text-[#6c5ce7] bg-transparent hover:bg-[#6c5ce7]/10",
        secondary:
          "bg-[#f0effe] text-[#6c5ce7] hover:bg-[#e4e0fd]",
        ghost: "hover:bg-[#6c5ce7]/10 hover:text-[#6c5ce7]",
        link: "text-[#6c5ce7] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
