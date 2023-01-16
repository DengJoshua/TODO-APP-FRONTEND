/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f6f6f6",
        "text-general": "#7f7f7f",
        "text-title": "#1a1919"
      }
    }
  },
  plugins: []
};
