<template>
  <div class="flex items-center text-txt1 hover:bg-bg2">
    <div
      class="flex items-center justify-center w-4 h-4 rounded mr-0.5 border-txt1 border"
      :class="{ 'col-pri border-none': data.visibel }"
      @click="checkClick"
    >
      <H_iconCheck size="0.95em" v-if="data.visibel" color="white" />
    </div>
    <H_iconDrag size="1.2rem" btn />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from "vue";

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
