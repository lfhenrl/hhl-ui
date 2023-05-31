<template>
  <H_inputbase class="h_slider col-pri" :label="label" :movelabel="true">
    <div class="h_slider_inner">
      <div class="h_slider_innerBox">
        <div class="h_slider_info" :style="{ left: posProcent }">{{ modelValue }}</div>
      </div>
      <input type="range" :value="modelValue" @input="changed" :disabled="disabled" />
    </div>
  </H_inputbase>
</template>

<script setup lang="ts">
import H_inputbase from "./H_inputBase.vue";
import { computed } from "vue";

const P = defineProps({
  modelValue: {
    type: [String, Number],
    default: false
  },
  label: {
    type: String,
    default: ""
  },
  min: {
    type: String,
    default: "100"
  },
  max: {
    type: String,
    default: "0"
  },
  disabled: { type: Boolean, default: false },
  validator: Array
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
.h_slider {
  background-color: transparent !important;
}
.h_slider_inner {
  position: relative;
  display: grid;
  background-color: transparent !important;
  flex: 1;
  margin: 0 5px;
  align-items: center;
}

.h_slider_innerBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 26px;
  pointer-events: none;
}

.h_slider_info {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 27px;
  border-radius: 4px;
  line-height: 1;
  pointer-events: none;
  font-size: 11px;
  margin-left: 1px;
  color: var(--current-txt-col);
}

.h_slider input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(var(--current-bg-col), var(--current-bg-col));
  background-size: 100%;
  background-repeat: no-repeat;
}

.h_slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  background: var(--current-bg-col);
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

.h_slider input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
