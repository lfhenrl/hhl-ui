<template>
  <div class="hhl-live-editor" ref="el">
    <div class="hhl-live-editor_errorPopup" v-show="showError" v-movable>
      <div class="hhl-live-editor_errorPopup_title" moveable-drag>
        <div>Error</div>
        <div class="flex-1" />
        <H_icon
          btn
          icon="close"
          color="white"
          @click="hideError = !hideError"
        />
      </div>

      <span>{{ error }}</span>
    </div>

    <div class="hhl-live-editor_toolbar">
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
      class="hhl-live-editor-contentCode"
      :class="{ 'hhl-live-editor-contentCode_column': column }"
    >
      <div ref="renderBox" class="hhl-live-editor-content__render">
        <live-render
          :template="reactiv_htmlCode"
          @onError="errorHandler"
          :comp="comp"
        />
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
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-3);
}

.hhl-live-editor_toolbar {
  display: flex;
  align-items: center;
  background-color: var(--col-bg-2);
  font-size: 16px;
  padding: 2px 1px 2px 9px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.hhl-live-editor-splitLine {
  cursor: ew-resize;
  /* height: 100%; */
  width: 4px;
}

.hhl-live-editor_errorPopup {
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 10;
  bottom: -1px;
  right: -1px;
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
  display: flex;
  align-items: center;
  background-color: var(--col-err);
  overflow: hidden;
  cursor: grab;
  padding-left: 3px;
}

.hhl-live-editor-contentCode {
  display: flex;
  flex: 1;
}

.hhl-live-editor-contentCode_column {
  flex-direction: column;
}

.hhl-live-editor-content__editor {
  background-color: var(--col-bg-1);
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
