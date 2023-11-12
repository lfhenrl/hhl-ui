<template>
  <div
    class="h_columnItem flex items-center justify-start font-normal text-txt1 hover:bg-bg2"
  >
    <H_checkbox size="sm" v-model="data.visibel" class="selectSize" />
    <H_icon icon="drag" size="16px" />
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
