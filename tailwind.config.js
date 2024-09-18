/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

/* import getIcons from "./lib/tw/icons/getIcons.mjs";
const icons = getIcons();
console.log("icons", icons); */
delete require.cache["./lib/tw/hhlPreset.js"];

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,md,html}", "./lib/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [require("./lib/tw/hhlPreset.js")],
  safelist: [
    {
      pattern: /ico-+/,
    },
  ],
};
