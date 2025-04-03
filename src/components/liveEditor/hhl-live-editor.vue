<template>
  <div class="hhl-live-editor shadow-lg border border-bg3 rounded border-solid" ref="el">
    <div class="hhl-live-editor_errBox" v-show="showError" v-movable>
      <div class="hhl-live-editor_errBox_title" moveable-drag>
        <div>Error</div>
        <div class="flex-1" />
        <h_icon-close size="1.6rem" color="white" class="cursor-pointer" btn @click="hideError = !hideError" />
      </div>

      <span class="hhl-live-editor_errBox_body">{{ error }}</span>
    </div>

    <div class="hhl-live-editor_topBar">
      <div>{{ title }}</div>
      <div class="hhl-live-editor_spacer" />
      <H_iconInfo
        size="1.8rem"
        color="err"
        btn
        title="Show Error."
        v-if="error !== '' && showCode"
        @click="hideError = !hideError"
      />
      <H_iconZoom_out_map size="1.8rem" btn title="Fullscreen." @click="toggleFullScreen" />
      <H_iconSplit
        size="1.8rem"
        btn
        title="Change Horisont or Vertical."
        :disabled="!showCode"
        @click="changeHorisont"
      />
      <H_iconExpand_down size="1.8rem" btn title="Show Code." @click="codeShow" />
    </div>

    <div class="hhl-live-editor_renderBox" :class="{ 'hhl-live-editor_renderBox-column': column }">
      <div ref="renderBox">
        <live-render :template="reactiv_htmlCode" @onError="errorHandler" :comp="comp" />
      </div>

      <div class="hhl-live-editor_splitpane" v-splitpane v-if="!column" />

      <hhl-code-editor
        class="hhl-live-editor_code-editor"
        :code="code"
        lang="htmlmixed"
        @changed="reactiv_htmlCode = $event"
        :show="showCode"
        v-if="showCode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import hhlCodeEditor from "./hhl-code-editor.vue";
import liveRender from "./live-render.vue";
import { movable } from "./v-movable";
import { splitpane } from "./v-splitpane";

export default defineComponent({
  name: "hhl-live-editor",
  components: { hhlCodeEditor, liveRender },
  directives: { movable, splitpane },
  props: {
    htmlCode: { type: String, default: "" },
    title: { type: String, default: "Playground" },
    comp: { type: Object, default: {} },
  },
  setup(props) {
    const el = ref<any>();
    const renderBox = ref<any>();
    const reactiv_htmlCode = ref(props.htmlCode.replaceAll("xstyle", "style"));
    const error = ref("");
    const hideError = ref(false);
    const showCode = ref(false);
    const displayCode = ref(false);
    const column = ref(true);
    const code = ref(props.htmlCode.replaceAll("xstyle", "style"));

    const showError = computed(() => {
      if (showCode.value && error.value && !hideError.value) {
        return true;
      }
      return false;
    });

    function errorHandler(e: string) {
      error.value = e;
    }

    function codeShow() {
      showCode.value = !showCode.value;
    }

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        el.value.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    let w = "50%";
    function changeHorisont() {
      column.value = !column.value;
      if (column.value) {
        w = renderBox.value.style.width;
        renderBox.value.style.width = "100%";
      } else {
        renderBox.value.style.width = w;
      }
    }

    return {
      el,
      renderBox,
      reactiv_htmlCode,
      showCode,
      codeShow,
      changeHorisont,
      errorHandler,
      error,
      showError,
      hideError,
      displayCode,
      column,
      toggleFullScreen,
      code,
    };
  },
});
</script>
<style>
.hhl-live-editor {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.hhl-live-editor_errBox {
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: auto;
  bottom: 4px;
  right: 4px;
  z-index: 10;
  height: 208px;
  width: 208px;
  background-color: var(--color-warn);
}
.hhl-live-editor_errBox_title {
  display: flex;
  align-items: center;
  background-color: var(--color-err);
  color: var(--color-errTxt);
  cursor: grab;
  overflow: hidden;
  padding-left: 8px;
}
.hhl-live-editor_errBox_body {
  color: var(--color-err);
  font-size: 14p;
  margin: 8px;
}
.hhl-live-editor_topBar {
  display: flex;
  align-items: center;
  gap: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: var(--color-bg2);
  color: var(--color-txt3);
  padding: 4px;
}
.hhl-live-editor_spacer {
  flex: 1 1 0%;
}
.hhl-live-editor_renderBox {
  display: flex;
  flex: 1 1 0%;
  overflow: hidden;
}
.hhl-live-editor_renderBox:fullscreen {
  max-height: calc(100vh - 40px);
}
.hhl-live-editor_renderBox-column {
  flex-direction: column;
}
.hhl-live-editor_splitpane {
  width: 4px;
  cursor: ew-resize;
}
.hl-live-editor_code-editor {
  transform-origin: top;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  background-color: var(--color-bg2);
}
</style>
