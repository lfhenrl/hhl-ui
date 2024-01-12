<template>
  <div ref="el" role="listitem" :class="itemClass" :style="itemStyle(data)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUpdated, ref } from "vue";

const props = defineProps({
  setSize: {
    type: Function,
    default: {},
  },
  item_style: { type: Function, default: null },
  horizontal: {
    type: Boolean,
  },
  data: {
    type: Object,
  },
  uniqueKey: {
    type: [String, Number],
  },
  index: {
    type: [String, Number],
  },
  itemClass: {
    type: String,
    default: "H_virtualListItem",
  },
});

const el = ref<HTMLElement | null>(null);
const shapeKey = props.horizontal ? "offsetWidth" : "offsetHeight";
let resizeObserver: any;

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    dispatchSizeChange();
  });
  resizeObserver.observe(el.value);
});

onUpdated(() => {
  dispatchSizeChange();
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});

function itemStyle(item: any) {
  return props.item_style?.(item) ?? "";
}

function getCurrentSize() {
  return el.value ? el.value[shapeKey] : 0;
}

// tell parent current size identify by unqiue key
function dispatchSizeChange() {
  // this.$parent!.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
  props.setSize(props.uniqueKey, getCurrentSize());
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
