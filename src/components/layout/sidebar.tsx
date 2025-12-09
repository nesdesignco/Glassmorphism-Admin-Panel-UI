"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  Rocket,
  Users,
  Book,
  UserPlus,
  BarChart3,
  Share2,
  User,
  Settings,
  ChevronDown,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen, hasSubmenu: true },
  { name: "Bootcamp", href: "/bootcamp", icon: Rocket, hasSubmenu: true },
  { name: "Team Training", href: "/team-training", icon: Users, hasSubmenu: true },
  { name: "EBook", href: "/ebooks", icon: Book, hasSubmenu: true },
  { name: "Enrollments", href: "/enrollments", icon: UserPlus, hasSubmenu: true },
  { name: "Reports", href: "/reports", icon: BarChart3, hasSubmenu: true },
  { name: "Affiliate", href: "/affiliate", icon: Share2, hasSubmenu: true },
  { name: "Users", href: "/users", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 glass-sidebar z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,var(--glass-border-opacity))]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-theme-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-white">Clasy</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-88px)]">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "glass text-white"
                    : "text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-white" : "text-[var(--text-muted)] group-hover:text-white"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.hasSubmenu && (
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-white" : "text-[var(--text-muted)]"
                  )} />
                )}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
