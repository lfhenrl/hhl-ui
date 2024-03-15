<template>
  <H_inputBase class="H_slider" :label="label" :movelabel="true" :disabled="disabled">
    <div class="H_slider_inner" :disabled="disabled ? true : undefined">
      <div class="H_slider_innerBox">
        <div class="H_slider_info" :style="{ left: posProcent }">
          {{ modelValue }}
        </div>
      </div>
      <input
        type="range"
        class="H_slider-input"
        :value="modelValue"
        @input="changed"
        :aria-label="label === '' ? 'No label' : label"
        :name="label === '' ? 'No name' : label"
      />
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import H_inputBase from "../SubComponents/H_inputBase.vue";

const P = defineProps({
  modelValue: {
    type: [String, Number],
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  min: {
    type: String,
    default: "100",
  },
  max: {
    type: String,
    default: "0",
  },
  disabled: { type: Boolean, default: false },
  validator: Array,
  color: {
    type: String as PropType<"pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "pri",
  },
});

const E = defineEmits(["update:modelValue"]);

const posProcent = computed(() => {
  const span = parseInt(P.max) - parseInt(P.min);
  const faktor = span / 100;
  return parseInt(P.modelValue.toString()) / faktor + "%";
});

function changed(e: any) {
  E("update:modelValue", e.target.value);
}

const bgColor = computed(() => `var(--col-${P.color})`);
const txtColor = computed(() => `var(--col-on-${P.color})`);
</script>

<style>
@layer hhl-components {
  .H_slider {
    flex: 1 1 0%;
    background-color: transparent;
    max-height: 36px;
    min-height: 36px;
    height: 36px;
    --bgcolor: v-bind(bgColor);
    color: v-bind(txtColor);
  }

  .H_slider_inner {
    position: relative;
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    padding-left: 4px;
    padding-right: 4px;
    max-height: 36px;
    min-height: 36px;
    height: 36px;
  }

  .H_slider-input {
    height: 6px;
    width: 100%;
    appearance: none;
    cursor: pointer;
    border-radius: 4px;
    background-image: linear-gradient(var(--bgcolor), var(--bgcolor));
  }

  .H_slider_innerBox {
    display: flex;
    align-items: center;
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    top: 0;
  }
  .H_slider_info {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    position: absolute;
    border-radius: 50%;
    height: 26px;
    width: 26px;
    margin-left: -12px;
    background-color: var(--bgcolor);
    font-size: 11px;
    line-height: 1;
  }
}
</style>
