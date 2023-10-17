<template>
  <div
    class="h_timetable__header flex flex-row items-stretch justify-center bg-bg3 text-center text-2xl font-bold text-txt1"
  >
    <div
      class="flex cursor-pointer flex-col items-center justify-center px-1"
      @click="timeBase = 'hour'"
      :class="{
        'col-pri': timeBase === 'hour',
      }"
    >
      {{ getZeroInFront(value.hour) }}
    </div>
    <div class="flex flex-col items-center justify-center">:</div>
    <div
      class="flex cursor-pointer flex-col items-center justify-center px-1"
      @click="timeBase = 'minute'"
      :class="{
        'col-pri': timeBase === 'minute',
      }"
    >
      {{ getZeroInFront(value.minute) }}
    </div>
    <div v-show="showSeconds" class="flex">
      <div class="flex flex-col items-center justify-center">:</div>
      <div
        class="flex cursor-pointer flex-col items-center justify-center px-1"
        @click="timeBase = 'second'"
        :class="{
          'col-pri': timeBase === 'second',
        }"
      >
        {{ getZeroInFront(value.second) }}
      </div>
    </div>
  </div>
  <div
    class="h_timeTable__table grid grid-cols-[repeat(8,28px)] grid-rows-[repeat(8,28px)] gap-1 p-1"
  >
    <div
      v-for="(item, index) in time"
      @click="itemClick(index)"
      :key="index"
      :data-value="index"
      :selected="selectedIndex === index"
      class="h_timeTable__tableItem pointer-events-none flex items-center justify-center rounded-full font-bold opacity-20 hover:bg-warn"
      :class="{
        '!pointer-events-auto !cursor-pointer !opacity-100':
          (index < 24 && timeBase === 'hour') || timeBase !== 'hour',
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
