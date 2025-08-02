<template>
  <a class="H_route_link" :href="to" :selected="isSelected ? '' : undefined">
    <div class="bar h_h-full h_w-full"></div>
    <div class="img h_flex h_items-center h_justify-center">
      <H_icon :name="icon"></H_icon>
    </div>
    <div class="text h_flex h_items-center h_justify-center">{{ title }}</div>
  </a>
</template>

<script setup lang="ts">
import { iconsProps } from "../SubComponents/icons/iconProp";
import H_icon from "./H_icon.vue";
defineProps({
  title: { type: String, default: "Title" },
  to: { type: String, default: "#/" },
  icon: { type: iconsProps, default: "home" },
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

    .bar {
      grid-column-start: 1;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    .img {
      grid-column-start: 2;
      grid-row-start: 1;
    }

    .text {
      font-size: 0.75em;
      grid-column-start: 2;
      grid-row-start: 2;
    }
    &[selected] {
      color: var(--color-pri);
      .H_route_link_bar {
        background-color: var(--color-pri);
      }
    }
  }
}
</style>
