<template>
  <div class="H_datePicker__header">
    <div
      class="H_datePicker__headerValue"
      @click="timeBase = 'hour'"
      :class="{
        'col-sec': timeBase === 'hour'
      }"
    >
      {{ getZeroInFront(value.hour) }}
    </div>
    :
    <div
      class="H_datePicker__headerValue"
      @click="timeBase = 'minute'"
      :class="{
        'col-sec': timeBase === 'minute'
      }"
    >
      {{ getZeroInFront(value.minute) }}
    </div>
    <div v-show="showSeconds" class="flx-row-align-center">
      :
      <div
        class="H_datePicker__headerValue"
        @click="timeBase = 'second'"
        :class="{
          'col-sec': timeBase === 'second'
        }"
      >
        {{ getZeroInFront(value.second) }}
      </div>
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
        H_timeTable__tableItemActive: (index < 24 && timeBase === 'hour') || timeBase !== 'hour',
        H_datePicker__itemSelected: selectedIndex === index
      }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props = defineProps({
  modelValue: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  showSeconds: { default: false, type: Boolean }
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
  }
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
.H_timeTable__table {
  display: grid;
  grid-template-columns: repeat(8, 28px);
  grid-template-rows: repeat(8, 28px);
  grid-column-gap: 4px;
  grid-row-gap: 1.7px;
  padding: 4px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.H_timeTable__tableItem {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  opacity: 0.2;
  pointer-events: none;
}

.H_timeTable__tableItemActive {
  cursor: pointer;
  opacity: 1;
  pointer-events: all;
}

.H_timeTable__tableItem:hover {
  background-color: bisque;
  color: black;
}
</style>
