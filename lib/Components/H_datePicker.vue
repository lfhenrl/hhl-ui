<template>
  <H_inputBase
    :movelabel="true"
    :clearable="clearable"
    :validator="validator"
    :disabled="disabled"
    :readonly="$attrs.readonly"
    :label="label"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    @isValid="$emit('isValid', $event)"
    class="h_datePicker"
  >
    <div class="h_datePicker_container">
      <H_baseDatePicker
        :modelValue="dato"
        @dateChanged="setDate"
        :long-date="longDate"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :no-outside-click="noOutsideClick"
        v-if="type === 'dateTime' || type === 'date'"
      />
      <H_baseTimePicker
        :time="time"
        @timeChanged="setTime"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :show-seconds="showSeconds"
        :no-outside-click="noOutsideClick"
        v-if="type === 'dateTime' || type === 'time'"
      />
    </div>
  </H_inputBase>
</template>

<script setup lang="ts">
import { PropType, ref, watch, computed } from "vue";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "../SubComponents/H_inputBase.vue";
import H_baseDatePicker from "../SubComponents/date/H_baseDatePicker.vue";
import H_baseTimePicker from "../SubComponents/date/H_baseTimePicker.vue";

const P = defineProps({
  modelValue: { type: Object as PropType<Date | undefined>, default: null },
  type: { type: String as PropType<"dateTime" | "date" | "time">, default: "dateTime" },
  hideIcon: { default: false, type: Boolean },
  readonly: { type: Boolean, default: false },
  longDate: { default: false, type: Boolean },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  showSeconds: { default: false, type: Boolean },
  noOutsideClick: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "" },
  clearable: Boolean,
  validator: Array
});

const emit = defineEmits(["update:date", "update:modelValue", "update:time", "isValid"]);

const dato = ref();
const time = ref({ hour: 0, minute: 0, second: 0 });

function setDate(e: any) {
  const newDatoNumber = new Date(e.getFullYear(), e.getMonth(), e.getDate()).valueOf();
  const newTimeNumber = time.value.hour * 3600 + time.value.minute * 60 + time.value.second;
  const newDato = new Date(newDatoNumber + newTimeNumber * 1000);
  if (newDato) {
    emit("update:modelValue", newDato);
    emit("update:date", new Date(newDatoNumber));
    emit("update:time", new Date(newTimeNumber * 1000));
  }
}

function setTime(e: any) {
  time.value = { hour: e.hour, minute: e.minute, second: e.second };
  const newTimeNumber = e.hour * 3600 + e.minute * 60 + e.second;
  if (dato.value) {
    const newDatoNumber = new Date(dato.value.getFullYear(), dato.value.getMonth(), dato.value.getDate()).valueOf();
    const newDato = new Date(newDatoNumber + newTimeNumber * 1000);
    if (newDato) {
      emit("update:modelValue", newDato);
    }
  }
  emit("update:time", new Date(newTimeNumber * 1000));
  if (P.type === "time") {
    emit("update:modelValue", new Date(0, 0, 0, e.hour, e.minute, e.second));
    emit("update:date", new Date(0, 0, 0));
  }
}

watch(
  () => P.modelValue,
  () => {
    if (P.modelValue) {
      const pDato = new Date(P.modelValue);
      time.value = { hour: pDato.getHours(), minute: pDato.getMinutes(), second: pDato.getSeconds() };
      dato.value = new Date(pDato.getFullYear(), pDato.getMonth(), pDato.getDate());
    } else {
      time.value = { hour: 0, minute: 0, second: 0 };
      dato.value = null;
    }
  },
  {
    immediate: true
  }
);

const validate = computed(() => validateFunc(P.validator, P.modelValue));
</script>

<style>
.h_inputbase.h_datePicker {
  flex: 1 1 200px;
  max-height: 40px;
}

.h_datePicker_container {
  display: flex;
  align-items: center;
  margin-top: 3px;
  margin-left: 9px;
}
</style>