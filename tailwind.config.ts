import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Healthcoin "Noir Gold" — warm obsidian base
        noir: {
          DEFAULT: "#0b0907",
          900: "#0b0907",
          800: "#120f0b",
          700: "#1a1611",
          600: "#241e17",
        },
        bone: {
          DEFAULT: "#f5f1e8",
          muted: "#d2cabb",
          dim: "#8c8275",
        },
        // Amber / gold / copper accent system (matches Healthcoin deck)
        gold: {
          DEFAULT: "#e0a64e",
          light: "#f5cd86",
          deep: "#a9762f",
        },
        ember: {
          DEFAULT: "#f0902a",
          deep: "#c26a16",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(110deg, transparent 25%, rgba(245,205,134,0.6) 50%, transparent 75%)",
        "noir-fade":
          "linear-gradient(180deg, rgba(11,9,7,0) 0%, rgba(11,9,7,0.7) 60%, #0b0907 100%)",
        // Thin warm grid that echoes the Healthcoin slides
        grid: "linear-gradient(rgba(240,144,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,144,42,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      keyframes: {
        sheen: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        sheen: "sheen 6s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
        glow: "glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
