<template>
  <H_popover
    v-model="popupOpen"
    offset-top="8px"
    :readonly="readonly"
    :autofocus
    :solo
    title="Timepicker"
    class="H_baseTimePicker"
    @toggled="toggled"
  >
    <template v-slot:referance>
      <H_icon name="clock" size="1.2em" color="txt1" v-if="!hideIcon" tabindex="-1" />
      <span class="value">{{ showTime }}</span>
    </template>

    <div class="H_baseTimePicker__popup" @keydown="keyDown">
      <H_timeSelector
        ref="timeSelector"
        tabindex="0"
        :showSeconds
        :time="tempTime"
        :time-base="timeBase"
        @base-changed="(e) => (timeBase = e)"
      />
      <H_timeTable
        :showSeconds
        v-model="tempTime"
        :time-base="timeBase"
        @base-changed="(e) => (timeBase = e)"
        tabindex="-1"
      ></H_timeTable>
      <div class="actions bg-bg4">
        <H_btn tabindex="-1" size="sm" color="sec" @click.stop="cancel">CANCEL</H_btn>
        <H_btn tabindex="-1" size="sm" @click.stop="ok">OK</H_btn>
      </div>
    </div>
  </H_popover>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";
import H_popover from "../../Components/H_popover.vue";
import H_btn from "../../Components/H_btn.vue";
import H_timeSelector from "./time/H_timeSelector.vue";
import H_timeTable from "./time/H_timeTable.vue";
import H_icon from "../../Components/H_icon.vue";

const P = defineProps({
  time: { type: Object, default: { hour: "09", minute: "11", second: "22" } },
  autofocus: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  solo: { type: Boolean, default: false },
  hideIcon: { default: false, type: Boolean },
  showSeconds: { default: true, type: Boolean },
});
const E = defineEmits(["timeChanged"]);
const timeSelector = useTemplateRef("timeSelector");
const popupOpen = ref(false);
const timeBase = ref("hour");
const tempTime = ref({ ...P.time });
const showTime = computed(() => `${P.time.hour}:${P.time.minute}${P.showSeconds ? `:${P.time.second}` : ""}`);

watch(
  () => P.time,
  (newTime) => {
    tempTime.value = { ...newTime };
  },
  { immediate: true }
);

function toggled(e: boolean) {
  if (e) {
    setTimeout(() => {
      timeSelector.value?.$el.focus();
    }, 10); // Delay to allow focus to be set correctly
  }
}

const close = () => (popupOpen.value = false);
const ok = () => (close(), E("timeChanged", tempTime.value));
const cancel = () => close();

function keyDown(e: KeyboardEvent) {
  console.log("key", e.key);
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
  console.log("ArrowLeft");
  if (timeBase.value === "hour") {
    timeBase.value = P.showSeconds ? "second" : "minute";
  } else if (timeBase.value === "minute") {
    timeBase.value = "hour";
  } else if (timeBase.value === "second") {
    timeBase.value = "minute";
  }
}

function ArrowRight() {
  if (timeBase.value === "hour") {
    timeBase.value = "minute";
  } else if (timeBase.value === "minute") {
    timeBase.value = P.showSeconds ? "second" : "hour";
  } else if (timeBase.value === "second") {
    timeBase.value = "hour";
  }
}

function ArrowUp() {
  let maxVal = 59;
  let val = parseInt(tempTime.value[timeBase.value]);
  if (timeBase.value === "hour") maxVal = 23;
  if (val < maxVal) {
    val += 1;
  } else {
    val = 0;
  }
  tempTime.value[timeBase.value] = Number(val).toString().padStart(2, "0");
}
function ArrowDown() {
  let maxVal = 59;
  let val = parseInt(tempTime.value[timeBase.value]);
  if (timeBase.value === "hour") maxVal = 23;
  if (val > 0) {
    val -= 1;
  } else {
    val = maxVal;
  }
  tempTime.value[timeBase.value] = Number(val).toString().padStart(2, "0");
}
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
      text-wrap: nowrap;
      text-box-trim: trim-both;
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
