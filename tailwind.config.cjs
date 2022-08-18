const typographyPlugin = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts,md}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            // Tailwind preserves backticks in markdown
            "code::before": { content: "" },
            "code::after": { content: "" },
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
};
