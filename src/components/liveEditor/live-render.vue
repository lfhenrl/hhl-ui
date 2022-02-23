<template>
  <div class="live-render p-1 flex-wrap">
    <div :class="scope" class="live-render_content flex-wrap">
      <component :key="count" :is="render()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, onUnmounted, ref, watchEffect } from "vue";
import { tryRender } from "./render/tryRender";

function generateScope() {
  return "v-xxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default defineComponent({
  name: "live-render",
  emits: ["onError"],
  props: {
    template: { type: String, default: "<div>Det virker</div>" },
    comp: { type: Object, default: {} }
  },
  setup(props, { emit }) {
    const count = ref(0);
    let comp: any = { render: () => {} };
    const scope = generateScope();
    let styleValue = "";
    let styleTag: any;

    onErrorCaptured((err: any, instance: any, info: string) => {
      const error = {
        err,
        Ins: instance,
        info
      };
      emit("onError", error.err);
      return false;
    });

    function render() {
      return comp;
    }

    watchEffect(() => updateHTML(props.template));

    async function updateHTML(templ: string) {
      emit("onError", "");
      const result: any = await tryRender(templ, scope);
      if (result.isOk) {
        updateStyle(result.style);
        result.component = props.comp;

        comp = defineComponent({
          template: result.template,
          setup: result.setup
        });
        setTimeout(() => {
          count.value = count.value + 1;
        });
      } else {
        emit("onError", result.message);
      }
    }

    function updateStyle(style: string) {
      if (styleValue === style) return;
      styleValue = style;
      styleTag = makeStyleTag();
      styleTag.innerHTML = styleValue;
    }

    function makeStyleTag() {
      if (styleTag) return styleTag;

      const head = document.head || document.getElementsByTagName("head")[0];
      const checkExist = head.querySelector("#" + scope);
      if (checkExist) {
        return checkExist;
      }
      const elStyle = document.createElement("style");
      elStyle.type = "text/css";
      elStyle.id = scope;
      head.appendChild(elStyle);
      return elStyle;
    }

    onUnmounted(() => {
      styleTag?.remove();
    });

    return {
      render,
      count,
      scope
    };
  }
});
</script>

<style></style>
