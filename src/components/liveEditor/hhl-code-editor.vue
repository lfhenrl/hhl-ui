<template>
  <div class="hhl-code-editor h-100pr flx-1">
    <textarea ref="el" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watchEffect } from "vue";
import "./css/codemirror.css";
import { debounce } from "../utils/debounce";

const hhlCodeEditor = defineComponent({
  name: "hhl-code-editor",
  emits: ["changed"],
  props: {
    show: { type: Boolean, default: false },
    code: { type: String, default: "" },
    lang: {
      type: String as PropType<"htmlmixed" | "css" | "javascript">,
      default: "xml"
    }
  },
  setup(props, { emit }) {
    const el = ref<HTMLTextAreaElement>();
    let editor: any;

    watchEffect(() => {
      if (props.show) {
        editor?.refresh();
      }
    });

    function updateCode() {
      emit("changed", editor.getValue());
    }

    onMounted(async () => {
      await import("./render/codeMirror");
      const CodeMirror = await import("codemirror");

      setTimeout(() => {
        if (!el || !el.value) return;
        editor = CodeMirror.fromTextArea(el.value, {
          mode: "",
          value: props.code.trim(),
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          autofocus: false,
          autoCloseBrackets: true,
          autoCloseTags: true,
          styleActiveLine: true,
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });

        editor.on("change", debounce(updateCode, 600));
        watchEffect(() => editor.setOption("mode", props.lang));
        editor.setValue(props.code.trim());
      }, 100);
    });

    return {
      el
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-code-editor": typeof hhlCodeEditor;
  }
}
export type ihhlCodeEditor = InstanceType<typeof hhlCodeEditor>;
export default hhlCodeEditor;
</script>

<style>
.hhl-code-editor {
  font-family: "Source Code Pro", monospace;
  font-size: 13px;
  line-height: 1.4;
}
</style>
