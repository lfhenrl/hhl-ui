<template>
  <div class="H_columnItem h_flex h_items-center">
    <H_switchbase variant="checkbox" :check="data.visibel" @click="checkClick" />
    <H_icon name="drag" btn />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../../Components/H_icon.vue";
import H_switchbase from "../../../../Components/H_switchbase.vue";
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
<style>
@layer components {
  .H_columnItem {
    display: flex;
    align-items: center;
    color: var(--col-1);
    margin-left: 0.125em;
    --h-color: var(--col-pri);
    --h-color-contrast: white;
    .H_icon {
      font-size: 1.2em;
    }
  }

  .H_columnItem:hover {
    background-color: var(--bgcol-2);
  }
}
</style>
