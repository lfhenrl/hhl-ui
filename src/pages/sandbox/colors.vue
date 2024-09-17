<template>
  <div class="flex flex-col gap-3">
    <div class="ico-cast"></div>
    <div class="flex flex-col gap-3" v-for="icon in icons" :key="icon.key">
      <div :class="icon.class"></div>
      <div>Name:{{ icon.class }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ico from "../../../lib/tw/icons/icons.json";

const icons: any = ref([]);

for (const [key, value] of Object.entries(ico.icons)) {
  console.log(`${key}: ${value}`);
  const val = {
    name: key,
    class: `ico-${key}`,
  };
  icons.value.push(val);
}
</script>

<style></style>
