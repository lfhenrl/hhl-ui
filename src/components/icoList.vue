<template>
  <div class="flex flex-wrap gap-3 my-4 p-2 bg-bg6">
    <div
      v-for="(item, index) in Object.keys(icons)"
      :key="index"
      class="flex flex-col items-center w-40 border border-txt6 border-solid rounded p-2 text-2xl"
    >
      <H_icon :name="item as any" size="2rem" />
      <div class="text-sm">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icons } from "../../lib/SubComponents/icons/icons";
</script>
