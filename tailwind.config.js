/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Scan all EJS files in the views directory
    './src/**/*.js', // Scan all JS files in the src directory
  ],

  theme: {
    extend: {},
  },
  variants: {
    extend: {
      fontSize: ['responsive'],
    },
  },
  plugins: [],
}

