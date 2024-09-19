/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
delete require.cache["./icons/getIcons.mjs"];
import getIcons from "./icons/getIcons.mjs";
var iconsx = getIcons();
//console.log("ico", iconsx);

module.exports = {
  plugins: [
    plugin(function ({ addComponents, addBase, addUtilities, theme }) {
      addComponents([iconsx]), addBase([require("./Base.js")]), addUtilities([require("./Utilities.js")]);
    }),
  ],
  theme: {
    colors: require("./Theme.js"),
  },
};
