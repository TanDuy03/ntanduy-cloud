/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0rem 0.3125rem 0.3125rem 0rem rgba(82, 63, 105, 0.05)'
      }
    },
    fontFamily: {},
  },
  plugins: [],
}
