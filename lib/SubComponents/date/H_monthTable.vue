<template>
  <div>
    <div class="H_monthTable__innerHeader">
      <H_icon btn="standard" icon="expand_left" @click="changeYear(-1)" round />
      <div class="H_monthTable__innerHeaderValue">
        {{ tempDato.toLocaleString("en-us", { year: "numeric" }) }}
      </div>
      <H_icon btn="standard" icon="expand_right" @click="changeYear(1)" />
    </div>
    <div class="H_monthTable__table" @click="itemClick">
      <div
        v-for="(item, index) in month"
        :key="index"
        :data-value="index"
        class="H_monthTable__tableItem"
        :class="{
          'col-pri': tempDato.getMonth() === index,
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DateAddYears } from "../../utils/dateFunctions";
import H_icon from "../../Components/H_icon.vue";

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
});

const emit = defineEmits(["month-selected", "update:modelValue"]);

const month = ref([
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
]);
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
@layer hhl-components {
  .H_monthTable__innerHeader {
    display: flex;
    flex: 1 1 0%;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    padding: 4px;
  }
  .H_monthTable__innerHeaderValue {
    display: flex;
    flex: 1 1 0%;
    justify-content: center;
  }
  .H_monthTable__table {
    display: grid;
    grid-template-columns: repeat(3, 72px);
    grid-template-rows: repeat(4, 36px);
    margin: 10px;
    gap: 10px;
  }
  .H_monthTable__tableItem {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 700;
  }
  .H_monthTable__tableItem:hover {
    background-color: var(--col-warn);
    color: var(--col-on-warn);
  }
}
</style>
