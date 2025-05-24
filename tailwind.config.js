const plugin = require('tailwindcss/plugin')

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
      transparent: 'transparent',
      white: '#FFF',
      slate: {
        800: '#1E293B',
      },
      grey: {
        400: '#F5F5F5',
        500: '#EBEBEB',
        600: '#E1E1E1',
        700: '#D6D6D6',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visible'])
      addVariant('group-hocus', ':merge(.group):is(:hover,:focus-visible) &')
    }),
  ],
}
