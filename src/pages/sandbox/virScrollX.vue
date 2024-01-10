<template>
  <div class="_page">
    <H_btn @click="load">Load</H_btn>
    <H_btn @click="scrollTo">Scroll To</H_btn>
    <H_vscroll :items="data" ref="vscroll">
      <template v-slot:header>HEADER</template>
      <template v-slot:footer>FOOTER</template>
      <template v-slot="{ item, index }: { item: testDataItem, index: number }">
        {{ item.id }} index {{ index }}
      </template>
    </H_vscroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_vscroll from "../../../lib/Components/H_vscroll.vue";
import { getData, testDataItem } from "../../testData/data";
import H_btn from "../../../lib/Components/H_btn.vue";

const data = ref<testDataItem[]>([]);
const vscroll = ref<InstanceType<typeof H_vscroll> | null>(null);

async function load() {
  data.value = await getData(4000);
}
async function scrollTo() {
  vscroll.value?.scrollToIndex(444);
}
</script>
<style scoped>
._page {
  display: flex;
  padding: 32px;
  background-color: var(--col-bg-0);
  height: 100%;
}
.ListItemEven {
  background-color: #e6e4dc;
}
</style>
