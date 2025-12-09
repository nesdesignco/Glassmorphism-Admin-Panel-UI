"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { HTMLAttributes, forwardRef } from "react"

interface GlassModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const GlassModal = forwardRef<HTMLDivElement, GlassModalProps>(
  ({ className, isOpen, onClose, title, size = "md", children, ...props }, ref) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        <div
          ref={ref}
          className={cn(
            "relative z-10 glass-card rounded-2xl p-4 sm:p-6 mx-4 sm:mx-0 animate-fade-in",
            size === "sm" && "w-full max-w-sm",
            size === "md" && "w-full max-w-md",
            size === "lg" && "w-full max-w-lg",
            size === "xl" && "w-full max-w-xl",
            className
          )}
          {...props}
        >
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-tertiary)]" />
              </button>
            </div>
          )}

          {children}
        </div>
      </div>
    )
  }
)

GlassModal.displayName = "GlassModal"

export { GlassModal }
