"use client"

import { useState } from "react"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton } from "@/components/glass"
import { AreaChart, BarChart, RadialBarChart } from "@/components/charts"
import { monthlyRevenueReport, userActivityReport } from "@/lib/mock-data"
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  UserCheck,
  BookOpen,
  Activity
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { navigationTabs } from "@/lib/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("6months")
  const { colors } = useTheme()

  const totalRevenue = monthlyRevenueReport.reduce((sum, m) =>
    sum + m.courses + m.ebooks + m.bootcamps, 0
  )
  const totalLogins = userActivityReport.reduce((sum, d) => sum + d.logins, 0)
  const totalEnrollments = userActivityReport.reduce((sum, d) => sum + d.enrollments, 0)
  const totalCompletions = userActivityReport.reduce((sum, d) => sum + d.completions, 0)

  const handleExport = (type: string) => {
    alert(`Exporting ${type} report...`)
  }

  return (
    <div className="min-h-screen pb-8">
      <Header title="Reports & Analytics" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Revenue</p>
                <p className="text-base sm:text-xl font-bold text-white">${(totalRevenue / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Logins</p>
                <p className="text-base sm:text-xl font-bold text-white">{totalLogins.toLocaleString('en-US')}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Enrollments</p>
                <p className="text-base sm:text-xl font-bold text-white">{totalEnrollments}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Completions</p>
                <p className="text-base sm:text-xl font-bold text-white">{totalCompletions}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Export Buttons */}
        <GlassCard className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-[120px] h-8 glass-input border-[rgba(255,255,255,var(--glass-border-opacity))] text-white text-xs sm:text-sm">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent className="glass border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <SelectItem value="7days" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white text-xs sm:text-sm">7 Days</SelectItem>
                  <SelectItem value="30days" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white text-xs sm:text-sm">30 Days</SelectItem>
                  <SelectItem value="6months" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white text-xs sm:text-sm">6 Months</SelectItem>
                  <SelectItem value="1year" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white text-xs sm:text-sm">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <GlassButton variant="ghost" className="flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => handleExport("PDF")}>
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                PDF
              </GlassButton>
              <GlassButton variant="ghost" className="flex-1 sm:flex-none text-xs sm:text-sm" onClick={() => handleExport("CSV")}>
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                CSV
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Revenue by Category */}
          <GlassCard className="p-4 sm:p-6">
            <h3 className="text-[var(--text-secondary)] font-medium text-sm sm:text-base mb-4 sm:mb-6">Revenue by Category</h3>
            <div className="h-[200px] sm:h-[300px]">
              <BarChart
                data={monthlyRevenueReport}
                xKey="month"
                bars={[
                  { key: "courses", name: "Courses" },
                  { key: "ebooks", name: "E-Books" },
                  { key: "bootcamps", name: "Bootcamps" }
                ]}
                useThemeColors
              />
            </div>
          </GlassCard>

          {/* User Activity */}
          <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-[var(--text-secondary)] font-medium text-sm sm:text-base">User Activity</h3>
              <span className="text-[var(--text-muted)] text-xs sm:text-sm">7 Days</span>
            </div>

            {/* Mobile Layout - 3 Satır */}
            <div className="lg:hidden space-y-3">
              {/* Satır 1: Chart - Üstte Ortada - BÜYÜK */}
              <div className="flex justify-center -mx-2">
                <div className="w-full h-[220px]">
                  <RadialBarChart
                    data={[
                      { name: "Logins", value: totalLogins },
                      { name: "Enrollments", value: totalEnrollments * 10 },
                      { name: "Completions", value: totalCompletions * 10 }
                    ]}
                  />
                </div>
              </div>

              {/* Satır 2: Stats */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)] text-xs">Growth</span>
                  <span className="text-green-400 font-bold text-sm">+18%</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Logins</p>
                      <p className="text-white font-semibold text-sm">{totalLogins}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Enroll</p>
                      <p className="text-white font-semibold text-sm">{totalEnrollments}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <div>
                      <p className="text-[var(--text-muted)] text-[10px]">Done</p>
                      <p className="text-white font-semibold text-sm">{totalCompletions}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Satır 3: Footer - Legend + Avg/Day */}
              <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.chartColors.primary }} />
                    <span className="text-[var(--text-muted)] text-xs">Logins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.chartColors.secondary }} />
                    <span className="text-[var(--text-muted)] text-xs">Enrollments</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.chartColors.tertiary }} />
                    <span className="text-[var(--text-muted)] text-xs">Completions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-[rgba(255,255,255,var(--glass-border-opacity))] flex-shrink-0">
                  <Activity className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-tertiary)] text-xs">Avg/Day</span>
                  <span className="text-white font-bold text-base">{Math.round(totalLogins / 7)}</span>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_1.5fr_1fr] gap-4">
              {/* Sol - İstatistikler */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--text-muted)]" />
                  <span className="text-[var(--text-muted)] text-sm">Growth</span>
                  <span className="text-green-400 font-bold text-xl">+18%</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-white/30" />
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Logins</p>
                      <p className="text-white font-semibold">{totalLogins.toLocaleString('en-US')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-white/30" />
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Enrollments</p>
                      <p className="text-white font-semibold">{totalEnrollments}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-white/30" />
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">Completions</p>
                      <p className="text-white font-semibold">{totalCompletions}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orta - Radar Chart */}
              <div className="flex items-center justify-center">
                <div className="w-full h-[280px]">
                  <RadialBarChart
                    data={[
                      { name: "Logins", value: totalLogins },
                      { name: "Enrollments", value: totalEnrollments * 10 },
                      { name: "Completions", value: totalCompletions * 10 }
                    ]}
                  />
                </div>
              </div>

              {/* Sağ - Legend */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chartColors.primary }} />
                    <span className="text-[var(--text-tertiary)] text-sm">Logins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chartColors.secondary }} />
                    <span className="text-[var(--text-tertiary)] text-sm">Enrollments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.chartColors.tertiary }} />
                    <span className="text-[var(--text-tertiary)] text-sm">Completions</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </div>
                  <span className="text-[var(--text-tertiary)] text-xs">Avg/Day</span>
                  <span className="text-white font-bold">{Math.round(totalLogins / 7)}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Revenue Trend */}
        <GlassCard className="p-4 sm:p-6">
          <h3 className="text-[var(--text-secondary)] font-medium text-sm sm:text-base mb-4 sm:mb-6">Revenue Trend</h3>
          <div className="h-[200px] sm:h-[300px]">
            <AreaChart
              data={monthlyRevenueReport.map(m => ({
                month: m.month,
                revenue: m.courses + m.ebooks + m.bootcamps
              }))}
              xKey="month"
              yKey="revenue"
            />
          </div>
        </GlassCard>

        {/* Report Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <GlassCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-medium text-sm sm:text-base truncate">Course Performance</h4>
                <p className="text-[var(--text-muted)] text-xs sm:text-sm truncate">Detailed analytics</p>
              </div>
            </div>
            <GlassButton variant="ghost" className="w-full text-xs sm:text-sm" onClick={() => handleExport("Course Performance")}>
              Generate
            </GlassButton>
          </GlassCard>

          <GlassCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-medium text-sm sm:text-base truncate">Financial Report</h4>
                <p className="text-[var(--text-muted)] text-xs sm:text-sm truncate">Revenue & transactions</p>
              </div>
            </div>
            <GlassButton variant="ghost" className="w-full text-xs sm:text-sm" onClick={() => handleExport("Financial")}>
              Generate
            </GlassButton>
          </GlassCard>

          <GlassCard className="p-4 sm:p-6 hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-white font-medium text-sm sm:text-base truncate">User Analytics</h4>
                <p className="text-[var(--text-muted)] text-xs sm:text-sm truncate">User behavior</p>
              </div>
            </div>
            <GlassButton variant="ghost" className="w-full text-xs sm:text-sm" onClick={() => handleExport("User Analytics")}>
              Generate
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
