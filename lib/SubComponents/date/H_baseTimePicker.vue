<template>
  <H_popover
    v-model="popupOpen"
    offset-top="8px"
    :readonly="readonly"
    :autofocus
    :solo
    title="Timepicker"
    class="H_baseTimePicker"
    :class="{ solo: solo }"
    @toggled="toggled"
  >
    <template v-slot:referance>
      <H_icon name="clock" class="H_baseTimePicker_input_icon" v-if="!hideIcon" tabindex="-1" />
      <span class="H_baseTimePicker_input_value">{{ showTime }}</span>
    </template>

    <div class="H_baseTimePicker__popup" @keydown="keyDown" @click.prevent>
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
      <div class="H_baseTimePicker__popup_actions">
        <H_btn tabindex="-1" h-font-size="sm" h-color="var(--color-sec)" @click.stop="cancel">CANCEL</H_btn>
        <H_btn tabindex="-1" h-font-size="sm" @click.stop="ok">OK</H_btn>
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
const tempTime: any = ref({ hour: "09", minute: "11", second: "22" });
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
    border-radius: 4px;
    padding: 0 0.2em;
  }
  .H_baseTimePicker.solo:focus {
    background-color: hsl(from var(--color-pri) h s l / 30%);
  }

  .H_baseTimePicker_input_icon {
    color: var(--color-txt2);
  }

  .H_baseTimePicker_input_value {
    width: fit-content;
    padding: 0 0.2em;
    text-align: left;
    white-space: nowrap;
    text-box-trim: trim-both;
  }

  .H_baseTimePicker__popup {
    border: 1px solid var(--color-bg2);
    border-radius: 4px;
    background-color: var(--color-bg6);
  }

  .H_baseTimePicker__popup_actions {
    display: flex;
    justify-content: end;
    background-color: var(--color-bg4);
    gap: 1em;
    padding: 0.7em;
    border-radius: 0 0 4px 4px;
  }
}
</style>
