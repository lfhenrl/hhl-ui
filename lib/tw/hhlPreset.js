/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
import getIcons from "c:/kode/tw/tw/icons/getIcons.mjs";
const icons = getIcons();
console.log("ico", icons);

module.exports = {
  plugins: [
    plugin(function ({ addComponents, addBase, addUtilities, theme }) {
      addComponents([icons]), addBase([require("./Base.js")]), addUtilities([require("./Utilities.js")]);
    }),
  ],
  theme: {
    colors: require("./Theme.js"),
  },
};
