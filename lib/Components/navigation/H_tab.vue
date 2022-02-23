<template>
  <div v-if="selected || keepAlive" v-show="selected" class="H_tab">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch } from "vue";

const props = defineProps({
  label: { default: "???", type: String },
  name: { default: "???", type: String },
  icon: { default: "", type: String },
  tab_class: { default: "", type: String },
  keepAlive: { default: false, type: Boolean },
  disabled: { default: false, type: Boolean },
  selected: { default: false, type: Boolean }
});

watch(
  () => props.tab_class,
  () => tabData.changed()
);

const tabData: any = inject("tabData");
const selected = computed(() => tabData.selected.value === props.name);
</script>

<style>
.H_tab {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  /* overflow: hidden; */
}
</style>
