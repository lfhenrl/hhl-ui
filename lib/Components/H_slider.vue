<template>
  <H_inputBase
    class="H_slider col-pri"
    :label="label"
    :movelabel="true"
    :disabled="disabled"
  >
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
import { computed } from "vue";
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
</script>

<style>
@layer hhl-components {
  .H_slider {
    flex: 1 1 0%;
    background-color: transparent;
    max-height: 36px;
    min-height: 36px;
    height: 36px;
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
    background-image: linear-gradient(
      var(--current-bg-col),
      var(--current-bg-col)
    );
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
    background-color: var(--current-bg-col);
    font-size: 11px;
    line-height: 1;
  }
}
</style>
