"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "light" | "liquid"
  hover?: boolean
  noPadding?: boolean
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = false, noPadding = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl transition-all duration-300 animate-fade-in",
          "glass-card",
          !noPadding && "p-6",
          hover && "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }
