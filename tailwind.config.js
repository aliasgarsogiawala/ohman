/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#0B0B0B',
        cardDark: '#171717',
        cardBorder: '#262626',
        accentLime: '#D9FF3F',
        accentPurple: '#7C3AED',
        textWhite: '#FFFFFF',
        textGray: '#9CA3AF',
        accentSuccess: '#7CFC7C',
        accentDanger: '#FF4D6D'
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Hanken Grotesk', 'Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace']
      },
      boxShadow: {
        'brutal-lime': '4px 4px 0px #D9FF3F',
        'brutal-purple': '4px 4px 0px #7C3AED',
        'brutal-white': '4px 4px 0px #FFFFFF',
        'brutal-dark': '4px 4px 0px #000000',
        'brutal-sm': '2px 2px 0px #D9FF3F',
      }
    },
  },
  plugins: [],
}
