<template>
  <div ref="dateSelector" class="H_dateSelector">
    <span
      class="H_dateSelectorSelector_value date"
      @focus="onFocus($event, 'date')"
      :selected="dateBase === 'date'"
      tabindex="0"
      autofocus
      >{{ date.date }}</span
    >

    <span
      class="H_dateSelectorSelector_value month"
      h-min-width="2em"
      @focus="onFocus($event, 'month')"
      :selected="dateBase === 'month'"
      tabindex="0"
      >{{ monthArray[date.month] }}</span
    >

    <span
      class="H_dateSelectorSelector_value year"
      h-min-width="2.5em"
      @focus="onFocus($event, 'year')"
      :selected="dateBase === 'year'"
      tabindex="0"
      >{{ date.year }}</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps({
  dateBase: { type: String, default: "date" },
  date: { type: Object, default: { date: 9, month: 0, year: 2025 } },
  monthArray: { type: Array, default: () => [] },
});
const E = defineEmits(["baseChanged"]);

function onFocus(_: FocusEvent, value: string) {
  E("baseChanged", value);
}
</script>

<style>
@layer components {
  .H_dateSelector {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg4);
    padding: 4px;
    outline-style: none;
  }

  .H_dateSelectorSelector_value {
    border-radius: 4px;
    cursor: pointer;
    outline-style: none;
    font-size: 1.3em;
    padding: 0.05em 0;
    text-align: center;
    min-width: 1.5em;
    text-box-trim: trim-both;
  }
  .H_dateSelectorSelector_value[selected="true"] {
    background-color: var(--col-pri);
    color: white;
  }
}
</style>
