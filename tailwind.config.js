/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/views/**/*.pug"],
    theme: {
        extend: {
            colors: {
                customBlue: "#026873",
                customBlue2: "#01343A",
                customYellow: "#BF8C2C",
                customYellow2: "#9F7526",
            },
            fontFamily: {
                Custom: ["Roboto", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
