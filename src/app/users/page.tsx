"use client"

import { useState } from "react"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton, GlassInput, GlassModal } from "@/components/glass"
import { DataTable } from "@/components/shared"
import { usersData } from "@/lib/mock-data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  User,
  Mail,
  Calendar,
  BookOpen,
  Edit,
  Trash2,
  Shield,
  Filter
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { navigationTabs } from "@/lib/navigation"

interface UserData {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  courses: number
  avatar?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(usersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    status: "active"
  })

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleAddNew = () => {
    setEditingUser(null)
    setFormData({ name: "", email: "", role: "Student", status: "active" })
    setIsModalOpen(true)
  }

  const handleEdit = (user: UserData) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingUser) {
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, ...formData }
          : u
      ))
    } else {
      const newUser: UserData = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        joinDate: new Date().toISOString().split("T")[0],
        courses: 0
      }
      setUsers([...users, newUser])
    }
    setIsModalOpen(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "bg-red-500/20 text-red-400"
      case "Instructor": return "bg-blue-500/20 text-blue-400"
      default: return "bg-green-500/20 text-green-400"
    }
  }

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: UserData) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-[rgba(255,255,255,var(--glass-border-opacity))]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {user.email}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "role",
      header: "Role",
      render: (user: UserData) => (
        <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
          <Shield className="w-3 h-3 inline mr-1" />
          {user.role}
        </span>
      )
    },
    {
      key: "courses",
      header: "Courses",
      render: (user: UserData) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{user.courses}</span>
        </div>
      )
    },
    {
      key: "joinDate",
      header: "Join Date",
      render: (user: UserData) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (user: UserData) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          user.status === "active"
            ? "bg-green-500/20 text-green-400"
            : "bg-gray-500/20 text-gray-400"
        }`}>
          {user.status}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: UserData) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleEdit(user)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-colors"
          >
            <Edit className="w-4 h-4 text-[var(--text-tertiary)]" />
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )
    }
  ]

  const adminCount = users.filter(u => u.role === "Admin").length
  const instructorCount = users.filter(u => u.role === "Instructor").length
  const studentCount = users.filter(u => u.role === "Student").length

  return (
    <div className="min-h-screen pb-8">
      <Header title="User Management" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Users</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Admins</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{adminCount}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Instructors</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{instructorCount}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Students</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{studentCount}</p>
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
                  placeholder="Search users..."
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
                <DropdownMenuContent className="glass border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <DropdownMenuLabel className="text-[var(--text-tertiary)]">Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setRoleFilter("all")}
                  >
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setRoleFilter("Admin")}
                  >
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setRoleFilter("Instructor")}
                  >
                    Instructor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer"
                    onClick={() => setRoleFilter("Student")}
                  >
                    Student
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <GlassButton variant="primary" onClick={handleAddNew} className="self-end sm:self-auto">
              <Plus className="w-4 h-4" />
              Add User
            </GlassButton>
          </div>
        </GlassCard>

        {/* Users Table */}
        <DataTable columns={columns} data={filteredUsers} />
      </div>

      {/* Add/Edit Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit User" : "Add New User"}
        size="md"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-[var(--text-tertiary)] text-sm mb-2">Name</label>
            <GlassInput
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-[var(--text-tertiary)] text-sm mb-2">Email</label>
            <GlassInput
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[var(--text-tertiary)] text-sm mb-2">Role</label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="w-full glass-input border-[rgba(255,255,255,var(--glass-border-opacity))] text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="glass border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <SelectItem value="Student" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Student</SelectItem>
                  <SelectItem value="Instructor" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Instructor</SelectItem>
                  <SelectItem value="Admin" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[var(--text-tertiary)] text-sm mb-2">Status</label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="w-full glass-input border-[rgba(255,255,255,var(--glass-border-opacity))] text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="glass border-[rgba(255,255,255,var(--glass-border-opacity))]">
                  <SelectItem value="active" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Active</SelectItem>
                  <SelectItem value="inactive" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <GlassButton variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" className="flex-1" onClick={handleSubmit}>
              {editingUser ? "Save Changes" : "Add User"}
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}
