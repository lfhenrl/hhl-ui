/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399
import '@vue/runtime-core'

export {};

declare module "*.vue" {
  import { ComponentOptions, App } from "vue";
  const ComponentOptions: ComponentOptions;
  export default ComponentOptions;
}

declare module "@vue/runtime-core" {
  interface AllowedComponentProps {
    [key: string]: any;
  }
}

declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

type ListenerCallback = (...data: any) => void;
declare type notifyType = "err" | "warn" | "info";

declare type dialogbuttonColor = "col-pri" | "col-ok" | "col-sec" | "col-err" | "col-info" | "col-black" | "col-white";

declare type dialogButton = {
  Text?: string;
  Color?: dialogbuttonColor;
};

declare type dialogButtons = {
  ok?: dialogButton;
  cancel?: dialogButton;
};

declare type hhl = {
  event: {
    on(event: string, callBack: ListenerCallback): void;
    off(event: string, callBack: ListenerCallback): void;
    emit(event: string, payLoad: any): void;
  };
  alert(type: notifyType, title: string, text: string, timeout?: number): void;
  dialog(title: string, info: string, buttons?: dialogButtons): Promise<boolean>;
  ignoreEmitPropErrors(x: any): void;
};

declare global {
  var hhl: hhl;
}

declare var hhl: hhl;
