"use client"

import { cn } from "@/lib/utils"
import { InputHTMLAttributes, forwardRef } from "react"

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg glass-input text-white placeholder:text-white/40 text-sm",
          className
        )}
        {...props}
      />
    )
  }
)

GlassInput.displayName = "GlassInput"

export { GlassInput }
