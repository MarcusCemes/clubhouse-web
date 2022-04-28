const typographyPlugin = require("@tailwindcss/typography");

module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts,md}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    400: "#40a9ff",
                    500: "#1890ff",
                    600: "#096dd9",
                },
            },
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
