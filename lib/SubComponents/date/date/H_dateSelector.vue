<template>
  <div ref="dateSelector" class="H_dateSelector">
    <span class="date" @focus="onFocus($event, 'date')" :selected="dateBase === 'date'" tabindex="0" autofocus>{{
      date.date
    }}</span>

    <span class="month" @focus="onFocus($event, 'month')" :selected="dateBase === 'month'" tabindex="0">{{
      monthArray[date.month]
    }}</span>

    <span class="year" @focus="onFocus($event, 'year')" :selected="dateBase === 'year'" tabindex="0">{{
      date.year
    }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  dateBase: { type: String, default: "date" },
  date: { type: Object, default: { date: 9, month: 0, year: 2025 } },
  monthArray: { type: Array, default: () => [] },
});
const E = defineEmits(["baseChanged"]);

function onFocus(e: FocusEvent, value: string) {
  E("baseChanged", value);
}
</script>

<style>
@layer components {
  .H_dateSelector {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-bg5);
    outline: none;
    padding: 4px;
    span {
      cursor: pointer;
      font-size: 1.3em;
      padding-block: 0.05em;
      border-radius: 4px;
      text-align: center;
      text-box-trim: trim-both;
      outline: none;
      &.date {
        min-width: 1.5em;
      }
      &.month {
        min-width: 2em;
      }
      &.year {
        min-width: 2.5em;
      }
      &[selected="true"] {
        background-color: var(--color-pri);
        color: var(--color-priTxt);
      }
    }
  }
}
</style>
