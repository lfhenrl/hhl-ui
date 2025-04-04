<template>
  <div>
    <div class="flex items-center p-1 justify-between">
      <H_iconExpand_left size="1.6rem" btn @click.stop="changeMonth(-1)" />
      <div class="cursor-pointer" @click.stop="$emit('month-click')">
        {{ tempDatomy.toLocaleString("en-us", { month: "long", year: "numeric" }) }}
      </div>
      <H_iconExpand_right size="1.6rem" btn @click.stop="changeMonth(1)" />
    </div>
    <div class="H_dateTable__table grid" @click.stop="itemClick">
      <div
        v-for="item in dates"
        :key="item.value"
        :data-value="item.value"
        :data-type="item.type"
        :data-daytype="item.daytype"
        :data-activemonth="item.activeMonth"
        :today="isToday(item.value)"
        :title="isHolyday(item.value)"
        class="flex items-center justify-center cursor-pointer rounded-full hover:bg-warn"
        :class="{
          'font-bold': item.daytype === 'day' && item.activeMonth,
          'opacity-70': item.daytype === 'day' && !item.activeMonth,
          'text-err/80': item.daytype === 'weekend',
          'opacity-50': item.type === 'head' || item.type === 'week',
          'border-pri border-2': isSelected(item.value),
          'bg-bg4': isToday(item.value),
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
import H_iconExpand_left from "../../Components/icons/H_iconExpand_left.vue";
import H_iconExpand_right from "../../Components/icons/H_iconExpand_right.vue";

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
  e.preventDefault();
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
@layer components {
  .H_dateTable__table {
    grid-template-columns: repeat(8, 32px);
    grid-template-rows: repeat(7, 32px);
  }
}
</style>
