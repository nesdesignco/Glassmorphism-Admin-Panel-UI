"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { ReactNode, useRef, useEffect } from "react"

interface StatItem {
  title: string
  value: string | number
  icon: ReactNode
  subStats?: { label: string; value: string | number }[]
}

interface StatsRowProps {
  stats: StatItem[]
  className?: string
}

function getPath(w: number, h: number) {
  const r = 12
  const cutX = 65
  const cutY = 65
  const innerCutY = 52

  return `M ${r} 0 L ${w - cutX} 0 Q ${w - cutX + r} 0 ${w - cutX + r} ${r} L ${w - cutX + r} ${innerCutY - r} Q ${w - cutX + r} ${innerCutY} ${w - cutX + r + r} ${innerCutY} L ${w - r} ${innerCutY} Q ${w} ${innerCutY} ${w} ${cutY} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0 Z`
}

export function StatsRow({ stats, className }: StatsRowProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const svgRefs = useRef<(SVGSVGElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const updateSvg = (index: number) => {
      const card = cardRefs.current[index]
      const svg = svgRefs.current[index]
      const path = pathRefs.current[index]

      if (!card || !svg || !path) return

      const w = card.offsetWidth
      const h = card.offsetHeight

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      path.setAttribute('d', getPath(w, h))
    }

    const observer = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        const index = cardRefs.current.findIndex(ref => ref === entry.target)
        if (index !== -1) {
          updateSvg(index)
        }
      })
    })

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref)
        updateSvg(index)
      }
    })

    return () => observer.disconnect()
  }, [stats])

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in", className)}>
      {stats.map((stat, index) => (
        <div key={index} ref={(el) => { cardRefs.current[index] = el }} className="relative group">
          <svg
            ref={(el) => { svgRefs.current[index] = el }}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 180"
            preserveAspectRatio="none"
          >
            <path
              ref={(el) => { pathRefs.current[index] = el }}
              d={getPath(300, 180)}
              strokeWidth="1"
              className="transition-colors duration-300 fill-[rgba(255,255,255,var(--glass-opacity))] stroke-[rgba(255,255,255,var(--glass-border-opacity))] group-hover:fill-[rgba(255,255,255,calc(var(--glass-opacity)+var(--glass-hover-opacity-add)))] group-hover:stroke-[rgba(255,255,255,calc(var(--glass-border-opacity)+var(--glass-hover-border-add)))]"
            />
          </svg>

          <button className="absolute top-[1px] right-[1px] z-10 w-10 h-10 rounded-full glass-button flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          </button>

          <div className="relative z-[1] p-6 pr-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <p className="text-[var(--text-tertiary)] text-sm">{stat.title}</p>
            </div>

            <p className="text-[36px] font-bold text-white mb-5">{stat.value}</p>

            {stat.subStats && (
              <div className="flex gap-4 sm:gap-6 lg:gap-10 pt-4 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]">
                {stat.subStats.map((subStat, subIndex) => (
                  <div key={subIndex} className="min-w-0">
                    <p className="text-[var(--text-muted)] text-[10px] sm:text-[11px] mb-1 truncate">{subStat.label}</p>
                    <p className="text-white font-semibold text-sm sm:text-base">{subStat.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
