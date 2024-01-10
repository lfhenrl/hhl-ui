<template>
  <H_pop
    class="H_menu-pop"
    :offset-top="8"
    :offset-left="2"
    close-popup-click
    position="fixed"
  >
    <template v-slot:referance>
      <H_menuHead :index="index" />
    </template>
    <H_menuBody :index="index" @filteropen="filterOpen" />
  </H_pop>
  <H_menuFilter :index="index" ref="menuFilterRef" data-subtype="menu" />
</template>

<script setup lang="ts">
import H_pop from "../../popup/H_pop.vue";
import H_menuHead from "./H_menuHead.vue";
import H_menuBody from "./H_menuBody.vue";
import H_menuFilter from "../sub/H_menuFilter.vue";
import { ref } from "vue";

type iH_menuFilter = InstanceType<typeof H_menuFilter>;
const menuFilterRef = ref<iH_menuFilter | null>(null);

defineProps({
  index: { type: Number, default: 0 },
});

function filterOpen() {
  menuFilterRef.value!.filterOpen();
}
</script>

<style>
.H_menu-pop {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
