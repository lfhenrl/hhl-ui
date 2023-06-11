<template>
  <div ref="moreRows" class="H_datagridMoreRows"></div>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from "vue";
import { iDatagrid } from "../provide";

const props = defineProps({
  id: { type: String, default: "" }
});
const dg = inject("dg") as iDatagrid;
const moreRows = ref();
let observer: any = {};

function InView(entries: any) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      dg.MoreRows(props.id);
    } else {
    }
  });
}

onMounted(() => {
  let options = {
    root: dg.MainContainer,
    rootMargin: "0px",
    threshold: 0
  };
  observer = new IntersectionObserver(InView, options);
  observer.observe(moreRows.value);
});

onBeforeUnmount(() => {
  observer.disconnect();
  observer = null;
});
</script>

<style>
.H_datagridMoreRows {
  display: flex;
  flex: 1;
  margin-top: -100px;
  height: 40px;
}
</style>
