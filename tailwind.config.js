/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Scan all EJS files in the views directory
    './src/**/*.js', // Scan all JS files in the src directory
  ],

  theme: {
    extend: {
      colors: {
        backgroundTheme: 'rgba(var(--background))',
        borderTheme: 'rgba(var(--border))',
        primaryTheme: 'rgba(var(--primary))',
        secondaryTheme: 'rgba(var(--secondary))',
      },
    },
  },
  plugins: [],
};
