import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#241512",
        maroon: {
          DEFAULT: "#7A1F2B",
          dark: "#5A1520",
        },
        sand: {
          DEFAULT: "#F5EFE4",
          2: "#EAE0CC",
        },
        stone: "#DDD2B8",
        gold: {
          DEFAULT: "#A9812F",
          light: "#C9A75B",
        },
        ivory: "#FFFDF9",
        text: {
          DEFAULT: "#2B2622",
          soft: "#5B534A",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        arch: "220px 220px 6px 6px",
      },
    },
  },
  plugins: [],
};

export default config;
