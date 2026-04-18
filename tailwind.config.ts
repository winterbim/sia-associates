import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display uses the same humanist sans as body — SAP's own "72" typeface
        // system does the same (no serif contrast). Weight & size carry hierarchy.
        display: [
          "var(--font-sans)",
          "72",
          "72override",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "72",
          "72override",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        ink: "#0F1318",
        bone: "#F4EFE6",
        gold: "#C8A24B",
        "gold-hover": "#B8923B",
        oxblood: "#6B1F2A",
        graphite: "#2A2F38",
        ash: "#6E6A62",
        "ash-light": "#A8A29A",
        hairline: "#E5DED0",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      letterSpacing: {
        display: "-0.02em",
        "display-tight": "-0.03em",
        kicker: "0.2em",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-reverse": "marquee-reverse 45s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "flow-path": "flowPath 2s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flowPath: {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "20" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
