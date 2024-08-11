<template>
  <a class="H_route_link" :href="to" :class="{ selected: isSelected }">
    <div class="H_route_link_indicator" />
    <div class="H_route_link_img">
      <H_icon icon="icon" />
    </div>
    <div class="H_route_link_text">{{ title }}</div>
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
@layer hhl-components {
  .H_route_link {
    display: grid;
    grid-template-columns: 3px 50px;
    grid-template-rows: 26px 14px;
    /*   border: 1px solid red; */
    color: var(--col-txt-2);
  }
  .H_route_link.selected {
    color: var(--col-pri);
  }
  .H_route_link_indicator {
    grid-column: 1;
    grid-row: 1/3;
    height: 100%;
    width: 100%;
  }

  .H_route_link.selected .H_route_link_indicator {
    background-color: var(--col-pri);
  }
  .H_route_link_img {
    display: flex;
    grid-column: 2;
    grid-row: 1;
    align-items: center;
    justify-content: center;
    /*   border: 1px solid lime; */
  }

  .H_route_link_text {
    display: flex;
    grid-column: 2;
    grid-row: 2;
    align-items: center;
    justify-content: center;
    /*   border: 1px solid blue; */
    font-size: 12px;
  }
}
</style>
