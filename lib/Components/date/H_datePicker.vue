<template>
  <H_inputBase
    :value="modelValue"
    :clearable="clearable"
    :validator="validator"
    :disabled="disabled"
    :readonly="$attrs.readonly"
    :label="label"
    @isValid="$emit('isValid', $event)"
    class="H_datePicker"
  >
    <div class="flx-row-align-center">
      <H_dPicker
        :modelValue="dato"
        @dateChanged="setDate"
        :long-date="longDate"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :no-outside-click="noOutsideClick"
        v-if="type === 'dateTime' || type === 'date'"
      />
      <H_tPicker
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
import { PropType, ref, watch } from "vue";
import H_inputBase from "../H_inputBase.vue";
import H_dPicker from "./H_dPicker.vue";
import H_tPicker from "./H_tPicker.vue";

const props = defineProps({
  modelValue: { type: Object as PropType<Date | undefined>, default: null },
  type: { type: String as PropType<"dateTime" | "date" | "time">, default: "dateTime" },
  hideIcon: { default: false, type: Boolean },
  readonly: { type: Boolean, default: false },
  longDate: { default: false, type: Boolean },
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
  if (props.type === "time") {
    emit("update:modelValue", new Date(0, 0, 0, e.hour, e.minute, e.second));
    emit("update:date", new Date(0, 0, 0));
  }
}

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      const pDato = new Date(props.modelValue);
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
</script>

<style>
.flx-row-align-center {
  display: flex;
  align-items: center;
}

.flx-inline-row {
  display: inline-flex;
}

.flx-align-center {
  align-items: center;
}

.H_datePicker {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.H_datePicker__inputcontainer {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.H_datePicker__inputcontainer .H_icon {
  --H_icon-size: 1.2em;
  opacity: 0.7;
}

.H_datePicker__input {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  padding: 0.55em 0.1em 0.45em 0.2em;
  background-color: transparent;
  cursor: pointer;
  border: none;
  overflow: hidden;
  appearance: none;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: currentColor;
}

.H_datePicker__popup {
  border-radius: 4px;
  background-color: var(--col-bg-1);
  border: solid 1px var(--comp-border-color);
  box-shadow: var(--comp-shadow);
}

.H_datePicker__footer {
  font-family: var(--comp-font-family);
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 11px;
  border-top: solid 1px var(--comp-border-color);
}

.H_datePicker__footer .H_btn {
  width: 70px;
}

.H_datePicker__header {
  font-family: var(--comp-font-family);
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  padding: 9px;
  background-color: var(--col-bg-5);
  color: var(--col-txt-1);
}

.H_datePicker__headerValue {
  padding: 4px;
  cursor: pointer;
}

.H_datePicker__headerValue:hover {
  background-color: bisque;
  color: black;
}

.H_datePicker__itemSelected {
  background-color: var(--col-pri);
  color: var(--col-txt-on-pri);
}

.H_datePicker__headerValue:active {
  background-color: var(--comp-border-color-focus);
}

.H_datePicker__innerHeader {
  display: flex;
  flex: auto;
  align-items: center;
  padding: 3px;
  font-weight: bold;
}

.H_datePicker__innerHeaderValue {
  display: flex;
  flex: 1;
  justify-content: center;
}

.H_datePicker__picker[readonly] input {
  cursor: auto;
}
.H_datePicker__picker[focused="true"] input {
  color: var(--comp-border-color-focus);
}
.H_datePicker__picker[focused="true"] .H_icon {
  fill: var(--comp-border-color-focus);
}
</style>
