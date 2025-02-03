// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"], // 👈 مسیر را بررسی کن
  theme: {
    extend: {
      colors: {
        neonBlue: "#00E5FF",
        neonPink: "#FF00FF",
        darkBg: "#0A0A0A",
        cardBg: "#111111",
      },
      fontFamily: {
        gaming: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
