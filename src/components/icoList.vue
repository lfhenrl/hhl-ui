<template>
  <div class="flex flex-wrap gap-3 my-4">
    <div
      v-for="(view, index) in list"
      :key="index"
      class="flex flex-col items-center w-40 border border-pri border-solid rounded p-2 text-2xl"
    >
      <component :is="view" />
      <div class="text-sm">{{ view }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";

const list: any = ref([]);

onMounted(() => {
  const requireComponent = import.meta.glob("../../lib/Components/icons/*.vue");
  list.value = [];
  Object.keys(requireComponent).forEach((fileName: string) => {
    const componentName = (fileName.split("/").pop() ?? "").replace(/\.\w+$/, "");
    console.log(componentName);
    list.value.push(componentName);
  });
});
</script>
