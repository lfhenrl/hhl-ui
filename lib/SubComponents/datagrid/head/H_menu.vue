<template>
  <H_popover ref="popupRef" class="flex items-center h-full max-w-12" :offset-top="8" :offset-left="2" position="fixed">
    <template v-slot:referance>
      <H_menuHead :index="index" />
    </template>
    <H_menuBody :index="index" @filteropen="filterOpen" @popup-close="popupClose" />
  </H_popover>
  <H_menuFilter :index="index" ref="menuFilterRef" data-subtype="menu" />
</template>

<script setup lang="ts">
import H_popover from "../../../Components/H_popover.vue";
import H_menuHead from "./H_menuHead.vue";
import H_menuBody from "./H_menuBody.vue";
import H_menuFilter from "../sub/H_menuFilter.vue";
import { ref } from "vue";

type iH_menuFilter = InstanceType<typeof H_menuFilter>;
type iH_popover = InstanceType<typeof H_popover>;
const menuFilterRef = ref<iH_menuFilter | null>(null);
const popupRef = ref<iH_popover | null>(null);

defineProps({
  index: { type: Number, default: 0 },
});

function filterOpen() {
  menuFilterRef.value!.filterOpen();
}
function popupClose() {
  popupRef.value!.close();
}
</script>
