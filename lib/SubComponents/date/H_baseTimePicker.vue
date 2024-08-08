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
          <H_icon icon="clock" size="20px" v-if="!hideIcon" />
          <input
            name="timepicker"
            title="Timepicker"
            :value="formattetTime"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="H_timePicker__input"
          />
        </div>
      </template>
      <div class="H_timePicker__popup">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" />
        <div class="H_timePicker__footer">
          <H_btn size="sm" @click="cancel" class="col-sec">CANCEL</H_btn>
          <H_btn size="sm" @click="ok">OK</H_btn>
        </div>
      </div>
    </H_popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import H_popover from "../../Components/H_popover.vue";
import H_icon from "../../Components/H_icon.vue";
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
@layer hhl-components {
  .H_timePicker__inputcontainer {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .H_timePicker__inputcontainer .H_icon {
    color: var(--col-txt-3);
  }

  .H_timePicker__inputcontainer:hover .H_icon {
    scale: 1.2;
  }

  .H_timePicker__input {
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    padding-left: 4px;
    color: var(--col-txt-1);
    border: none;
  }
  .H_timePicker__popup {
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
  .H_timePicker__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid var(--col-bg-4);
    padding: 12px;
  }

  .H_timePicker__footer .H_btn {
    width: 64px;
  }
}
</style>
