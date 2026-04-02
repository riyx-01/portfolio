import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060608',
        surface: '#0d0d12',
        glass: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.08)',
        text: '#e8e6f0',
        muted: '#52506a',
        accent: '#7b6cff',
        accent2: '#00d9c0',
        glow: 'rgba(123,108,255,0.15)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset',
      }
    },
  },
  plugins: [],
};
export default config;
