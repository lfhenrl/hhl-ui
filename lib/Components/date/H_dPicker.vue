<template>
  <div class="H_datePicker__picker" :focused="focused" :readonly="readonly" >
    <H_pop
      v-model="popupOpen"
      trigger="none"
      :no-outside-click="noOutsideClick"
    >
      <template v-slot:referance>
        <div class="H_datePicker__inputcontainer" @click="onClick">
          <H_icon icon="event" btn v-if="!hideIcon" />
          <input
            :value="formattetValueDate"
            :size="setSize()"
            @focus="focused = !readonly"
            @blur="focused = false"
            class="H_datePicker__input"
          />
        </div>
      </template>
      <div class="H_datePicker__popup">
        <div class="H_datePicker__header">
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
        <div class="H_datePicker__footer">
          <H_btn size="sm" @click="cancel" class="col-sec">CANCEL</H_btn>
          <H_btn size="sm" @click="ok">OK</H_btn>
        </div>
      </div>
    </H_pop>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import H_dateTable from "./H_dateTable.vue";
import H_monthTable from "./H_monthTable.vue";
import H_pop from "../popup/H_pop.vue";
import H_btn from "../H_btn.vue";
import H_icon from "../H_icon.vue";
import { D_01_dec_2021, D_mon_01_dec_2021 } from "../../utils/dateFormat";
import { DateGetToday } from "../../utils/dateFunctions";

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
    return 12;
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
