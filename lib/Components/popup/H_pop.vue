<template>
  <div class="H_pop" ref="H_pop" :style="{ 'z-index': show === true ? 10 : 0 }">
    <div ref="referance" class="H_pop__referance">
      <slot name="referance" />
    </div>
    <div ref="popup" class="H_pop__content" :class="{ show: showDelay, isTop: isTop }" v-if="showDirect">
      <slot />
    </div>
    <div
      class="H_pop__background"
      v-if="show && noOutsideClick === false && trigger !== 'hover' && trigger !== 'none'"
      @click.stop="outsiteClick"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { computePosition, flip, shift, offset } from "@floating-ui/dom";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  placement: {
    type: String as PropType<
      | "top"
      | "top-start"
      | "top-end"
      | "right"
      | "right-start"
      | "right-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "left"
      | "left-start"
      | "left-end"
    >,
    default: "bottom-start"
  },
  trigger: { type: String as PropType<"toggle" | "click" | "hover" | "none">, default: "toggle" },
  noOutsideClick: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  inner: { type: Boolean, default: false },
  offsetLeft: { type: Number, default: 0 },
  offsetTop: { type: Number, default: 0 },
  delayOnMouseOver: { type: String, default: "100" },
  delayOnMouseOut: { type: String, default: "400" }
});

const emit = defineEmits(["update:modelValue"]);

const referance = ref();
const H_pop = ref();
const popup = ref();
const show = ref(false);
const showDirect = ref(false);
const showDelay = ref(false);
const isTop = ref(false);
let mouseOvertimer = {} as any;

watch(
  () => props.modelValue,
  (val: boolean) => {
    if (val === true && show.value === false) {
      show.value = true;
    } else if (val === false && show.value === true) {
      show.value = false;
    }
  }
);

watch(show, (val: boolean) => {
  if (val === true) {
    open();
  } else {
    close();
  }
});

function open() {
  showDirect.value = true;
  update();
  setTimeout(() => {
    showDelay.value = true;
    emit("update:modelValue", show.value);
    if (props.noOutsideClick === true) {
      document.addEventListener("scroll", scroll, true);
    }
  });
}

function close() {
  showDelay.value = false;
  document.removeEventListener("scroll", scroll, true);
  setTimeout(() => {
    showDirect.value = false;
    emit("update:modelValue", show.value);
  }, 200);
}

function scroll() {
  show.value = false;
}

function click(e: any) {
  if (props.trigger === "click") triggerClick();
  if (props.trigger === "toggle") triggerToggle();
}

function mouseOver() {
  if (show.value === false) {
    clearTimeout(mouseOvertimer);
    mouseOvertimer = setTimeout(() => {
      show.value = true;
    }, parseInt(props.delayOnMouseOver));
  }
}

function mouseOut() {
  clearTimeout(mouseOvertimer);
  mouseOvertimer = setTimeout(() => {
    show.value = false;
  }, parseInt(props.delayOnMouseOut));
}

function triggerClick() {
  if (show.value === false) {
    show.value = true;
  }
}

function triggerToggle() {
  show.value = !show.value;
}

function outsiteClick(e: MouseEvent) {
  if (props.noOutsideClick === true) return;
  if (props.trigger === "none") return;
  if (show.value === true) {
    show.value = false;
  }
}

function update() {
  setTimeout(() => {
    let w = referance.value.offsetWidth + "px";
    let h = referance.value.offsetHeight;
    if (!props.fullWidth) {
      w = "auto";
    }
    if (!props.inner) {
      h = 0;
    }
    computePosition(referance.value, popup.value, {
      placement: props.placement,
      middleware: [
        offset({
          mainAxis: props.offsetTop - h,
          crossAxis: props.offsetLeft
        }),
        flip(),
        shift()
      ]
    }).then(({ x, y }) => {
      Object.assign(popup.value.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: w
      });
      setTimeout(() => {
        isTop.value = (referance.value as HTMLElement).offsetTop > y;
      });
    });
  });
}

onMounted(() => {
  if (props.trigger === "click" || props.trigger === "toggle") {
    referance.value.addEventListener("click", click);
  }
  if (props.trigger === "hover") {
    H_pop.value.addEventListener("mouseover", mouseOver);
    H_pop.value.addEventListener("mouseout", mouseOut);
  }
});

onUnmounted(() => {
  document.removeEventListener("scroll", scroll, true);
});
</script>

<style>
.H_pop {
  display: inline;
}

.H_pop__referance {
  display: block;
  z-index: 9;
}

.H_pop__content {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  position: fixed;
  transition: transform 0.2s ease-in-out;
  transform-origin: top;
  transform: scaleY(0);
  z-index: 9;
}

.H_pop__content.isTop {
  transform-origin: bottom;
}

.H_pop__content.show {
  transform: scaleY(1);
}

.H_pop__background {
  position: fixed;
  width: 200vw;
  height: 200vh;
  top: -100vh;
  left: -100vw;
  z-index: -1;
}
</style>
