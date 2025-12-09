"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  subStats?: { label: string; value: string | number }[]
  className?: string
}

export function StatCard({
  title,
  value,
  icon,
  subStats,
  className
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "glass-card relative overflow-hidden group animate-fade-in",
        className
      )}
    >
      <CardContent className="p-3 sm:p-4 lg:p-5">
        <Button
          variant="glass-circle"
          size="icon-sm"
          className="absolute top-4 right-4 text-[var(--text-tertiary)] hover:text-white transition-all duration-300 group-hover:scale-110"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>

        <div className="flex items-center gap-2 sm:gap-2.5 mb-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full glass flex items-center justify-center">
            {icon}
          </div>
          <p className="text-[var(--text-tertiary)] text-[11px] sm:text-xs lg:text-sm">{title}</p>
        </div>

        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 ml-0.5">{value}</p>

        {subStats && (
          <div className="flex gap-3 sm:gap-4 lg:gap-6 pt-2 sm:pt-3 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]">
            {subStats.map((stat, index) => (
              <div key={index}>
                <p className="text-[var(--text-muted)] text-[10px] sm:text-[10px] lg:text-[11px] mb-0.5">{stat.label}</p>
                <p className="text-white font-semibold text-xs sm:text-sm lg:text-base">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
