/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tomo: {
          red: '#DA240E',
          green: '#48BB78',
          cream: '#FFF8F0',
          dark: '#111827',
          gray: '#374151',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Bernoru', 'Montserrat', 'sans-serif'], // Fallback to Montserrat if Bernoru not loaded
      }
    },
  },
  plugins: [],
}
