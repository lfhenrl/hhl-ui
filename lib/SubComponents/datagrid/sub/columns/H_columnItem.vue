<template>
  <div class="H_columnItem">
    <H_switchbase variant="checkbox" size="0.9em" :check="data.visibel" @click="checkClick" />
    <H_icon name="drag" size="1.2rem" btn />
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
