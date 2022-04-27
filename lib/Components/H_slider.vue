<template>
  <H_inputBase
    label="Progress"
    :validator="validator"
    :disabled="disabled"
    :readonly="$attrs.readonly"
    :value="modelValue"
    @isValid="$emit('isValid', $event)"
    class="henrik"
  >
    <div class="H_slider col-pri">
      <div class="H_slider_scale">
        <div class="H_slider_info" :style="{ left: posProcent }">{{ modelValue }}</div>
      </div>
      <div class="H_slider_input">
        <input type="range" :value="modelValue" @input="changed" />
      </div>
    </div>
  </H_inputBase>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Number, String],
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

const emit = defineEmits(["update:modelValue", "isValid"]);

const posProcent = computed(() => {
  const faktor = (parseInt(props.max) - parseInt(props.min)) / 100;
  return parseInt(props.modelValue.toString()) / faktor + "%";
});

function changed(e: any) {
  emit("update:modelValue", e.target.value);
}
</script>

<style>
.H_slider {
  display: grid;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  background-color: transparent;
  flex: 1;
  margin: 8px 0;
}

.H_slider_scale {
  position: relative;
  display: flex;
  margin: 0 7px;
  align-items: center;
  order: -1;
}

.H_slider .H_slider_input {
  max-height: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
}

.H_slider_info {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--col-txt-1);
  min-width: 28px;
  max-width: 28px;
  margin-left: -14px;
  border-radius: 4px;
  line-height: 1;
}

.H_slider input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient(var(--current-bg-col), var(--current-bg-col));
  background-size: 100%;
  background-repeat: no-repeat;
}

.H_slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--current-bg-col);
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

.H_slider input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
