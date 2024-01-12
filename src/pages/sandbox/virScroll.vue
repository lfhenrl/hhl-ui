<template>
  <div class="_page">
    <H_btn @click="load">Load</H_btn>
    <H_virtualList data-key="id" :data-sources="data" ref="vscroll">
      <template v-slot:header> <div class="header">HEADER</div></template>
      <template v-slot:footer>FOOTER</template>
      <template v-slot="{ item }">
        <div class="listItem shadow">
          <div>Id: {{ item.id }}</div>
          <div>Row: {{ item.val1 }}</div>
          <div>Group: {{ item.val2 }}</div>
          <div>Val3: {{ item.val3 }}</div>
          <div>Val4: {{ item.val4 }}</div>
        </div>
      </template>
    </H_virtualList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_virtualList from "../../../lib/Components/H_virtualList.vue";
import { getData, testDataItem } from "../../testData/data";
import H_btn from "../../../lib/Components/H_btn.vue";

const data = ref<testDataItem[]>([]);
const vscroll = ref<InstanceType<typeof H_virtualList> | null>(null);

async function load() {
  data.value = await getData(4000);
}
</script>
<style>
._page {
  display: flex;
  padding: 32px;
  background-color: var(--col-bg-0);
  height: 100%;
}
.header {
  background-color: gray;
  width: 100%;
}

.listItem {
  display: flex;
  gap: 50px;
  background-color: rgb(95, 95, 95);
  max-height: 30px;
  overflow: visible;
}
.listItem div {
  width: 200px;
}
.H_virtualListItem {
  overflow: visible;
  display: inline-block;
}
</style>
