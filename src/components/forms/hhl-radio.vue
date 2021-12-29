<template>
  <label class="hhl-radio flx-inline-row col-pri flx-align-center cursor-pointer col-bg-transparent">
    <input
      class="absolute opacity-0 cursor-pointer"
      type="radio"
      v-bind="$attrs"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
    <svg class="svg borderRadius-full" :style="{ height: size, width: size }">
      <circle class="hhl-radio__box" cx="50%" cy="50%" r="44%" fill="none" stroke-width="8%" />
      <circle class="hhl-radio__box_inner" cx="50%" cy="50%" r="26%" />
    </svg>
    <span v-if="label" :label-left="labelLeft">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const hhlRadio = defineComponent({
  name: "hhl-radio",
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ""
    },
    value: {
      type: [String, Number],
      required: true
    },
    label: { type: String, default: "" },
    size: { type: String, default: "1.4em" },
    labelLeft: { type: Boolean, default: false }
  },
  setup() {
    return {};
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-radio": typeof hhlRadio;
  }
}
export type ihhlCheckbox = InstanceType<typeof hhlRadio>;
export default hhlRadio;
</script>
<style>
.hhl-radio {
  font-size: 0.9rem;
  line-height: 1rem;
}
.hhl-radio__box {
  stroke: var(--comp-border-color, red);
}

.hhl-radio__box_inner {
  fill: var(--current-bg-col, red);
  transform: scale3d(0, 0, 0);
  transition: transform 0.3s;
  transform-origin: center;
}

.hhl-radio input:checked + .svg .hhl-radio__box {
  stroke: var(--current-bg-col);
}

.hhl-radio input:checked + .svg .hhl-radio__box_inner {
  transform: scale3d(1, 1, 1);
}

.hhl-radio span {
  margin-left: 5px;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
}

.hhl-radio span[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.hhl-radio input:focus + .svg {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
