/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "anti-flash-white": "var(--anti-flash-white)",
        "bright-white": "var(--bright-white)",
        "glaucous": "var(--glaucous)",
        "light-periwinkle": "var(--light-periwinkle)",
        "notification-box": "var(--notification-box)",
        "prussian-blue": "var(--prussian-blue)",
        "prussian-blue-dark": "var(--prussian-blue-dark)",
        "text": "var(--text)",
      },
    },
  },
  plugins: [],
};