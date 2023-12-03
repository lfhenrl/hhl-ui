<template>
  <div class="h_timePicker" :focused="focused" :readonly="readonly">
    <H_pop
      v-model="popupOpen"
      trigger="click"
      offset-when-up="11"
      :no-outside-click="noOutsideClick"
      position="fixed"
    >
      <template v-slot:referance>
        <div
          class="h_timePicker__inputcontainer group/time inline-flex cursor-pointer flex-row items-center"
        >
          <H_icon
            icon="clock"
            v-if="!hideIcon"
            class="group-hover/time:scale-110"
          />
          <input
            name="timepicker"
            title="Timepicker"
            :value="formattetTime"
            :size="setSize()"
            readonly
            @focus="focused = !readonly"
            @blur="focused = false"
            class="h_timePicker__input cursor-pointer overflow-hidden bg-transparent pl-1"
          />
        </div>
      </template>
      <div class="h_timePicker__popup rounded border border-bg5 bg-bg0 shadow">
        <H_timeTable v-model="tempDato" :show-seconds="showSeconds" />
        <div
          class="h_timePicker__footer flex justify-end gap-3 border-t border-bg4 p-3"
        >
          <H_btn size="sm" @click="cancel" class="col-sec w-16">CANCEL</H_btn>
          <H_btn size="sm" @click="ok" class="w-16">OK</H_btn>
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

/* const onClick = () => {
  if (props.readonly) {
    return;
  }
  tempDato.value = {
    hour: props.time.hour,
    minute: props.time.minute,
    second: props.time.second,
  };
  if (popupOpen.value === false || !props.noOutsideClick) {
    popupOpen.value = !popupOpen.value;
  }
}; */

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
