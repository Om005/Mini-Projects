/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cu_black": "rgb(0 0 0 / 43%)",
        "cu_green": "rgb(220 252 231)"
      }
    },
  },
  plugins: [],
}