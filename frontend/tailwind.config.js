/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        russo: ['"Russo One"', 'sans-serif'], // Add this
      },
    },
  },
  plugins: [],
}
