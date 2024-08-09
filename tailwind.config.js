/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

module.exports = {
  content: {
    files: [
      /* scan all files (of specified types below) for their use of Tailwind classes.
    Only the styles actually used will be included the final CSS output */
      "./views/**/*.ejs", // scan all EJS files in the views directory
      "./src/**/*.js", // scan all JS files in the src directory
    ],
    extract
  },

  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        primaryTheme: "rgba(var(--primary))",
        secondaryTheme: "rgba(var(--secondary))",
        tertiaryTheme: "rgba(var(--tertiary))",
        quaternaryTheme: "rgba(var(--quaternary))",
      },
    },
  },
  plugins: [require("@designbycode/tailwindcss-text-shadow"), require('fluid-tailwind')],
};
