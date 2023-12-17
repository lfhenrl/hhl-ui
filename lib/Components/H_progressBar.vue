<template>
  <div class="H_progressBar" v-if="show">
    <div class="H_progressBar-value"></div>
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
@layer hhl-components {
  .H_progressBar {
    min-height: 4px;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    background-color: v-bind(color_bg);
  }

  .H_progressBar-value {
    height: 100%;
    min-height: 4px;
    width: 100%;
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
}
</style>
