<template>
  <a class="H_route_link" :href="to" :class="{ 'text-pri': isSelected }">
    <div class="col-start-1 row-start-1 row-end-3 h-full w-full" :class="{ 'bg-pri': isSelected }" />
    <div class="H_route_link_img flex items-center justify-center col-start-2 row-start-1">
      <H_icon :name="icon as any" />
    </div>
    <div class="H_route_link_text flex items-center justify-center text-xs col-start-2 col-row-2">{{ title }}</div>
  </a>
</template>

<script setup lang="ts">
import H_icon from "./H_icon.vue";
defineProps({
  title: { type: String, default: "Title" },
  to: { type: String, default: "#/" },
  icon: { type: String, default: "home" },
  disabled: { type: Boolean, default: false },
  isSelected: { type: Boolean, default: false },
});
</script>
<style>
@layer components {
  .H_route_link {
    display: grid;
    grid-template-columns: 3px 50px;
    grid-template-rows: 26px 14px;
  }
}
</style>
