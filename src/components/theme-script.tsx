export function ThemeScript() {
  const script = `
    (function() {
      try {
        var d = document.documentElement;

        // Theme colors map
        var colors = {
          slate: { p: "215 25% 70%", rgb: "165, 180, 200", from: "#a5b4c8", to: "#8899b0" },
          orange: { p: "25 70% 70%", rgb: "230, 170, 130", from: "#e6aa82", to: "#d9956a" },
          indigo: { p: "239 50% 75%", rgb: "165, 168, 210", from: "#a5a8d2", to: "#9295c5" },
          purple: { p: "270 45% 75%", rgb: "190, 165, 210", from: "#bea5d2", to: "#a88fc2" },
          emerald: { p: "160 40% 65%", rgb: "130, 185, 165", from: "#82b9a5", to: "#6aa890" },
          rose: { p: "350 50% 75%", rgb: "210, 160, 170", from: "#d2a0aa", to: "#c58a96" },
          amber: { p: "45 55% 70%", rgb: "210, 190, 140", from: "#d2be8c", to: "#c5ae78" },
          blue: { p: "210 50% 72%", rgb: "150, 180, 210", from: "#96b4d2", to: "#80a3c5" }
        };

        // Apply theme color
        var savedColor = localStorage.getItem("theme-color");
        var c = colors[savedColor] || colors.orange;
        d.style.setProperty("--theme-primary", c.p);
        d.style.setProperty("--theme-primary-rgb", c.rgb);
        d.style.setProperty("--theme-gradient-from", c.from);
        d.style.setProperty("--theme-gradient-to", c.to);

        // Apply background color
        var bgColor = localStorage.getItem("theme-bg-color");
        if (bgColor) {
          d.style.setProperty("--theme-bg-color", bgColor);
        }

        // Apply glass settings
        var glass = localStorage.getItem("theme-glass");
        if (glass) {
          var g = JSON.parse(glass);
          d.style.setProperty("--glass-opacity", g.opacity);
          d.style.setProperty("--glass-blur", g.blur + "px");
          d.style.setProperty("--glass-border-opacity", g.borderOpacity);
          d.style.setProperty("--glass-saturation", g.saturation + "%");
        }
      } catch(e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
