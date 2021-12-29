<template>
  <div class="hhl-dt-table col-bg-0">
    <div>
      <div class="hhl-dt-picker__header flx-row flx-align-center flx-justify-center txt-bold p-4">
        <div
          class="txt-bold cursor-pointer hhl-dt-table-hover px-3 py-8"
          @click="timeBase = 'hour'"
          :class="{
            'col-sec': timeBase === 'hour'
          }"
        >
          {{ getZeroInFront(value.hour) }}
        </div>
        :
        <div
          class="txt-bold cursor-pointer hhl-dt-table-hover px-3 py-8"
          @click="timeBase = 'minute'"
          :class="{
            'col-sec': timeBase === 'minute'
          }"
        >
          {{ getZeroInFront(value.minute) }}
        </div>
        <div v-show="showSeconds" class="flx-row flx-align-center">
          :
          <div
            class="txt-bold cursor-pointer hhl-dt-table-hover px-3 py-8"
            @click="timeBase = 'second'"
            :class="{
              'col-sec': timeBase === 'second'
            }"
          >
            {{ getZeroInFront(value.second) }}
          </div>
        </div>
      </div>
      <div class="hhl-dt-table-timeBox-table grid p-4">
        <div
          v-for="(item, index) in time"
          @click="itemClick(index)"
          :key="index"
          :data-value="index"
          :selected="selectedIndex === index"
          class="
            pointer-events-none
            hhl-dt-table-hover
            flx-row flx-align-center flx-justify-center
            borderRadius-full
            txt-bold
            opacity-20
          "
          :class="{
            'opacity-100 cursor-pointer pointer-events-auto': (index < 24 && timeBase === 'hour') || timeBase !== 'hour',
            'hhl-dt-table-selected': selectedIndex === index
          }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "hhl-time-table",
  props: {
    modelValue: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
    showSeconds: { default: false, type: Boolean }
  },
  setup(props, { emit }) {
    const timeBase = ref("hour");
    const getZeroInFront = (val: number) => (val < 10 ? "0" + val : val);
    const time = [];
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
        console.log(newTimeBase);
        timeBase.value = newTimeBase;
      }
    };

    return {
      time,
      value,
      itemClick,
      timeBase,
      getZeroInFront,
      selectedIndex
    };
  }
});
</script>

<style>
.hhl-dt-table-timeBox-table {
  grid-template-columns: repeat(8, 28px);
  grid-template-rows: repeat(8, 28px);
  grid-column-gap: 4px;
  grid-row-gap: 1.7px;
}
</style>
