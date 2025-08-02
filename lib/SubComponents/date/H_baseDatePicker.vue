<template>
  <H_popover
    v-model="popupOpen"
    offset-top="8px"
    :readonly="readonly"
    :autofocus
    title="Datepicker"
    class="H_baseDatePicker h_flex h_items-center h_outline-none h_rounded"
    @toggled="toggled"
  >
    <template v-slot:referance>
      <H_icon name="event" size="1.2em" color="txt1" v-if="!hideIcon" tabindex="-1" />
      <span class="value h_w-fit">{{ formattetValueDate }}</span>
    </template>

    <div class="H_baseDatePicker__popup h_rounded h_bg6" @keydown="keyDown" @click.prevent>
      <H_dateSelector
        ref="dateSelector"
        tabindex="0"
        :date="tempDate"
        :date-base="dateBase"
        :month-array="monthString"
        @base-changed="(e) => (dateBase = e)"
      ></H_dateSelector>

      <H_dateTable
        v-if="dateBase === 'date'"
        :date="tempDate"
        :dates="DaysArray"
        :month-array="monthString"
        @base-changed="(e) => (dateBase = e)"
        tabindex="-1"
      ></H_dateTable>
      <H_monthTable
        v-else
        :date="tempDate"
        :month-array="monthString"
        @base-changed="(e) => (dateBase = e)"
        tabindex="-1"
      ></H_monthTable>
      <div class="actions h_flex h_justify-end h_bg4">
        <H_btn tabindex="-1" size="sm" color="sec" @click.stop="cancel">CANCEL</H_btn>
        <H_btn tabindex="-1" size="sm" @click.stop="ok">OK</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, watchEffect, type PropType } from "vue";
import H_popover from "../../Components/H_popover.vue";
import H_btn from "../../Components/H_btn.vue";
import H_dateSelector from "./date/H_dateSelector.vue";
import H_monthTable from "./date/H_monthTable.vue";
import H_dateTable from "./date/H_dateTable.vue";
import H_icon from "../../Components/H_icon.vue";
import { D_01_dec_2021, D_mon_01_dec_2021 } from "../../utils/dateFormat";
import { getDaysArray } from "./date/getDaysArray";

type idato = {
  date: number;
  month: number;
  year: number;
};

const P = defineProps({
  date: { type: Object as PropType<idato | undefined>, default: { date: 0, month: 0, year: 0 } },
  longDate: { default: false, type: Boolean },
  autofocus: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
});
const E = defineEmits(["dateChanged"]);
const dateSelector = useTemplateRef("dateSelector");
const monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DaysArray = ref(getDaysArray(P.date?.year, P.date?.month));
const popupOpen = ref(false);
const dateBase = ref("date");
const tempDate = ref();
let monthLength = 31;

const formattetValueDate = computed(() => {
  if (P.date) {
    if (P.longDate) {
      return D_mon_01_dec_2021(new Date(P.date.year, P.date.month, P.date.date));
    } else {
      return D_01_dec_2021(new Date(P.date.year, P.date.month, P.date.date));
    }
  }
  return "?? ??? ????";
});

watch(
  () => P.date,
  (newDate) => {
    if (!newDate) {
      const d = new Date();
      tempDate.value = { date: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
      return;
    }
    tempDate.value = { ...newDate };
  },
  { immediate: true }
);

watch(dateBase, () => {
  setTimeout(() => {
    dateSelector.value?.$el.focus();
  }, 10);
});

watchEffect(() => {
  DaysArray.value = getDaysArray(tempDate.value.year, tempDate.value.month);
  monthLength = DaysArray.value.filter((d) => d.activeMonth === true).length;
  if (tempDate.value.date > monthLength) {
    tempDate.value.date = monthLength;
  }
});

function toggled(e: boolean) {
  if (e) {
    setTimeout(() => {
      dateSelector.value?.$el.focus();
    }, 10); // Delay to allow focus to be set correctly
  }
}

const close = () => (popupOpen.value = false);
const ok = () => (close(), E("dateChanged", tempDate.value));
const cancel = () => close();

function keyDown(e: KeyboardEvent) {
  if (e.key === "ArrowDown") ArrowDown();
  if (e.key === "ArrowUp") ArrowUp();
  if (e.key === "ArrowLeft") ArrowLeft();
  if (e.key === "ArrowRight") ArrowRight();
  if (e.key === "Enter") Enter();
}

function Enter() {
  setTimeout(() => {
    ok();
  }, 100); // Delay to allow focus to be set correctly
}

function ArrowLeft() {
  if (dateBase.value === "date") {
    dateBase.value = "year";
  } else if (dateBase.value === "month") {
    dateBase.value = "date";
  } else if (dateBase.value === "year") {
    dateBase.value = "month";
  }
}

function ArrowRight() {
  if (dateBase.value === "date") {
    dateBase.value = "month";
  } else if (dateBase.value === "month") {
    dateBase.value = "year";
  } else if (dateBase.value === "year") {
    dateBase.value = "date";
  }
}

function ArrowUp() {
  let maxVal = 9999;
  if (dateBase.value === "month") maxVal = 11;
  if (dateBase.value === "date") maxVal = monthLength;

  if (parseInt(tempDate.value[dateBase.value]) <= maxVal) {
    let val = parseInt(tempDate.value[dateBase.value]) + 1;
    if (dateBase.value === "month" && val > 11) {
      val = 0; // Wrap around for month
    } else if (dateBase.value === "date" && val > monthLength) {
      val = 1; // Wrap around for date
    }

    tempDate.value[dateBase.value] = val;
  }
}

function ArrowDown() {
  if (parseInt(tempDate.value[dateBase.value]) >= 0) {
    let val = parseInt(tempDate.value[dateBase.value]) - 1;

    if (dateBase.value === "month" && val < 0) {
      val = 11; // Wrap around for month
    } else if (dateBase.value === "date" && val < 1) {
      val = monthLength; // Wrap around for date
    }
    tempDate.value[dateBase.value] = val;
  }
}
</script>

<style>
@layer components {
  .H_baseDatePicker {
    padding-inline: 0.2em;
    &:focus {
      background-color: hsl(from var(--color-pri) h s l / 30%);
    }
    .value {
      padding-inline: 0.2em;
      text-align: start;
      width: fit-content;
      text-box-trim: trim-both;
    }
  }

  .H_baseDatePicker__popup {
    border: 1px solid var(--color-bg2);
    .actions {
      gap: 1em;
      padding: 0.7em;
      border-radius: 0 0 4px 4px;
    }
  }
}
</style>
