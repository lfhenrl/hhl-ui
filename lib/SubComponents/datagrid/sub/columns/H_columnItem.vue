<template>
  <div class="H_columnItem">
    <div class="H_columnItem-check" :class="{ 'H_columnItem-checked': data.visibel }" @click="checkClick">
      <H_icon icon="check" size="15px" btn="standard" v-if="data.visibel" />
    </div>
    <H_icon icon="drag" size="16px" btn="standard" />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import H_icon from "../../../../Components/H_icon.vue";

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
@layer hhl-components {
  .H_columnItem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 400;
    color: var(--col-txt-1);
  }
  .H_columnItem:hover {
    background-color: var(--col-bg-2);
  }
  .H_columnItem-check {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px var(--col-txt-1);
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 3px;
  }
  .H_columnItem-checked {
    background-color: var(--col-pri);
    color: var(--col-on-pri);
    border: none;
  }
}
</style>
