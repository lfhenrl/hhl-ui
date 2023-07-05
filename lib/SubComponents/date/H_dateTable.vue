<template>
  <div class="h_dateTable">
    <div class="h_dateTable__innerHeader">
      <H_btn icon="expand_left" type="icon-text" size="sm" @click="changeMonth(-1)" round />
      <div class="h_dateTable__innerHeaderValue" @click="$emit('month-click')">
        {{ tempDatomy.toLocaleString("en-us", { month: "long", year: "numeric" }) }}
      </div>
      <H_btn icon="expand_right" type="icon-text" size="sm" @click="changeMonth(1)" round />
    </div>
    <div class="h_dateTable__table" @click="itemClick">
      <div
        v-for="item in dates"
        :key="item.value"
        :data-value="item.value"
        :data-type="item.type"
        :data-daytype="item.daytype"
        :data-activemonth="item.activeMonth"
        :today="isToday(item.value)"
        :title="isHolyday(item.value)"
        class="h_dateTable__tableItem"
        :class="{
          'h_dateTable__item-day': item.type === 'day',
          'h_dateTable__item-activeMonth': item.activeMonth,
          'h_dateTable__item-weekend': item.daytype === 'weekend',
          'h_dateTable__item-headOrWeek': item.type === 'head' || item.type === 'week',
          h_dateTable__itemSelected: isSelected(item.value),
          'col-sec': isToday(item.value),
          'col-txt-err': isHolyday(item.value)
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
import H_btn from "../../Components/H_btn.vue";

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  tempDatomy: { type: Date, default: new Date() }
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
      year: parseInt(dArr[2])
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
.h_dateTable {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.h_dateTable__innerHeaderValue {
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: center;
}

.h_dateTable__innerHeader {
  display: flex;
  flex-direction: row;
  flex: auto;
  align-items: center;
  padding: 3px;
  font-weight: bold;
}

.h_dateTable__innerHeader .h_btn.btn-icon .h_icon {
  --h_icon-size: 1.2em;
}

.h_dateTable__table {
  display: grid;
  grid-template-columns: repeat(8, 32px);
  grid-template-rows: repeat(7, 32px);
}

.h_dateTable__tableItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.h_dateTable__item-day {
  cursor: pointer;
  opacity: 0.5;
  border-radius: 50%;
}

.h_dateTable__item-day:hover {
  background-color: bisque;
  color: black;
}

.h_dateTable__item-activeMonth {
  font-weight: bold;
  opacity: 1;
}

.h_dateTable__item-weekend {
  font-weight: normal;
  opacity: 1;
}

.h_dateTable__item-headOrWeek {
  font-weight: normal;
  opacity: 1;
  background-color: var(--col-bg-2);
  color: var(--col-txt-1);
}

.h_dateTable__itemSelected {
  background-color: var(--col-pri);
  color: var(--col-on-pri);
}
</style>