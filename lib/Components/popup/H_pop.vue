<template>
  <div class="H_pop" ref="H_pop">
    <div ref="referance" class="H_pop__referance">
      <slot name="referance" />
    </div>
    <div ref="popup" class="H_pop__content">
      <slot />
    </div>
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
  closePopupClick: { type: Boolean, default: false },
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
let isOpen = false;
let mouseOvertimer = {} as any;

function Click(e: MouseEvent) {
  if (H_pop.value?.contains(e.target)) {
    e.stopPropagation;
    if (referance.value?.contains(e.target)) referanceClick();
    if (popup.value?.contains(e.target)) popupClick();
  } else {
    if (isOpen) outsideClick();
  }
}

watch(
  () => props.modelValue,
  (val: boolean) => {
    if (val === true) {
      open();
    } else {
      close();
    }
  }
);

function open() {
  if (isOpen === true) return;
  isOpen = true;
  addEvents();
  (popup.value as HTMLElement).classList.remove("close");
  (popup.value as HTMLElement).classList.add("open");

  update();
  emit("update:modelValue", true);
}

function close() {
  if (isOpen === false) return;
  isOpen = false;
  (popup.value as HTMLElement).classList.remove("open");
  (popup.value as HTMLElement).classList.add("close");
  emit("update:modelValue", false);
  removeEvents();
}

function addEvents() {
  document.addEventListener("scroll", scroll, true);
  window.addEventListener("resize", resize, true);
}

function removeEvents() {
  document.removeEventListener("scroll", scroll, true);
  window.removeEventListener("resize", resize, true);
}

function resize() {
  update();
}

function scroll() {
  close();
}

function referanceClick() {
  if (props.trigger === "click") triggerClick();
  if (props.trigger === "toggle") triggerToggle();
}

function popupClick() {
  if (props.closePopupClick) {
    close();
  }
}

function outsideClick() {
  if (!props.noOutsideClick) {
    close();
  }
}

function mouseOver() {
  if (props.modelValue === false) {
    clearTimeout(mouseOvertimer);
    mouseOvertimer = setTimeout(() => {
      open();
    }, parseInt(props.delayOnMouseOver));
  }
}

function mouseOut() {
  console.log("mouseOut");
  clearTimeout(mouseOvertimer);
  mouseOvertimer = setTimeout(() => {
    close();
  }, parseInt(props.delayOnMouseOut));
}

function triggerClick() {
  if (isOpen === false) {
    open();
  }
}

function triggerToggle() {
  if (isOpen === false) {
    open();
  } else {
    close();
  }
}

function update() {
  setTimeout(() => {
    let w = referance.value.offsetWidth + "px";
    console.log("WWW", w, referance.value.clientWidth);
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
    }).then(({ x, y, placement }) => {
      Object.assign(popup.value.style, {
        left: `${x}px`,
        top: `${y}px`,
        minWidth: w
      });

      if (placement.startsWith("top")) {
        popup.value.classList.add("isTop");
      } else {
        popup.value.classList.remove("isTop");
      }
    });
  });
}

onMounted(() => {
  if (props.trigger === "hover") {
    H_pop.value.addEventListener("mouseover", mouseOver);
    H_pop.value.addEventListener("mouseleave", mouseOut);
  } else {
    document.addEventListener("click", Click);
  }
});

onUnmounted(() => {
  document.removeEventListener("scroll", scroll, true);
  document.removeEventListener("click", Click);
});
</script>

<style>
.H_pop__referance {
  z-index: 9;
}

.H_pop__content {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  position: fixed;
  display: none;
  transform-origin: top;
  z-index: 99;
}

.H_pop__content.isTop {
  transform-origin: bottom;
}

.H_pop__content.open {
  display: flex;
  animation: scale-display 0.3s;
  animation-fill-mode: forwards;
}

.H_pop__content.close {
  display: flex;
  animation: scale-display--reversed 0.3s;
  animation-fill-mode: forwards;
}

@keyframes scale-display {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }

  20% {
    opacity: 1;
    transform: scaleY(0);
  }

  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes scale-display--reversed {
  0% {
    display: flex;
    opacity: 1;
    transform: scaleY(1);
  }
  99% {
    display: flex;
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    display: none;
    opacity: 0;
    transform: scaleY(0);
  }
}

/* .H_pop__background {
  position: fixed;
  width: 200vw;
  height: 200vh;
  top: -100vh;
  left: -100vw;
  z-index: -1;
  background-color: rgba(0, 255, 255, 0.359);
} */
</style>
