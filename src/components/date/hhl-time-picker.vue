<template>
  <div class="hhl-picker" :focused="focused" :readonly="readonly">
    <hhl-pop
      v-model="popupOpen"
      trigger="none"
      offset-when-up="11"
      :no-outside-click="noOutsideClick"
      :no-reference-click="noOutsideClick"
    >
      <template v-slot:reference>
        <div class="flx-inline-row flx-align-center cursor-pointer" @click="onClick">
          <hhl-icon icon="clock" btn v-if="!hideIcon" />
          <div class="hhl-picker_input">
            <input
              :value="formattetTime"
              :size="setSize()"
              @focus="focused = !readonly"
              @blur="focused = false"
              class="hhl-input__input cursor-pointer"
            />
          </div>
        </div>
      </template>
      <div class="col-bg-0 borderRadius-4 shadow-4">
        <hhl-time-table v-model="tempDato" :show-seconds="showSeconds" />
        <div class="flx-row flx-justify-end p-11 border-t borderColor-comp gap-6">
          <hhl-btn size="sm" @click="cancel" class="w-70px col-sec">CANCEL</hhl-btn>
          <hhl-btn size="sm" class="w-70px" @click="ok">OK</hhl-btn>
        </div>
      </div>
    </hhl-pop>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import hhlTimeTable from "./hhl-time-table.vue";

export default defineComponent({
  name: "hhl-time-picker",
  components: {
    hhlTimeTable
  },
  props: {
    time: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
    readonly: { type: Boolean, default: false },
    hideIcon: { default: false, type: Boolean },
    showSeconds: { default: true, type: Boolean },
    noOutsideClick: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const popupOpen = ref(false);
    const focused = ref(false);
    const tempDato = ref({ hour: 0, minute: 0, second: 0 });

    const getZeroInFront = (val: number) => (val < 10 ? "0" + val : val);
    const close = () => (popupOpen.value = false);
    const ok = () => (close(), emit("timeChanged", tempDato.value));
    const cancel = () => close();

    const onClick = () => {
      if (props.readonly) {
        return;
      }
      tempDato.value = { hour: props.time.hour, minute: props.time.minute, second: props.time.second };
      if (popupOpen.value === false || !props.noOutsideClick) {
        popupOpen.value = !popupOpen.value;
      }
    };

    function setSize() {
      if (props.showSeconds) {
        return 4;
      } else {
        return 1;
      }
    }

    const formattetTime = computed(() => {
      const h = getZeroInFront(props.time.hour);
      const m = getZeroInFront(props.time.minute);
      const s = getZeroInFront(props.time.second);
      const showS = props.showSeconds;
      let xxx = `${h}:${m}`;
      if (showS) {
        xxx = `${xxx}:${s}`;
      }
      return xxx;
    });

    return {
      tempDato,
      popupOpen,
      onClick,
      formattetTime,
      ok,
      cancel,
      close,
      setSize,
      focused
    };
  }
});
</script>
