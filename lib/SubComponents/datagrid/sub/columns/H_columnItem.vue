<template>
  <div class="H_columnItem">
    <H_checkbox size="sm" v-model="data.visibel" class="selectSize" />
    <H_icon icon="drag" size="16px" btn="standard" />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import H_checkbox from "../../../../Components/H_checkbox.vue";
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
}
</style>
