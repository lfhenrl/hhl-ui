<template>
  <div
    ref="loadmore"
    class="H_loadMoreRow w-full bg-bg0 p-2.5"
    :data-row="JSON.stringify(row)"
  >
    <H_btn
      @click="LoadMore"
      class="H_loadMoreRow_btn sticky left-[40%]"
      size="sm"
      type="outline"
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
