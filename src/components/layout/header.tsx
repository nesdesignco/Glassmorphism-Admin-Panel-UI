"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  Bell,
  HelpCircle,
  Grid3X3,
  Sparkles,
  Settings,
  ChevronDown,
  User,
  LogOut,
  CreditCard,
  Wand2,
  MessageSquare,
  Brain,
  BookOpen,
  FileQuestion,
  LifeBuoy,
  Mail,
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  Home,
  Rocket,
  Book,
  UserPlus,
  Share2,
  X
} from "lucide-react"

// Mobile navigation items
const mobileNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Bootcamp", href: "/bootcamp", icon: Rocket },
  { name: "Team Training", href: "/team-training", icon: Users },
  { name: "EBook", href: "/ebooks", icon: Book },
  { name: "Enrollments", href: "/enrollments", icon: UserPlus },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Affiliate", href: "/affiliate", icon: Share2 },
  { name: "Users", href: "/users", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface Tab {
  name: string
  href: string
  hasDropdown?: boolean
}

interface HeaderProps {
  title: string
  tabs?: Tab[]
}

export function Header({ title, tabs }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <TooltipProvider>
      <header className="relative z-50 px-4 sm:px-6 pt-4">
        {/* Top Bar - Logo and Icons */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-theme-gradient flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-white">Clasy</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            {/* Settings - hidden on mobile */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/settings" className="hidden md:block">
                  <Button variant="glass-circle" size="icon-lg">
                    <Settings className="w-5 h-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            {/* AI Features Dropdown - hidden on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass-circle" size="icon-lg" className="hidden md:flex">
                  <Sparkles className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass border-[rgba(255,255,255,var(--glass-border-opacity))]" align="end" sideOffset={12}>
                <DropdownMenuLabel className="text-[var(--text-tertiary)]">AI Features</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Wand2 className="mr-2 h-4 w-4" />
                  <span>AI Assistant</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Chat with AI</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Brain className="mr-2 h-4 w-4" />
                  <span>Smart Suggestions</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Apps Dropdown - hidden on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass-circle" size="icon-lg" className="hidden md:flex">
                  <Grid3X3 className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass border-[rgba(255,255,255,var(--glass-border-opacity))]" align="end" sideOffset={12}>
                <DropdownMenuLabel className="text-[var(--text-tertiary)]">Applications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team Management</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Dropdown - hidden on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass-circle" size="icon-lg" className="hidden md:flex">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass border-[rgba(255,255,255,var(--glass-border-opacity))]" align="end" sideOffset={12}>
                <DropdownMenuLabel className="text-[var(--text-tertiary)]">Help & Support</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <FileQuestion className="mr-2 h-4 w-4" />
                  <span>FAQs</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support Center</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact Us</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="glass-circle" size="icon-lg" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-theme-gradient rounded-full border-2" style={{ borderColor: 'var(--theme-bg-color)' }} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[85vw] sm:w-80 glass border-[rgba(255,255,255,var(--glass-border-opacity))]" align="end" sideOffset={12}>
                <DropdownMenuLabel className="text-[var(--text-tertiary)]">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer flex-col items-start">
                  <span className="font-medium">New enrollment request</span>
                  <span className="text-xs text-[var(--text-muted)]">John Doe enrolled in React Course</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer flex-col items-start">
                  <span className="font-medium">Payment received</span>
                  <span className="text-xs text-[var(--text-muted)]">$299.00 from Jane Smith</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer flex-col items-start">
                  <span className="font-medium">Course completed</span>
                  <span className="text-xs text-[var(--text-muted)]">5 students completed JavaScript Basics</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer justify-center">
                  <span className="text-sm">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="ml-2 border-2 border-[rgba(255,255,255,var(--glass-border-opacity))] hover:border-[rgba(255,255,255,var(--ui-opacity-20))] transition-colors cursor-pointer">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass border-[rgba(255,255,255,var(--glass-border-opacity))]" align="end" sideOffset={12}>
                <DropdownMenuLabel className="text-[var(--text-tertiary)]">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-[var(--text-muted)]">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-[var(--text-secondary)] focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-white cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[rgba(255,255,255,var(--ui-opacity-10))]" />
                <DropdownMenuItem className="text-red-400 focus:bg-[rgba(255,255,255,var(--ui-opacity-10))] focus:text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="glass-header px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4 overflow-x-auto">
            {/* Desktop: LayoutDashboard icon, Mobile: Menu icon (opens drawer) */}
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <LayoutDashboard className="hidden md:block w-5 h-5" />
              <Menu className="md:hidden w-5 h-5" />
            </Button>

            {/* Title */}
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white whitespace-nowrap flex-shrink-0">
              {title}
            </h1>

            {/* Tabs - hidden on mobile */}
            {tabs && tabs.length > 0 && (
              <nav className="hidden md:flex items-center gap-1 ml-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href)) || (tab.href === "/" && pathname === "/")

                  return (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                        isActive
                          ? "bg-theme-gradient text-white"
                          : "text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))]"
                      )}
                    >
                      {tab.name}
                      {tab.hasDropdown && (
                        <ChevronDown className="w-4 h-4 ml-0.5" />
                      )}
                    </Link>
                  )
                })}
              </nav>
            )}
          </div>
        </div>

        {/* Drawer Menu - Works on both mobile and desktop */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100]">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="absolute left-0 top-0 h-full w-72 glass-sidebar animate-slide-in">
              {/* Header */}
              <div className="p-5 border-b border-[rgba(255,255,255,var(--glass-border-opacity))] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 rounded-xl bg-theme-gradient flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                  <span className="text-xl font-bold text-white">Clasy</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))]"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-88px)]">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "glass text-white"
                          : "text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))]"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-white" : "text-[var(--text-muted)]"
                      )} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}

                {/* Divider */}
                <div className="my-4 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]" />

                {/* Extra Links - AI, Apps, Help */}
                <div className="space-y-1">
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5 text-[var(--text-muted)]" />
                    <span className="font-medium">AI Features</span>
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-all duration-200"
                  >
                    <Grid3X3 className="w-5 h-5 text-[var(--text-muted)]" />
                    <span className="font-medium">Applications</span>
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-tertiary)] hover:text-white hover:bg-[rgba(255,255,255,var(--ui-opacity-10))] transition-all duration-200"
                  >
                    <HelpCircle className="w-5 h-5 text-[var(--text-muted)]" />
                    <span className="font-medium">Help & Support</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </TooltipProvider>
  )
}
