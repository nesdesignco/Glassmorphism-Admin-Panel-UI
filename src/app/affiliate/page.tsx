"use client"

import { useState } from "react"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton, GlassInput, GlassModal } from "@/components/glass"
import { DataTable } from "@/components/shared"
import { affiliateData } from "@/lib/mock-data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Share2,
  DollarSign,
  Users,
  Calendar,
  Edit,
  Trash2,
  Mail,
  Copy,
  CheckCircle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Affiliate {
  id: number
  name: string
  email: string
  referrals: number
  earnings: number
  status: string
  joinDate: string
  avatar?: string
}

export default function AffiliatePage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>(affiliateData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active"
  })

  const filteredAffiliates = affiliates.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddNew = () => {
    setEditingAffiliate(null)
    setFormData({ name: "", email: "", status: "active" })
    setIsModalOpen(true)
  }

  const handleEdit = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate)
    setFormData({
      name: affiliate.name,
      email: affiliate.email,
      status: affiliate.status
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this affiliate?")) {
      setAffiliates(affiliates.filter(a => a.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingAffiliate) {
      setAffiliates(affiliates.map(a =>
        a.id === editingAffiliate.id
          ? { ...a, ...formData }
          : a
      ))
    } else {
      const newAffiliate: Affiliate = {
        id: Math.max(...affiliates.map(a => a.id)) + 1,
        name: formData.name,
        email: formData.email,
        referrals: 0,
        earnings: 0,
        status: formData.status,
        joinDate: new Date().toISOString().split("T")[0]
      }
      setAffiliates([...affiliates, newAffiliate])
    }
    setIsModalOpen(false)
  }

  const copyAffiliateLink = (id: number) => {
    navigator.clipboard.writeText(`https://sedela.com/ref/${id}`)
    alert("Affiliate link copied!")
  }

  const columns = [
    {
      key: "name",
      header: "Affiliate",
      render: (affiliate: Affiliate) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-[rgba(255,255,255,var(--glass-border-opacity))]">
            <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
            <AvatarFallback>
              {affiliate.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white">{affiliate.name}</p>
            <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {affiliate.email}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "referrals",
      header: "Referrals",
      render: (affiliate: Affiliate) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{affiliate.referrals}</span>
        </div>
      )
    },
    {
      key: "earnings",
      header: "Earnings",
      render: (affiliate: Affiliate) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-[var(--text-secondary)]">{affiliate.earnings.toFixed(2)}</span>
        </div>
      )
    },
    {
      key: "joinDate",
      header: "Join Date",
      render: (affiliate: Affiliate) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{new Date(affiliate.joinDate).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (affiliate: Affiliate) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          affiliate.status === "active"
            ? "bg-green-500/20 text-green-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}>
          {affiliate.status}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (affiliate: Affiliate) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => copyAffiliateLink(affiliate.id)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-colors"
            title="Copy Link"
          >
            <Copy className="w-4 h-4 text-[var(--text-tertiary)]" />
          </button>
          <button
            onClick={() => handleEdit(affiliate)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-colors"
          >
            <Edit className="w-4 h-4 text-[var(--text-tertiary)]" />
          </button>
          <button
            onClick={() => handleDelete(affiliate.id)}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )
    }
  ]

  const totalReferrals = affiliates.reduce((sum, a) => sum + a.referrals, 0)
  const totalEarnings = affiliates.reduce((sum, a) => sum + a.earnings, 0)
  const activeAffiliates = affiliates.filter(a => a.status === "active").length

  return (
    <div className="min-h-screen pb-8">
      <Header title="Affiliate Program" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Affiliates</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{affiliates.length}</p>
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
                <p className="text-lg sm:text-2xl font-bold text-white">{activeAffiliates}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Referrals</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{totalReferrals}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Payouts</p>
                <p className="text-lg sm:text-2xl font-bold text-white">${(totalEarnings / 1000).toFixed(0)}k</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Actions Bar */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <GlassInput
                  placeholder="Search..."
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
                  <DropdownMenuLabel className="text-[var(--text-tertiary)]">Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    All Affiliates
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <GlassButton variant="primary" onClick={handleAddNew} className="flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Affiliate</span>
              <span className="sm:hidden">Add</span>
            </GlassButton>
          </div>
        </GlassCard>

        {/* Affiliates Table */}
        <DataTable columns={columns} data={filteredAffiliates} />
      </div>

      {/* Add/Edit Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAffiliate ? "Edit Affiliate" : "Add New Affiliate"}
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
          <div>
            <label className="block text-[var(--text-tertiary)] text-sm mb-2">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="w-full glass-input border-[rgba(255,255,255,var(--glass-border-opacity))] text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="glass border-[rgba(255,255,255,var(--glass-border-opacity))]">
                <SelectItem value="active" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Active</SelectItem>
                <SelectItem value="pending" className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <GlassButton variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" className="flex-1" onClick={handleSubmit}>
              {editingAffiliate ? "Save Changes" : "Add Affiliate"}
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}
