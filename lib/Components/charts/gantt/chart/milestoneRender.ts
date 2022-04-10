import { iGanttItem } from "./ganttItem";
import { TimeToPixcel } from "./utils/converter";

export function milestoneRender(item: iGanttItem) {
  item.bar.innerHTML = "";
  const { barHeight } = item.chart;

  item.l = TimeToPixcel(item.chart, item.data.startTime);
  item.w = TimeToPixcel(item.chart, item.data.endTime) - item.l;
  item.t = item.index * barHeight;

  const gantt__Item = document.createElement("div");
  const gantt__Item_diamond = document.createElement("div");
  const gantt__Item_bar_text = document.createElement("div");
  const gantt__Item_bar_connectLeft = document.createElement("div");
  const gantt__Item_bar_connectRight = document.createElement("div");

  gantt__Item.classList.add("gantt__Item");
  gantt__Item.classList.add(item.chart.dg.SelectClassName);
  gantt__Item.style.top = item.t + "px";
  gantt__Item.dataset.id = item.id.toString();

  item.bar.classList.add("gantt__Item_bar");
  item.bar.classList.add("gantt__Item_milestone");

  gantt__Item_diamond.classList.add("gantt__Item_milestone_diamond");

  item.bar.dataset.id = item.id.toString();
  item.bar.style.left = item.l + "px";

  gantt__Item_bar_text.classList.add("gantt__Item_milestone_text");
  gantt__Item_bar_text.textContent = item.data.text;

  gantt__Item_bar_connectLeft.classList.add("gantt__Item_bar_connectLeft");
  gantt__Item_bar_connectLeft.dataset.id = item.id.toString();

  gantt__Item_bar_connectRight.classList.add("gantt__Item_bar_connectRight");
  gantt__Item_bar_connectRight.dataset.id = item.id.toString();

  item.bar.appendChild(gantt__Item_diamond);
  item.bar.appendChild(gantt__Item_bar_text);
  item.bar.appendChild(gantt__Item_bar_connectLeft);
  item.bar.appendChild(gantt__Item_bar_connectRight);
  gantt__Item.appendChild(item.bar);
  return gantt__Item;
}
