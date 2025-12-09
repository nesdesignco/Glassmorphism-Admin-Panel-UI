"use client"

import { useState, useEffect } from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

interface BarConfig {
  key: string
  color?: string
  name: string
}

interface BarChartProps {
  data: DataPoint[]
  xKey: string
  bars: BarConfig[]
  useThemeColors?: boolean
  stacked?: boolean
}

export function BarChart({ data, xKey, bars, useThemeColors = false, stacked = false }: BarChartProps) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const themeChartColors = [colors.chartColors.primary, colors.chartColors.secondary, colors.chartColors.tertiary]

  const getBarColor = (bar: BarConfig, index: number) => {
    if (useThemeColors) {
      return themeChartColors[index % themeChartColors.length]
    }
    return bar.color || themeChartColors[index % themeChartColors.length]
  }

  // Responsive values
  const margin = isMobile
    ? { top: 5, right: 5, left: -15, bottom: 0 }
    : { top: 10, right: 10, left: 0, bottom: 0 }
  const fontSize = isMobile ? 9 : 12
  const legendFontSize = isMobile ? 9 : 11
  const legendIconSize = isMobile ? 8 : 10

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" stroke={`rgba(255,255,255,var(--chart-grid-opacity))`} />
        <XAxis
          dataKey={xKey}
          stroke={`rgba(255,255,255,var(--chart-axis-opacity))`}
          tick={{ fill: `rgba(255,255,255,var(--chart-text-opacity))`, fontSize }}
          axisLine={{ stroke: `rgba(255,255,255,var(--chart-axis-opacity))` }}
          interval={isMobile ? "preserveStartEnd" : 0}
        />
        <YAxis
          stroke={`rgba(255,255,255,var(--chart-axis-opacity))`}
          tick={{ fill: `rgba(255,255,255,var(--chart-text-opacity))`, fontSize }}
          axisLine={{ stroke: `rgba(255,255,255,var(--chart-axis-opacity))` }}
          width={isMobile ? 30 : 40}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(0,0,0,0.8)",
            border: `1px solid rgba(255,255,255,var(--glass-border-opacity))`,
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            fontSize: isMobile ? "11px" : "13px",
          }}
          labelStyle={{ color: `rgba(255,255,255,var(--ui-opacity-60))` }}
          cursor={{ fill: "transparent" }}
        />
        {!isMobile && (
          <Legend
            wrapperStyle={{ color: `rgba(255,255,255,var(--ui-opacity-60))`, fontSize: legendFontSize }}
            iconSize={legendIconSize}
          />
        )}
        {bars.map((bar, index) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={getBarColor(bar, index)}
            name={bar.name}
            radius={stacked && index === bars.length - 1 ? [4, 4, 0, 0] : stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
