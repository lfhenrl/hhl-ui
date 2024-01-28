<template>
  <div ref="loadmore" class="H_loadMoreRow" :data-row="JSON.stringify(row)">
    <H_btn @click="LoadMore" class="H_loadMoreRow_btn" size="sm" type="outline"
      >Load more..{{ row }}</H_btn
    >
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { iDgrid } from "../provide/Dgrid";
import H_btn from "../../../Components/H_btn.vue";

const P = defineProps({
  row: { type: Object, default: {} },
});

const loadmore = ref();

const DG = inject("DG") as iDgrid;

function LoadMore() {
  DG.dataHandler?.moreRows(P.row);
}

onMounted(() => {
  console.log("LoadMore");
  DG.dataHandler?.moreRows(P.row);
  /*   Columns.insObserver?.observe(loadmore.value); */
});
</script>
<style>
@layer hhl-components {
  .H_loadMoreRow {
    width: 100%;
    background-color: lime;
    padding: 10px;
  }
  .H_loadMoreRow_btn {
    position: sticky;
    left: 40%;
  }
}
</style>
