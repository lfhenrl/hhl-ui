<script setup lang="ts">
import { computed, type PropType } from "vue";
import H_switchbase from "./H_switchbase.vue";

const P = defineProps({
  variant: {
    type: String as PropType<"switch" | "checkbox" | "radio">,
    default: "checkbox",
  },
  label: { type: String, default: "Label" },
  labelGap: { type: String, default: "6px" },
  labelLeft: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  setFocus: { type: Boolean, default: false },
  value: {
    type: [String, Number],
  },
});
const E = defineEmits(["update:modelValue"]);
const model = defineModel();

const check = computed(() => {
  if (P.value !== undefined) {
    if (Array.isArray(model.value)) {
      return model.value.includes(P.value);
    }
    return P.value === model.value;
  } else {
    return model.value !== undefined && model.value !== false;
  }
});

function onClick() {
  if (P.value !== undefined) {
    if (Array.isArray(model.value)) {
      const haveValue = model.value.includes(P.value);
      if (haveValue) {
        const newValue = model.value.filter((v: any) => v !== P.value);
        E("update:modelValue", newValue);
        return;
      } else {
        const newValue = [...model.value, P.value];
        E("update:modelValue", newValue);
        return;
      }
    }
    if (model.value === P.value) {
      E("update:modelValue", undefined);
    } else {
      E("update:modelValue", P.value);
    }
  } else {
    E("update:modelValue", !model.value);
  }
}
</script>

<template>
  <label
    class="H_switch"
    :class="{ reverse: labelLeft }"
    :h-gap="labelGap"
    :h-disabled="disabled ? '50%' : undefined"
    @click.prevent="onClick"
  >
    <H_switchbase :check tabindex="0" :variant :disabled :autofocus :aria-label="label" />
    <span class="H_switch_label">{{ label }}</span>
  </label>
</template>

<style>
@layer components {
  .H_switch {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    --h-color: var(--col-pri);
  }

  .H_switch.reverse {
    flex-direction: row-reverse;
  }

  .H_switch:focus-visible {
    outline: solid 2px var(--col-pri);
    outline-offset: 2px;
  }

  .H_switch_label {
    white-space: nowrap;
    color: var(--col-2);
  }
}
</style>
