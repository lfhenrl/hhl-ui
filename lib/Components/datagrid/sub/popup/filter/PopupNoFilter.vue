<template>
  <div class="PopupNoFilter">Filter disabled....</div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { icolumnData } from "../../../datagridTypes";

const props = defineProps({
  column: { type: Object as PropType<icolumnData>, default: null }
});
</script>

<style>
.PopupNoFilter {
  text-align: center;
  padding-top: 100px;
  font-size: 1.5em;
}
</style>
