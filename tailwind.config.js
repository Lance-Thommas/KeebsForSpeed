/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        {
            pattern: /(text|bg|hover:text|hover:bg)-(red|green|blue|gray|white|black|yellow|pink|purple|indigo|lime|amber|cyan|teal|orange)-(100|200|300|400|500|600|700|800|900)/,
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
