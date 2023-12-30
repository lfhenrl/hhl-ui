<template>
  <div ref="loadmore" class="H_loadMoreRow" :data-row="JSON.stringify(row)">
    <H_btn @click="LoadMore" class="H_loadMoreRow_btn" size="sm" type="outline"
      >Load more..{{ row }}</H_btn
    >
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { iColumns } from "../provide/Columns";
import H_btn from "../../../Components/H_btn.vue";

const P = defineProps({
  row: { type: Object, default: {} },
});

const loadmore = ref();

const Columns = inject("Columns") as iColumns;

function LoadMore() {
  Columns.moreRows(P.row);
}

onMounted(() => {
  Columns.insObserver?.observe(loadmore.value);
});
</script>
<style>
@layer hhl-components {
  .H_loadMoreRow {
    width: 100%;
    background-color: var(--col-bg-0);
    padding: 10px;
  }
  .H_loadMoreRow_btn {
    position: sticky;
    left: 40%;
  }
}
</style>
