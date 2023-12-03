<template>
  <div class="hhl-live-editor relative flex flex-col shadow-lg" ref="el">
    <div
      class="absolute bottom-1 right-1 z-10 flex max-h-52 w-52 flex-col overflow-auto bg-warn"
      v-show="showError"
      v-movable
    >
      <div
        class="col-err flex cursor-grab items-center overflow-hidden pl-2"
        moveable-drag
      >
        <div>Error</div>
        <div class="flex-1" />
        <H_icon
          btn="standard"
          icon="close"
          color="white"
          @click="hideError = !hideError"
        />
      </div>

      <span class="m-2 text-sm text-err">{{ error }}</span>
    </div>

    <div class="flex items-center gap-2 rounded-t-lg bg-bg2 p-1 text-txt3">
      <div>{{ title }}</div>
      <div class="flex-1" />
      <H_icon
        icon="info"
        btn="standard"
        title="Show Error."
        class="text-err"
        v-if="error !== '' && showCode"
        @click="hideError = !hideError"
      />
      <H_icon
        icon="zoom_out_map"
        btn="standard"
        title="Fullscreen."
        @click="toggleFullScreen"
      />
      <H_icon
        icon="split"
        btn="standard"
        title="Change Horisont or Vertical."
        :disabled="!showCode"
        @click="changeHorisont"
      />
      <H_icon
        icon="expand_down"
        btn="standard"
        title="Show Code."
        @click="codeShow"
      />
    </div>

    <div class="flex flex-1" :class="{ 'flex-col': column }">
      <div ref="renderBox">
        <live-render
          :template="reactiv_htmlCode"
          @onError="errorHandler"
          :comp="comp"
        />
      </div>

      <div class="w-1 cursor-ew-resize" v-splitpane v-if="!column" />

      <hhl-code-editor
        class="origin-top bg-bg0 transition-transform"
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
