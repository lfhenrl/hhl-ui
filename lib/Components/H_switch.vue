<template>
  <label class="H_switch col-pri" :class="cl">
    <input class="H_switch__input" type="checkbox" v-bind="$attrs" v-model="checkValue" :value="value" />
    <div class="H_switch__box">
      <div class="H_switch__box__knot"></div>
      <div class="H_switch__box__rail"></div>
    </div>
    <span class="H_switch__label" :label-left="labelLeft">{{ label }}</span>
    <div class="H_switch__spacer" @click.prevent></div>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false
  },
  value: { type: String, default: "" },
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
    "H_switch-lg": props.size.includes("lg"),
    "H_switch-sm": props.size.includes("sm")
  };
});

const checkValue: any = computed({
  get: () => props.modelValue as any,
  set: (val: any) => {
    emit("update:modelValue", val);
  }
});
</script>

<style>
.H_switch {
  box-sizing: border-box;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  line-height: 1rem;
  height: 2.2em;
  position: relative;
  display: inline-flex;
  align-items: center;
  flex: 1;
  align-items: center;
  cursor: pointer;
  background-color: transparent !important;
}

.H_switch-sm {
  font-size: 0.82em;
}

.H_switch-lg {
  font-size: 1.2em;
}

.H_switch .H_switch__input {
  position: absolute;
  cursor: pointer;
  opacity: 0;
  border-radius: 50%;
}

.H_switch .H_switch__box {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  height: 1.4em;
  cursor: pointer;
}

.H_switch .H_switch__box__rail {
  left: 0;
  opacity: 0.6;
  height: calc(1.4em * 0.6);
  width: calc(1.4em * 1.7);
  border-radius: calc(1.4em * 0.4);
  border: solid 1px var(--col-bg-5, hsl(0, 0%, 76%));
  background-color: var(--col-bg-5, hsl(0, 0%, 76%));
  cursor: pointer;
}

.H_switch .H_switch__box__knot {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  border-radius: 50%;
  height: 1.4em;
  width: 1.4em;
  background-color: var(--col-bg-5, hsl(0, 0%, 76%));
  transition: left 0.3s;
  cursor: pointer;
}

.H_switch .H_switch__input:checked + .H_switch__box .H_switch__box__rail {
  background-color: var(--current-bg-col);
  border-color: var(--current-bg-col);
}

.H_switch .H_switch__input:checked + .H_switch__box .H_switch__box__knot {
  left: calc(1.45em * 0.7);
  background-color: var(--current-bg-col);
}

.H_switch .H_switch__label {
  margin-left: 5px;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
  font-weight: normal;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: auto;
}

.H_switch .H_switch__spacer {
  align-self: stretch;
  flex: 1;
  cursor: default;
  top: 0;
  bottom: 0;
}

.H_switch .H_switch__label[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.H_switch .H_switch__input:focus + .H_switch__box .H_switch__box__knot {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
