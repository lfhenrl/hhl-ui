<template>
  <div class="gantt__Item" :style="{ top: top }">
    <div @mousedown="mouseDown" class="gantt__Item_bar" :style="{ left: l + 'px', width: w + 'px' }">
      <div class="gantt__Item_bar_dragLeft" />
      <div class="gantt__Item_bar_dragRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  item: Object,
  globalStartTime: Number,
  index: { type: Number, default: 0 }
});

const w = ref(0);
const l = ref(0);

const top = computed(() => {
  const index = props.index;
  const _top = index * 24 + 38;
  return _top + "px";
});

let offSet = 0;
function mouseDown(e: MouseEvent) {
  offSet = e.clientX - l.value;
  // console.log("mouseDown", l.value, e.offsetX, e.clientX, offSet);
  document.addEventListener("mouseup", mouseUp, false);
  document.addEventListener("mousemove", move, true);
}

function mouseUp() {
  console.log("mouseUp");
  document.removeEventListener("mouseup", mouseUp, false);
  document.removeEventListener("mousemove", move, true);
  const cc = (l.value / secPixcel) * 1000;
  console.log("Time", l.value, cc, new Date(cc + _GlobalStartTime));
}

function move(e: MouseEvent) {
  const val = e.x - offSet;
  const val21 = val / 20;
  const nVal = 20 * Math.ceil(val21);
  l.value = nVal;
}

const _GlobalStartTime = props.globalStartTime ?? 0;
const _startTime = props.item?.startTime ?? 0;
const _endTime = props.item?.endTime ?? 0;

const daySec = 24 * 60 * 60;
const secPixcel = 20 / daySec;

if (_GlobalStartTime > 0 && _startTime > 0 && _endTime > 0) {
  const timeLeft = (_startTime - _GlobalStartTime) / 1000;
  const timeWidth = (_endTime - _startTime) / 1000;
  w.value = timeWidth * secPixcel;
  l.value = timeLeft * secPixcel;
}
</script>

<style>
.gantt__Item {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 38px;
  font-size: 11px;
  line-height: 11px;
  width: 100%;
  border-bottom: 1px solid var(--col-bg-5);
  z-index: 5;
  overflow: visible;
}

.gantt__Item_bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 18px;
  max-height: 18px;
  margin-bottom: 2px;
  background-color: red;
  z-index: 9;
  overflow: visible;
}

.gantt__Item_bar_dragLeft {
  position: absolute;
  cursor: col-resize;
  left: 0;
  height: 100%;
  width: 8px;
  background-color: aqua;
  opacity: 0;
}

.gantt__Item_bar_dragLeft:hover {
  opacity: 1;
}

.gantt__Item_bar_dragRight {
  position: absolute;
  cursor: col-resize;
  right: 0;
  height: 100%;
  width: 8px;
  background-color: aqua;
  opacity: 0;
}

.gantt__Item_bar_dragRight:hover {
  opacity: 1;
}
</style>
