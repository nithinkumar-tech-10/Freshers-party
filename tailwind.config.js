/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1B3F",
        gold: "#D4AF37",
        "gold-light": "#F5E19A",
        cream: "#FFF8E7",
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

