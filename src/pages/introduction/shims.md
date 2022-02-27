#

::: warning
NOTE: to avoid error when you import \*.vue files you have to add the following shims-vue.d.ts file in ./src folder:
:::

```js
declare module "*.vue" {
  import { ComponentOptions, App } from "vue";
  const ComponentOptions: ComponentOptions;
  export default ComponentOptions;
}

declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}
```
