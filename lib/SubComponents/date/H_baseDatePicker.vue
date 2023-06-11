<template>
  <div class="h_datePicker" :focused="focused" :readonly="readonly">
    <H_pop v-model="popupOpen" trigger="none" :no-outside-click="noOutsideClick" position="fixed">
      <template v-slot:referance>
        <div class="h_datePicker__inputcontainer" @click="onClick">
          <H_icon icon="event" btn v-if="!hideIcon" />
          <input
            :value="formattetValueDate"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="h_datePicker__input"
          />
        </div>
      </template>
      <div class="h_datePicker__popup shadow-5">
        <div class="h_datePicker__header">
          {{ formattetTempDate }}
        </div>
        <H_dateTable
          v-show="activeView == 'day'"
          v-model:tempDatomy="tempDatomy"
          v-model="tempDato"
          @update:tempDatomy="tempDatomy = $event"
          @month-click="activeView = 'month'"
        />
        <H_monthTable v-show="activeView == 'month'" v-model="tempDatomy" @month-selected="activeView = 'day'" />
        <div class="h_datePicker__footer">
          <H_btn size="sm" @click="cancel" class="col-sec">CANCEL</H_btn>
          <H_btn size="sm" @click="ok">OK</H_btn>
        </div>
      </div>
    </H_pop>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { D_01_dec_2021, D_mon_01_dec_2021 } from "../../utils/dateFormat";
import { DateGetToday } from "../../utils/dateFunctions";
import H_pop from "../../Components/popup/H_pop.vue";
import H_icon from "../../Components/H_icon.vue";
import H_btn from "../../Components/H_btn.vue";
import H_dateTable from "./H_dateTable.vue";
import H_monthTable from "./H_monthTable.vue";

const props = defineProps({
  modelValue: { type: Date, default: null },
  readonly: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
  longDate: { default: false, type: Boolean },
  noOutsideClick: { type: Boolean, default: false }
});

const emit = defineEmits(["dateChanged"]);

const popupOpen = ref(false);
const focused = ref(false);
const activeView = ref("day");
const tempDato = ref(DateGetToday());
const tempDatomy = ref<Date | undefined>(DateGetToday());

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      tempDato.value = props.modelValue;
      tempDatomy.value = tempDato.value;
    }
  }
);

function setSize() {
  if (props.longDate) {
    return 13;
  } else {
    return 8;
  }
}

const formattetTempDate = computed(() => {
  if (tempDato.value) {
    return D_01_dec_2021(tempDato.value);
  }
  return null;
});

const formattetValueDate = computed(() => {
  if (props.modelValue) {
    if (props.longDate) {
      return D_mon_01_dec_2021(new Date(props.modelValue));
    } else {
      return D_01_dec_2021(new Date(props.modelValue));
    }
  }
  return "?? ??? ????";
});

const close = () => (popupOpen.value = false);
const ok = () => {
  close();
  emit("dateChanged", new Date(tempDato.value));
};
const cancel = () => close();
const onClick = () => {
  if (props.readonly) return;
  if (popupOpen.value === false || !props.noOutsideClick) {
    popupOpen.value = !popupOpen.value;
    if (popupOpen.value === false) return;
  }

  if (props.modelValue) {
    tempDato.value = new Date(props.modelValue);
  } else {
    tempDato.value = new Date(DateGetToday());
  }

  tempDatomy.value = tempDato.value;
};
</script>

<style>
.h_datePicker__inputcontainer {
  flex-direction: row;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.h_datePicker__inputcontainer .h_icon {
  --h_icon-size: 1.3em;
  opacity: 0.7;
}

.h_datePicker__inputcontainer:hover .h_icon {
  transform: scale(1.25);
}

.h_datePicker__popup {
  border-radius: 4px;
  background-color: var(--col-bg-0);
  border: solid 1px var(--col-txt-5);
}

.h_datePicker__input {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  padding: 0.45em 0.1em 0.45em 0.2em;
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

.h_datePicker__header {
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

.h_datePicker__footer {
  font-family: var(--comp-font-family);
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 11px;
  border-top: solid 1px var(--col-bg-4);
}

.h_datePicker__footer .h_btn {
  width: 70px;
}
</style>
