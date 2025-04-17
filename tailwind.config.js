/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fly: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-50px)", opacity: "0" },
        },
      },
      animation: {
        fly: "fly 1s ease-out", // এটা animate-fly ক্লাসে ইউজ হবে
      },
    },
  },
  plugins: [  require('daisyui'),],
}
