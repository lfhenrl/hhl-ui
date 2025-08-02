<template>
  <H_inputBase
    :clearable="clearable"
    :validator="validator"
    :label="label"
    :hintStart
    :hintEnd
    :ErrorMessage="validate"
    :disabled
    title="Timepicker"
    class="H_timePicker"
  >
    <slot> </slot>

    <H_baseTimePicker
      :time="time"
      :hide-icon="hideIcon"
      :readonly="readonly"
      :show-seconds="showSeconds"
      :autofocus
      @time-changed="timeChanged"
      class="h_w-full h_cursor-pointer"
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

const time = ref({ hour: "00", minute: "00", second: "00" });

watch(
  () => model.value,
  () => {
    if (model.value) {
      const pDato = model.value.split(":");
      time.value = {
        hour: pDato[0],
        minute: pDato[1],
        second: pDato[2],
      };
    } else {
      time.value = { hour: "00", minute: "00", second: "00" };
    }
  },
  {
    immediate: true,
  }
);

function timeChanged(e: any) {
  model.value = "";
  model.value = `${e.hour}:${e.minute}:${e.second}`;
}

const validate = computed(() => validateFunc(P.validator, model.value));
</script>
<style>
@layer components {
  .H_timePicker {
    &:focus-within {
      border-color: var(--color-pri);
    }
  }
}
</style>
