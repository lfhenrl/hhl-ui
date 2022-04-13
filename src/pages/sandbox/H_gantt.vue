<template>
  <div ref="H_gantt" class="H_gantt">
    <div class="toolbar">
      <H_btn @click="undo" :disabled="!isDirty" type="icon-text" icon="undo" title="Undo all changes"></H_btn>
      <H_btn @click="save" :disabled="!isDirty" type="icon-text" icon="save" title="Save all changes"></H_btn>
      <div class="toolbarSpacer" />
      <H_btn @click="print" type="icon-text" icon="print" title="Print Gantt"></H_btn>
      <H_btn @click="png" type="icon-text" icon="image" title="Download Gantt as PNG picture"></H_btn>
      <H_btn @click="excel" type="icon-text" icon="excel" title="Download data as CSV"></H_btn>
      <div class="toolbarSpacer" />
      <H_btn @click="toggleFullScreen" type="icon-text" icon="zoom_out_map" title="fullScreen"></H_btn>
      <div class="toolbarSpacer" />
      <div class="toolbarLabel">Resolution:</div>
      <H_select v-model="scale" :select-data="[`Day`, `Week`, `Month`]" hide-filter />
      <div class="toolbarSpacer" />
    </div>
    <H_chartGantt @loaded="ganttLoaded" :scale="scale" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { printDom, savePng } from "../../../lib/utils/printAndPng";
import { iH_chartGantt } from "../../../lib/Components/charts/gantt/H_chartGanttTypes";
import Excel from "../../../lib/utils/exportToExcel";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDVLgsLMzFU58GDPXgsS_wiQGOtzOV5K3k",
  authDomain: "style-guide-657d4.firebaseapp.com",
  projectId: "style-guide-657d4",
  storageBucket: "style-guide-657d4.appspot.com",
  messagingSenderId: "558687596971",
  appId: "1:558687596971:web:72ec63af8f3bb1eaa322ee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const scale = ref<any>("Day");
const H_gantt = ref();
const data = ref<any>({});
const isDirty = ref(false);
let gantt: iH_chartGantt;
const fData = doc(db, "ganttData/1");

watch(
  data,
  () => {
    isDirty.value = true;
  },
  { deep: true }
);

async function ganttLoaded(d: any) {
  gantt = d;
  getData();
}

async function getData() {
  const dataSnapShot = await getDoc(fData);
  data.value = await dataSnapShot.data();
  gantt.data.newData(data.value);
  setTimeout(() => {
    isDirty.value = false;
  });
}

function save() {
  gantt.data.validateConnectors();
  setDoc(fData, data.value)
    .then(() => hhl.alert("info", "Data Saved", ""))
    .catch((reason: any) => hhl.alert("err", "Something went wrong!", reason));
  setTimeout(() => {
    isDirty.value = false;
  }, 50);
}

function undo() {
  getData();
}

function print() {
  printDom(gantt.dom);
}

function png() {
  savePng(gantt.dom);
}

function excel() {
  Excel.load(gantt.data.getFlatList(), gantt.data.listFields, "GanttData");
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    H_gantt.value.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>

<style>
.H_gantt {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 90vh;
}
.toolbar {
  display: flex;
  align-items: center;
  background-color: var(--col-bg-2);
  margin-bottom: 1px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.toolbarLabel {
  font-size: 0.85em;
  margin-right: 4px;
}

.toolbarSpacer {
  height: 80%;
  width: 1px;
  background-color: var(--col-pri);
  margin: 0 16px;
}

.toolbar .H_select {
  max-width: 90px;
  margin-top: 2px;
  margin-right: 4px;
}
.toolbar .H_select .H_inputBase__fieldset {
  max-height: 24px;
  min-width: 50px;
  /* border-color: var(--col-pri); */
}
</style>
