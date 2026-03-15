/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        earth: '#5a3e18',
        'earth-light': '#c9a96e',
        'earth-dark': '#3d2b10',
        moss: '#4a7c59',
        paper: '#faf8f4',
        'paper-warm': '#f5f0e8',
        ink: '#2c2416',
        muted: '#8a7a68',
      },
      fontFamily: {
        sans: ['Hiragino Sans', 'Yu Gothic', 'Meiryo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
