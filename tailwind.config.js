/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'serif'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#f7f7f2',
        accent: '#16a34a',
        sun: '#f59e0b',
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
