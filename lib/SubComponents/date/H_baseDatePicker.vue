<template>
  <div :focused :readonly="readonly">
    <H_popover
      v-model="popupOpen"
      offset-top="8px"
      :readonly="readonly"
      :autofocus
      title="Datepicker"
      class="H_baseDatePicker"
    >
      <template v-slot:referance>
        <H_icon name="event" size="1.2em" color="txt1" v-if="!hideIcon" tabindex="-1" />
        <span class="value">{{ formattetValueDate }}</span>
      </template>

      <div @click.stop class="H_baseDatePicker__popup">
        <div class="header">
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
        <div class="actions">
          <H_btn tabindex="-1" @click.stop="cancel" size="sm" color="sec">CANCEL</H_btn>
          <H_btn tabindex="-1" @click.stop="ok" size="sm">OK</H_btn>
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
import H_icon from "../../Components/H_icon.vue";

const props = defineProps({
  modelValue: { type: Date, default: null },
  autofocus: { type: Boolean, default: false },
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
    return 11;
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
<style>
@layer components {
  .H_baseDatePicker {
    display: flex;
    align-items: center;
    padding-inline: 0.2em;
    outline-style: none;
    border-radius: 4px;

    &:focus {
      background-color: hsl(from var(--color-pri) h s l / 30%);
    }

    .value {
      padding-inline: 0.2em;
      text-align: start;
      width: fit-content;
      line-height: 1.1;
    }
  }

  .H_baseDatePicker__popup {
    background-color: var(--color-bg5);
    border-radius: 4px;
    padding-inline: 0.2em;

    .header {
      display: flex;
      align-items: center;
      color: var(--color-txt1);
      font-size: 1.2em;
      font-weight: bold;
      justify-content: center;
      padding: 0.25em;
      border-bottom: 1px solid var(--color-txt6);
    }
    .actions {
      display: flex;
      justify-content: end;
      gap: 1em;
      padding: 1em;
      border-top: 1px solid var(--color-txt6);
    }
  }
}
</style>
