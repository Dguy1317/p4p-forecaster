/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1026",
          light: "#131A3A",
          card: "#0F1530",
        },
        gold: {
          DEFAULT: "#E8A838",
          light: "#F0C060",
          dark: "#C48A20",
        },
        accent: {
          yellow: "#E8A838",
          pink: "#E84878",
          coral: "#E87848",
          cyan: "#48C8E8",
        },
      },
      fontFamily: {
        heading: ["Gabarito", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
