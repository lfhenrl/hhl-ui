<template>
  <div class="PopupFilterNumber">
    <H_radio label="No filter." v-model="data.condition" value="none" />
    <H_radio label="Equal to." v-model="data.condition" value="equal" />
    <H_radio label="Not equal to." v-model="data.condition" value="not_equal" />
    <H_radio label="Greater than." v-model="data.condition" value="greater" />
    <H_radio label="Less than." v-model="data.condition" value="less" />
    <H_radio label="Between." v-model="data.condition" value="between" />
    <H_input
      label="Number"
      v-model="data.value1"
      type="number"
      clearable
      :validator="[validator1]"
      @isValid="Val1Valid = $event"
      :disabled="data.condition === 'none'"
    />
    <H_input
      v-show="data.condition === 'between'"
      label="Number"
      v-model="data.value2"
      type="number"
      clearable
      :validator="[validator2]"
      @isValid="Val2Valid = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from "vue";
import H_radio from "../../../../H_radio.vue";
import H_input from "../../../../H_input.vue";
import { icolumnFilterData } from "../../../datagridTypes";

const props = defineProps({
  data: { type: Object as PropType<icolumnFilterData>, default: null },
});

const Val1Valid = ref(true);
const Val2Valid = ref(true);

const validator1 = (v: string) => props.data.condition === "none" || v !== "" || "Need input.";

const validator2 = (v: string) =>
  props.data.condition === "none" || props.data.condition !== "between" || v !== "" || "Need input.";

watch(
  () => [props.data.condition, props.data.value1, props.data.value2],
  () => {
    let activ = false;
    const cond = props.data.condition;
    const v1 = props.data.value1;
    const v2 = props.data.value2;
    let v1Out = v1;
    let v2Out = v2;
    if (cond !== "none") {
      if (v1 !== "" && cond !== "between") {
        activ = true;
      } else if (v1 !== "" && v2 !== "" && cond === "between") {
        activ = true;
      }
    } else {
      v1Out = "";
      v2Out = "";
    }

    if (cond !== "between") {
      v2Out = "";
    }
    setTimeout(() => {
      props.data.value1 = v1Out;
      props.data.value2 = v2Out;
      props.data.active = activ;
      props.data.isValid = Val1Valid.value && Val2Valid.value;
    });
  }
);
</script>

<style>
.PopupFilterNumber {
  padding-top: 10px;
  display: grid;
  grid-auto-rows: min-content;
}

.PopupFilterNumber > .H_input {
  margin-top: 20px;
  margin-bottom: 14px;
}
</style>
