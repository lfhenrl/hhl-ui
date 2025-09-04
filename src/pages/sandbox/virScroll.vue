<template>
  <div h-display="flex" h-bgcolor="var(--bgcol-0)" h-padding="32px" h-height="500px">
    <H_btn @click="load">Load</H_btn>
    <H_virtualList data-key="id" :data-sources="data" ref="vscroll">
      <template v-slot:footer>FOOTER</template>
      <template v-slot="{ item }">
        <div
          h-display="flex"
          h-align-items="center"
          h-bgcolor="var(--bgcol-2)"
          h-max-height="30px"
          h-overflow="visible"
          h-margin="2px 0"
        >
          <div h-width="200px">Id: {{ item.id }}</div>
          <div h-width="200px">Row: {{ item.val1 }}</div>
          <div h-width="200px">Group: {{ item.val2 }}</div>
          <div h-width="200px">Val3: {{ item.val3 }}</div>
          <div h-width="200px">Val4: {{ item.val4 }}</div>
        </div>
      </template>
    </H_virtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_virtualList from "../../../lib/Components/H_virtualList.vue";
import { getData, type testDataItem } from "../../testData/data";
import H_btn from "../../../lib/Components/H_btn.vue";

const data = ref<testDataItem[]>([]);
const vscroll = ref<InstanceType<typeof H_virtualList> | null>(null);

async function load() {
  data.value = await getData(5000);
}
</script>
<style></style>
