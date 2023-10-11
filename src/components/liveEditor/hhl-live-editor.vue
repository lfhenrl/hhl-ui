<template>
  <div class="hhl-live-editor shadow-lg relative flex flex-col" ref="el">
    <div class="absolute flex flex-col z-10 bottom-1 right-1 overflow-auto bg-warn max-h-52 w-52" v-show="showError" v-movable>
      <div class="flex items-center overflow-hidden col-err cursor-grab pl-2 " moveable-drag>
        <div>Error</div>
        <div class="flex-1" />
        <H_icon
          btn
          icon="close"
          color="white"
          @click="hideError = !hideError"
        />
      </div>

      <span class="m-2 text-sm text-err">{{ error }}</span>
    </div>

    <div class="flex items-center bg-bg2 rounded-t-lg p-1">
      <div>{{ title }}</div>
      <div class="flex-1" />
      <H_btn
        title="Show Error."
        type="icon-text"
        icon="info"
        round
        v-if="error !== '' && showCode"
        @click="hideError = !hideError"
        class="col-err"
      />
      <H_btn
        title="Fullscreen."
        type="icon-text"
        icon="zoom_out_map"
        round
        @click="toggleFullScreen"
      />
      <H_btn
        title="Change Horisont or Vertical."
        type="icon-text"
        icon="split"
        round
        :disabled="!showCode"
        @click="changeHorisont"
      />
      <H_btn
        title="Show Code."
        round
        type="icon-text"
        icon="expand_down"
        @click="codeShow"
      />
    </div>

    <div
      class="flex flex-1"
      :class="{ 'flex-col': column }"
    >
      <div ref="renderBox" >
        <live-render
          :template="reactiv_htmlCode"
          @onError="errorHandler"
          :comp="comp"
        />
      </div>

      <div class="w-1 cursor-ew-resize" v-splitpane v-if="!column" />


        <hhl-code-editor
          class="bg-bg1 origin-top transition-transform"
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

