<template>
  <div class="H_monthTable" @click="click">
    <div class="H_monthTable_year-selector">
      <H_icon name="expand_left" btn data-value="yearMinus" tabindex="-1" />
      {{ date.year }}
      <H_icon name="expand_right" btn data-value="yearPlus" tabindex="-1" />
    </div>
    <div class="H_monthTable__table" tabindex="-1">
      <div
        class="H_monthTable__table_item"
        v-for="(item, index) in monthArray"
        :data-value="index"
        :selected="isSelected(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import H_icon from "../../../Components/H_icon.vue";
const P = defineProps({
  date: { type: Object, default: { date: 9, month: 0, year: 2025 } },
  monthArray: { type: Array, default: () => [] },
});
const E = defineEmits(["baseChanged"]);

function click(e: MouseEvent) {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.dataset.value !== undefined) {
    if (target.dataset.value === "yearMinus") {
      E("baseChanged", "year");
      P.date.year -= 1;
      return;
    }
    if (target.dataset.value === "yearPlus") {
      E("baseChanged", "year");
      P.date.year += 1;
      return;
    }
    P.date.month = parseInt(target.dataset.value);
    E("baseChanged", "month");
    console.log("click:", target.dataset.value);
  }
}

function isSelected(month: number) {
  if (P.date.month === month) {
    return "";
  } else {
    return undefined;
  }
}
</script>

<style>
@layer components {
  .H_monthTable {
    background-color: var(--color-bg6);
  }

  .H_monthTable_year-selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.25em 0.5em;
    user-select: none;
    border-style: solid;
    border-color: var(--bgcol-1);
    border-width: 1px 0 1px 0;
    .H_icon {
      font-size: 1.6em;
    }
  }

  .H_monthTable__table {
    display: grid;
    grid-template-rows: repeat(4, 3.5em);
    grid-template-columns: repeat(3, 5.3em);
    padding: 0.5em;
  }

  .H_monthTable__table_item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: 1.2em;
    padding: 0.5em;
  }
  .H_monthTable__table_item[selected] {
    background-color: var(--col-pri);
    color: white;
  }
  .H_monthTable__table_item:hover {
    background-color: var(--col-warn);
  }
}
</style>
