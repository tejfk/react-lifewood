/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lifewood-green': '#046241',
        'lifewood-saffron': '#FFB347',
        'paper': '#f5eedb',
        'sea-salt': '#F9F7F7',
           'castleton-green': '#046241',
        'saffron': '#FFB347',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float-1': 'float 6s ease-in-out infinite',
        'float-2': 'float 7s ease-in-out infinite',
        'float-3': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}