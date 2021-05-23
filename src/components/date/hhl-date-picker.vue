<template>
  <div class="hhl-picker flx-inline-row" :focused="focused" :readonly="readonly">
    <hhl-pop
      v-model="popupOpen"
      trigger="none"
      offset-when-up="11"
      :no-outside-click="noOutsideClick"
      :no-reference-click="noOutsideClick"
    >
      <template v-slot:reference>
        <div class="flx-inline-row flx-align-center cursor-pointer" @click="onClick">
          <hhl-icon icon="event" btn v-if="!hideIcon" class="mr-3" />
          <div class="hhl-picker_input">
            <input
              :value="formattetValueDate"
              :size="setSize()"
              @focus="focused = !readonly"
              @blur="focused = false"
              class="hhl-input__input cursor-pointer"
            />
          </div>
        </div>
      </template>
      <div class="col-bg-0 borderRadius-4 shadow-4">
        <div class="hhl-dt-picker__header txt-center txt-bold p-8">
          {{ formattetTempDate }}
        </div>
        <hhl-date-table
          v-show="activeView == 'day'"
          v-model:tempDatomy="tempDatomy"
          v-model="tempDato"
          @update:tempDatomy="tempDatomy = $event"
          @month-click="activeView = 'month'"
        />
        <hhl-month-table v-show="activeView == 'month'" v-model="tempDatomy" @month-selected="activeView = 'day'" />
        <div class="flx-row flx-justify-end p-11 border-t borderColor-comp gap-6">
          <hhl-btn size="sm" @click="cancel" class="w-70px col-sec">CANCEL</hhl-btn>
          <hhl-btn size="sm" class="w-70px" @click="ok">OK</hhl-btn>
        </div>
      </div>
    </hhl-pop>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import hhlDateTable from "./hhl-date-table.vue";
import hhlMonthTable from "./hhl-month-table.vue";
import { D_01_dec_2021, D_mon_01_dec_2021 } from "../utils/dateFormat";
import { DateGetToday } from "../utils/dateFunctions";

export default defineComponent({
  name: "hhl-date-picker",
  components: {
    hhlDateTable,
    hhlMonthTable
  },
  props: {
    modelValue: { type: Date, default: null },
    readonly: { type: Boolean, default: false },
    hideIcon: { default: false, type: Boolean },
    longDate: { default: false, type: Boolean },
    noOutsideClick: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
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

    return {
      popupOpen,
      tempDato,
      tempDatomy,
      onClick,
      ok,
      cancel,
      setSize,
      formattetValueDate,
      formattetTempDate,
      activeView,
      focused
    };
  }
});
</script>
