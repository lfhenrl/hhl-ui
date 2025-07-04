<script setup lang="ts">
import { computed, toRef, type PropType } from "vue";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";
import H_switchbase from "./H_switchbase.vue";

const P = defineProps({
  ...useColorProp("pri"),
  ...sizeProp,
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
    :class="{ 'flex-row-reverse': labelLeft }"
    :style="{ gap: labelGap }"
    :disabled="disabled ? '' : undefined"
    @click.prevent="onClick"
  >
    <H_switchbase
      :check
      tabindex="0"
      :variant
      :disabled
      :color="col.txt"
      :autofocus
      class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pri"
    />
    <span class="text-txt2 whitespace-nowrap">{{ label }}</span>
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
  }

  .H_switch[disabled] {
    pointer-events: none;
    opacity: 50%;
  }
}
</style>
