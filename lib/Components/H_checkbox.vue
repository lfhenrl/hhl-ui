<template>
  <label class="H_checkbox col-pri" :class="cl">
    <input v-bind="$attrs" type="checkbox" class="H_checkbox__input" v-model="checkValue" :value="value" />
    <svg viewBox="0 0 24 24" class="H_checkbox__box">
      <path d="M1.73,12.91 8.1,19.28 22.79,4.59" stroke-width="3" />
    </svg>
    <span class="H_checkbox__label" v-if="label" :label-left="labelLeft">{{ label }}</span>
    <div class="H_checkbox__spacer" @click.prevent></div>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false
  },
  label: { type: String, default: "" },
  value: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md"
  }
});

const emit = defineEmits(["update:modelValue", "changed"]);

const cl = computed(() => {
  return {
    "H_checkbox-lg": props.size.includes("lg"),
    "H_checkbox-sm": props.size.includes("sm")
  };
});

const checkValue = computed({
  get: () => props.modelValue as any,
  set: (val: any) => {
    emit("update:modelValue", val);
  }
});
</script>

<style>
.H_checkbox {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  box-sizing: border-box;
  display: inline-flex;
  flex: 1;
  height: 2.2em;
  align-items: center;
  cursor: pointer;
  background-color: transparent !important;
}

.H_checkbox-sm {
  font-size: 0.82em;
}

.H_checkbox-lg {
  font-size: 1.2em;
}

.H_checkbox__box {
  border: solid 2px var(--comp-border-color, rgba(0, 0, 0, 0.3));
  height: 1.2em;
  fill: transparent;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  stroke-width: 3;
  transition: all linear 200ms;
  line-height: 1rem;
  border-radius: 4px;
  margin-top: 0;
  cursor: pointer;
  white-space: nowrap;
}

.H_checkbox .H_checkbox__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.H_checkbox .H_checkbox__input:checked + .H_checkbox__box {
  border-color: var(--current-bg-col);
  background-color: var(--current-bg-col);
  stroke: currentColor;
  stroke-dashoffset: 0;
}

.H_checkbox .H_checkbox__label {
  margin-left: 5px;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 1em;
  font-weight: normal;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: auto;
  white-space: nowrap;
  line-height: 0.9em;
}

.H_checkbox .H_checkbox__spacer {
  align-self: stretch;
  flex: 1;
  cursor: default;
  top: 0;
  bottom: 0;
}

.H_checkbox .H_checkbox__label[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.H_checkbox .H_checkbox__input:focus + .H_checkbox__box {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
