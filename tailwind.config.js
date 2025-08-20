/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <- garante que pega seus componentes React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
