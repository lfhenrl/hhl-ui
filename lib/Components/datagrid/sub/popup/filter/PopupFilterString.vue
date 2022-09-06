<template>
  <div class="PopupFilterString">
    <H_radio label="No filter." v-model="data.condition" value="none" />
    <H_radio label="Contain." v-model="data.condition" value="contain" />
    <H_radio label="Equal to." v-model="data.condition" value="equal" />
    <H_radio label="Starts with." v-model="data.condition" value="startswith" />
    <H_radio label="Ends with." v-model="data.condition" value="endswith" />
    <H_input
      label="String"
      v-model="data.value1"
      type="text"
      clearable
      :validator="[validator1]"
      @isValid="Val1Valid = $event"
      :disabled="data.condition === 'none'"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import H_radio from "../../../../H_radio.vue";
import H_input from "../../../../H_input.vue";
import { icolumnFilterData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null }
});

const Val1Valid = ref(true);
const validator1 = (v: string) => props.data.condition === "none" || v !== "" || "Need input.";

watch(
  () => [props.data.condition, props.data.value1, props.data.value2],
  () => {
    let activ = false;
    const cond = props.data.condition;
    const v1 = props.data.value1;
    if (cond !== "none") {
      if (v1 !== "") {
        activ = true;
      }
    } else {
      props.data.value1 = "";
      props.data.value2 = "";
    }
    props.data.active = activ;
    setTimeout(() => {
      props.data.isValid = Val1Valid.value;
    });
  }
);
</script>

<style>
.PopupFilterString {
  padding-top: 10px;
  display: grid;
  grid-auto-rows: min-content;
}
.PopupFilterString > .H_input {
  margin-top: 20px;
  margin-bottom: 14px;
}
</style>
