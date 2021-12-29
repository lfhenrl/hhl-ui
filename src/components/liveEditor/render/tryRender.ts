import { runtimeDom } from "./vueStoff";
import { validate } from "./validators";

const vueImport =
  "{resolveComponent,computed,inject,nextTick,onActivated,onBeforeMount,onBeforeUnmount,onBeforeUpdate,onDeactivated,onErrorCaptured,onMounted,onRenderTracked,onRenderTriggered,onUnmounted,onUpdated,provide,reactive,proxyRefs,readonly,ref,isReactive,isReadonly,isProxy,isRef,getCurrentInstance,shallowReactive,shallowReadonly,shallowRef,toRaw,toRef,toRefs,triggerRef,unref,watch,watchEffect}";

export type iTryRender = {
  isOk: boolean;
  message: string;
  setup: any;
  template: any;
  style: string;
};

function splitHTML(code: string) {
  try {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = code;
    const html = tmp.querySelector("template");
    const script = tmp.querySelector("script");
    const style = tmp.querySelector("style");
    const htmlControled = validate(html?.innerHTML || "");
    if (!htmlControled.isOk) {
      throw new Error(htmlControled.message);
    }
    return {
      html: html?.innerHTML || "",
      script: script?.innerHTML || "",
      style: style?.innerHTML || ""
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

async function makeComponent(body: string) {
  if (body?.length < 20) body = "return {}";
  try {
    const str = `    
    const ${vueImport} = Vue;
    return () => {${body}}
    `;
    const func = new Function("Vue", str)(runtimeDom);
    return func;
  } catch (error: any) {
    throw new Error(error);
  }
}

function scopeStyle(style: string, scope: string) {
  try {
    return style.trim().replace(/(^|\})\s*([^{]+)/g, (_m, g1, g2) => {
      return g1 ? `${g1} .${scope} ${g2}` : `.${scope} ${g2}`;
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

function parseStyle(style: string, scope: string) {
  try {
    return scopeStyle(style, scope);
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function tryRender(code: string, scope: string): Promise<iTryRender> {
  let returnVal: iTryRender = {
    isOk: true,
    message: "",
    setup: {},
    template: "",
    style: ""
  };
  try {
    const _code = code.replaceAll("xstyle", "style");
    const split = splitHTML(_code);
    const setup = await makeComponent(split.script);

    returnVal = {
      isOk: true,
      message: "",
      setup: setup,
      template: split.html,
      style: parseStyle(split.style, scope)
    };
  } catch (error: any) {
    returnVal.isOk = false;
    returnVal.message = (error as any).message;
  }
  return returnVal;
}
