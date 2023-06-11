<template>
  <div class="PopupFilterBool">
    <H_checkbox label="No filter." v-model="NoFilter" class="PopupFilterBool__NoFilter" />
    <H_checkbox label="Is True." v-model="filtList" value="true" />
    <H_checkbox label="Is False." v-model="filtList" value="false" />
    <H_checkbox label="No Value." v-model="filtList" value="null" />
    "{{ data.value1 }}"
    <div class="PopupFilterBool__error" v-if="!data.isValid">
      This is not valid!! <br />
      It is the same as no filter.
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import H_checkbox from "../../../../../Components/H_checkbox.vue";
import { icolumnFilterData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null }
});

const filtList: any = ref([]);
const NoFilter = ref(props.data.condition === "none");

watch(
  () => props.data.value1,
  () => {
    if (props.data.value1 === "") {
      NoFilter.value = true;
    } else {
      filtList.value = props.data.value1.split(",") ?? [];
    }

    if (NoFilter.value) filtList.value = [];
  },
  { immediate: true }
);

watch(
  () => [filtList.value],
  () => {
    if (filtList.value.length === 0) {
      NoFilter.value = true;
    } else {
      if (filtList.value.length > 2) {
        props.data.isValid = false;
      } else {
        props.data.isValid = true;
        NoFilter.value = false;
        props.data.value1 = filtList.value.sort().toString();
        props.data.active = true;
        props.data.condition = "bool_list";
      }
    }
  }
);

watch(
  () => [NoFilter.value],
  () => {
    if (NoFilter.value) {
      filtList.value = [];
      props.data.value1 = "";
      props.data.value2 = "";
      props.data.active = false;
      props.data.condition = "none";
    }
  }
);
</script>

<style>
.PopupFilterBool {
  padding-top: 10px;
  display: grid;
  grid-auto-rows: min-content;
}

.PopupFilterBool__NoFilter {
  margin-bottom: 20px;
}

.PopupFilterBool__error {
  font-size: 0.9em;
  color: var(--col-err);
}
</style>
