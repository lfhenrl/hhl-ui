<template>
  <div>
    <div class="H_dateTable__innerHeader">
      <H_icon icon="expand_left" type="icon-text" btn="standard" @click="changeMonth(-1)" />
      <div class="H_dateTable__innerHeaderValue" @click="$emit('month-click')">
        {{ tempDatomy.toLocaleString("en-us", { month: "long", year: "numeric" }) }}
      </div>
      <H_icon btn="standard" icon="expand_right" type="icon-text" @click="changeMonth(1)" round />
    </div>
    <div class="H_dateTable__table" @click="itemClick">
      <div
        v-for="item in dates"
        :key="item.value"
        :data-value="item.value"
        :data-type="item.type"
        :data-daytype="item.daytype"
        :data-activemonth="item.activeMonth"
        :today="isToday(item.value)"
        :title="isHolyday(item.value)"
        class="H_dateTable__tableItem"
        :class="{
          day: item.type === 'day',
          activeMonth: item.activeMonth,
          weekend: item.daytype === 'weekend',
          head: item.type === 'head' || item.type === 'week',
          isSelected: isSelected(item.value),
          isToday: isToday(item.value),
          isHolyday: isHolyday(item.value),
        }"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDaysArray } from "./getDaysArray";
import { DateAddMonths } from "../../utils/dateFunctions";
import { HHL_isHolyDay } from "./holyDays";
import { computed, ref, watch } from "vue";
import H_icon from "../../Components/H_icon.vue";

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  tempDatomy: { type: Date, default: new Date() },
});

const emit = defineEmits(["update:tempDatomy", "update:modelValue", "month-click"]);

const tempDato = ref(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      tempDato.value = props.modelValue;
    }
  }
);
watch(
  () => props.tempDatomy,
  () => {
    if (props.tempDatomy) {
      tempDato.value = props.tempDatomy;
    }
  }
);

const dates: any = computed(() => {
  return getDaysArray(tempDato.value.getFullYear(), tempDato.value.getMonth());
});

const selectedDate = computed(() => {
  const d = props.modelValue;
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
});

const toDayDate = computed(() => {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
});

const itemClick = (e: any) => {
  const data = e.target.dataset;
  if (data && data.type === "day") {
    const dArr = data.value.split("/");
    const dateObj = {
      day: parseInt(dArr[0]),
      month: parseInt(dArr[1]),
      year: parseInt(dArr[2]),
    };
    const newDate = new Date(props.modelValue);
    newDate.setDate(dateObj.day);
    newDate.setMonth(dateObj.month);
    newDate.setFullYear(dateObj.year);
    emit("update:modelValue", newDate);
  }
};

const changeMonth = (val: number) => {
  const newDate = DateAddMonths(new Date(props.tempDatomy), val);
  emit("update:tempDatomy", newDate);
};

const isSelected = (dato: any) => (dato === selectedDate.value ? true : null);
const isToday = (dato: any) => (dato === toDayDate.value ? true : null);
const isHolyday = (dato: any) => HHL_isHolyDay(dato);
</script>
<style>
@layer hhl-components {
  .H_dateTable__innerHeader {
    display: flex;
    flex: 1 1 0%;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-weight: 700;
    padding: 4px;
  }
  .H_dateTable__innerHeaderValue {
    display: flex;
    justify-content: center;
    flex: 1 1 0%;
    cursor: pointer;
  }
  .H_dateTable__table {
    display: grid;
    grid-template-columns: repeat(8, 32px);
    grid-template-rows: repeat(7, 32px);
  }
  .H_dateTable__tableItem {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .H_dateTable__tableItem.day {
    cursor: pointer;
    border-radius: 50%;
    opacity: 90%;
  }
  .H_dateTable__tableItem.day:hover {
    background-color: var(--col-warn);
    color: var(--col-on-warn);
  }
  .H_dateTable__tableItem.activeMonth {
    opacity: 100%;
    font-weight: 700;
  }
  .H_dateTable__tableItem.weekend {
    opacity: 70%;
    font-weight: normal;
  }
  .H_dateTable__tableItem.isSelected {
    background-color: var(--col-pri);
    color: var(--col-on-pri);
  }
  .H_dateTable__tableItem.isToday {
    background-color: var(--col-sec);
    color: var(--col-on-sec);
  }
  .H_dateTable__tableItem.isHolyday {
    color: var(--col-err);
  }
}
</style>
