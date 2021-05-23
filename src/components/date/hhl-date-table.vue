<template>
  <div class="hhl-dt-table col-bg-0 flx-inline-row">
    <div class="flx-col">
      <div class="flx-row flx-align-center p-3 txt-bold">
        <hhl-btn icon="expand_left" type="icon-text" size="sm" @click="changeMonth(-1)" class="borderRadius-full"/>
        <div class="flx-row flx-auto flx-align-center flx-justify-center cursor-pointer" @click="$emit('month-click')">
          {{ tempDatomy.toLocaleString("en-us", { month: "long", year: "numeric" }) }}
        </div>
        <hhl-btn icon="expand_right" type="icon-text" size="sm" @click="changeMonth(1)" class="borderRadius-full"/>
      </div>
      <div class="hhl-dt-table-dayBox-table grid" @click="itemClick">
        <div
          v-for="item in dates"
          :key="item.value"
          :data-value="item.value"
          :data-type="item.type"
          :data-daytype="item.daytype"
          :data-activemonth="item.activeMonth"
          :today="isToday(item.value)"
          :title="isHolyday(item.value)"
          class="flx-row flx-align-center flx-justify-center"
          :class="{
            'cursor-pointer opacity-50 borderRadius-full hhl-dt-table-hover': item.type === 'day',
            'txt-bold opacity-100': item.activeMonth,
            'txt-normal opacity-100': item.daytype === 'weekend',
            'col-bg-2 --col-txt-1': item.type === 'head' || item.type === 'week',
            'hhl-dt-table-selected': isSelected(item.value),
            'col-sec': isToday(item.value),
            'col-txt-err': isHolyday(item.value)
          }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";
import { getDaysArray } from "./getDaysArray";
import { DateAddMonths } from "../utils/dateFunctions";
import { HHL_isHolyDay } from "./holyDays";

export default defineComponent({
  name: "hhl-date-table",
  props: {
    modelValue: { type: Date, default: null },
    tempDatomy: { type: Date, default: null }
  },
  setup(props, { emit }) {
    const tempDato = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          tempDato.value = props.modelValue;
        }
      }
    );
    watch(
      () => props.tempDatomy,
      () => {
        if (props.tempDatomy) {
          tempDato.value = props.tempDatomy;
        }
      }
    );

    const dates: any = computed(() => {
      return getDaysArray(tempDato.value.getFullYear(), tempDato.value.getMonth());
    });

    const selectedDate = computed(() => {
      const d = props.modelValue;
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    });

    const toDayDate = computed(() => {
      const d = new Date();
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    });

    const itemClick = (e: any) => {
      const data = e.target.dataset;
      if (data && data.type === "day") {
        const dArr = data.value.split("/");
        const dateObj = {
          day: parseInt(dArr[0]),
          month: parseInt(dArr[1]),
          year: parseInt(dArr[2])
        };
        const newDate = new Date(props.modelValue);
        newDate.setDate(dateObj.day);
        newDate.setMonth(dateObj.month);
        newDate.setFullYear(dateObj.year);
        emit("update:modelValue", newDate);
      }
    };

    const changeMonth = (val: number) => {
      const newDate = DateAddMonths(new Date(props.tempDatomy), val);
      emit("update:tempDatomy", newDate);
    };

    const isSelected = (dato: any) => (dato === selectedDate.value ? true : null);
    const isToday = (dato: any) => (dato === toDayDate.value ? true : null);
    const isHolyday = (dato: any) => HHL_isHolyDay(dato);

    return {
      tempDato,
      dates,
      itemClick,
      changeMonth,
      isSelected,
      isToday,
      isHolyday
    };
  }
});
</script>

<style>
.hhl-dt-table-dayBox-table {
  grid-template-columns: repeat(8, 32px);
  grid-template-rows: repeat(7, 32px);
}
</style>
