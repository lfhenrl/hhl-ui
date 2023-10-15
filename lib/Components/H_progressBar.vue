<template>
  <div
    class="H_progressBar min-h-[4px] w-full overflow-hidden rounded"
    v-if="show"
  >
    <div class="H_progressBar-value h-full min-h-[4px] w-full"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  color_bg: { type: String, default: "" },
  color_fg: { type: String, default: "var(--col-pri)" },
});
</script>

<style>
.H_progressBar {
  background-color: v-bind(color_bg);
}
.H_progressBar-value {
  background-color: v-bind(color_fg);
  animation: indeterminateAnimation 1s infinite linear;
  transform-origin: 0% 50%;
}

@keyframes indeterminateAnimation {
  0% {
    transform: translateX(0) scaleX(0);
  }
  40% {
    transform: translateX(0) scaleX(0.4);
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
  }
}
</style>
