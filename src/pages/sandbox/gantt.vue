<template>
  <div class="gantt">
    <H_gantt :data="testData" class="gant-gant"></H_gantt>
  </div>
</template>

<script setup lang="ts">
import H_gantt from "../../../lib/Components/gant/main/H_gantt.vue";
import { testData } from "../../../lib/Components/gant/data/testData";
</script>

<style>
.gantt {
  height: 300px;
}
</style>
