<template>
  <div class="flex flex-col items-center w-60">
    <H_chartPie :data="list" legend-placement="bottom" :legend-stacked="true" font-size="12px" :pie-width="20" />
    <H_btn @click="load">load</H_btn>
    <H_btn @click="load1">load1</H_btn>
    <H_btn @click="load2">load2</H_btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const list = ref<any>([
  { name: "Name1", value: 25, color: "lime" },
  { name: "Name2", value: 25, color: "red" },
  { name: "Name3", value: 25, color: "orange" },
  { name: "Name", value: 25, color: "blue" }
]);

function load() {
  list.value = [
    { name: "Name1", value: 10, color: "lime" },
    { name: "Name2", value: 40, color: "red" },
    { name: "Name3", value: 25, color: "orange" },
    { name: "Name", value: 25, color: "blue" }
  ];
}

function load1() {
  list.value = [
    { name: "Name1", value: 1, color: "lime" },
    { name: "Name2", value: 30, color: "red" },
    { name: "Name3", value: 29, color: "orange" },
    { name: "Name", value: 40, color: "blue" }
  ];
}

function load2() {
  const rand = Math.floor(Math.random() * 90);
  console.log("rand", rand);
  const restDivede6 = (100 - rand) / 6;
  list.value = [
    { name: "Name1", value: rand, color: "lime" },
    { name: "Name2", value: restDivede6, color: "red" },
    { name: "Name3", value: restDivede6 * 3, color: "orange" },
    { name: "Name", value: restDivede6 * 2, color: "blue" }
  ];
}
</script>

<style></style>
