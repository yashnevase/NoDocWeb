/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nodoc: {
          red: "#D7192F",
          darkred: "#8F1020",
          accent: "#FF4D5A",
          dark: "#080808",
          surface: "#111111",
          light: "#F7F7F5",
        },
        gray: {
          DEFAULT: "#86868b",
          100: "#d1d1d1",
          200: "#c0c0c0",
          300: "#a8a8a8",
        },
        zinc: "#101010",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};