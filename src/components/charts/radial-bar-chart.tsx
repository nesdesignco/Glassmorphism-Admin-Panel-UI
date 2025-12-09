"use client"

import { useState, useEffect } from "react"
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
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

interface RadarChartProps {
  data: { name: string; value: number }[]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 rounded-xl border border-white/[0.08]">
        <p className="text-white font-medium text-sm">{payload[0].payload.name}</p>
        <p className="text-[var(--text-tertiary)] text-xs">{payload[0].value.toLocaleString('en-US')}</p>
      </div>
    )
  }
  return null
}

export function RadialBarChart({ data }: RadarChartProps) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()

  // Responsive values
  const fontSize = isMobile ? 11 : 12
  const outerRadius = isMobile ? "70%" : "40%"
  const strokeWidth = isMobile ? 2 : 2

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart
        cx="50%"
        cy="50%"
        outerRadius={outerRadius}
        data={data}
      >
        <PolarGrid stroke={`rgba(255,255,255,var(--chart-axis-opacity))`} />
        <PolarAngleAxis
          dataKey="name"
          tick={{ fill: `rgba(255,255,255,var(--chart-text-opacity))`, fontSize }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 'auto']}
          tick={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Radar
          name="Activity"
          dataKey="value"
          stroke={colors.chartColors.primary}
          fill={colors.chartColors.primary}
          fillOpacity={0.4}
          strokeWidth={strokeWidth}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
