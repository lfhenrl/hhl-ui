<template>
  <div class="h_switch col-pri inline-flex items-center bg-transparent cursor-pointer">
    <div class="h_switch-container inline-flex items-center justify-start cursor-pointer gap-2.5" :class="{'flex-row-reverse': labelLeft}" @click="Click" @keyup.space="Click" @keyup.enter="Click">
      <div class="h_switch-box group relative inline-flex items-center" :checked="modelValue" :class="{ 
        'w-[30px] h-[11px]': size === 'sm',
        'w-[40px] h-[14px]': size === 'md',
        'w-[55px] h-[20px]': size === 'lg',
        }" >
        <div class="h_switch-icon-outer absolute bg-bg5 rounded-[10px] opacity-90 top-0 left-0 right-0 bottom-0" />
        <div tabindex="0" class="h_switch-icon-inner rounded-full aspect-square transition z-10 bg-bg6 h-[160%] ring-offset-2 ring-offset-pri focus:outline-none focus:ring " />
      </div>
      <span class="text-txt1 select-none line-clamp-1 text-sm">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType} from "vue";

const P = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: false
  },
  label: { type: String, default: "" },
  labelLeft: { type: Boolean, default: false },
  size: {
    type: String as PropType<"lg" | "md" | "sm">,
    default: "md"
  }
});
const E = defineEmits(["update:modelValue", "changed"]);

function Click() {
  const val = !P.modelValue;
  E("update:modelValue", val);
}
</script>

<style>

.h_switch-box[checked="true"] .h_switch-icon-inner {
  transform: translateX(80%);
  background-color: var(--current-bg-col);
  opacity: 1;
}

.h_switch-box[checked="true"] .h_switch-icon-outer {
  background-color: var(--current-bg-col);
  opacity: 0.5;
}
</style>
