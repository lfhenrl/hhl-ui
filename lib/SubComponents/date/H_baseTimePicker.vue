<template>
  <div :focused="focused" :readonly="readonly">
    <H_popover
      v-model="popupOpen"
      trigger="click"
      :offset-top="8"
      :modal="noOutsideClick"
      :readonly="readonly"
      class="flex items-center"
    >
      <template v-slot:referance>
        <div class="group inline-flex items-center cursor-pointer h-full" title="Timepicker">
          <H_icon name="clock" size="1.1rem" color="txt1" v-if="!hideIcon" />
          <input
            name="timepicker"
            title="Timepicker"
            :value="formattetTime"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            style="margin-bottom: 1px"
            class="overflow-hidden cursor-pointer text-xm text-txt1 focus:outline-none leading-tight bg-transparent border-none appearance-none mb-px ml-1"
          />
        </div>
      </template>
      <div @click.stop class="rounded bg-bg0 border-bg5 border">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" :isopen="popupOpen" />
        <div class="flex justify-end gap-4 p-4 border-t border-bg4">
          <H_btn size="sm" @click.stop="cancel" class="col-sec text-sm w-18">CANCEL</H_btn>
          <H_btn size="sm" @click.stop="ok" class="text-sm w-18">OK</H_btn>
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
import H_icon from "../../Components/H_icon.vue";

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
