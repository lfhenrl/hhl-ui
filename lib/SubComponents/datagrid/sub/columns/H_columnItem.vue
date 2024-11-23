<template>
  <div class="H_columnItem">
    <div class="H_columnItem-check" :class="{ 'H_columnItem-checked': data.visibel }" @click="checkClick">
      <div class="ico-check" v-if="data.visibel" />
    </div>
    <div class="ico-drag iconBtn" />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

type iGroupdata = {
  field: string;
  title: string;
  visibel: boolean;
  loadVisibel: boolean;
  orgVisibel: boolean;
  index: number;
  loadIndex: number;
  orgIndex: number;
  isGrouped: boolean;
  LoadIsGrouped: boolean;
};

const props = defineProps({
  index: Number,
  item: { type: Object as PropType<iGroupdata>, default: {} },
});

const data = ref<iGroupdata>(props.item);
function checkClick() {
  data.value.visibel = !data.value.visibel;
}
</script>
<style>
@layer components {
  .H_columnItem .ico-check {
    font-size: 10px;
  }
  .H_columnItem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 400;
    color: var(--color-txt1);
  }
  .H_columnItem:hover {
    background-color: var(--color-bg2);
  }
  .H_columnItem-check {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px var(--color-txt1);
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 1px;
  }
  .H_columnItem-checked {
    background-color: var(--color-pri);
    color: var(--color-priTxt);
    border: none;
  }
}
</style>
