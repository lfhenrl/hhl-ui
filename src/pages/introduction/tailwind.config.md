## Tailwind.config.js

This is how I define tailwind
<br>
Please notice the hhlTailwind plugin.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/hhl-ui/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("./node_modules/hhl-ui/hhlTailwind")]
};
```
