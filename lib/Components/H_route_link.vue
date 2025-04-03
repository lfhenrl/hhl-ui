<template>
  <a
    class="H_route_link grid grid-cols-[3px_50px] grid-rows-[26px_14px]"
    :href="to"
    :class="{ 'text-pri': isSelected }"
  >
    <div class="col-start-1 row-start-1 row-end-3 h-full w-full" :class="{ 'bg-pri': isSelected }" />
    <div class="H_route_link_img flex items-center justify-center col-start-2 row-start-1">
      <div :class="icon" />
      <component :is="icon" />
    </div>
    <div class="H_route_link_text flex items-center justify-center text-xs col-start-2 col-row-2">{{ title }}</div>
  </a>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "Title" },
  to: { type: String, default: "#/" },
  icon: { type: String, default: "H_iconHome" },
  disabled: { type: Boolean, default: false },
  isSelected: { type: Boolean, default: false },
});
</script>
