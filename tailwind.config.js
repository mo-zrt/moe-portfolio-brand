/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#080808',
        'off-white': '#ede9dc',
        blue: { DEFAULT: '#1546ff', light: '#4d7bff' },
        electric: '#e8ff47',
        muted: '#5a5a52',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
