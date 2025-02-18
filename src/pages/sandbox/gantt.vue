<template>
  <div class="gantt">
    <H_gantt :data="data" class="gant-gant"></H_gantt>
  </div>
</template>

<script setup lang="ts">
import H_gantt from "../../../lib/Components/gant/main/H_gantt.vue";
import { testData } from "../../../lib/Components/gant/data/testData";
import { ref } from "vue";

const data = ref();

setTimeout(() => {
  data.value = testData;
}, 40);
</script>

<style></style>
