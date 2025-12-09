"use client"

import { useState } from "react"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton, GlassInput, GlassModal } from "@/components/glass"
import { DataTable } from "@/components/shared"
import { enrollmentsData } from "@/lib/mock-data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  UserPlus,
  Mail,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from "lucide-react"
import { navigationTabs } from "@/lib/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Enrollment {
  id: number
  student: string
  email: string
  course: string
  date: string
  status: string
  amount: number
  avatar: string
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(enrollmentsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEnrollments = enrollments.filter(e => {
    const matchesSearch = e.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || e.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: number) => {
    setEnrollments(enrollments.map(e =>
      e.id === id ? { ...e, status: "active" } : e
    ))
  }

  const handleReject = (id: number) => {
    if (confirm("Are you sure you want to reject this enrollment?")) {
      setEnrollments(enrollments.filter(e => e.id !== id))
    }
  }

  const columns = [
    {
      key: "student",
      header: "Student",
      render: (enrollment: Enrollment) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-[rgba(255,255,255,var(--glass-border-opacity))]">
            <AvatarImage src={enrollment.avatar} alt={enrollment.student} />
            <AvatarFallback>
              {enrollment.student.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{enrollment.student}</p>
            <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {enrollment.email}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "course",
      header: "Course",
      render: (enrollment: Enrollment) => (
        <span className="text-[var(--text-secondary)]">{enrollment.course}</span>
      )
    },
    {
      key: "date",
      header: "Date",
      render: (enrollment: Enrollment) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{new Date(enrollment.date).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: "amount",
      header: "Amount",
      render: (enrollment: Enrollment) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-[var(--text-secondary)]">{enrollment.amount.toFixed(2)}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (enrollment: Enrollment) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          enrollment.status === "active"
            ? "bg-green-500/20 text-green-400"
            : enrollment.status === "pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {enrollment.status}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (enrollment: Enrollment) => (
        <div className="flex items-center gap-2 justify-end">
          {enrollment.status === "pending" && (
            <>
              <button
                onClick={() => handleApprove(enrollment.id)}
                className="p-2 rounded-lg hover:bg-green-500/20 transition-colors"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
              </button>
              <button
                onClick={() => handleReject(enrollment.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Reject"
              >
                <XCircle className="w-4 h-4 text-red-400" />
              </button>
            </>
          )}
        </div>
      )
    }
  ]

  const activeCount = enrollments.filter(e => e.status === "active").length
  const pendingCount = enrollments.filter(e => e.status === "pending").length
  const totalRevenue = enrollments.filter(e => e.status !== "pending").reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen pb-8">
      <Header title="Enrollments" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Enrollments</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{enrollments.length}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Active</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{activeCount}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{pendingCount}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-white">${(totalRevenue / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Actions Bar */}
        <GlassCard className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <GlassInput
                  placeholder="Search enrollments..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg glass-button text-[var(--text-secondary)] hover:text-white transition-colors flex-shrink-0">
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-dropdown border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <DropdownMenuLabel className="text-[var(--text-tertiary)]">Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setStatusFilter("all")}
                  >
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setStatusFilter("active")}
                  >
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setStatusFilter("pending")}
                  >
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </GlassCard>

        {/* Enrollments Table */}
        <DataTable columns={columns} data={filteredEnrollments} />
      </div>
    </div>
  )
}
