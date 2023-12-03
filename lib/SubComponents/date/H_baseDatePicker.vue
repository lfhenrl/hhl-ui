<template>
  <div class="h_datePicker" :focused="focused" :readonly="readonly">
    <H_pop
      v-model="popupOpen"
      trigger="click"
      :no-outside-click="noOutsideClick"
      position="fixed"
    >
      <template v-slot:referance>
        <div
          class="h_datePicker__inputcontainer group/date inline-flex cursor-pointer items-center"
          title="Datepicker"
          tabindex="0"
        >
          <H_icon
            icon="event"
            btn="standard"
            v-if="!hideIcon"
            tabindex="-1"
            class="opacity-70 group-hover/date:scale-110"
          />
          <input
            name="datepicker"
            title="Datepicker"
            :value="formattetValueDate"
            :size="setSize()"
            tabindex="-1"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="h_datePicker__input cursor-pointer overflow-hidden bg-transparent pl-1"
          />
        </div>
      </template>
      <div class="h_datePicker__popup rounded border border-bg5 bg-bg0 shadow">
        <div
          class="h_datePicker__header flex items-center justify-center bg-bg5 p-1 text-center text-xl font-bold text-txt1"
        >
          {{ formattetTempDate }}
        </div>
        <H_dateTable
          v-show="activeView == 'day'"
          v-model:tempDatomy="tempDatomy"
          v-model="tempDato"
          @update:tempDatomy="tempDatomy = $event"
          @month-click="activeView = 'month'"
        />
        <H_monthTable
          v-show="activeView == 'month'"
          v-model="tempDatomy"
          @month-selected="activeView = 'day'"
        />
        <div
          class="h_datePicker__footer flex justify-end gap-3 border-t border-bg4 p-3"
        >
          <H_btn tabindex="3" size="sm" @click="cancel" class="col-sec w-16"
            >CANCEL</H_btn
          >
          <H_btn tabindex="4" size="sm" @click="ok" class="w-16">OK</H_btn>
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
  noOutsideClick: { type: Boolean, default: false },
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
  },
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
</script>
