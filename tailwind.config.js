/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('/images/background.png')",
      },
      fontFamily: {
        body: ['Montserrat", "sans-serif'],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
