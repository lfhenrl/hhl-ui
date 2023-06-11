import { iChartGantt } from "../common";

import { TimeToPixcel } from "./utils/converter";

export function markerRender(chart: iChartGantt, startTime: Date, title: string, color: string, textColor:string) {
  const left = TimeToPixcel(chart, startTime.valueOf() / 1000);

  const gantt__marker = document.createElement("div");
  const gantt__marker_text = document.createElement("div");

  gantt__marker.classList.add("gantt__Item_marker");
  gantt__marker_text.classList.add("gantt__Item_marker_text");

  gantt__marker_text.textContent = title;


  gantt__marker.style.backgroundColor = color;
  gantt__marker_text.style.backgroundColor = color;
  gantt__marker_text.style.color = textColor;

  gantt__marker.style.left = left + "px";

  gantt__marker.appendChild(gantt__marker_text);

  return gantt__marker;
}
