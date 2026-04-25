/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'c_white': 'rgba(255, 255, 255, 0.248)'
      }
    },
  },
  plugins: [],
}