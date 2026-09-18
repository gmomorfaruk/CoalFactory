import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#090B0D", // Deepest coal
          900: "#0F1216", // Main dark canvas
          850: "#14181D", // Elevated surface
          800: "#1A2027", // Card surface
          700: "#27313C", // Border & subtle line
          600: "#3D4B5B", // Secondary text / inactive
          500: "#5D6F83", // Muted
          400: "#8B9BB0", // Secondary light
          300: "#BAC6D4", // Text subtle
          200: "#E1E7EE", // Text primary dark mode
          100: "#F4F6F8", // Off-white
          50: "#F9FAFB",
        },
        ember: {
          900: "#7C2D12",
          800: "#9A3412",
          700: "#C2410C",
          600: "#EA580C",
          500: "#F97316", // Vibrant glowing ember
          400: "#FB923C",
          300: "#FDBA74",
          200: "#FED7AA",
          100: "#FFEDD5",
          50: "#FFF7ED",
        },
        factory: {
          steel: "#475569",
          slate: "#334155",
          zinc: "#71717A",
        }
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        bengali: [
          "var(--font-bengali)",
          "'Hind Siliguri'",
          "'Noto Sans Bengali'",
          "sans-serif",
        ],
      },
      boxShadow: {
        'ember-glow': '0 0 25px -5px rgba(249, 115, 22, 0.25)',
        'ember-glow-strong': '0 0 35px -2px rgba(249, 115, 22, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
