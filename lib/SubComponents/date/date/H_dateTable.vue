<template>
  <div class="H_dateTable" @click="click">
    <div class="month-selector">
      <H_icon name="expand_left" size="1.6rem" btn data-value="monthMinus" tabindex="-1" />
      <span data-value="monthSelect">{{ monthArray[date.month] }} {{ date.year }}</span>
      <H_icon name="expand_right" size="1.6rem" btn data-value="monthPlus" tabindex="-1" />
    </div>
    <div class="H_dateTable__table">
      <div
        v-for="item in dates"
        :key="item.value"
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
    const dArr = target.dataset.value.split("/");
    P.date.date = parseInt(dArr[0]);
    P.date.month = parseInt(dArr[1]);
    P.date.year = parseInt(dArr[2]);

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
    outline: none;
    background-color: var(--color-bg6);
    .month-selector {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 0.5em;
      padding-block: 0.25em;
      font-weight: bold;
      user-select: none;
      font-size: 1.2em;
      border-bottom: 1px solid var(--color-bg1);
      border-top: 1px solid var(--color-bg1);
      span {
        cursor: pointer;
      }
    }

    .H_dateTable__table {
      display: grid;
      grid-template-columns: repeat(8, 2em);
      grid-template-rows: repeat(7, 2em);
      padding: 0.5em;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;

        &[data-type="head"],
        &[data-type="week"] {
          pointer-events: none;
          opacity: 0.5;
        }

        &[data-daytype="weekend"] {
          color: color-mix(in oklab, var(--color-err) 80%, transparent);
        }
        &[data-daytype="day"] {
          opacity: 0.7;
          &[data-activemonth] {
            opacity: 1;
            font-weight: bold;
          }
        }
        &[today] {
          background-color: var(--color-bg1);
        }
        &[selected] {
          background-color: var(--color-pri);
          color: var(--color-priTxt);
        }
        &:hover {
          background-color: var(--color-warn);
        }
      }
    }
  }
}
</style>
