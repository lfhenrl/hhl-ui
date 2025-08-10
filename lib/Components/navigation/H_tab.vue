<template>
  <transition mode="out-in" name="h_tab">
    <div
      v-if="show || keep_alive"
      v-show="show"
      :animateLeft="animateLeft ? '' : null"
      class="H_tab"
      h-display="flex"
      h-flex-direction="column"
      h-height="100%"
    >
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { inject, watch, ref } from "vue";

const P = defineProps({
  label: { default: "???", type: String },
  name: { default: "???", type: String },
  icon: { default: "", type: String },
  tab_class: { default: "", type: String },
  keepAlive: { default: false, type: Boolean },
  selected: { default: false, type: Boolean },
  disabled: { type: Boolean, default: false },
});
const show = ref(false);
const animateLeft = ref(false);
const keep_alive = ref(false);
const tabData: any = inject("tabData");

watch(
  tabData.selectedIndex,
  () => {
    if (tabData.selectedIndex.value < tabData.oldSelectedIndex) {
      animateLeft.value = true;
    } else {
      animateLeft.value = false;
    }
    if (tabData.name === P.name) {
      setTimeout(() => {
        show.value = true;
        setTimeout(() => {
          keep_alive.value = P.keepAlive;
        }, 10);
      }, 50);
    } else {
      show.value = false;
    }
  },
  { immediate: true }
);
</script>
<style>
@layer components {
  .h_tab-enter-active {
    transition: all 0.3s ease-in;
  }

  .h_tab-leave-active {
    transition: all 0.3s ease-out;
  }
  .h_tab-enter-from {
    opacity: 0;
    transform: translateX(var(--animate-from));
  }

  .h_tab-leave-to {
    opacity: 0;
    transform: translateX(var(--animate-to));
  }
  .H_tab {
    --animate-from: 50%;
    --animate-to: -50%;

    &[animateLeft] {
      --animate-from: -50%;
      --animate-to: 50%;
    }
  }
}
</style>
