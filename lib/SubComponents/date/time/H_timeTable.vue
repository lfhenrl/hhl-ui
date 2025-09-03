<template>
  <div ref="tablelist" class="H_timeTable" :class="{ hour: timeBase === 'hour' }" @click="click">
    <div v-for="index in 60" :key="index" class="H_timeTable_item"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watchEffect } from "vue";

const P = defineProps({
  showSeconds: { default: false, type: Boolean },
  timeBase: { type: String, default: "hour" },
});

const model: any = defineModel({ default: { hour: "02", minute: "11", second: "22" } });
const E = defineEmits(["baseChanged"]);
const tablelist = useTemplateRef("tablelist");
let list: NodeListOf<Element>;

watchEffect(() => {
  const time = model.value[P.timeBase];
  if (tablelist.value) {
    list.forEach((item) => {
      if (item.textContent === time) {
        item.setAttribute("selected", "");
      } else {
        item.removeAttribute("selected");
      }
    });
  }
});

function click(e: MouseEvent) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (!target) return;
  const newVal = target.textContent;
  model.value[P.timeBase] = newVal;
  model.value = { ...model.value };
  if (P.timeBase === "hour") E("baseChanged", "minute");
  if (P.timeBase === "minute" && P.showSeconds) E("baseChanged", "second");
}

onMounted(() => {
  if (tablelist.value) {
    list = tablelist.value.querySelectorAll(".H_timeTable_item");
  }

  list.forEach((item, index) => {
    if (index < 24) {
      item.setAttribute("hour", "");
    }
    item.textContent = Number(index).toString().padStart(2, "0");
  });
});
</script>
<style>
@layer components {
  .H_timeTable {
    display: grid;
    grid-template-rows: repeat(8, 30px);
    grid-template-columns: repeat(8, 30px);
    padding: 0.25em;
    background-color: var(--color-bg6);
  }

  .H_timeTable_item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    text-box-trim: trim-both;

    &[selected] {
      background-color: var(--col-pri);
      color: white;
    }
  }

  .H_timeTable_item:hover {
    background-color: var(--col-warn);
  }

  .H_timeTable.hour .H_timeTable_item:not([hour]) {
    opacity: 20%;
    pointer-events: none;
  }
}
</style>
