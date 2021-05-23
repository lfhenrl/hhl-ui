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