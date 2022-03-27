import { iChartGantt } from "../../common";
import { iGanttItem } from "../ganttItem";

export function TimeToPixcel(chart: iChartGantt, time: Date) {
  const { startDate, secPixcel } = chart;
  const seconds = (time.valueOf() - startDate.valueOf()) / 1000;
  return seconds * secPixcel;
}

export function PixcelToTime(chart: iChartGantt, pixel: number) {
  return new Date((pixel / chart.secPixcel) * 1000 + chart.startDate.valueOf());
}

export function MinMaxDatesFromArray(arr: Array<iGanttItem>) {
     let min = new Date(3300, 1, 1).valueOf();
     let max = new Date(0).valueOf();
     arr.forEach((item: any) => {
       min = Math.min(min, item.startTime.valueOf());
       max = Math.max(max, item.endTime.valueOf());
     });

     return {
       Min: new Date(min),
       Max: new Date(max)
     }
}
