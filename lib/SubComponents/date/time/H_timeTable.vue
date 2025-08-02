<template>
  <div ref="tablelist" class="h_grid H_timeTable h_outline-none h_bg6" :base="timeBase" @click="click">
    <div
      v-for="index in 60"
      :key="index"
      class="time-item h_flex h_items-center h_justify-center h_cursor-pointer"
    ></div>
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
    list = tablelist.value.querySelectorAll(".time-item");
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
    grid-template-columns: repeat(8, 30px);
    grid-template-rows: repeat(8, 30px);
    padding: 0.25em;

    &[base="hour"] {
      .time-item:not([hour]) {
        opacity: 20%;
        pointer-events: none;
      }
    }

    .time-item {
      border-radius: 50%;
      text-box-trim: trim-both;

      &[selected] {
        background-color: var(--color-pri);
        color: var(--color-priTxt);
      }

      &:hover {
        background-color: var(--color-warn);
      }
    }
  }
}
</style>
