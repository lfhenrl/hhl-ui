<template>
  <div class="h_pop" ref="h_pop">
    <div class="h_pop__referance" ref="reference"><slot name="referance" /></div>
    <div ref="popup" class="h_pop__content" :isOpen="isOpen ? true : null" v-movable="movable">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computePosition, offset, flip, shift } from "@floating-ui/dom";
import { PropType, onMounted, onUnmounted, ref, watch } from "vue";
import { vMovable } from "../../Directives/v-movable";

const P = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
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
  offsetLeft: { type: Number, default: 0 },
  offsetTop: { type: Number, default: 0 },
  fullWidth: { type: Boolean, default: true },
  position: { type: String as PropType<"absolute" | "fixed">, default: "absolute" },
  inner: { type: Boolean, default: false },
  trigger: { type: String as PropType<"toggle" | "click" | "hover" | "none">, default: "toggle" },
  noOutsideClick: { type: Boolean, default: false },
  closePopupClick: { type: Boolean, default: false },
  delayOnMouseOver: { type: String, default: "100" },
  delayOnMouseOut: { type: String, default: "400" },
  readonly: { type: Boolean, default: false },
  movable: { default: false, type: Boolean }
});

const E = defineEmits(["update:modelValue"]);
const h_pop: any = ref(null);
const reference: any = ref(null);
const popup: any = ref(null);
const isOpen = ref(false);
let mouseOvertimer = {} as any;
let delayClick = false;

function Click(e: MouseEvent) {
  if (h_pop.value?.contains(e.target)) {
    e.stopPropagation;
    if (reference.value?.contains(e.target)) referenceClick();
    if (popup.value?.contains(e.target)) popupClick();
  } else {
    if (isOpen.value) outsideClick();
  }
}

watch(
  () => P.modelValue,
  (val: boolean) => {
    if (val === true) {
      delayClick = true;
      open();
      setTimeout(() => (delayClick = false));
    } else {
      close();
    }
  }
);

function mouseOver() {
  if (P.modelValue === false) {
    clearTimeout(mouseOvertimer);
    mouseOvertimer = setTimeout(() => {
      open();
    }, parseInt(P.delayOnMouseOver));
  }
}

function mouseOut() {
  console.log("mouseOut");
  clearTimeout(mouseOvertimer);
  mouseOvertimer = setTimeout(() => {
    close();
  }, parseInt(P.delayOnMouseOut));
}

function referenceClick() {
  if (P.trigger === "click") triggerClick();
  else if (P.trigger === "toggle") triggerToggle();
}

function popupClick() {
  if (P.closePopupClick) {
    close();
  }
}

function outsideClick() {
  if (!P.noOutsideClick && !delayClick) {
    close();
  }
}

function triggerClick() {
  if (isOpen.value === false) {
    open();
  }
}

function triggerToggle() {
  if (isOpen.value === false) {
    open();
  } else {
    close();
  }
}

function open() {
  if (isOpen.value === true) return;
  if (P.readonly === true) return;
  isOpen.value = true;
  addEvents();
  Update();
  E("update:modelValue", true);
}

function close() {
  if (isOpen.value === false) return;
  isOpen.value = false;
  E("update:modelValue", false);
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
  Update();
}

function scroll() {
  Update();
}

function Update() {
  let w = reference.value?.offsetWidth + "px";
  let h = reference.value?.offsetHeight;
  if (!P.fullWidth) {
    w = "auto";
  }
  if (!P.inner) {
    h = 0;
  }
  computePosition(reference.value, popup.value, {
    placement: P.placement,
    strategy: P.position,
    middleware: [
      flip(),
      shift(),
      offset({
        mainAxis: P.offsetTop - h,
        crossAxis: P.offsetLeft
      })
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
}

onMounted(() => {
  if (P.trigger === "hover") {
    h_pop.value.addEventListener("mouseover", mouseOver);
    h_pop.value.addEventListener("mouseleave", mouseOut);
  } else {
    document.addEventListener("click", Click);
  }
  setTimeout(() => {
    popup.value.classList.add("isloadet");
  }, 400);
});

onUnmounted(() => {
  removeEvents();
  if (P.trigger === "hover") {
    h_pop.value.removeEventListener("mouseover", mouseOver);
    h_pop.value.removeEventListener("mouseleave", mouseOut);
  } else {
    document.removeEventListener("click", Click);
  }
});
</script>

<style>
.h_pop {
  background-color: inherit;
}

.h_pop__referance {
  height: 100%;
}

.h_pop__content {
  background-color: var(--col-bg-0);
  visibility: hidden;
  position: v-bind(position);
  width: max-content;
  z-index: 11;
  animation: scale-display--reversed 0.3s;
  animation-fill-mode: forwards;
  transform-origin: top;
}

.h_pop__content.isloadet {
  visibility: visible;
}

.h_pop__content[isOpen] {
  animation: scale-display 0.3s;
  animation-fill-mode: forwards;
}

.h_pop__content.isTop {
  transform-origin: bottom;
}

@keyframes scale-display {
  0% {
    display: block;
    opacity: 0;
    transform: scaleY(0);
  }

  20% {
    display: block;
    opacity: 1;
    transform: scaleY(0);
  }

  100% {
    display: block;
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes scale-display--reversed {
  0% {
    display: block;
    opacity: 1;
    transform: scaleY(1);
  }

  99% {
    display: block;
    opacity: 0;
    transform: scaleY(0);
  }

  100% {
    display: none;
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
