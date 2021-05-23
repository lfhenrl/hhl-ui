# Auto import components

By using the NPM package ["vite-plugin-components"](https://www.npmjs.com/package/vite-plugin-components). You just copy the components you need to your components folder.
Thats all, no needs for import just use it, all is done by this brilliant package from Anthony Fu.


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |



By adding the attribute `disabled` you set the opacity to 0.6 and set the pointer-events: none; & curser: none;


::: tip
You can edit the code examples.
:::

<br>

```js
npm install vite-plugin-components # OR 
yarn add vite-plugin-components

```
<br>

# Package.json

```js
const t = "hej";
```
<br>

```js
{
  "name": "hhl-ui",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "vue": "^3.0.11",
    "vue-router": "^4.0.5"
  },
  "devDependencies": {
    "@fullhuman/postcss-purgecss": "^4.0.3",
    "@vitejs/plugin-vue": "^1.2.1",
    "@vue/compiler-sfc": "^3.0.11",
    "rollup-plugin-visualizer": "^5.3.0",
    "typescript": "^4.2.3",
    "vite": "^2.1.5",
    "vite-plugin-components": "^0.8.4",
    "vite-plugin-voie": "^0.7.3",
    "vue-tsc": "^0.0.18"
  }
}
```