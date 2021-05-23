# 

::: warning
NOTE: to avoid error when you import *.vue files you have to add the following shims-vue.d.ts file in ./src folder:
:::

```js
declare module "*.vue" {TypeScript Shims
    import { defineComponent } from "vue";
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}
```