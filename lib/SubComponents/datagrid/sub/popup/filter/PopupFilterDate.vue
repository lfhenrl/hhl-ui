<template>
  <div class="PopupFilterDate">
    <H_radio label="No filter." v-model="data.condition" value="none" />
    <H_radio label="Equal to." v-model="data.condition" value="equal" />
    <H_radio label="Not equal to." v-model="data.condition" value="not_equal" />
    <H_radio label="Greater than." v-model="data.condition" value="greater" />
    <H_radio label="Less than." v-model="data.condition" value="less" />
    <H_radio label="Between." v-model="data.condition" value="between" />
    {{ test }}
    <H_datePicker
      label="Date"
      v-model="date1"
      :validator="[validator1]"
      @isValid="Val1Valid = $event"
      :type="dType"
      :disabled="data.condition === 'none'"
    />
    <H_datePicker
      v-show="data.condition === 'between'"
      v-model="date2"
      :validator="[validator2]"
      @isValid="Val2Valid = $event"
      :type="dType"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import H_radio from "../../../../../Components/H_radio.vue";
import H_datePicker from "../../../../date/H_datePicker.vue";
import { icolumnFilterData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null }
});

const Val1Valid = ref(true);
const Val2Valid = ref(true);

const date1 = ref<any>(null);
const date2 = ref<any>(null);

const test = computed(() => {
  return date1.value?.toJSON() ?? "null";
});

const dType: any = props.data.type === "date" ? "date" : "dateTime";

console.log("DATE", props.data.value1, date1.value);

date1.value = tryGetDate(props.data.value1);
date2.value = tryGetDate(props.data.value2);

function tryGetDate(dato: any) {
  if (dato === "") return null;
  let newDate = new Date(dato);
  if (newDate.toString() !== "Invalid Date") {
    return newDate;
  }
  newDate = new Date(Number(dato));
  if (newDate.toString() !== "Invalid Date") {
    return newDate;
  }
}

const validator1 = (v: any) => {
  return props.data.condition === "none" || v !== 0 || "Need input.";
};
const validator2 = (v: any) => props.data.condition === "none" || props.data.condition !== "between" || v !== 0 || "Need input.";

watch(
  () => [props.data.condition, date1.value, date2.value],
  () => {
    let activ = false;
    const cond = props.data.condition;
    const v1 = date1.value?.toISOString();
    const v2 = date2.value?.toISOString();
    if (cond !== "none") {
      if (v1 !== 0 && cond !== "between") {
        activ = true;
      } else if (v1 !== 0 && v2 !== 0 && cond === "between") {
        activ = true;
      }
      if (activ) {
        props.data.value1 = v1 ?? "";
        props.data.value2 = v2 ?? "";
      }
    } else {
      props.data.value1 = "";
      props.data.value2 = "";
    }
    props.data.active = activ;
    setTimeout(() => {
      props.data.isValid = Val1Valid.value && Val2Valid.value;
    });

    if (cond !== "between") {
      props.data.value2 = "";
    }
  }
);
</script>

<style>
.PopupFilterDate {
  padding-top: 10px;
  display: grid;
  grid-auto-rows: min-content;
}

.PopupFilterDate > .H_datePicker {
  margin-top: 20px;
  margin-bottom: 14px;
}
</style>
