const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'IBM Plex Sans Fallback'],
      },
      aria: {
        invalid: 'invalid="true"',
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
      blue: {
        600: '#2563EB',
      },
      red: {
        600: '#DC2626',
        900: '#7F1D1D',
      },
    },
    data: {
      enabled: 'disabled="false"',
      disabled: 'disabled="true"',
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus-visible'])
      addVariant('group-hocus', ':merge(.group):is(:hover,:focus-visible) &')
    }),
  ],
}
