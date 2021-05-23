<template>
  <hhl-input-base :value="Number(modelValue)" class="hhl-dt-picker">
    <div class="flx-row flx-align-center">
      <hhl-date-picker
        :modelValue="dato"
        @dateChanged="setDate"
        :long-date="longDate"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :no-outside-click="noOutsideClick"
        v-if="type === 'dateTime' || type === 'date'"
      />
      <hhl-time-picker
        :time="time"
        @timeChanged="setTime"
        :hide-icon="hideIcon"
        :readonly="readonly"
        :show-seconds="showSeconds"
        :no-outside-click="noOutsideClick"
        v-if="type === 'dateTime' || type === 'time'"
      />
    </div>
  </hhl-input-base>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import hhlDatePicker from "./hhl-date-picker.vue";
import hhlTimePicker from "./hhl-time-picker.vue";

const hhlDtPicker = defineComponent({
  name: "hhl-dt-picker",
  components: {
    hhlDatePicker,
    hhlTimePicker
  },
  props: {
    modelValue: { type: Date, default: null },
    type: { type: String as PropType<"dateTime" | "date" | "time">, default: "dateTime" },
    hideIcon: { default: false, type: Boolean },
    readonly: { type: Boolean, default: false },
    longDate: { default: false, type: Boolean },
    showSeconds: { default: false, type: Boolean },
    noOutsideClick: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
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
      console.log("datetime", new Date(newTimeNumber * 1000));
      emit("update:time", new Date(newTimeNumber * 1000));
      if (props.type === "time") {
        emit("update:modelValue", new Date(0, 0, 0, e.hour, e.minute, e.second));

        emit("update:Date", new Date(0, 0, 0));
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

    return {
      setDate,
      setTime,
      time,
      dato
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-dt-picker": typeof hhlDtPicker;
  }
}
export type ihhlDtPicker = InstanceType<typeof hhlDtPicker>;
export default hhlDtPicker;
</script>

<style>
.hhl-dt-picker__header {
  font-size: 22px;
  background-color: var(--col-bg-2);
  color: var(--col-txt-1);
}
.hhl-picker[readonly] input {
  cursor: auto;
}
.hhl-picker[focused="true"] input {
  color: var(--comp-border-color-focus);
}
.hhl-picker[focused="true"] .hhl-icon {
  fill: var(--comp-border-color-focus);
}

.hhl-dt-table-selected {
  background-color: var(--comp-border-color-focus);
  color: var(--col-txt-1);
}

.hhl-dt-table-hover:hover {
  background-color: bisque;
  color: black;
}
.hhl-dt-table-hover:active {
  background-color: var(--comp-border-color-focus);
}
</style>
