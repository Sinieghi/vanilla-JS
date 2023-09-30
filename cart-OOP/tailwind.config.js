/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["{./index.html, ./scripts/main.js}"],
  theme: {
    listStyleType: {
      none: "none",
      square: "square",
      roman: "upper-roman",
    },
    extend: {},
  },
  plugins: [],
};
