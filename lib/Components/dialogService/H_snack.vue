<template>
  <transition name="alert" @after-leave="$emit('close')">
    <div v-show="modelValue" class="H_snack flex fixed p-1.5 pb-3 rounded shadow bg-bg2 top-5 right-5 text-txt0 z-50 min-w-[330px] max-w-[330px]" @click="$emit('update:modelValue', false)">
      <H_icon :icon="icon" size="28px" :color="color" />
      <div class="flex flex-col flex-1 items-center">
        <span class="font-bold text-lg">{{ title }}</span>
        <span class="H_snack__text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import H_icon from "../H_icon.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  type: { default: "warn", type: String },
  title: { default: "Title", type: String },
  text: { default: "Title", type: String },
});

const emit = defineEmits(["show", "close", "update:modelValue"]);

const color = computed(() => {
  if (props.type === "info") {
    return "var(--col-ok)";
  }
  if (props.type === "warn") {
    return "var(--col-warn)";
  }
  if (props.type === "err") {
    return "var(--col-err)";
  }
  return "var(--col-ok)";
});

const icon = computed(() => {
  if (props.type === "info") {
    return "check";
  }
  return "info";
});

function close() {
  emit("show", false);
}
defineExpose({ close });
</script>

<style>
.alert-leave-active {
  animation: slide-out 0.5s reverse;
}
.alert-enter-active /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-up 0.5s;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  60% {
    opacity: 1;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  60% {
    opacity: 1;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
