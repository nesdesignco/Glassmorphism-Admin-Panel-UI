"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost"
  size?: "sm" | "md" | "lg"
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
          variant === "default" && "glass-button text-white",
          variant === "primary" && "btn-primary",
          variant === "ghost" && "bg-transparent hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] text-[var(--text-tertiary)] hover:text-white",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GlassButton.displayName = "GlassButton"

export { GlassButton }
