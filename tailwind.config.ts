import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "#0D9488", // Teal 600
          foreground: "#ffffff",
          light: "#F0FDFA", // Teal 50
          dark: "#0F766E", // Teal 700
        },
        muted: {
          DEFAULT: "#f1f5f9", // Slate 100
          foreground: "#64748b", // Slate 500
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
        },
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
        },
        brand: {
          teal: "#0D9488",
          tealLight: "#F0FDFA",
          tealDark: "#0F766E",
          navy: "#0B132B",
          dark: "#0F172A",
          emerald: "#059669",
          amber: "#D97706",
          crimson: "#DC2626",
          purple: "#7C3AED",
        },
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 16px 40px rgba(13, 148, 136, 0.08)',
        'stitch': '0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
        'stitch-hover': '0 12px 32px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'stitch-card': '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 10px 24px -6px rgba(0, 0, 0, 0.04)',
        'glow-teal': '0 0 50px -10px rgba(13, 148, 136, 0.25)',
        'glow-blue': '0 0 40px -10px rgba(37, 99, 235, 0.20)',
        'glow-emerald': '0 0 40px -10px rgba(5, 150, 105, 0.20)',
        'glow-purple': '0 0 40px -10px rgba(124, 58, 237, 0.20)',
      },

      fontFamily: {

        sans: [
          "var(--font-inter)",
          "Be Vietnam Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
