<template>
  <div class="h_monthTable">
    <div
      class="h_monthTable__innerHeader flex flex-1 flex-row items-center p-1 font-bold"
    >
      <H_icon
        btn
        icon="expand_left"
        type="icon-text"
        @click="changeYear(-1)"
        round
      />
      <div
        class="h_monthTable__innerHeaderValue flex flex-1 cursor-pointer justify-center"
      >
        {{ tempDato.toLocaleString("en-us", { year: "numeric" }) }}
      </div>
      <H_icon
        btn
        icon="expand_right"
        type="icon-text"
        @click="changeYear(1)"
        round
      />
    </div>
    <div
      class="h_monthTable__table m-2.5 grid grid-cols-[repeat(3,72px)] grid-rows-[repeat(4,36px)] gap-2.5"
      @click="itemClick"
    >
      <div
        v-for="(item, index) in month"
        :key="index"
        :data-value="index"
        class="h_monthTable__tableItem flex cursor-pointer items-center justify-center font-bold hover:col-warn"
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
