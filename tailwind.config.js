/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './*.html',
    './_posts/**/*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F1BE48',
          light:   '#F9D57A',
          dark:    '#C8960E',
        },
        royal: {
          DEFAULT: '#6B3FA0',
          light:   '#9B6FD0',
          dark:    '#4B1F80',
        },
        site: {
          bg:  '#FAFAF7',
          bg2: '#F4F4F1',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow':  'floatSlow 7s ease-in-out infinite',
        'float-fast':  'floatFast 5s ease-in-out infinite',
        bounce2: 'bounce2 2s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        bounce2: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%':      { transform: 'translateX(-50%) translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}
