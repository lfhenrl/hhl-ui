<template>
  <div :focused="focused" :readonly="readonly">
    <H_popover
      v-model="popupOpen"
      trigger="click"
      :offset-top="8"
      :modal="noOutsideClick"
      position="fixed"
      :readonly="readonly"
    >
      <template v-slot:referance>
        <div class="H_timePicker__inputcontainer">
          <div class="ico-clock text-xs mt-[1px]" v-if="!hideIcon" />
          <input
            name="timepicker"
            title="Timepicker"
            :value="formattetTime"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="H_timePicker__input focus:outline-none"
          />
        </div>
      </template>
      <div class="H_timePicker__popup">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" />
        <div class="H_timePicker__footer">
          <H_btn size="sm" @click="cancel" class="col-sec text-sm">CANCEL</H_btn>
          <H_btn size="sm" @click="ok" class="text-sm">OK</H_btn>
        </div>
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import H_popover from "../../Components/H_popover.vue";
import H_btn from "../../Components/H_btn.vue";
import H_timeTable from "./H_timeTable.vue";

const props = defineProps({
  time: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  readonly: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
  showSeconds: { default: true, type: Boolean },
  noOutsideClick: { type: Boolean, default: false },
});

const emit = defineEmits(["timeChanged"]);

const popupOpen = ref(false);
const focused = ref(false);
const tempDato = ref({ hour: 0, minute: 0, second: 0 });

const getZeroInFront = (val: number) => (val < 10 ? "0" + val : val);
const close = () => (popupOpen.value = false);
const ok = () => (close(), emit("timeChanged", tempDato.value));
const cancel = () => close();

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
</script>
<style>
@layer components {
  .H_timePicker__inputcontainer {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .H_timePicker__input {
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    padding-left: 4px;
    color: var(--color-txt1);
    border: none;
  }
  .H_timePicker__popup {
    border-radius: 4px;
    background-color: var(--color-bg0);
    border: 1px solid var(--color-bg5);
  }
  .H_datePicker__header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg5);
    padding: 4px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-txt1);
  }
  .H_timePicker__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid var(--color-bg4);
    padding: 12px;
  }

  .H_timePicker__footer .H_btn {
    width: 64px;
  }
}
</style>
