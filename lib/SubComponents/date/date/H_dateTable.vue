<template>
  <div class="H_dateTable" @click="click">
    <div class="H_dateTable_month-selector">
      <H_icon name="expand_left" btn data-value="monthMinus" tabindex="-1" />
      <span h-cursor="pointer" data-value="monthSelect">{{ monthArray[date.month] }} {{ date.year }}</span>
      <H_icon name="expand_right" btn data-value="monthPlus" tabindex="-1" />
    </div>
    <div class="H_dateTable__table">
      <div
        v-for="item in dates"
        :key="item.value"
        class="H_dateTable__table_item"
        :data-value="item.value"
        :data-type="item.type"
        :data-daytype="item.daytype"
        :data-activemonth="item.activeMonth ? '' : null"
        :selected="isSelected(item.value)"
        :today="isToday(item.value)"
        :title="isHolyday(item.value)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import { type igetDaysArray } from "./getDaysArray";
import { HHL_isHolyDay } from "./holyDays";
import H_icon from "../../../Components/H_icon.vue";
const P = defineProps({
  date: { type: Object, default: { date: 9, month: 0, year: 2025 } },
  dates: { type: Object as PropType<igetDaysArray>, default: () => [] },
  monthArray: { type: Array, default: () => [] },
});
const E = defineEmits(["baseChanged"]);

function click(e: MouseEvent) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.dataset.value !== undefined) {
    if (target.dataset.value === "monthSelect") {
      E("baseChanged", "month");
      return;
    }
    if (target.dataset.value === "monthMinus") {
      if (P.date.month === 0) {
        P.date.year -= 1;
        P.date.month = 11; // December
      } else {
        P.date.month -= 1;
      }
      return;
    }
    if (target.dataset.value === "monthPlus") {
      if (P.date.month === 11) {
        P.date.year += 1;
        P.date.month = 0; // January
      } else {
        P.date.month += 1;
      }

      return;
    }
    const dataValue = target.dataset.value;
    if (dataValue) {
      const dArr = dataValue.split("/");
      if (dArr[0] && dArr[1] && dArr[2]) {
        P.date.date = parseInt(dArr[0]);
        P.date.month = parseInt(dArr[1]);
        P.date.year = parseInt(dArr[2]);
      }
    }

    E("baseChanged", "date");
    console.log("click:", target.dataset.value);
  }
}

const selectedDate = computed(() => {
  return `${P.date.date}/${P.date.month}/${P.date.year}`;
});

const toDayDate = computed(() => {
  const d = new Date();
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
});

const isSelected = (dato: any) => (dato === selectedDate.value ? "" : null);
const isToday = (dato: any) => (dato === toDayDate.value ? "" : null);
const isHolyday = (dato: any) => HHL_isHolyDay(dato);
</script>

<style>
@layer components {
  .H_dateTable {
    background-color: var(--color-bg6);
    padding: 0.5em;
  }
  .H_dateTable_month-selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    font-weight: bold;
    user-select: none;
    padding: 0.25em 0.5em;
    border-style: solid;
    border-color: var(--bgcol-1);
    border-width: 1px 0 1px 0;
    .H_icon {
      font-size: 1.6em;
    }
  }

  .H_dateTable__table {
    display: grid;
    grid-template-rows: repeat(7, 2em);
    grid-template-columns: repeat(8, 2em);
  }

  .H_dateTable__table_item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }

  .H_dateTable__table_item[data-type="head"],
  .H_dateTable__table_item[data-type="week"] {
    pointer-events: none;
    opacity: 0.5;
  }

  .H_dateTable__table_item[data-daytype="weekend"] {
    color: color-mix(in oklab, var(--col-err) 80%, transparent);
  }

  .H_dateTable__table_item[data-daytype="day"] {
    opacity: 0.7;
    &[data-activemonth] {
      opacity: 1;
      font-weight: bold;
    }
  }

  .H_dateTable__table_item[today] {
    background-color: var(--bgcol-1);
  }

  .H_dateTable__table_item[selected] {
    background-color: var(--col-pri);
    color: white;
  }

  .H_dateTable__table_item:hover {
    background-color: var(--col-warn);
  }
}
</style>
