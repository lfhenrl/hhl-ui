<template>
  <H_inputBase
    :clearable="clearable"
    :validator="validator"
    :label="label"
    :HelpTextStart="hintStart"
    :HelpTextEnd="hintEnd"
    :ErrorMessage="validate"
    :disabled
    title="Timepicker"
    @isValid="$emit('isValid', $event)"
    class="H_timePicker focus-within:border-pri"
  >
    <slot> </slot>

    <H_baseTimePicker
      :time="time"
      @timeChanged="setTime"
      :hide-icon="hideIcon"
      :readonly="readonly"
      :show-seconds="showSeconds"
      :autofocus
      solo
    />
  </H_inputBase>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { validateFunc } from "../utils/validateFunc";
import H_inputBase from "./H_inputbase.vue";
import H_baseTimePicker from "../SubComponents/date/H_baseTimePicker.vue";

const P = defineProps({
  hideIcon: { default: false, type: Boolean },
  readonly: { type: Boolean, default: false },
  hintStart: { type: String, default: "" },
  hintEnd: { type: String, default: "" },
  showSeconds: { default: false, type: Boolean },
  noOutsideClick: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "" },
  clearable: Boolean,
  validator: Array,
});

const model: any = defineModel();
const emit = defineEmits(["isValid"]);

const time = ref({ hour: 0, minute: 0, second: 0 });

function setTime(e: any) {
  // put zero in front of numbers < 10
  const h = e.hour < 10 ? "0" + e.hour : e.hour;
  const m = e.minute < 10 ? "0" + e.minute : e.minute;
  const s = e.second < 10 ? "0" + e.second : e.second;
  model.value = `${h}:${m}:${s}`;
}

watch(
  () => model.value,
  () => {
    if (model.value) {
      const pDato = model.value.split(":");
      time.value = {
        hour: parseInt(pDato[0] ?? 0),
        minute: parseInt(pDato[1] ?? 0),
        second: parseInt(pDato[2] ?? 0),
      };
    } else {
      time.value = { hour: 0, minute: 0, second: 0 };
    }
  },
  {
    immediate: true,
  }
);

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
@layer components {
  .H_baseTimePicker {
    width: 100%;
    cursor: pointer;
  }
}
</style>
