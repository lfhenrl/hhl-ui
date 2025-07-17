<template>
  <H_popover
    v-model="popupOpen"
    offset-top="8px"
    :readonly="readonly"
    :autofocus
    :solo
    title="Timepicker"
    class="H_baseTimePicker"
  >
    <template v-slot:referance>
      <H_icon name="clock" size="1.2em" color="txt1" v-if="!hideIcon" tabindex="-1" />
      <span class="value">{{ formattetTime }}</span>
    </template>

    <div @click.stop class="H_baseTimePicker__popup">
      <H_timeTable v-model="tempDato" :show-seconds="showSeconds" :isopen="popupOpen" />
      <div class="actions bg-bg4">
        <H_btn tabindex="-1" size="sm" color="sec" @click.stop="cancel">CANCEL</H_btn>
        <H_btn tabindex="-1" size="sm" @click.stop="ok">OK</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import H_popover from "../../Components/H_popover.vue";
import H_btn from "../../Components/H_btn.vue";
import H_timeTable from "./H_timeTable.vue";
import H_icon from "../../Components/H_icon.vue";

const props = defineProps({
  time: { type: Object, default: { hour: 0, minute: 0, second: 0 } },
  autofocus: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  solo: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
  showSeconds: { default: true, type: Boolean },
  noOutsideClick: { type: Boolean, default: false },
});

const emit = defineEmits(["timeChanged"]);

const popupOpen = ref(false);
const focused = ref(false);
const tempDato = computed(() => props.time);

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
  .H_baseTimePicker {
    display: flex;
    align-items: center;
    padding-inline: 0.2em;
    outline-style: none;
    border-radius: 4px;

    [solo="false"]&:focus {
      background-color: hsl(from var(--color-pri) h s l / 30%);
    }

    .value {
      padding-inline: 0.2em;
      text-align: start;
      width: fit-content;
      line-height: 1.1;
    }
  }

  .H_baseTimePicker__popup {
    background-color: var(--color-bg5);
    border: 1px solid var(--color-bg2);
    border-radius: 4px;
    .actions {
      display: flex;
      justify-content: end;
      gap: 1em;
      padding: 0.7em;
      border-radius: 0 0 4px 4px;
    }
  }
}
</style>
