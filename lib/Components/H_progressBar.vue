<template>
  <div
    class="H_progressBar"
    h-width="100%"
    h-border-radius="4px"
    h-overflow="hidden"
    h-bgcolor="var(--bgcol-0)"
    h-color="var(--col-pri)"
    h-min-height="0.3em"
    role="progressbar"
    aria-label="progressbar"
    :speed
  >
    <div v-if="show" class="value" h-width="50%" h-height="100%" h-min-height="0.3em"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  speed: { type: String, default: "1s" },
});
</script>
<style>
@layer components {
  .H_progressBar {
    --progress-speed: attr(speed type(<time>));
    .value {
      background-color: var(--h-color);
      animation: indeterminateAnimation var(--progress-speed) infinite linear;
    }
  }

  @keyframes indeterminateAnimation {
    0% {
      transform: translateX(-100%);
    }
    70% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(200%);
    }
  }
}
</style>
