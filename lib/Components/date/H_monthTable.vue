<template>
  <div class="H_monthTable">
    <div class="H_datePicker__innerHeader">
      <H_btn icon="expand_left" type="icon-text" size="sm" @click="changeYear(-1)" round />
      <div class="H_datePicker__innerHeaderValue">
        {{ tempDato.toLocaleString("en-us", { year: "numeric" }) }}
      </div>
      <H_btn icon="expand_right" type="icon-text" size="sm" @click="changeYear(1)" round />
    </div>
    <div class="H_monthTable__table" @click="itemClick">
      <div
        v-for="(item, index) in month"
        :key="index"
        :data-value="index"
        class="H_monthTable__tableItem"
        :class="{
          H_datePicker__itemSelected: tempDato.getMonth() === index
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_btn from "../H_btn.vue";
import { DateAddYears } from "../../utils/dateFunctions";

const props = defineProps({
  modelValue: { type: Date, default: new Date() }
});

const emit = defineEmits(["month-selected", "update:modelValue"]);

const month = ref(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]);
const tempDato = ref(props.modelValue);

const itemClick = (e: any) => {
  const data = e.target.dataset;
  if (data) {
    const newDate = new Date(tempDato.value);
    const M = parseInt(data.value);
    newDate.setMonth(M);
    tempDato.value = newDate;
    emit("update:modelValue", newDate);
    emit("month-selected");
  }
};

const changeYear = (val: number) => {
  const newDate = DateAddYears(new Date(tempDato.value), val);
  tempDato.value = newDate;
};
</script>

<style>
.H_monthTable {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}
.H_monthTable__table {
  display: grid;
  grid-template-columns: repeat(3, 72px);
  grid-template-rows: repeat(4, 36px);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  margin: 10px;
}

.H_monthTable__tableItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
}

.H_monthTable__tableItem:hover {
  background-color: bisque;
  color: black;
}
</style>
