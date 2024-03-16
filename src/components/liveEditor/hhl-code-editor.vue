<template>
  <div class="hhl-code-editor">
    <div ref="el" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { vue } from "@codemirror/lang-vue";
import { debounce } from "../../../lib/utils/debounce";

const hhlCodeEditor = defineComponent({
  name: "hhl-code-editor",
  emits: ["changed"],
  props: {
    show: { type: Boolean, default: false },
    code: { type: String, default: "" },
    lang: {
      type: String as PropType<"htmlmixed" | "css" | "javascript">,
      default: "xml",
    },
  },
  setup(props, { emit }) {
    const el = ref<HTMLTextAreaElement>();
    let editor: EditorView;

    const debouncedUpdate = debounce(() => {
      emit("changed", editor.state.doc.toString());
    }, 400);

    onMounted(async () => {
      setTimeout(() => {
        if (!el || !el.value) return;
        editor = new EditorView({
          doc: props.code,
          extensions: [
            basicSetup,
            vue(),
            EditorView.updateListener.of((v: any) => {
              if (v.docChanged) {
                debouncedUpdate();
              }
            }),
          ],
          parent: el.value,
        });
      }, 10);
    });

    return {
      el,
    };
  },
});

export type ihhlCodeEditor = InstanceType<typeof hhlCodeEditor>;
export default hhlCodeEditor;
</script>
<style>
.hhl-code-editor {
  font-size: 14px;
  flex: 1 1 0%;
  overflow: auto;
  background-color: rgb(255, 254, 254);
  line-height: 1.2;
  color: black;
}

.hhl-code-editor .cm-scroller {
  overflow: visible;
}
</style>
