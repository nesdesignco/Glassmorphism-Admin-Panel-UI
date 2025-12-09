"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton, GlassInput, GlassModal } from "@/components/glass"
import { DataTable } from "@/components/shared"
import { ebooksData } from "@/lib/mock-data"
import {
  Plus,
  Search,
  Book,
  Star,
  DollarSign,
  Edit,
  Trash2,
  ShoppingCart,
  User,
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

interface Ebook {
  id: number
  title: string
  author: string
  price: number
  sales: number
  category: string
  rating: number
  image?: string
}

export default function EbooksPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>(ebooksData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: ""
  })

  const filteredEbooks = ebooks.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddNew = () => {
    setEditingEbook(null)
    setFormData({ title: "", author: "", price: "", category: "" })
    setIsModalOpen(true)
  }

  const handleEdit = (ebook: Ebook) => {
    setEditingEbook(ebook)
    setFormData({
      title: ebook.title,
      author: ebook.author,
      price: ebook.price.toString(),
      category: ebook.category
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this e-book?")) {
      setEbooks(ebooks.filter(e => e.id !== id))
    }
  }

  const handleSubmit = () => {
    if (editingEbook) {
      setEbooks(ebooks.map(e =>
        e.id === editingEbook.id
          ? { ...e, ...formData, price: parseFloat(formData.price) }
          : e
      ))
    } else {
      const newEbook: Ebook = {
        id: Math.max(...ebooks.map(e => e.id)) + 1,
        title: formData.title,
        author: formData.author,
        price: parseFloat(formData.price),
        sales: 0,
        category: formData.category,
        rating: 0
      }
      setEbooks([...ebooks, newEbook])
    }
    setIsModalOpen(false)
  }

  const columns = [
    {
      key: "title",
      header: "E-Book",
      render: (ebook: Ebook) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[rgba(255,255,255,var(--ui-opacity-5))] border border-white/[0.04]">
            {ebook.image ? (
              <Image
                src={ebook.image}
                alt={ebook.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Book className="w-5 h-5 text-[var(--text-muted)]" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-white">{ebook.title}</p>
            <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
              <User className="w-3 h-3" />
              {ebook.author}
            </p>
          </div>
        </div>
      )
    },
    {
      key: "category",
      header: "Category",
      render: (ebook: Ebook) => (
        <span className="text-[var(--text-secondary)]">{ebook.category}</span>
      )
    },
    {
      key: "price",
      header: "Price",
      render: (ebook: Ebook) => (
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-400" />
          <span className="text-[var(--text-secondary)]">{ebook.price.toFixed(2)}</span>
        </div>
      )
    },
    {
      key: "sales",
      header: "Sales",
      render: (ebook: Ebook) => (
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-secondary)]">{ebook.sales}</span>
        </div>
      )
    },
    {
      key: "rating",
      header: "Rating",
      render: (ebook: Ebook) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-[var(--text-secondary)]">{ebook.rating}</span>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (ebook: Ebook) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => handleEdit(ebook)}
            className="p-2 rounded-lg hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-colors"
          >
            <Edit className="w-4 h-4 text-[var(--text-tertiary)]" />
          </button>
          <button
            onClick={() => handleDelete(ebook.id)}
            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )
    }
  ]

  const totalSales = ebooks.reduce((sum, e) => sum + e.sales, 0)
  const totalRevenue = ebooks.reduce((sum, e) => sum + e.price * e.sales, 0)

  return (
    <div className="min-h-screen pb-8">
      <Header title="E-Books" tabs={navigationTabs} />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Book className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">E-Books</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{ebooks.length}</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Sales</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{totalSales}</p>
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
          <GlassCard className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-5))] flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-muted)] text-[10px] sm:text-sm truncate">Rating</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {(ebooks.reduce((sum, e) => sum + e.rating, 0) / ebooks.length).toFixed(1)}
                </p>
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
                  placeholder="Search e-books..."
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
                  <DropdownMenuLabel className="text-[var(--text-tertiary)]">Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    All E-Books
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    Development
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    Design
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                    Marketing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <GlassButton variant="primary" onClick={handleAddNew} className="self-end sm:self-auto">
              <Plus className="w-4 h-4" />
              Add E-Book
            </GlassButton>
          </div>
        </GlassCard>

        {/* E-Books Table */}
        <DataTable columns={columns} data={filteredEbooks} />
      </div>

      {/* Add/Edit Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEbook ? "Edit E-Book" : "Add New E-Book"}
        size="lg"
      >
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-[var(--text-tertiary)] text-sm mb-2">Title</label>
            <GlassInput
              placeholder="Enter e-book title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[var(--text-tertiary)] text-sm mb-2">Author</label>
              <GlassInput
                placeholder="Author name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[var(--text-tertiary)] text-sm mb-2">Price ($)</label>
              <GlassInput
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-[var(--text-tertiary)] text-sm mb-2">Category</label>
            <GlassInput
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <GlassButton variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" className="flex-1" onClick={handleSubmit}>
              {editingEbook ? "Save Changes" : "Add E-Book"}
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}
