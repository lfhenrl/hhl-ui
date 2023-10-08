<template>
  <H_dialog :modelValue="show" class="gantt_edit">
    <template #header>{{ data.subType }}</template>
    <div class="gantt_edit_container">
      <H_inputText label="Title" v-model="data.text" />
      <div class="gantt_edit_row" v-if="data.type !== 'group'">
        <H_datePicker label="Start time" v-model="data.startTime" type="date" />
        <H_datePicker
          label="End time"
          v-model="data.endTime"
          type="date"
          :validator="[dateOk]"
          @isValid="isValid_date = $event"
        />
      </div>
      <div class="gantt_edit_row" v-if="data.type !== 'group'">
        <H_inputNumber label="Work days" v-model="workload" min="1" />
        <H_inputNumber
          label="Work load"
          v-model="data.workLoad"
          max="100"
          min="0"
        />
      </div>
      <H_slider v-model="data.progress" min="0" max="100" />
    </div>
    <template #footer>
      <div class="gantt_edit_footer">
        <H_btn @click="remove" class="col-warn">Delete</H_btn>
        <div class="flex-1" />
        <H_btn @click="cancel" class="col-sec">Cancel</H_btn>
        <H_btn @click="save" :disabled="!isChanged && !isValid_date"
          >Save</H_btn
        >
      </div>
    </template>
  </H_dialog>
</template>

<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from "vue";
import {
  DateDiffDays,
  DateAddDays,
  DateGetToday,
} from "../../../../utils/dateFunctions";
import { iChartGantt } from "../common";
import H_inputText from "../../../../Components/H_inputText.vue";
import H_inputNumber from "../../../../Components/H_inputNumber.vue";
import H_btn from "../../../../Components/H_btn.vue";
import H_datePicker from "../../../../Components/H_datePicker.vue";
import {
  dateFromSeconds,
  secondsFromDate,
  TimeToPixcel,
} from "../chart/utils/converter";

const props = defineProps({
  activeId: { type: String, default: "" },
  show: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);

const gantt = inject("gantt") as iChartGantt;
const isChanged = ref(false);
const isValid_date = ref(true);
let item: any = {};
let itemBar: any = {};

const data = reactive({
  id: "",
  workLoadtext: "",
  text: "",
  type: "",
  subType: "",
  workLoad: 100,
  progress: 100,
  startTime: DateGetToday(),
  endTime: DateAddDays(DateGetToday(), 11),
});

watch(
  () => data,
  () => {
    isChanged.value = true;
  },
  { deep: true },
);

watch([() => props.activeId, () => props.show], () => {
  if (props.show === false) return;
  item = gantt.ganttData.dataStore[props.activeId].data;
  itemBar = gantt.ganttData.dataStore[props.activeId].bar;
  data.id = item.id;
  data.text = item.text;
  data.workLoad = item.workLoad;
  data.progress = item.progress;
  data.type = item.type;
  data.subType = item.subType;
  data.startTime = dateFromSeconds(item.startTime);
  data.endTime = dateFromSeconds(item.endTime);
  setTimeout(() => (isChanged.value = false));
});

const workload = computed<number>({
  get() {
    const t = DateDiffDays(data.startTime, data.endTime);
    return t;
  },
  // setter
  set(newValue) {
    data.endTime = DateAddDays(data.startTime, parseInt(newValue.toString()));
  },
});

function dateOk(value: Date) {
  if (data.startTime < value) return true;
  return "EndDate should be after startdate";
}

function cancel() {
  emit("close", "cancel");
}

function save() {
  emit("close", "save");
  item.text = data.text;
  item.workLoad = data.workLoad;
  item.progress = data.progress;
  item.subType = data.subType;
  item.startTime = secondsFromDate(data.startTime);
  item.endTime = secondsFromDate(data.endTime);
  itemBar.l = TimeToPixcel(itemBar.chart, item.startTime);
  itemBar.w = TimeToPixcel(itemBar.chart, item.endTime) - itemBar.l;
  itemBar.updateData();
  gantt.ganttData.makeGridData();
  gantt.ganttData.renderChart();
}

function remove() {
  hhl
    .dialog("Delete", `Are you sure you will delete?...`)
    .then(() => {
      const parent = gantt.ganttData.dataStore[item.pId];
      const index = parent.data.children.indexOf(item);
      if (index < 0) return;
      parent.data.children.splice(index, 1);
      delete gantt.ganttData.dataStore[props.activeId];
      const connectors = gantt.ganttData.connectors;
      for (const c in connectors) {
        const conn = connectors[c];
        if (conn.to === props.activeId || conn.from === props.activeId) {
          delete connectors[c];
        }
      }
      gantt.ganttData.makeGridData();
      gantt.ganttData.renderChart();
      emit("close", "delete");
    })
    .catch(() => {
      return;
    });
}
</script>

<style>
.gantt_edit .H_dialog {
  background-color: var(--col-bg-1);
  /* width: 400px; */
}

.gantt_edit_container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.gantt_edit_row {
  display: flex;
  gap: 20px;
}

.gantt_edit_footer {
  display: flex;
  gap: 20px;
  padding: 0 10px;
}

.gantt_edit_footer .H_btn {
  width: 80px;
}
</style>
