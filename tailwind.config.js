/** @type {import('tailwindcss').Config} */
//const plugin = require("tailwindcss/plugin");

//delete require.cache["./lib/styles/tw/hhlPreset.js"];
import hhl from "./lib/styles/tw/hhlPreset";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,md,html}", "./lib/**/*.{vue,js,ts,jsx,tsx}"],
  presets: [hhl],
};
