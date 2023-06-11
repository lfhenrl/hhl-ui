<template>
  <div class="PopupGroupingItem">
    <H_checkbox v-model="data.visibel" class="selectSize" />
    <H_icon icon="drag" size="16px" />
    {{ data?.title }}
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import H_checkbox from "../../../../../Components/H_checkbox.vue";
import H_icon from "../../../../../Components/H_icon.vue";

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
  item: { type: Object as PropType<iGroupdata>, default: {} }
});

const data = ref<iGroupdata>(props.item);
</script>

<style>
.PopupGroupingItem {
  display: flex;
  align-items: center;
  justify-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
  font-weight: normal;
  font-family: var(--comp-font-family);
}

.PopupGroupingItem > .H_checkbox {
  height: 20px;
  max-width: 20px;
  line-height: 0.4;
}
</style>
