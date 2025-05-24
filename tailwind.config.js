/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'IBM Plex Sans Fallback'],
      },
    },
    colors: {
      slate: {
        800: '#1E293B',
      },
      grey: {
        500: '#EBEBEB',
      },
    },
  },
  plugins: [],
}
