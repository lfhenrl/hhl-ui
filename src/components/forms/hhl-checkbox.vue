<template>
  <label class="hhl-checkbox flx-inline-row flx-align-center cursor-pointer col-bg-transparent col-pri">
    <input v-bind="$attrs" class="absolute opacity-0 cursor-pointer" type="checkbox" v-model="checkValue" :value="value" />
    <svg viewBox="0 0 24 24" class="hhl-checkbox__box borderRadius-4 mt-0" :style="{ height: size }">
      <path d="M1.73,12.91 8.1,19.28 22.79,4.59" stroke-width="3" />
    </svg>
    <span v-if="label" :label-left="labelLeft">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

const hhlCheckbox = defineComponent({
  name: "hhl-checkbox",
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: false
    },
    label: { type: String, default: "" },
    value: { type: String, default: "" },
    size: { type: String, default: "1.4em" },
    labelLeft: { type: Boolean as PropType<boolean>, default: false }
  },
  setup(props, { emit }) {
    const checkValue = computed({
      get: () => props.modelValue as any,
      set: (val: any) => {
        emit("update:modelValue", val);
      }
    });

    return {
      checkValue
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-checkbox": typeof hhlCheckbox;
  }
}
export type ihhlCheckbox = InstanceType<typeof hhlCheckbox>;
export default hhlCheckbox;
</script>

<style>
.hhl-checkbox__box {
  border: solid 2px var(--comp-border-color, rgba(0, 0, 0, 0.3));
  fill: transparent;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  stroke-width: 3;
  transition: all linear 200ms;
  font-size: 0.9rem;
  line-height: 1rem;
}

.hhl-checkbox input:checked + .hhl-checkbox__box {
  border-color: var(--current-bg-col);
  background-color: var(--current-bg-col);
  stroke: currentColor;
  stroke-dashoffset: 0;
}

.hhl-checkbox span {
  margin-left: 5px;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
}
.hhl-checkbox span[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.hhl-checkbox input:focus + .hhl-checkbox__box {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
