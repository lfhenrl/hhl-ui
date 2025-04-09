<template>
  <div>
    <div class="flex items-center p-1 font-bold">
      <H_icon name="expand_left" size="1.6rem" btn @click.stop="changeYear(-1)" />
      <div class="flex justify-center flex-1">
        {{ tempDato.toLocaleString("en-us", { year: "numeric" }) }}
      </div>
      <H_icon name="expand_right" size="1.6rem" btn @click.stop="changeYear(1)" />
    </div>
    <div class="H_monthTable__table grid m-2 gap-2" @click.stop="itemClick">
      <div
        v-for="(item, index) in month"
        :key="index"
        :data-value="index"
        class="flex items-center justify-center rounded cursor-pointer m-0.5 hover:border hover:border-warn"
        :class="{
          'border border-pri': tempDato.getMonth() === index,
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DateAddYears } from "../../utils/dateFunctions";
import H_icon from "../../Components/H_icon.vue";

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
});

const emit = defineEmits(["month-selected", "update:modelValue"]);

const month = ref(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]);
const tempDato = ref(props.modelValue);

const itemClick = (e: any) => {
  e.preventDefault();
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
</script>
<style>
@layer components {
  .H_monthTable__table {
    grid-template-columns: repeat(3, 72px);
    grid-template-rows: repeat(4, 36px);
  }
}
</style>
