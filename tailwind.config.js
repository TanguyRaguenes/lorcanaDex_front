/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      fontFamily: {
        'Roboto': ['Roboto', 'sans-serif'],
        'Satisfy': ['Satisfy', 'sans-serif']
      }
    },
  },
  plugins: [],
}
