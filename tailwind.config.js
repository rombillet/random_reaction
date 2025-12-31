/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0b0b0f',
        mist: '#f5f5f7',
        cloud: '#ffffff',
        smoke: '#e5e5ea',
        chrome: '#1c1c1e',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        numberPop: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 400ms ease-out',
        'number-pop': 'numberPop 250ms ease-out',
      },
    },
  },
  plugins: [],
};
