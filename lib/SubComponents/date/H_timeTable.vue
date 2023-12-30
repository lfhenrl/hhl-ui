<template>
  <div class="H_timetable__header">
    <div
      class="H_timetable__value"
      @click="timeBase = 'hour'"
      :class="{
        'col-pri': timeBase === 'hour',
      }"
    >
      {{ getZeroInFront(value.hour) }}
    </div>
    <div class="H_timetable__semiColon">:</div>
    <div
      class="H_timetable__value"
      @click="timeBase = 'minute'"
      :class="{
        'col-pri': timeBase === 'minute',
      }"
    >
      {{ getZeroInFront(value.minute) }}
    </div>
    <div v-show="showSeconds" class="H_timetable__semiColon">:</div>
    <div
      v-show="showSeconds"
      class="H_timetable__value"
      @click="timeBase = 'second'"
      :class="{
        'col-pri': timeBase === 'second',
      }"
    >
      {{ getZeroInFront(value.second) }}
    </div>
  </div>
  <div class="H_timeTable__table">
    <div
      v-for="(item, index) in time"
      @click="itemClick(index)"
      :key="index"
      :data-value="index"
      :selected="selectedIndex === index"
      class="H_timeTable__tableItem"
      :class="{
        activ: (index < 24 && timeBase === 'hour') || timeBase !== 'hour',
        'col-pri': selectedIndex === index,
      }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  showSeconds: { default: false, type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);

const timeBase = ref("hour");
const getZeroInFront = (val: number) => (val < 10 ? "0" + val : val);
const time: any = [];
for (let i = 0; i < 60; i++) {
  time.push(getZeroInFront(i));
}

const value = computed({
  get: () => props.modelValue,
  set: (val: any) => {
    timeBase.value = "hour";
    emit("update:modelValue", val);
  },
}) as any;

const selectedIndex = computed(() => {
  return timeBase.value === "hour"
    ? value.value.hour
    : timeBase.value === "minute"
      ? value.value.minute
      : timeBase.value === "second"
        ? value.value.second
        : null;
});

const itemClick = (index: number) => {
  if (index > -1) {
    let newTimeBase = "";
    if (timeBase.value === "hour") {
      value.value.hour = index;
      newTimeBase = "minute";
    }
    if (timeBase.value === "minute") {
      value.value.minute = index;
      if (props.showSeconds === true) {
        newTimeBase = "second";
      } else {
        newTimeBase = "minute";
      }
    }
    if (timeBase.value === "second") {
      value.value.second = index;
      if (props.showSeconds) {
        newTimeBase = "second";
      }
    }
    timeBase.value = newTimeBase;
  }
};
</script>
<style>
@layer hhl-components {
  .H_timetable__header {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    background-color: var(--col-bg-3);
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: var(--col-txt-1);
  }
  .H_timetable__value {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-left: 4px;
    padding-right: 4px;
  }
  .H_timetable__semiColon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .H_timeTable__table {
    display: grid;
    grid-template-columns: repeat(8, 28px);
    grid-template-rows: repeat(8, 28px);
    padding: 4px;
    gap: 4px;
  }
  .H_timeTable__tableItem {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-radius: 50%;
    font-weight: 700;
    opacity: 0.2;
  }
  .H_timeTable__tableItem:hover {
    background-color: var(--col-warn);
  }
  .H_timeTable__tableItem.activ {
    pointer-events: auto;
    cursor: pointer;
    opacity: 1;
  }
}
</style>
