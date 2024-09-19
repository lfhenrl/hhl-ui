<template>
  <div>
    <div class="flex flex-wrap gap-3">
      <div
        class="flex flex-col items-center w-40 border border-pri border-solid rounded text-3xl p-2"
        v-for="icon in icons"
        :key="icon.key"
      >
        <div :class="[icon.class]"></div>
        <div class="text-xs">{{ icon.class }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ico from "../../lib/styles/tw/icons/icons.json";

const icons: any = ref([]);

for (const [key] of Object.entries(ico.icons)) {
  const val = {
    name: key,
    class: `ico-${key}`,
  };
  icons.value.push(val);
}
</script>
