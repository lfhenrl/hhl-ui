<template>
  <div class="hhl-live-editor flex flex-col relative shadow-3" ref="el">
    <div
      class="hhl-live-editor_errorPopup flex flex-col absolute overflow-auto z-10 bottom-1 right-1"
      v-show="showError"
      v-movable
    >
      <div class="hhl-live-editor_errorPopup_title flex items-center flx-justify-between pl-1" moveable-drag>
        <div>Error</div>
        <H_btn type="icon-text" icon="close" color="white" round @click="hideError = !hideError" />
      </div>

      <span>{{ error }}</span>
    </div>

    <div class="hhl-live-editor_toolbar flex items-center justify-between rounded-t">
      <div>{{ title }}</div>
      <div class="flx-row">
        <H_btn
          title="Show Error."
          type="icon-text"
          icon="info"
          round
          v-if="error !== '' && showCode"
          @click="hideError = !hideError"
          class="col-err"
        />
        <H_btn title="Fullscreen." type="icon-text" icon="zoom_out_map" round @click="toggleFullScreen" class="col-white" />
        <H_btn
          title="Change Horisont or Vertical."
          type="icon-text"
          icon="split"
          round
          :disabled="!showCode"
          @click="changeHorisont"
          class="col-white"
        />
        <H_btn title="Show Code." round type="icon-text" icon="expand_down" @click="codeShow" class="col-white" />
      </div>
    </div>
    <div class="flex flex-1" :class="{ 'flex-col': column }">
      <div ref="renderBox" class="hhl-live-editor-content__render">
        <live-render :template="reactiv_htmlCode" @onError="errorHandler" :comp="comp" />
      </div>
      <div class="hhl-live-editor-splitLine" v-splitpane v-if="!column" />
      <transition name="hhl-live-editor_slide">
        <hhl-code-editor
          class="hhl-live-editor-content__editor"
          :code="code"
          lang="htmlmixed"
          @changed="reactiv_htmlCode = $event"
          :show="showCode"
          v-if="showCode"
        />
      </transition>
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
    comp: { type: Object, default: {} }
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
      code
    };
  }
});
</script>

<style>
.hhl-live-editor:-webkit-full-screen {
  background-color: rgb(255, 255, 255);
}

.hhl-live-editor_toolbar {
  background-color: var(--col-ok);
  color: white;
  font-size: 16px;
  padding: 2px 1px 2px 9px;
}

.hhl-live-editor-splitLine {
  cursor: ew-resize;
  /* height: 100%; */
  width: 4px;
}

.hhl-live-editor_errorPopup {
  background: rgb(250, 218, 218);
  max-height: 200px;
  width: 200px;
}

.hhl-live-editor_errorPopup span {
  margin: 8px;
  font-size: 0.8rem;
  color: red;
}

.hhl-live-editor_errorPopup_title {
  color: white;
  background-color: var(--col-err);
  cursor: grab;
}

.hhl-live-editor-content__editor {
  background-color: rgba(238, 238, 238, 0.479);
  transform-origin: top;
  transition: transform 0.2s ease-out;
}

.hhl-live-editor:-webkit-full-screen .hhl-live-editor-content__editor {
  overflow: scroll;
}

.hhl-live-editor_slide-enter-from,
.hhl-live-editor_slide-leave-to {
  transform: scaleY(0);
}
</style>
