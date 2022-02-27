<template>
  <div class="canvasTime">
    <canvas ref="canvasTime" class="canvasTime_canvas" />
    <canvas ref="canvasContent" class="canvasContent" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DateDiffDays } from "../../../lib/utils/dateFunctions";
const canvasTime = ref<HTMLCanvasElement>();
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let totalWidth = 0;
let GridWidth = 20;
let GridTimeHeight = 16;
let GridHeight = 20;
const startDate = new Date(2021, 11, 27, 0);
const endDate = new Date(2023, 1, 5);
const monthNames = [
  "January",
  "Febuary",
  "Marts",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function makeGridLodret(antal: number, height: number) {
  var left = GridWidth;
  ctx.moveTo(0, GridTimeHeight);
  ctx.lineTo(0, height);

  for (let i = 0; i < antal; i++) {
    ctx.moveTo(left, GridTimeHeight);
    ctx.lineTo(left, height);
    left = left + GridWidth;
  }
}

function makeGridVandret(antal: number) {
  let top = GridTimeHeight;
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(0, 0);
  ctx.lineTo(totalWidth, 0);

  ctx.moveTo(0, top);
  ctx.lineTo(totalWidth, top);
  top = top + GridTimeHeight;

  ctx.moveTo(0, top);
  ctx.lineTo(totalWidth, top);
  top = top + GridHeight;

  for (let i = 1; i <= antal; i++) {
    ctx.moveTo(0, top);
    ctx.lineTo(totalWidth, top);
    top = top + GridHeight;
  }
}

function makeScale(height: number) {
  let left = 10;
  const months = [];
  let oldMonth = startDate.getMonth();
  let oldYear = startDate.getFullYear();
  let days = 0;
  for (var d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
    const day = d.getDate().toString();
    const month = d.getMonth();
    ctx.fillText(day, left, GridTimeHeight * 1.75);
    left = left + GridWidth;
    if (month !== oldMonth) {
      const m = {
        year: oldYear,
        month: oldMonth,
        days: days
      };
      months.push(m);

      days = 0;
    }
    oldMonth = month;
    oldYear = d.getFullYear();
    days = days + 1;
  }

  const lastItem = months.slice(-1)[0];
  if (lastItem.month !== oldMonth) {
    const m = {
      year: oldYear,
      month: oldMonth,
      days: days
    };
    months.push(m);
  }

  const mTop = GridTimeHeight * 0.75;
  let runningWidth = 0;
  console.log("months", months);

  ctx.moveTo(0, 0);
  ctx.lineTo(0, GridTimeHeight);
  months.forEach((item) => {
    const header = `${monthNames[item.month]} ${item.year}`;
    const mWidth = item.days * GridWidth;
    runningWidth = runningWidth + mWidth;
    ctx.moveTo(runningWidth, 0);
    ctx.lineTo(runningWidth, height);
    if (item.days > 3) {
      ctx.fillText(header, runningWidth - mWidth / 2, mTop);
    }
  });
}

onMounted(() => {
  const ratio = Math.ceil(window.devicePixelRatio);
  const totalLodretLines = DateDiffDays(startDate, endDate);
  totalWidth = totalLodretLines * 20;
  canvas = canvasTime.value!;
  const width = totalWidth;
  const height = 2 * GridTimeHeight + 5 * GridHeight + 5;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx = canvas.getContext("2d")!;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  ctx.lineWidth = 0.16;
  ctx.font = "10px Arial";
  ctx.textAlign = "center";
  makeGridVandret(5);
  makeGridLodret(totalLodretLines, height - 5);
  makeScale(height - 5);
  ctx.stroke();

  // ctx.fillText("Januar 2022", 300, GridTimeHeight * 0.75);
});
</script>

<style>
.canvasTime {
  position: relative;
  margin: 10px;
  /* height: 80vh; */
  /* border: 1px solid red; */
  overflow: hidden;
}

.canvasTime {
  padding: 0;
  overflow: auto;
}

.canvasContent {
  position: absolute;
  border: 1px solid red;
}
</style>
