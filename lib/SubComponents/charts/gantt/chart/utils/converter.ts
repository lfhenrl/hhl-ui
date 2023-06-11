import { iChartGantt } from "../../common";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

export function TimeToPixcel(chart: iChartGantt, time: number) {
  const { startDate, secPixcel } = chart;
  const seconds = time - startDate;
  return seconds * secPixcel;
}

export function measureText(text: string, font: any) {
  if (!canvas) {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d")!;
  }
  context.font = font;
  const { width } = context.measureText(text);
  return width;
}

export function PixcelToTime(chart: iChartGantt, pixel: number) {
  return pixel / chart.secPixcel + chart.startDate;
}

export function adjustToHoleDay(chart: iChartGantt, pixel: number) {
  return Math.round(pixel / chart.secPixcel / 86400) * 86400 * chart.secPixcel;
}

export function dateFromSeconds(seconds: number) {
  return new Date(seconds * 1000);
}

export function secondsFromDate(date: Date) {
  return date.valueOf() / 1000;
}

export function sumWorkDays(arr: any) {
  let workDays = 0;
  let workDaysDone = 0;
  arr.forEach((item: any) => {
    workDays = workDays + item.workDays;
    workDaysDone = workDaysDone + item.workDaysDone;
  });
  return {
    workDays,
    workDaysDone
  }
}

export function MinMaxDatesFromArray(arr: any) {
  let min = 4112719200;
  let max = 0;
  arr.forEach((item: any) => {
    min = Math.min(min, item.startTime);
    max = Math.max(max, item.endTime);
  });

  return {
    Min: min,
    Max: max
  };
}
