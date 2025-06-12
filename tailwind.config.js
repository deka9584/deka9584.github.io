/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#202125",
        darkGray: "#353535",
        lightBlue : "#138da5",
        purple: "#802a51",
        success: "#39B54A",
        alert: "#e18f00",
        danger: "#bb2000"
      },
      spacing: {
        sm: "4px",
        md: "8px",
        base: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px"
      },
      cursor: {
        plus: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" style="filter: invert(1);" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>') 12 12, default`,
      },
      fontSize: {
        h1: "32px",
        h2: "24px",
        h3: "18px"
      },
    },
  },
  plugins: [],
}

