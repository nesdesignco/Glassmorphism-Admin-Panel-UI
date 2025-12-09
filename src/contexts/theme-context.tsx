"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type ThemeColor = "slate" | "orange" | "indigo" | "purple" | "emerald" | "rose" | "amber" | "blue"
export type ThemeFont = "inter" | "poppins" | "roboto" | "montserrat" | "space-grotesk"
export type GlassPreset = "off" | "subtle" | "normal" | "strong" | "custom"

export interface GlassSettings {
  preset: GlassPreset
  opacity: number      // 0 - 0.20
  blur: number         // 0 - 40
  borderOpacity: number // 0 - 0.30
  saturation: number   // 100 - 200
  // Hover add values
  hoverOpacityAdd: number   // 0 - 0.10
  hoverBorderAdd: number    // 0 - 0.15
}

// UI Opacity settings - for consistent component styling
export interface UIOpacitySettings {
  opacity5: number    // default 0.05
  opacity10: number   // default 0.10
  opacity15: number   // default 0.15
  opacity20: number   // default 0.20
  opacity40: number   // default 0.40
  opacity60: number   // default 0.60
  opacity80: number   // default 0.80
}

// Text color opacity settings
export interface TextColorSettings {
  primary: number     // default 1.0
  secondary: number   // default 0.80
  tertiary: number    // default 0.60
  muted: number       // default 0.40
}

// Background gradient settings
export interface BGGradientSettings {
  opacity1: number    // default 0.12
  opacity2: number    // default 0.10
  opacity3: number    // default 0.04
}

// Scrollbar settings
export interface ScrollbarSettings {
  track: number       // default 0.05
  thumb: number       // default 0.15
  thumbHover: number  // default 0.25
}

// Chart color settings
export interface ChartColorSettings {
  gridOpacity: number   // default 0.05
  axisOpacity: number   // default 0.10
  textOpacity: number   // default 0.50
}

export const GLASS_PRESETS: Record<Exclude<GlassPreset, "custom">, Omit<GlassSettings, "preset">> = {
  off: { opacity: 0, blur: 0, borderOpacity: 0.10, saturation: 100, hoverOpacityAdd: 0.02, hoverBorderAdd: 0.05 },
  subtle: { opacity: 0.06, blur: 16, borderOpacity: 0.10, saturation: 150, hoverOpacityAdd: 0.02, hoverBorderAdd: 0.05 },
  normal: { opacity: 0.12, blur: 24, borderOpacity: 0.18, saturation: 180, hoverOpacityAdd: 0.02, hoverBorderAdd: 0.05 },
  strong: { opacity: 0.18, blur: 32, borderOpacity: 0.25, saturation: 200, hoverOpacityAdd: 0.02, hoverBorderAdd: 0.05 }
}

const DEFAULT_GLASS_SETTINGS: GlassSettings = {
  preset: "subtle",
  ...GLASS_PRESETS.subtle
}

const DEFAULT_UI_OPACITY: UIOpacitySettings = {
  opacity5: 0.05,
  opacity10: 0.10,
  opacity15: 0.15,
  opacity20: 0.20,
  opacity40: 0.40,
  opacity60: 0.60,
  opacity80: 0.80
}

const DEFAULT_TEXT_COLORS: TextColorSettings = {
  primary: 1.0,
  secondary: 0.80,
  tertiary: 0.60,
  muted: 0.40
}

const DEFAULT_BG_GRADIENT: BGGradientSettings = {
  opacity1: 0.12,
  opacity2: 0.10,
  opacity3: 0.04
}

const DEFAULT_SCROLLBAR: ScrollbarSettings = {
  track: 0.05,
  thumb: 0.15,
  thumbHover: 0.25
}

const DEFAULT_CHART_COLORS: ChartColorSettings = {
  gridOpacity: 0.05,
  axisOpacity: 0.10,
  textOpacity: 0.50
}

interface ThemeColors {
  primary: string
  primaryRgb: string
  gradientFrom: string
  gradientTo: string
  name: string
  chartColors: {
    primary: string
    secondary: string
    tertiary: string
  }
}

interface FontConfig {
  name: string
  fontFamily: string
  googleFont: string
}

const themeColorMap: Record<ThemeColor, ThemeColors> = {
  slate: {
    primary: "215 25% 63%",
    primaryRgb: "148, 162, 180",
    gradientFrom: "#94a2b4",
    gradientTo: "#7a8a9e",
    name: "Slate",
    chartColors: { primary: "#94a2b4", secondary: "#b0a5c1", tertiary: "#a5b5b0" }
  },
  orange: {
    primary: "25 70% 63%",
    primaryRgb: "217, 152, 105",
    gradientFrom: "#d99869",
    gradientTo: "#c78555",
    name: "Peach",
    chartColors: { primary: "#d99869", secondary: "#c7a582", tertiary: "#b89aa5" }
  },
  indigo: {
    primary: "239 50% 68%",
    primaryRgb: "150, 153, 200",
    gradientFrom: "#9699c8",
    gradientTo: "#8385ba",
    name: "Lavender",
    chartColors: { primary: "#9699c8", secondary: "#b096b5", tertiary: "#96b0b5" }
  },
  purple: {
    primary: "270 45% 68%",
    primaryRgb: "175, 150, 200",
    gradientFrom: "#af96c8",
    gradientTo: "#9880b0",
    name: "Lilac",
    chartColors: { primary: "#af96c8", secondary: "#c896a5", tertiary: "#96b2c8" }
  },
  emerald: {
    primary: "160 40% 58%",
    primaryRgb: "117, 168, 148",
    gradientFrom: "#75a894",
    gradientTo: "#5f9680",
    name: "Sage",
    chartColors: { primary: "#75a894", secondary: "#94a89e", tertiary: "#9e94a8" }
  },
  rose: {
    primary: "350 50% 68%",
    primaryRgb: "200, 145, 155",
    gradientFrom: "#c89199",
    gradientTo: "#b27c85",
    name: "Blush",
    chartColors: { primary: "#c89199", secondary: "#b89e94", tertiary: "#949eb8" }
  },
  amber: {
    primary: "45 55% 63%",
    primaryRgb: "198, 175, 125",
    gradientFrom: "#c6af7d",
    gradientTo: "#b29c6a",
    name: "Sand",
    chartColors: { primary: "#c6af7d", secondary: "#b8b094", tertiary: "#94b0b8" }
  },
  blue: {
    primary: "210 50% 65%",
    primaryRgb: "135, 165, 200",
    gradientFrom: "#87a5c8",
    gradientTo: "#7292b2",
    name: "Sky",
    chartColors: { primary: "#87a5c8", secondary: "#96b8c8", tertiary: "#c896a5" }
  }
}

const fontMap: Record<ThemeFont, FontConfig> = {
  inter: {
    name: "Inter",
    fontFamily: "'Inter', sans-serif",
    googleFont: "Inter:wght@300;400;500;600;700"
  },
  poppins: {
    name: "Poppins",
    fontFamily: "'Poppins', sans-serif",
    googleFont: "Poppins:wght@300;400;500;600;700"
  },
  roboto: {
    name: "Roboto",
    fontFamily: "'Roboto', sans-serif",
    googleFont: "Roboto:wght@300;400;500;700"
  },
  montserrat: {
    name: "Montserrat",
    fontFamily: "'Montserrat', sans-serif",
    googleFont: "Montserrat:wght@300;400;500;600;700"
  },
  "space-grotesk": {
    name: "Space Grotesk",
    fontFamily: "'Space Grotesk', sans-serif",
    googleFont: "Space+Grotesk:wght@300;400;500;600;700"
  }
}

interface ThemeContextType {
  themeColor: ThemeColor
  setThemeColor: (color: ThemeColor) => void
  colors: ThemeColors
  availableColors: { key: ThemeColor; colors: ThemeColors }[]
  themeFont: ThemeFont
  setThemeFont: (font: ThemeFont) => void
  fontConfig: FontConfig
  availableFonts: { key: ThemeFont; config: FontConfig }[]
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  // Glass settings
  glassSettings: GlassSettings
  setGlassPreset: (preset: GlassPreset) => void
  setGlassCustomValue: (key: keyof Omit<GlassSettings, "preset">, value: number) => void
  resetGlassToPreset: (preset: Exclude<GlassPreset, "custom">) => void
  // UI Opacity settings
  uiOpacity: UIOpacitySettings
  setUIOpacity: (key: keyof UIOpacitySettings, value: number) => void
  resetUIOpacity: () => void
  // Text color settings
  textColors: TextColorSettings
  setTextColor: (key: keyof TextColorSettings, value: number) => void
  resetTextColors: () => void
  // BG Gradient settings
  bgGradient: BGGradientSettings
  setBgGradient: (key: keyof BGGradientSettings, value: number) => void
  resetBgGradient: () => void
  // Scrollbar settings
  scrollbar: ScrollbarSettings
  setScrollbar: (key: keyof ScrollbarSettings, value: number) => void
  resetScrollbar: () => void
  // Chart color settings
  chartColors: ChartColorSettings
  setChartColor: (key: keyof ChartColorSettings, value: number) => void
  resetChartColors: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>("slate")
  const [themeFont, setThemeFontState] = useState<ThemeFont>("inter")
  const [backgroundColor, setBackgroundColorState] = useState<string>("#0a0a0a")
  const [glassSettings, setGlassSettingsState] = useState<GlassSettings>(DEFAULT_GLASS_SETTINGS)
  const [uiOpacity, setUIOpacityState] = useState<UIOpacitySettings>(DEFAULT_UI_OPACITY)
  const [textColors, setTextColorsState] = useState<TextColorSettings>(DEFAULT_TEXT_COLORS)
  const [bgGradient, setBgGradientState] = useState<BGGradientSettings>(DEFAULT_BG_GRADIENT)
  const [scrollbar, setScrollbarState] = useState<ScrollbarSettings>(DEFAULT_SCROLLBAR)
  const [chartColors, setChartColorsState] = useState<ChartColorSettings>(DEFAULT_CHART_COLORS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedColor = localStorage.getItem("theme-color") as ThemeColor
    if (savedColor && themeColorMap[savedColor]) {
      setThemeColorState(savedColor)
    }
    const savedFont = localStorage.getItem("theme-font") as ThemeFont
    if (savedFont && fontMap[savedFont]) {
      setThemeFontState(savedFont)
    }
    const savedBgColor = localStorage.getItem("theme-bg-color")
    if (savedBgColor) {
      // Prevent light colors - check if color is too bright
      const hex = savedBgColor.replace("#", "")
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      // If brightness > 50, reset to default dark
      if (brightness > 50) {
        setBackgroundColorState("#0a0a0a")
        localStorage.setItem("theme-bg-color", "#0a0a0a")
      } else {
        setBackgroundColorState(savedBgColor)
      }
    }
    // Load glass settings
    const savedGlass = localStorage.getItem("theme-glass")
    if (savedGlass) {
      try {
        const parsed = JSON.parse(savedGlass)
        // Merge with defaults to ensure all properties exist (handles old localStorage data)
        setGlassSettingsState({
          ...DEFAULT_GLASS_SETTINGS,
          ...parsed
        })
      } catch {
        // Use default on parse error
      }
    }
    // Load UI opacity settings
    const savedUIOpacity = localStorage.getItem("theme-ui-opacity")
    if (savedUIOpacity) {
      try {
        setUIOpacityState(JSON.parse(savedUIOpacity))
      } catch { /* Use default */ }
    }
    // Load text color settings
    const savedTextColors = localStorage.getItem("theme-text-colors")
    if (savedTextColors) {
      try {
        setTextColorsState(JSON.parse(savedTextColors))
      } catch { /* Use default */ }
    }
    // Load BG gradient settings
    const savedBgGradient = localStorage.getItem("theme-bg-gradient")
    if (savedBgGradient) {
      try {
        setBgGradientState(JSON.parse(savedBgGradient))
      } catch { /* Use default */ }
    }
    // Load scrollbar settings
    const savedScrollbar = localStorage.getItem("theme-scrollbar")
    if (savedScrollbar) {
      try {
        setScrollbarState(JSON.parse(savedScrollbar))
      } catch { /* Use default */ }
    }
    // Load chart color settings
    const savedChartColors = localStorage.getItem("theme-chart-colors")
    if (savedChartColors) {
      try {
        setChartColorsState(JSON.parse(savedChartColors))
      } catch { /* Use default */ }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const colors = themeColorMap[themeColor]
    const root = document.documentElement
    root.style.setProperty("--theme-primary", colors.primary)
    root.style.setProperty("--theme-primary-rgb", colors.primaryRgb)
    root.style.setProperty("--theme-gradient-from", colors.gradientFrom)
    root.style.setProperty("--theme-gradient-to", colors.gradientTo)
    localStorage.setItem("theme-color", themeColor)
  }, [themeColor, mounted])

  useEffect(() => {
    if (!mounted) return
    const font = fontMap[themeFont]
    const root = document.documentElement
    const linkId = "google-font-link"
    let link = document.getElementById(linkId) as HTMLLinkElement
    if (!link) {
      link = document.createElement("link")
      link.id = linkId
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`
    root.style.setProperty("--font-family", font.fontFamily)
    document.body.style.fontFamily = font.fontFamily
    localStorage.setItem("theme-font", themeFont)
  }, [themeFont, mounted])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.style.setProperty("--theme-bg-color", backgroundColor)
    localStorage.setItem("theme-bg-color", backgroundColor)
  }, [backgroundColor, mounted])

  // Apply glass CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--glass-opacity", glassSettings.opacity.toString())
    root.style.setProperty("--glass-blur", `${glassSettings.blur}px`)
    root.style.setProperty("--glass-border-opacity", glassSettings.borderOpacity.toString())
    root.style.setProperty("--glass-saturation", `${glassSettings.saturation}%`)
    root.style.setProperty("--glass-hover-opacity-add", glassSettings.hoverOpacityAdd.toString())
    root.style.setProperty("--glass-hover-border-add", glassSettings.hoverBorderAdd.toString())
    localStorage.setItem("theme-glass", JSON.stringify(glassSettings))
  }, [glassSettings, mounted])

  // Apply UI opacity CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--ui-opacity-5", uiOpacity.opacity5.toString())
    root.style.setProperty("--ui-opacity-10", uiOpacity.opacity10.toString())
    root.style.setProperty("--ui-opacity-15", uiOpacity.opacity15.toString())
    root.style.setProperty("--ui-opacity-20", uiOpacity.opacity20.toString())
    root.style.setProperty("--ui-opacity-40", uiOpacity.opacity40.toString())
    root.style.setProperty("--ui-opacity-60", uiOpacity.opacity60.toString())
    root.style.setProperty("--ui-opacity-80", uiOpacity.opacity80.toString())
    localStorage.setItem("theme-ui-opacity", JSON.stringify(uiOpacity))
  }, [uiOpacity, mounted])

  // Apply text color CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--text-primary", `rgba(255, 255, 255, ${textColors.primary})`)
    root.style.setProperty("--text-secondary", `rgba(255, 255, 255, ${textColors.secondary})`)
    root.style.setProperty("--text-tertiary", `rgba(255, 255, 255, ${textColors.tertiary})`)
    root.style.setProperty("--text-muted", `rgba(255, 255, 255, ${textColors.muted})`)
    localStorage.setItem("theme-text-colors", JSON.stringify(textColors))
  }, [textColors, mounted])

  // Apply BG gradient CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--bg-gradient-opacity-1", bgGradient.opacity1.toString())
    root.style.setProperty("--bg-gradient-opacity-2", bgGradient.opacity2.toString())
    root.style.setProperty("--bg-gradient-opacity-3", bgGradient.opacity3.toString())
    localStorage.setItem("theme-bg-gradient", JSON.stringify(bgGradient))
  }, [bgGradient, mounted])

  // Apply scrollbar CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--scrollbar-track", scrollbar.track.toString())
    root.style.setProperty("--scrollbar-thumb", scrollbar.thumb.toString())
    root.style.setProperty("--scrollbar-thumb-hover", scrollbar.thumbHover.toString())
    localStorage.setItem("theme-scrollbar", JSON.stringify(scrollbar))
  }, [scrollbar, mounted])

  // Apply chart color CSS variables
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.style.setProperty("--chart-grid-opacity", chartColors.gridOpacity.toString())
    root.style.setProperty("--chart-axis-opacity", chartColors.axisOpacity.toString())
    root.style.setProperty("--chart-text-opacity", chartColors.textOpacity.toString())
    localStorage.setItem("theme-chart-colors", JSON.stringify(chartColors))
  }, [chartColors, mounted])

  const setThemeColor = (color: ThemeColor) => setThemeColorState(color)
  const setThemeFont = (font: ThemeFont) => setThemeFontState(font)
  const setBackgroundColor = (color: string) => setBackgroundColorState(color)

  // Glass setter functions
  const setGlassPreset = (preset: GlassPreset) => {
    if (preset === "custom") {
      setGlassSettingsState(prev => ({ ...prev, preset: "custom" }))
    } else {
      setGlassSettingsState({ preset, ...GLASS_PRESETS[preset] })
    }
  }

  const setGlassCustomValue = (key: keyof Omit<GlassSettings, "preset">, value: number) => {
    setGlassSettingsState(prev => ({
      ...prev,
      preset: "custom",
      [key]: value
    }))
  }

  const resetGlassToPreset = (preset: Exclude<GlassPreset, "custom">) => {
    setGlassSettingsState({ preset, ...GLASS_PRESETS[preset] })
  }

  // UI Opacity setter functions
  const setUIOpacity = (key: keyof UIOpacitySettings, value: number) => {
    setUIOpacityState(prev => ({ ...prev, [key]: value }))
  }
  const resetUIOpacity = () => setUIOpacityState(DEFAULT_UI_OPACITY)

  // Text color setter functions
  const setTextColor = (key: keyof TextColorSettings, value: number) => {
    setTextColorsState(prev => ({ ...prev, [key]: value }))
  }
  const resetTextColors = () => setTextColorsState(DEFAULT_TEXT_COLORS)

  // BG gradient setter functions
  const setBgGradient = (key: keyof BGGradientSettings, value: number) => {
    setBgGradientState(prev => ({ ...prev, [key]: value }))
  }
  const resetBgGradient = () => setBgGradientState(DEFAULT_BG_GRADIENT)

  // Scrollbar setter functions
  const setScrollbar = (key: keyof ScrollbarSettings, value: number) => {
    setScrollbarState(prev => ({ ...prev, [key]: value }))
  }
  const resetScrollbar = () => setScrollbarState(DEFAULT_SCROLLBAR)

  // Chart color setter functions
  const setChartColor = (key: keyof ChartColorSettings, value: number) => {
    setChartColorsState(prev => ({ ...prev, [key]: value }))
  }
  const resetChartColors = () => setChartColorsState(DEFAULT_CHART_COLORS)

  const availableColors = Object.entries(themeColorMap).map(([key, colors]) => ({
    key: key as ThemeColor,
    colors
  }))

  const availableFonts = Object.entries(fontMap).map(([key, config]) => ({
    key: key as ThemeFont,
    config
  }))

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
        colors: themeColorMap[themeColor],
        availableColors,
        themeFont,
        setThemeFont,
        fontConfig: fontMap[themeFont],
        availableFonts,
        backgroundColor,
        setBackgroundColor,
        glassSettings,
        setGlassPreset,
        setGlassCustomValue,
        resetGlassToPreset,
        uiOpacity,
        setUIOpacity,
        resetUIOpacity,
        textColors,
        setTextColor,
        resetTextColors,
        bgGradient,
        setBgGradient,
        resetBgGradient,
        scrollbar,
        setScrollbar,
        resetScrollbar,
        chartColors,
        setChartColor,
        resetChartColors
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
