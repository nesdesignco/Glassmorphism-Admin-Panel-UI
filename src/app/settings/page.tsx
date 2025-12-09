"use client"

import { useState } from "react"
import { Header } from "@/components/layout"
import { GlassCard, GlassButton, GlassInput } from "@/components/glass"
import { useTheme } from "@/contexts/theme-context"
import { Slider } from "@/components/ui/slider"
import {
  User,
  Bell,
  Palette,
  Globe,
  Shield,
  Mail,
  Phone,
  Camera,
  Save,
  Check,
  Type,
  Layers,
  ChevronDown,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const {
    themeColor,
    setThemeColor,
    availableColors,
    themeFont,
    setThemeFont,
    availableFonts,
    backgroundColor,
    setBackgroundColor,
    glassSettings,
    setGlassPreset,
    setGlassCustomValue,
    resetGlassToPreset
  } = useTheme()
  const [glassAdvancedOpen, setGlassAdvancedOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@clasy.com",
    phone: "+1 234 567 890",
    bio: "Admin at Clasy Learning Platform"
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  })

  const handleSaveProfile = () => {
    alert("Profile saved successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences saved!")
  }

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "security", name: "Security", icon: Shield },
  ]

  return (
    <div className="min-h-screen pb-8">
      <Header title="Settings" />

      <div className="px-4 sm:px-6 space-y-4 sm:space-y-6 mt-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="lg:w-56">
            <GlassCard className="p-3">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full justify-start gap-2.5 h-9 px-3 text-sm font-normal glass ${
                        activeTab === tab.id
                          ? "ring-1 ring-[rgba(var(--theme-primary-rgb),0.5)] text-theme"
                          : "text-[var(--text-tertiary)] hover:text-theme"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </Button>
                  )
                })}
              </nav>
            </GlassCard>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                      <User className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Profile Information</h3>
                      <p className="text-[var(--text-muted)] text-sm">Update your personal details</p>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">JD</span>
                      </div>
                      <button className="absolute -bottom-1 -right-1 p-2 rounded-full glass-button">
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-white font-medium">{profileData.name}</p>
                      <p className="text-[var(--text-muted)] text-sm">Admin</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-theme text-sm mb-2">Full Name</label>
                        <GlassInput
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-theme text-sm mb-2">Email</label>
                        <GlassInput
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-theme text-sm mb-2">Phone Number</label>
                      <GlassInput
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-theme text-sm mb-2">Bio</label>
                      <textarea
                        className="w-full px-4 py-2.5 rounded-lg glass-input text-white placeholder:text-[var(--text-muted)] text-sm resize-none h-24"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                    <GlassButton variant="primary" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </GlassButton>
                  </div>
                </GlassCard>
              </>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                    <Bell className="w-5 h-5 text-theme" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Notification Preferences</h3>
                    <p className="text-[var(--text-muted)] text-sm">Manage how you receive notifications</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive email updates about your account", icon: Mail },
                    { key: "push", label: "Push Notifications", desc: "Receive push notifications on your device", icon: Bell },
                    { key: "sms", label: "SMS Notifications", desc: "Receive text messages for important updates", icon: Phone },
                    { key: "marketing", label: "Marketing Emails", desc: "Receive news and promotional content", icon: Globe },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl glass"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-theme" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.label}</p>
                            <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key as keyof typeof notifications]
                          })}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            notifications[item.key as keyof typeof notifications]
                              ? "bg-theme-gradient"
                              : "bg-theme-gradient"
                          }`}
                        >
                          <div
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              notifications[item.key as keyof typeof notifications]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    )
                  })}

                  <GlassButton variant="primary" onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </GlassButton>
                </div>
              </GlassCard>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                {/* Theme Color Selection */}
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                        <Palette className="w-5 h-5 text-theme" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Theme Color</h3>
                        <p className="text-[var(--text-muted)] text-sm">Choose your accent color</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {availableColors.map(({ key, colors }) => (
                        <button
                          key={key}
                          onClick={() => setThemeColor(key)}
                          className={`w-6 h-6 rounded-full transition-all ${
                            themeColor === key
                              ? "ring-2 ring-white ring-offset-1 ring-offset-black/50 scale-110"
                              : "hover:scale-110"
                          }`}
                          style={{ background: colors.gradientFrom }}
                          title={colors.name}
                        />
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* Glass Effect */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                      <Layers className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Glass Effect</h3>
                      <p className="text-[var(--text-muted)] text-sm">Control the glassmorphism intensity</p>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                    {(["off", "subtle", "normal", "strong", "custom"] as const).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => preset !== "custom" && setGlassPreset(preset)}
                        disabled={preset === "custom"}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all glass ${
                          glassSettings.preset === preset
                            ? "ring-1 ring-[rgba(var(--theme-primary-rgb),0.5)] text-theme"
                            : preset === "custom"
                              ? "text-white/30 cursor-not-allowed"
                              : "text-[var(--text-tertiary)] hover:text-white"
                        }`}
                      >
                        {preset.charAt(0).toUpperCase() + preset.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Advanced Settings */}
                  <div>
                    <button
                      onClick={() => setGlassAdvancedOpen(!glassAdvancedOpen)}
                      className="flex items-center justify-between w-full text-[var(--text-tertiary)] hover:text-white transition-colors"
                    >
                      <span className="text-sm font-medium">Advanced Settings</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${glassAdvancedOpen ? "rotate-180" : ""}`} />
                    </button>

                    {glassAdvancedOpen && (
                      <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-[rgba(255,255,255,var(--glass-border-opacity))]">
                        <Slider
                          label="Background Opacity"
                          value={Math.round(glassSettings.opacity * 100)}
                          onChange={(v) => setGlassCustomValue("opacity", v / 100)}
                          min={0}
                          max={20}
                          step={1}
                          valueLabel={`${Math.round(glassSettings.opacity * 100)}%`}
                        />

                        <Slider
                          label="Blur Amount"
                          value={glassSettings.blur}
                          onChange={(v) => setGlassCustomValue("blur", v)}
                          min={0}
                          max={40}
                          step={2}
                          valueLabel={`${glassSettings.blur}px`}
                        />

                        <Slider
                          label="Border Opacity"
                          value={Math.round(glassSettings.borderOpacity * 100)}
                          onChange={(v) => setGlassCustomValue("borderOpacity", v / 100)}
                          min={0}
                          max={30}
                          step={1}
                          valueLabel={`${Math.round(glassSettings.borderOpacity * 100)}%`}
                        />

                        <Slider
                          label="Saturation"
                          value={glassSettings.saturation}
                          onChange={(v) => setGlassCustomValue("saturation", v)}
                          min={100}
                          max={200}
                          step={10}
                          valueLabel={`${glassSettings.saturation}%`}
                        />

                        {glassSettings.preset === "custom" && (
                          <div className="pt-2">
                            <GlassButton
                              variant="ghost"
                              size="sm"
                              onClick={() => resetGlassToPreset("normal")}
                            >
                              Reset to Normal
                            </GlassButton>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>

                {/* Background Color */}
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                        <Palette className="w-5 h-5 text-theme" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Background Color</h3>
                        <p className="text-[var(--text-muted)] text-sm">Set the main background color</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {[
                        { color: "#0a0a0a", name: "Midnight" },
                        { color: "#0d1117", name: "GitHub Dark" },
                        { color: "#1a1b26", name: "Tokyo Night" },
                        { color: "#191724", name: "Rosé Pine" },
                        { color: "#11111b", name: "Catppuccin" },
                        { color: "#1e1e2e", name: "Mocha" },
                        { color: "#0f172a", name: "Slate" },
                        { color: "#18181b", name: "Zinc" },
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => setBackgroundColor(preset.color)}
                          className={`w-6 h-6 rounded-full transition-all border border-white/20 ${
                            backgroundColor === preset.color
                              ? "ring-2 ring-white ring-offset-1 ring-offset-black/50 scale-110"
                              : "hover:scale-110"
                          }`}
                          style={{ backgroundColor: preset.color }}
                          title={preset.name}
                        />
                      ))}
                    </div>
                  </div>
                </GlassCard>

                {/* Font Selection */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                      <Type className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Font Family</h3>
                      <p className="text-[var(--text-muted)] text-sm">Select your preferred font</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    {availableFonts.map(({ key, config }) => (
                      <button
                        key={key}
                        onClick={() => setThemeFont(key)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl glass transition-all ${
                          themeFont === key ? "ring-1 ring-[rgba(var(--theme-primary-rgb),0.5)]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="text-2xl text-[var(--text-secondary)]"
                            style={{ fontFamily: config.fontFamily }}
                          >
                            Aa
                          </span>
                          <span className="text-sm text-theme">
                            {config.name}
                          </span>
                        </div>
                        {themeFont === key && (
                          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,var(--ui-opacity-15))] flex items-center justify-center">
                            <Check className="w-4 h-4 text-theme" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </GlassCard>

              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Password Card */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Change Password</h3>
                      <p className="text-[var(--text-muted)] text-sm">Update your password regularly</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-theme text-sm mb-2">Current Password</label>
                      <GlassInput type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="block text-theme text-sm mb-2">New Password</label>
                      <GlassInput type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-theme text-sm mb-2">Confirm New Password</label>
                      <GlassInput type="password" placeholder="Confirm new password" />
                    </div>

                    <GlassButton variant="primary">
                      <Shield className="w-4 h-4" />
                      Update Password
                    </GlassButton>
                  </div>
                </GlassCard>

                {/* 2FA Card */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,var(--ui-opacity-10))] flex items-center justify-center">
                      <Lock className="w-5 h-5 text-theme" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-[var(--text-muted)] text-sm">Add an extra layer of security</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl glass">
                    <div>
                      <p className="text-white font-medium">2FA Status</p>
                      <p className="text-[var(--text-muted)] text-sm">Currently disabled</p>
                    </div>
                    <GlassButton variant="primary">Enable 2FA</GlassButton>
                  </div>
                </GlassCard>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
