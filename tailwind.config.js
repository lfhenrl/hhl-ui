/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,md}",
    "./lib/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [require("./lib/hhlTailwind")],
};
