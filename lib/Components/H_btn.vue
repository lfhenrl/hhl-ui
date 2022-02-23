<template>
  <button class="H_btn col-pri" type="button" :class="cl"><H_icon v-if="icon !== ''" :icon="icon"></H_icon><slot></slot></button>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import H_icon from "./H_icon.vue";

const props = defineProps({
  type: {
    type: String as PropType<"standard" | "outline" | "text" | "icon" | "icon-outline" | "icon-text">,
    default: "standard"
  },
  round: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md"
  },
  icon: { type: String, default: "" },
  iconRight: { type: Boolean, default: false }
});

const cl = computed(() => {
  return {
    "btn-outline": props.type.includes("outline"),
    "btn-text": props.type.includes("text"),
    "btn-icon": props.type.includes("icon"),
    "btn-lg": props.size.includes("lg"),
    "btn-sm": props.size.includes("sm"),
    "btn-round": props.round,
    "btn-icon-right": props.iconRight
  };
});
</script>

<style>
.H_btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  white-space: nowrap !important;
  cursor: pointer;
  --btn-size: calc(var(--comp-font-size) * 2.3);
  --btn-icon-size: calc(var(--comp-font-size) * 1.4);
  padding: 0 1em;
  height: var(--btn-size);
  gap: 0.2em;
  outline: none;
  border: none;
  appearance: none;
  line-height: calc(var(--comp-font-size) * 2);
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.H_btn:hover {
  transform: scale(1.04);
}

.H_btn.btn-text:hover {
  background-color: var(--col-bg-2);
  color: var(--col-txt-2);
}

.H_btn:active {
  transform: scale(0.93);
}

.H_btn:focus {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}

.H_btn.btn-round {
  border-radius: 50%;
}

.H_btn.btn-lg {
  --btn-size: 2em;
  --btn-icon-size: 1.3em;
  font-size: calc(var(--comp-font-size) * 1.5);
  line-height: calc(var(--comp-font-size) * 2.5);
}

.H_btn.btn-sm {
  --btn-size: 2em;
  --btn-icon-size: 1.3em;
  font-size: calc(var(--comp-font-size) * 0.9);
  line-height: calc(var(--comp-font-size) * 1.5);
}

.H_btn.btn-outline {
  background-color: transparent;
  color: var(--current-bg-col);
  border: 1px solid var(--current-bg-col);
}

.H_btn.btn-text {
  background-color: transparent;
  color: var(--current-bg-col);
  border-color: transparent;
}

.H_btn.btn-text.btn-icon {
  color: var(--current-bg-col);
}

.H_btn.btn-icon {
  padding: 0;
  width: var(--btn-size);
}

.H_btn .H_icon {
  --H_icon-size: var(--btn-icon-size);
}

.H_btn.btn-icon-right .H_icon {
  order: 1;
}

.H_btn.btn-icon .H_icon {
  color: currentColor;
  --H_icon-size: calc(var(--btn-icon-size) * 1.3);
}
</style>
