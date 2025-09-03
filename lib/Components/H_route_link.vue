<template>
  <a
    class="H_route_link"
    :href="to"
    :selected="isSelected ? '' : undefined"
    h-display="grid"
    h-grid-tmp-cols="3px 50px"
    h-grid-tmp-rows="26px 14px"
  >
    <div class="bar" h-height="100%" h-width="100%" h-grid-row="1 / 3" h-grid-col="1"></div>
    <div class="img" h-display="flex" h-align-items="center" h-justify-content="center" h-grid-row="1" h-grid-col="2">
      <H_icon :name="icon"></H_icon>
    </div>
    <div
      class="text"
      h-font-size="0.75em"
      h-display="flex"
      h-align-items="center"
      h-justify-content="center"
      h-grid-row="2"
      h-grid-col="2"
    >
      {{ title }}
    </div>
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
    &[selected] {
      color: var(--col-pri);
      .H_route_link_bar {
        background-color: var(--col-pri);
      }
    }
  }
}
</style>
