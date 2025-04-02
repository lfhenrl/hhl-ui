<template>
  <div :focused="focused" :readonly="readonly">
    <H_popover v-model="popupOpen" :offset-top="8" :readonly="readonly" class="flex items-center">
      <template v-slot:referance>
        <div class="group inline-flex items-center cursor-pointer h-full" title="Datepicker" tabindex="0">
          <H_iconEvent size="1.1rem" color="txt1" v-if="!hideIcon" />
          <input
            name="datepicker"
            title="Datepicker"
            :value="formattetValueDate"
            :size="setSize()"
            tabindex="-1"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="overflow-hidden cursor-pointer text-xm text-txt1 focus:outline-none leading-tight bg-transparent border-none appearance-none mb-px ml-1"
          />
        </div>
      </template>
      <div @click.stop class="rounded bg-bg0 border-bg5 border">
        <div class="flex items-center text-lg text-txt1 font-bold justify-center bg-bg3 p-1">
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
        <div class="flex justify-end gap-4 p-4 border-t border-bg4">
          <H_btn tabindex="3" @click.stop="cancel" class="col-sec text-sm w-18">CANCEL</H_btn>
          <H_btn tabindex="0" @click.stop="ok" class="text-sm w-18">OK</H_btn>
        </div>
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { D_01_dec_2021, D_mon_01_dec_2021 } from "../../utils/dateFormat";
import { DateGetToday } from "../../utils/dateFunctions";
import H_popover from "../../Components/H_popover.vue";
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
</script>
