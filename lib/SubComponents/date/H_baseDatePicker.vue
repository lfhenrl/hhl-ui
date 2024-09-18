<template>
  <div :focused="focused" :readonly="readonly">
    <H_popover v-model="popupOpen" :offset-top="8" :readonly="readonly">
      <template v-slot:referance>
        <div class="H_datePicker__inputcontainer" title="Datepicker" tabindex="0">
          <H_icon icon="event" size="20px" v-if="!hideIcon" tabindex="-1" />
          <input
            name="datepicker"
            title="Datepicker"
            :value="formattetValueDate"
            :size="setSize()"
            tabindex="-1"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="H_datePicker__input focus:outline-none"
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
          <H_btn tabindex="3" size="sm" @click="cancel" class="col-sec">CANCEL</H_btn>
          <H_btn tabindex="0" size="sm" @click="ok">OK</H_btn>
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
<style>
@layer hhl-components {
  .H_datePicker__inputcontainer {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .H_datePicker__inputcontainer .H_icon {
    color: var(--col-txt-3);
    width: 20px;
  }

  .H_datePicker__inputcontainer:hover .H_icon {
    scale: 1.2;
  }

  .H_datePicker__input {
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    padding-left: 4px;
    color: var(--col-txt-1);
    /*     border: none; */
  }
  .H_datePicker__popup {
    border-radius: 4px;
    background-color: var(--col-bg-0);
    border: 1px solid var(--col-bg-5);
  }
  .H_datePicker__header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--col-bg-5);
    padding: 4px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--col-txt-1);
  }
  .H_datePicker__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid var(--col-bg-4);
    padding: 12px;
  }

  .H_datePicker__footer .H_btn {
    width: 64px;
  }
}
</style>
