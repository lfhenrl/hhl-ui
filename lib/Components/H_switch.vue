<template>
  <div class="h_switch col-pri">
    <div class="h_switch-container" @click="Click" @keyup.space="Click" @keyup.enter="Click" :label-left="labelLeft">
      <div class="h_switch-box" :checked="modelValue" :class="cl">
        <div class="h_switch-icon-outer" />
        <div tabindex="0" class="h_switch-icon-inner" />
      </div>
      <span class="col-txt-1 select-none">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";

const P = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false
  },
  label: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md"
  }
});
const E = defineEmits(["update:modelValue", "changed"]);

const cl = computed(() => {
  return {
    "H_switch-lg": P.size.includes("lg"),
    "H_switch-sm": P.size.includes("sm")
  };
});

function Click() {
  const val = !P.modelValue;
  E("update:modelValue", val);
}
</script>

<style>
.h_switch {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
}

.h_switch-container {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: v-bind(labelGap);
  cursor: pointer;
}

.h_switch-container[label-left="true"] {
  flex-direction: row-reverse;
}

.h_switch-box {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 40px;
  height: 14px;
}

.h_switch-box.H_switch-lg {
  width: 55px;
  height: 20px;
}

.h_switch-box.H_switch-sm {
  width: 30px;
  height: 11px;
}

.h_switch-icon-outer {
  position: absolute;
  background-color: var(--col-txt-5, red);
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 10px;
  opacity: 0.46;
}

.h_switch-icon-inner {
  border-radius: 50%;
  aspect-ratio: 1;
  height: 160%;
  background-color: var(--col-txt-6);
  transition: ease-in-out 0.2s;
  z-index: 1;
  opacity: 1;
}

.h_switch-icon-inner:focus-visible,
.h_switch-container:hover .h_switch-icon-inner {
  outline: 3px solid var(--current-bg-col);
  outline-offset: 2px;
  opacity: 0.8;
}

.h_switch-box[checked="true"] .h_switch-icon-inner {
  transform: translateX(80%);
  background-color: var(--current-bg-col);
  opacity: 1;
}

.h_switch-box[checked="true"] .h_switch-icon-outer {
  background-color: var(--current-bg-col);
  opacity: 0.5;
}
</style>
