<template>
  <div class="h_checkbox col-primary">
    <div
      class="h_checkbox-container"
      @click="Click"
      @keyup.space="Click"
      @keyup.enter="Click"
      :checked="modelValue"
      :label-left="labelLeft"
    >
      <svg viewBox="0 0 24 24" class="h_checkbox__box" tabindex="0">
        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
      </svg>
      <span class="text-txtCol-2 select-none">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const P = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false
  },
  label: { type: String, default: "" },
  labelGap: { type: String, default: "10px" },
  labelLeft: { type: Boolean, default: false }
});
const E = defineEmits(["update:modelValue", "changed"]);

function Click() {
  const val = !P.modelValue;
  E("update:modelValue", val);
}
</script>

<style>
.h_checkbox {
  display: inline-flex;
  align-items: start;
  justify-content: start;
  background-color: transparent;
}

.h_checkbox-container {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: v-bind(labelGap);
  cursor: pointer;
}

.h_checkbox__box {
  border: solid 2px var(--col-txt-5, red);
  height: 1.2em;
  fill: transparent;
  transition: all linear 200ms;
  line-height: 1rem;
  border-radius: 4px;
  margin-top: 0;
  white-space: nowrap;
}

.h_checkbox__box:focus-visible,
.h_checkbox-container:hover .h_checkbox__box {
  outline: 3px solid var(--current-bg-col);
  outline-offset: 2px;
  opacity: 0.5;
}

.h_checkbox-container[checked="true"] .h_checkbox__box {
  border-color: var(--current-bg-col);
  background-color: var(--current-bg-col);
  fill: currentColor;
}

.h_checkbox-container[label-left="true"] {
  flex-direction: row-reverse;
}
</style>
