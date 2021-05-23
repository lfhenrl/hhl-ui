<template>
  <div class="hhl-dt-table col-bg-0">
    <div>
      <div class="flx-row flx-align-center p-3 flx-auto txt-bold">
        <hhl-btn icon="expand_left" type="icon-text" size="sm" @click="changeYear(-1)" class="borderRadius-full"/>
        <div class="flx-row flx-auto flx-justify-center cursor-pointer">
          {{ tempDato.toLocaleString("en-us", { year: "numeric" }) }}
        </div>
        <hhl-btn icon="expand_right" type="icon-text" size="sm" @click="changeYear(1)" class="borderRadius-full"/>
      </div>
      <div class="hhl-dt-table-monthBox-table grid m-10" @click="itemClick">
        <div
          v-for="(item, index) in month"
          :key="index"
          :data-value="index"
          class="hhl-dt-table-hover flx-row flx-align-center flx-justify-center cursor-pointer"
          :class="{
            'hhl-dt-table-selected':  tempDato.getMonth() === index
          }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { DateAddYears } from "../utils/dateFunctions";

export default defineComponent({
  name: "hhl-month-table",
  props: {
    modelValue: { type: Date, default: new Date() }
  },
  setup(props, { emit }) {
    const month = ref(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]);
    const tempDato = ref(props.modelValue);

    const itemClick = (e: any) => {
      const data = e.target.dataset;
      if (data) {
        const newDate = new Date(tempDato.value);
        const M = parseInt(data.value);
        newDate.setMonth(M);
        tempDato.value = newDate;
        emit("update:modelValue", newDate);
        emit("month-selected");
      }
    };

    const changeYear = (val: number) => {
      const newDate = DateAddYears(new Date(tempDato.value), val);
      tempDato.value = newDate;
    };

    return {
      month,
      itemClick,
      changeYear,
      tempDato
    };
  }
});
</script>

<style>
.hhl-dt-table-monthBox-table {
  grid-template-columns: repeat(3, 72px);
  grid-template-rows: repeat(4, 36px);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
}

</style>
