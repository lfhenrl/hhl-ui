/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
//delete require.cache["./icons/getIcons.mjs"];
import getIcons from "./icons/getIcons";
import base from "./base";
import utilities from "./Utilities";
import Themes from "./Theme";
//var iconsx = getIcons();
//console.log("ico", iconsx);

module.exports = {
  plugins: [
    plugin(function ({ addComponents, addBase, addUtilities, theme }) {
      addComponents([getIcons]), addBase([base]), addUtilities([utilities]);
    }),
  ],
  theme: {
    colors: Themes,
  },
};
