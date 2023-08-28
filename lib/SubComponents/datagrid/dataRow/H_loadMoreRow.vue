<template>
  <div ref="loadmore" class="H_loadMoreRow" :data-row="JSON.stringify(row)">
    <H_btn @click="LoadMore" class="H_loadMoreRow_btn" size="sm" type="outline">Load more..</H_btn>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { iColumns } from "../provide/Columns";
import H_btn from "../../../Components/H_btn.vue";

const P = defineProps({
  row: { type: Object, default: {} }
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
.H_loadMoreRow {
  padding: 10px;
  width: 100%;
  background-color: var(--col-bg-0);
}

.H_loadMoreRow_btn {
  position: sticky;
  left: 40%;
  /* transform: translateX(-50%); */
}
</style>
