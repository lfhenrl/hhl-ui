<template>
  <H_inputBase
    class="h_slider max-h-[36px] min-h-[36px] flex-1 bg-transparent"
    :label="label"
    :movelabel="true"
  >
    <div
      class="h_slider_inner relative grid max-h-[36px] min-h-[36px] flex-1 items-center bg-transparent px-1"
    >
      <div
        class="h_slider_innerBox pointer-events-none absolute bottom-0 left-[16px] right-[16px] top-0 flex items-center"
      >
        <div
          class="h_slider_info lea pointer-events-none absolute ml-[-12px] flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[var(--current-bg-col)] text-[11px] leading-none"
          :style="{ left: posProcent }"
        >
          {{ modelValue }}
        </div>
      </div>
      <input
        type="range"
        class="h-1.5 w-full appearance-none rounded bg-gradient-to-t from-[var(--current-bg-col)] to-[var(--current-bg-col)]"
        :value="modelValue"
        @input="changed"
        :aria-label="label"
        :name="label"
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
/* .h_slider input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
} */
</style>
