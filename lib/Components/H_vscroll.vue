<template>
  <div class="H_vscroll">
    <div class="H_vscroll-header" ref="headerRef"><slot name="header" /></div>
    <div class="H_vscroll-body" ref="parentRef">
      <div class="H_vscroll-header-sticky">
        <slot name="header-sticky" />
      </div>
      <div
        class="H_vscroll-body_container"
        :style="{ height: `${totalSize}px` }"
      >
        <div
          class="H_vscroll-posContainer"
          :style="{ transform: `translateY(${virtualRows[0]?.start ?? 0}px)` }"
        >
          <div
            class="H_vscroll-item"
            v-for="virtualRow in virtualRows"
            :key="virtualRow.key"
            :data-index="virtualRow.index"
            :ref="measureElement"
            :class="virtualRow.index % 2 ? 'Odd' : 'Even'"
            :selected="selectedIndex == virtualRow.index ? true : null"
          >
            <slot
              :item="(get_data(virtualRow.index) as any)"
              :index="virtualRow.index"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="H_vscroll-footer"><slot name="footer" /></div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualizer } from "@tanstack/vue-virtual";
import { computed, ref } from "vue";

const P = defineProps({
  items: { type: Array, default: [] },
  estimateSize: { type: Number, default: 30 },
  overscan: { type: Number, default: 10 },
  paddingStart: { type: Number, default: 0 },
  paddingEnd: { type: Number, default: 0 },
  debug: { type: Boolean, default: false },
  selectedIndex: { type: Number, default: 1 },
});

defineExpose({
  scrollToIndex,
  scrollToOffset,
  getvirtualRows,
});

const parentRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

const rowVirtualizerOptions = computed(() => {
  return {
    count: P.items.length,
    getScrollElement: () => parentRef.value,
    estimateSize: () => P.estimateSize,
    overscan: P.overscan,
    debug: P.debug,
    paddingStart: P.paddingStart,
    paddingEnd: P.paddingEnd,
  };
});

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions);

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

const measureElement = (el: HTMLElement) => {
  if (!el) {
    return;
  }
  rowVirtualizer.value.measureElement(el);
  /*   const dd = el.getClientRects();
  console.log("wwwwwwwwwwww", dd[0].height); */
  return undefined;
};

function get_data(i: number) {
  const data = P.items[i];
  console.log("pppp", virtualRows.value[0]?.start);
  return data;
}

function scrollToIndex(index: number) {
  rowVirtualizer.value.scrollToIndex(index);
}
function scrollToOffset(index: number) {
  rowVirtualizer.value.scrollToOffset(index);
}
function getvirtualRows() {
  let first = virtualRows.value[0].index;
  let last = virtualRows.value[virtualRows.value.length - 1].index;
  return P.items.slice(first, last);
}
</script>

<style>
.H_vscroll {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
}
.H_vscroll-body {
  overflow-y: auto;
  overflow-x: auto;
  contain: strict;
  position: "relative";
}
.H_vscroll-body_container {
  position: "relative";
  display: inline-block;
  width: 100%;
}
.H_vscroll-posContainer {
  top: 0;
  left: 0;
}
.H_vscroll-header {
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}

.H_vscroll-header-sticky {
  display: inline-block;
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
