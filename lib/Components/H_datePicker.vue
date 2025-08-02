<template>
  <H_inputBase
    :clearable="clearable"
    :validator="validator"
    :label="label"
    :hintStart
    :hintEnd
    :ErrorMessage="validate"
    :disabled
    class="H_datePicker"
  >
    <slot> </slot>
    <div class="H_datePicker__content h_flex h_h-full">
      <H_baseDatePicker
        :date="tempDate"
        @dateChanged="setDate"
        :long-date="longDate"
        :hide-icon="hideIcon"
        :autofocus
        :readonly="readonly"
        v-if="type === 'dateTime' || type === 'date'"
      />
      <H_baseTimePicker
        :time
        @timeChanged="setTime"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :autofocus
        :show-seconds="showSeconds"
        v-if="type === 'dateTime' || type === 'time'"
      />
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { type PropType, ref, watch, computed } from "vue";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "./H_inputbase.vue";
import H_baseDatePicker from "../SubComponents/date/H_baseDatePicker.vue";
import H_baseTimePicker from "../SubComponents/date/H_baseTimePicker.vue";

const P = defineProps({
  type: {
    type: String as PropType<"dateTime" | "date" | "time">,
    default: "dateTime",
  },
  hideIcon: { default: false, type: Boolean },
  autofocus: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  longDate: { default: false, type: Boolean },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  showSeconds: { default: false, type: Boolean },
  noOutsideClick: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "" },
  clearable: Boolean,
  validator: Array,
});
const emit = defineEmits(["update:date", "update:modelValue", "update:time", "isValid"]);
const model: any = defineModel();
const tempDate = ref();
const time = ref({ hour: "00", minute: "00", second: "00" });

watch(
  () => model.value,
  (dato: Date) => {
    if (model.value) {
      tempDate.value = { date: dato.getDate(), month: dato.getMonth(), year: dato.getFullYear() };
      time.value = {
        hour: dato.getHours().toString().padStart(2, "0"),
        minute: dato.getMinutes().toString().padStart(2, "0"),
        second: P.showSeconds ? dato.getSeconds().toString().padStart(2, "0") : "00",
      };
    } else {
      time.value = { hour: "00", minute: "00", second: "00" };
      tempDate.value = null;
    }
  },
  {
    immediate: true,
  }
);

function updateModel() {
  if (tempDate.value) {
    model.value = new Date(
      tempDate.value.year,
      tempDate.value.month,
      tempDate.value.date,
      parseInt(time.value.hour),
      parseInt(time.value.minute),
      parseInt(time.value.second)
    );
  }
}

function setTime(newTime: any) {
  time.value = newTime;
  updateModel();
}

function setDate(newDate: any) {
  tempDate.value = newDate;
  updateModel();
}

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
@layer components {
  .H_datePicker {
    &:focus-within {
      border-color: var(--color-pri);
    }
  }
}
</style>
