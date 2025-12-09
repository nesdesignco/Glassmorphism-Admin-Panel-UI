"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout"
import { StatsRow } from "@/components/shared"
import { AreaChart, DonutChart } from "@/components/charts"
import { GlassCard } from "@/components/glass/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  statsData,
  revenueData,
  withdrawalRequests,
  topCourses,
  courseOverviewData
} from "@/lib/mock-data"
import { navigationTabs } from "@/lib/navigation"
import { useTheme } from "@/contexts/theme-context"
import {
  GraduationCap,
  BookOpen,
  Users,
  UserCheck,
  ArrowRight,
  Maximize2,
  Minimize2,
  BarChart3,
  Search,
  TrendingUp,
  ShoppingCart,
  UserCircle,
  BookMarked
} from "lucide-react"

const bestSellingCourses = [...topCourses].sort((a, b) => b.sales - a.sales)

export default function Dashboard() {
  const [courseTab, setCourseTab] = useState<'top' | 'best'>('top')
  const { colors } = useTheme()

  const displayedCourses = courseTab === 'top' ? topCourses : bestSellingCourses

  // Legend colors from theme
  const legendColors = [
    colors.chartColors.primary,
    colors.chartColors.secondary,
    colors.chartColors.tertiary,
    colors.gradientTo,
    colors.chartColors.primary + "cc",
    colors.chartColors.secondary + "cc"
  ]

  return (
    <div className="min-h-screen pb-8">
      <Header title="Dashboard Overview" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-6 mt-6">
        <StatsRow
          stats={[
            {
              title: "Courses",
              value: statsData.courses.total,
              icon: <GraduationCap className="w-5 h-5 text-[var(--text-muted)]" />,
              subStats: [
                { label: "Active Courses", value: statsData.courses.active },
                { label: "Upcoming Courses", value: statsData.courses.upcoming },
              ],
            },
            {
              title: "Number of Lessons",
              value: statsData.lessons.total,
              icon: <BookOpen className="w-5 h-5 text-[var(--text-muted)]" />,
              subStats: [
                { label: "Active Lessons", value: statsData.lessons.active },
                { label: "Upcoming Lessons", value: statsData.lessons.upcoming },
              ],
            },
            {
              title: "Number of Enrollment",
              value: statsData.enrollments.total,
              icon: <UserCheck className="w-5 h-5 text-[var(--text-muted)]" />,
              subStats: [
                { label: "Passes Enrollment", value: statsData.enrollments.passed },
                { label: "New Enrollment", value: statsData.enrollments.new },
              ],
            },
            {
              title: "Number of Students",
              value: statsData.students.total,
              icon: <Users className="w-5 h-5 text-[var(--text-muted)]" />,
              subStats: [
                { label: "Active Students", value: statsData.students.active },
                { label: "New Students", value: statsData.students.new },
              ],
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <GlassCard variant="liquid" noPadding>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-[var(--text-tertiary)] font-medium text-sm sm:text-base">Admin Revenue</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[95px] sm:w-[120px] h-7 sm:h-8 glass-input border-white/[0.08] text-[var(--text-tertiary)] text-[10px] sm:text-sm">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent className="glass-dropdown border-white/[0.08] min-w-0 w-[95px] sm:w-[120px]">
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="h-[200px] sm:h-[280px]">
                <AreaChart data={revenueData} xKey="month" yKey="revenue" />
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="liquid" noPadding>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-[var(--text-tertiary)] font-medium text-sm sm:text-base">Requested Withdrawal</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[95px] sm:w-[120px] h-7 sm:h-8 glass-input border-white/[0.08] text-[var(--text-tertiary)] text-[10px] sm:text-sm">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent className="glass-dropdown border-white/[0.08] min-w-0 w-[95px] sm:w-[120px]">
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {withdrawalRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className={`flex items-center justify-between p-2 sm:p-3 rounded-xl hover:bg-[rgba(255,255,255,var(--ui-opacity-5))] transition-all duration-300 animate-fade-in stagger-${index + 1}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border border-[rgba(255,255,255,var(--glass-border-opacity))]">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-[var(--text-muted)] text-[10px] sm:text-xs truncate">{request.email}</p>
                        <p className="text-white font-medium text-xs sm:text-sm truncate">{request.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-[var(--text-muted)] text-[10px] sm:text-xs">Amount</p>
                        <p className="text-white font-semibold text-sm sm:text-base">${request.amount.toFixed(2)}</p>
                      </div>
                      <Button
                        variant="glass"
                        size="icon"
                        className="rounded-full w-7 h-7 sm:w-9 sm:h-9"
                      >
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <GlassCard variant="liquid" noPadding>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={() => setCourseTab('top')}
                    className={`font-medium text-xs sm:text-sm pb-2 border-b-2 transition-colors ${
                      courseTab === 'top'
                        ? 'text-white border-white/60'
                        : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-tertiary)]'
                    }`}
                  >
                    Top Courses
                  </button>
                  <button
                    onClick={() => setCourseTab('best')}
                    className={`font-medium text-xs sm:text-sm pb-2 border-b-2 transition-colors ${
                      courseTab === 'best'
                        ? 'text-white border-white/60'
                        : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-tertiary)]'
                    }`}
                  >
                    Best Selling
                  </button>
                </div>
                <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {displayedCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`flex items-center justify-between p-2 sm:p-3 rounded-xl hover:bg-[rgba(255,255,255,var(--ui-opacity-5))] transition-all duration-300 animate-fade-in stagger-${index + 1}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-white/[0.04] flex-shrink-0">
                        <Image
                          src={course.image}
                          alt={course.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white font-medium text-xs sm:text-sm truncate">{course.name}</span>
                    </div>
                    <Badge className="bg-[rgba(255,255,255,var(--ui-opacity-10))] text-[var(--text-secondary)] border-[rgba(255,255,255,var(--glass-border-opacity))] px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium flex-shrink-0">
                      {course.sales} Sales
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="liquid" noPadding>
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-white font-medium text-sm sm:text-base">Course Overview</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button variant="glass" size="icon-sm" className="flex rounded-lg w-6 h-6 sm:w-8 sm:h-8">
                    <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[95px] sm:w-[120px] h-7 sm:h-8 glass-input border-white/[0.08] text-[var(--text-tertiary)] text-[10px] sm:text-sm">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent className="glass-dropdown border-white/[0.08] min-w-0 w-[95px] sm:w-[120px]">
                      <SelectItem value="7days">7 Days</SelectItem>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Mobile Layout */}
              <div className="lg:hidden">
                <div className="flex items-start gap-4">
                  {/* Donut Chart - Sol */}
                  <div className="flex-shrink-0 w-[120px] h-[120px]">
                    <DonutChart data={courseOverviewData} innerRadius={35} outerRadius={55} centerValue="27%" />
                  </div>

                  {/* Stats - Sağ */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">XII Crash Course</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <TrendingUp className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-[var(--text-muted)] text-xs">Increased</span>
                      <span className="text-green-400 font-bold text-base">270%</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="flex items-center gap-1.5">
                        <ShoppingCart className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                        <div>
                          <p className="text-[var(--text-muted)] text-[10px]">Sell</p>
                          <p className="text-white font-semibold text-sm">12</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCircle className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                        <div>
                          <p className="text-[var(--text-muted)] text-[10px]">Students</p>
                          <p className="text-white font-semibold text-sm">8</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                        <div>
                          <p className="text-[var(--text-muted)] text-[10px]">Lessons</p>
                          <p className="text-white font-semibold text-sm">16/24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend + Total Pending - Alt kısım */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {courseOverviewData.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: legendColors[index % legendColors.length] }}
                        />
                        <span className="text-[var(--text-muted)] text-[10px]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-[rgba(255,255,255,var(--glass-border-opacity))] flex-shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                    <span className="text-[var(--text-tertiary)] text-[10px]">Pending</span>
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_1.5fr_1fr] gap-4">
                {/* Sol - İstatistikler */}
                <div className="flex flex-col items-start gap-4">
                  <div>
                    <p className="text-white font-medium text-base">XII Crash Course</p>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="w-5 h-5 text-[var(--text-muted)]" />
                      <span className="text-[var(--text-muted)] text-sm">Increased</span>
                      <span className="text-green-400 font-bold text-xl">270%</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 text-white/30 flex-shrink-0" />
                      <div>
                        <p className="text-[var(--text-muted)] text-xs">New Sell</p>
                        <p className="text-white font-semibold text-base">12</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserCircle className="w-5 h-5 text-white/30 flex-shrink-0" />
                      <div>
                        <p className="text-[var(--text-muted)] text-xs">Active Students</p>
                        <p className="text-white font-semibold text-base">8</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookMarked className="w-5 h-5 text-white/30 flex-shrink-0" />
                      <div>
                        <p className="text-[var(--text-muted)] text-xs">Lesson Completed</p>
                        <p className="text-white font-semibold text-base">16 of 24</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orta - Donut Chart */}
                <div className="flex items-center justify-center min-w-0 overflow-visible">
                  <div className="w-full h-[220px] min-w-[180px] max-w-[220px]">
                    <DonutChart data={courseOverviewData} innerRadius={60} outerRadius={95} centerValue="27%" />
                  </div>
                </div>

                {/* Sağ - Legend ve özet */}
                <div className="flex flex-col items-end gap-4">
                  {/* Legend items - dikey liste */}
                  <div className="flex flex-col gap-1.5">
                    {courseOverviewData.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: legendColors[index % legendColors.length] }}
                        />
                        <span className="text-[var(--text-tertiary)] text-xs">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* SAĞ - Total Pending */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-[rgba(255,255,255,var(--glass-border-opacity))] flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-[var(--text-tertiary)]" />
                    </div>
                    <span className="text-[var(--text-tertiary)] text-xs">Total Pending</span>
                    <span className="text-white font-bold text-base">4</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
