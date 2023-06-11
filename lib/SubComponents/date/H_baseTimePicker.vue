<template>
  <div class="h_timePicker" :focused="focused" :readonly="readonly">
    <H_pop v-model="popupOpen" trigger="none" offset-when-up="11" :no-outside-click="noOutsideClick" position="fixed">
      <template v-slot:referance>
        <div class="h_timePicker__inputcontainer" @click="onClick">
          <H_icon icon="clock" v-if="!hideIcon" />
          <input
            :value="formattetTime"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="h_timePicker__input"
          />
        </div>
      </template>
      <div class="h_timePicker__popup shadow-5">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" />
        <div class="h_timePicker__footer">
          <H_btn size="sm" @click="cancel" class="col-sec">CANCEL</H_btn>
          <H_btn size="sm" @click="ok">OK</H_btn>
        </div>
      </div>
    </H_pop>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import H_pop from "../../Components/popup/H_pop.vue";
import H_icon from "../../Components/H_icon.vue";
import H_btn from "../../Components/H_btn.vue";
import H_timeTable from "./H_timeTable.vue";

const props = defineProps({
  time: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  readonly: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
  showSeconds: { default: true, type: Boolean },
  noOutsideClick: { type: Boolean, default: false }
});

const emit = defineEmits(["timeChanged"]);

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
</script>

<style>
.h_timePicker {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.h_timePicker__inputcontainer {
  flex-direction: row;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.h_timePicker__inputcontainer:hover .h_icon {
  transform: scale(1.25);
}

.h_timePicker__inputcontainer .h_icon {
  transition: transform 0.2s ease-out;
  --h_icon-size: 1.4em;
  opacity: 0.7;
}

.h_timePicker__input {
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  padding: 0.45em 0.1em 0.45em 0.2em;
  background-color: transparent;
  cursor: pointer;
  border: none;
  overflow: hidden;
  appearance: none;
  outline: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: currentColor;
}

.h_timePicker__popup {
  border-radius: 4px;
  background-color: var(--col-bg-0);
  border: solid 1px var(--col-txt-5);
}

.h_timePicker__footer {
  font-family: var(--comp-font-family);
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  padding: 11px;
  border-top: solid 1px var(--comp-border-color);
}

.h_timePicker__footer .h_btn {
  width: 70px;
}
</style>
