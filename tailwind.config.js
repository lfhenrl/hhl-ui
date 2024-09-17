/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

/* import getIcons from "./hhl/getIcons.mjs";
const icons = getIcons();
console.log("icons", icons); */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/hhl-ui/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [require("./lib/tw/hhlPreset.js")],
  safelist: ["ico-account", "ico-add", "ico-arrow_downward", "ico-arrow_upward", "ico-cast"],
};
