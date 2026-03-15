/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        earth:        '#5a3e18',
        'earth-light':'#c9a96e',
        'earth-dark': '#3d2b10',
        moss:         '#3a6449',
        'moss-light': '#4a7c59',
        paper:        '#faf8f4',
        'paper-warm': '#f5f0e8',
        ink:          '#1a1208',
        'ink-mid':    '#2c2416',
        muted:        '#8a7a68',
        border:       '#e2d8cc',
      },
      fontFamily: {
        sans:  ['var(--font-sans)', 'Hiragino Sans', 'Yu Gothic UI', 'Meiryo', 'sans-serif'],
        serif: ['var(--font-serif)', 'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', 'serif'],
      },
      boxShadow: {
        'card':  '0 2px 12px rgba(26, 18, 8, 0.06)',
        'card-hover': '0 12px 40px rgba(26, 18, 8, 0.14)',
      },
    },
  },
  plugins: [],
}
