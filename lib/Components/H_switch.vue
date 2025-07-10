<script setup lang="ts">
import { computed, toRef, type PropType } from "vue";
import { colorProps, useColor } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";
import H_switchbase from "./H_switchbase.vue";

const P = defineProps({
  color: { type: colorProps, default: "pri" },
  size: { type: sizeProp, default: "md" },
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

const col = useColor(toRef(() => P.color));
const endSize = useSize(toRef(() => P.size));

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
    :size="endSize"
    class="H_switch"
    :labelLeft="labelLeft ? '' : undefined"
    :style="{ gap: labelGap }"
    :disabled="disabled ? '' : undefined"
    @click.prevent="onClick"
  >
    <H_switchbase :check tabindex="0" :variant :disabled :color="col.txt" :bgcolor="col.bg" :autofocus />
    <span class="H_switch__label">{{ label }}</span>
  </label>
</template>

<style>
/* stylelint-disable declaration-property-value-no-unknown */
@layer components {
  .H_switch {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    font-size: attr(size type(<length>));
    &[disabled] {
      pointer-events: none;
      opacity: 50%;
    }

    &[labelLeft] {
      flex-direction: row-reverse;
    }

    .H_switchbase:focus-visible {
      outline: solid 2px var(--color-pri);
      outline-offset: 2px;
    }

    .H_switch__label {
      white-space: nowrap;
      color: var(--color-txt2);
    }
  }
}
</style>
