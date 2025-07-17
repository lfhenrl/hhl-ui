<template>
  <div class="flex items-center justify-center text-txt1 text-xl leading-none p-1.5 border-txt6 bg-bg5 rounded">
    <div
      class="p-0.5 rounded cursor-pointer"
      @click.stop.prevent="timeBase = 'hour'"
      :class="{
        'col-pri': timeBase === 'hour',
      }"
    >
      {{ getZeroInFront(value.hour) }}
    </div>
    <div>:</div>
    <div
      class="p-0.5 rounded cursor-pointer"
      @click.stop.prevent="timeBase = 'minute'"
      :class="{
        'col-pri': timeBase === 'minute',
      }"
    >
      {{ getZeroInFront(value.minute) }}
    </div>
    <div v-show="showSeconds">:</div>
    <div
      v-show="showSeconds"
      class="p-0.5 rounded cursor-pointer"
      @click.stop.prevent="timeBase = 'second'"
      :class="{
        'col-pri': timeBase === 'second',
      }"
    >
      {{ getZeroInFront(value.second) }}
    </div>
  </div>
  <div class="H_timeTable__table grid p-1 gap-1 bg-bg6">
    <div
      v-for="(item, index) in time"
      @click.stop.prevent="itemClick(index)"
      :key="index"
      :data-value="index"
      :selected="selectedIndex === index"
      class="flex items-center justify-center rounded-full hover:bg-warn"
      :class="{
        'border-2 border-pri': selectedIndex === index,
        'opacity-20 pointer-events-none': index > 23 && timeBase === 'hour',
      }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  showSeconds: { default: false, type: Boolean },
  isopen: { default: false, type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);

const timeBase = ref("hour");
const getZeroInFront = (val: number) => (val < 10 ? "0" + val : val);
const time: any = [];
for (let i = 0; i < 60; i++) {
  time.push(getZeroInFront(i));
}

watch(
  () => props.isopen,
  (val) => {
    if (val) {
      timeBase.value = "hour";
    }
  }
);

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
@layer components {
  .H_timeTable__table {
    grid-template-columns: repeat(8, 28px);
    grid-template-rows: repeat(8, 28px);
  }
}
</style>
