/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00a9a4',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}