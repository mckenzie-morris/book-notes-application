/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Scan all EJS files in the views directory
    './src/**/*.js', // Scan all JS files in the src directory
  ],

  theme: {
    extend: {
      colors: {
        primaryTheme: 'rgba(var(--primary))',
        secondaryTheme: 'rgba(var(--secondary))',
        tertiaryTheme: 'rgba(var(--tertiary))',
        quaternaryTheme: 'rgba(var(--quaternary))',
      },
    },
  },
  plugins: [],
};
