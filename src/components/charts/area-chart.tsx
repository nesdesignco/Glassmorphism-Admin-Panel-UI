"use client"

import { useState, useEffect } from "react"
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "@/contexts/theme-context"

// Hook for mobile detection
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
}

interface DataPoint {
  [key: string]: string | number
}

interface AreaChartProps {
  data: DataPoint[]
  xKey: string
  yKey: string
  color?: string
  gradientId?: string
  showPagination?: boolean
  currentPage?: number
  totalPages?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 rounded-xl border border-white/[0.08]">
        <p className="text-white font-semibold text-sm">
          {label} <span className="text-theme">${(payload[0].value / 1000).toFixed(1)}K</span>
        </p>
      </div>
    )
  }
  return null
}

export function AreaChart({
  data,
  xKey,
  yKey,
  color,
  gradientId = "colorValue",
  showPagination = true,
  currentPage = 1,
  totalPages = 3
}: AreaChartProps) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const chartColor = color || colors.gradientFrom
  const values = data.map(d => d[yKey] as number)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const padding = (maxValue - minValue) * 0.1
  const yMin = Math.max(0, Math.floor((minValue - padding) / 1000) * 1000)
  const yMax = Math.ceil((maxValue + padding) / 1000) * 1000

  // Responsive values
  const margin = isMobile
    ? { top: 15, right: 10, left: -10, bottom: 5 }
    : { top: 30, right: 20, left: 0, bottom: 10 }
  const fontSize = isMobile ? 9 : 11
  const yAxisWidth = isMobile ? 35 : 45
  const xAxisHeight = isMobile ? 30 : 40

  return (
    <div className="relative h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={margin}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
              <stop offset="50%" stopColor={chartColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={`rgba(255,255,255,var(--chart-grid-opacity))`}
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            stroke={`rgba(255,255,255,var(--chart-axis-opacity))`}
            tick={{ fill: `rgba(255,255,255,var(--chart-text-opacity))`, fontSize, dy: 10 }}
            axisLine={{ stroke: `rgba(255,255,255,var(--chart-grid-opacity))` }}
            tickLine={false}
            interval={isMobile ? "preserveStartEnd" : 0}
            height={xAxisHeight}
          />
          <YAxis
            stroke={`rgba(255,255,255,var(--chart-axis-opacity))`}
            tick={{ fill: `rgba(255,255,255,var(--chart-text-opacity))`, fontSize }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            domain={[yMin, yMax]}
            width={yAxisWidth}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey={yKey}
            stroke={chartColor}
            strokeWidth={isMobile ? 2 : 2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            animationDuration={1500}
            animationEasing="ease-out"
            dot={false}
            activeDot={{
              r: isMobile ? 4 : 6,
              fill: chartColor,
              stroke: "#fff",
              strokeWidth: 2
            }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>

      {showPagination && (
        <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-4 flex items-center gap-1 sm:gap-1.5">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index + 1 === currentPage
                  ? "bg-theme-gradient"
                  : "bg-[rgba(255,255,255,var(--ui-opacity-20))] hover:bg-[rgba(255,255,255,0.3)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
