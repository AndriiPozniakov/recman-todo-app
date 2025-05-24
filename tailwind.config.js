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
      white: '#FFF',
      slate: {
        800: '#1E293B',
      },
      grey: {
        400: '#F5F5F5',
        500: '#EBEBEB',
      },
    },
  },
  plugins: [],
}
