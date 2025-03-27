<template>
  <div class="_page">
    <H_btn @click="load">Load</H_btn>
    <H_virtualList data-key="id" :data-sources="data" ref="vscroll">
      <template v-slot:footer>FOOTER</template>
      <template v-slot="{ item }">
        <div class="listItem">
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
import { getData, type testDataItem } from "../../testData/data";
import H_btn from "../../../lib/Components/H_btn.vue";

const data = ref<testDataItem[]>([]);
const vscroll = ref<InstanceType<typeof H_virtualList> | null>(null);

async function load() {
  data.value = await getData(5000);
}
</script>
<style>
._page {
  display: flex;
  padding: 32px;
  background-color: var(--color-bg0);
  height: 500px;
}
.header {
  background-color: rgb(245, 113, 113);
  width: 100%;
}

.listItem {
  display: flex;
  background-color: var(--color-bg2);
  max-height: 30px;
  overflow: visible;
  margin: 2px 0;
  align-items: center;
}
.listItem div {
  width: 200px;
}
.H_virtualListItem {
  overflow: visible;
  display: inline-block;
}
</style>
