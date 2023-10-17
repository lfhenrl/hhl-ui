<template>
  <div class="h_dateTable">
    <div
      class="h_dateTable__innerHeader flex flex-1 flex-row items-center p-1 font-bold"
    >
      <H_icon
        icon="expand_left"
        type="icon-text"
        btn
        @click="changeMonth(-1)"
        round
      />
      <div
        class="h_dateTable__innerHeaderValue flex flex-1 cursor-pointer justify-center"
        @click="$emit('month-click')"
      >
        {{
          tempDatomy.toLocaleString("en-us", { month: "long", year: "numeric" })
        }}
      </div>
      <H_icon
        btn
        icon="expand_right"
        type="icon-text"
        @click="changeMonth(1)"
        round
      />
    </div>
    <div
      class="h_dateTable__table grid grid-cols-[repeat(8,32px)] grid-rows-[repeat(7,32px)]"
      @click="itemClick"
    >
      <div
        v-for="item in dates"
        :key="item.value"
        :data-value="item.value"
        :data-type="item.type"
        :data-daytype="item.daytype"
        :data-activemonth="item.activeMonth"
        :today="isToday(item.value)"
        :title="isHolyday(item.value)"
        class="h_dateTable__tableItem flex items-center justify-center font-bold"
        :class="{
          'cursor-pointer rounded-full opacity-50 hover:bg-warn hover:text-black':
            item.type === 'day',
          'font-bold opacity-100': item.activeMonth,
          'font-normal opacity-100': item.daytype === 'weekend',
          'bg-bg2 font-normal text-txt1 opacity-100':
            item.type === 'head' || item.type === 'week',
          'col-pri': isSelected(item.value),
          'col-sec': isToday(item.value),
          'text-err': isHolyday(item.value),
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

const emit = defineEmits([
  "update:tempDatomy",
  "update:modelValue",
  "month-click",
]);

const tempDato = ref(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      tempDato.value = props.modelValue;
    }
  },
);
watch(
  () => props.tempDatomy,
  () => {
    if (props.tempDatomy) {
      tempDato.value = props.tempDatomy;
    }
  },
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
