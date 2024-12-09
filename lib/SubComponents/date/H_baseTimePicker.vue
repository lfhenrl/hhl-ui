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
          <div class="ico-clock text-xs leading-tight group-hover:scale-120" v-if="!hideIcon" />
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
      <div class="rounded bg-bg0 border-bg5 border">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" />
        <div class="flex justify-end gap-4 p-4 border-t border-bg4">
          <H_btn size="sm" @click="cancel" class="col-sec text-sm w-18">CANCEL</H_btn>
          <H_btn size="sm" @click="ok" class="text-sm w-18">OK</H_btn>
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
