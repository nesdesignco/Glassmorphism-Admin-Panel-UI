"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from "recharts"
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
  name: string
  value: number
  color?: string
}

interface DonutChartProps {
  data: DataPoint[]
  innerRadius?: number
  outerRadius?: number
  centerLabel?: string
  centerValue?: string
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 rounded-xl border border-white/[0.08]">
        <p className="text-white font-medium text-sm">{payload[0].name}</p>
        <p className="text-[var(--text-tertiary)] text-xs">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export function DonutChart({
  data,
  innerRadius = 55,
  outerRadius = 85,
  centerLabel,
  centerValue = "27%"
}: DonutChartProps) {
  const { colors } = useTheme()
  const isMobile = useIsMobile()
  const chartPalette = [
    colors.chartColors.primary,
    colors.chartColors.secondary,
    colors.chartColors.tertiary,
    colors.gradientTo,
    colors.chartColors.primary + "cc",
    colors.chartColors.secondary + "cc"
  ]

  // Responsive radius values
  const responsiveInnerRadius = isMobile ? Math.min(innerRadius, 45) : innerRadius
  const responsiveOuterRadius = isMobile ? Math.min(outerRadius, 70) : outerRadius
  const centerFontSize = isMobile ? "18px" : "24px"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
            patternTransform="rotate(45)"
          >
            <rect width="4" height="4" fill={chartPalette[0]} />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="4"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={responsiveInnerRadius}
          outerRadius={responsiveOuterRadius}
          paddingAngle={isMobile ? 2 : 3}
          dataKey="value"
          animationDuration={1200}
          animationEasing="ease-out"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth={1}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? "url(#stripes)" : (entry.color || chartPalette[index % chartPalette.length])}
            />
          ))}
          <Label
            value={centerValue}
            position="center"
            fill="white"
            style={{
              fontSize: centerFontSize,
              fontWeight: "bold"
            }}
          />
        </Pie>
        <Tooltip content={<CustomTooltip />} cursor={false} />
      </PieChart>
    </ResponsiveContainer>
  )
}
