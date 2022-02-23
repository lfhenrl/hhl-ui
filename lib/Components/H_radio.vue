<template>
  <label class="H_radio col-pri" :class="cl">
    <input
      class="H_radio__input"
      type="radio"
      v-bind="$attrs"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
    <svg class="H_radio__svg">
      <circle class="H_radio__box" cx="50%" cy="50%" r="44%" fill="none" stroke-width="8%" />
      <circle class="H_radio__box_inner" cx="50%" cy="50%" r="26%" />
    </svg>
    <span class="H_radio__label" v-if="label" :label-left="labelLeft">{{ label }}</span>
    <div class="H_radio__spacer" @click.prevent></div>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: ""
  },
  value: {
    type: [String, Number]
  },
  label: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md"
  }
});

const emit = defineEmits(["update:modelValue"]);

const cl = computed(() => {
  return {
    "H_radio-lg": props.size.includes("lg"),
    "H_radio-sm": props.size.includes("sm")
  };
});
</script>

<style>
.H_radio {
  display: inline-flex;
  box-sizing: border-box;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  height: 2.2em;
  flex: 1;
  align-items: center;
  cursor: pointer;
  background-color: transparent !important;
  line-height: 1em;
}

.H_radio-sm {
  font-size: 0.82em;
}

.H_radio-lg {
  font-size: 1.2em;
}

.H_radio .H_radio__input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.H_radio .H_radio__svg {
  height: 1.4em;
  width: 1.4em;
  border-radius: 50%;
  cursor: pointer;
}

.H_radio__box {
  stroke: var(--comp-border-color, red);
  cursor: pointer;
}

.H_radio__box_inner {
  fill: var(--current-bg-col, red);
  transform: scale3d(0, 0, 0);
  transition: transform 0.3s;
  transform-origin: center;
  cursor: pointer;
}

.H_radio input:checked + .H_radio__svg .H_radio__box {
  stroke: var(--current-bg-col);
}

.H_radio input:checked + .H_radio__svg .H_radio__box_inner {
  transform: scale3d(1, 1, 1);
}

.H_radio .H_radio__label {
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

.H_radio .H_radio__spacer {
  align-self: stretch;
  flex: 1;
  cursor: default;
  top: 0;
  bottom: 0;
}

.H_radio .H_radio__label[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.H_radio input:focus + .H_radio__svg {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
