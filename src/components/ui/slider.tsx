"use client"

import { cn } from "@/lib/utils"
import { forwardRef, useCallback, useRef, useState, useEffect } from "react"

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label?: string
  valueLabel?: string
  className?: string
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onChange, min, max, step = 1, label, valueLabel, className }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const percentage = ((value - min) / (max - min)) * 100

    const handleMove = useCallback((clientX: number) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const rawValue = min + percent * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      onChange(Math.max(min, Math.min(max, steppedValue)))
    }, [min, max, step, onChange])

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      handleMove(e.clientX)
    }, [handleMove])

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      setIsDragging(true)
      handleMove(e.touches[0].clientX)
    }, [handleMove])

    useEffect(() => {
      if (!isDragging) return

      const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX)
      }

      const handleTouchMove = (e: TouchEvent) => {
        handleMove(e.touches[0].clientX)
      }

      const handleEnd = () => {
        setIsDragging(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleEnd)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("touchend", handleEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleEnd)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleEnd)
      }
    }, [isDragging, handleMove])

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-tertiary)]">{label}</span>
            <span className="text-white font-medium">{valueLabel ?? value}</span>
          </div>
        )}
        <div
          ref={trackRef}
          className="relative h-2 bg-[rgba(255,255,255,var(--ui-opacity-10))] rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className="absolute h-full bg-theme-gradient rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-[rgba(255,255,255,var(--ui-opacity-20))] transition-transform",
              isDragging ? "scale-110" : "hover:scale-110"
            )}
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
      </div>
    )
  }
)

Slider.displayName = "Slider"
export { Slider }
