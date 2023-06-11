import { iChartGantt } from "../common";
import { iGanttItem } from "./ganttItem";

let offSetTop = 0;
export function ganttConnectChange(line: SVGPolylineElement, source: iGanttItem, target: iGanttItem) {
  offSetTop = source.chart.barHeight / 2;
  const { sX, sY, eX, eY } = getStartPoints(source, target);
  const points: any = getPoints(sX, sY, eX, eY);
  line.setAttribute("points", points);
}

export function ganttConnectRender(chart: iChartGantt, source: iGanttItem, target: iGanttItem, id: string) {
  offSetTop = source.chart.barHeight / 2;
  const { sX, sY, eX, eY } = getStartPoints(source, target);
  const points = getPoints(sX, sY, eX, eY);
  const line = draw(chart.chartSvg, points, id);
  const d = { to: target.id, from: source.id };
  const dd = { to: target.id, from: source.id, line: line };
  source.toConnectors[id] = dd;
  target.fromConnectors[id] = dd;
  chart.ganttData.addConnector(id, d);
}

function getStartPoints(source: iGanttItem, target: iGanttItem) {
  return {
    sX: source.l + source.w,
    sY: source.t + offSetTop,
    eX: target.l - 8,
    eY: target.t + offSetTop
  };
}

function getPoints(sX: number, sY: number, eX: number, eY: number) {
  let points;
  if (sX < eX - 20) {
    points = getPointsForwards(sX, sY, eX, eY);
  } else {
    points = getPointsBackwards(sX, sY, eX, eY);
  }
  return points;
}

function getPointsForwards(sX: number, sY: number, eX: number, eY: number) {
  return `
  ${sX}, ${sY}
  ${sX + 10}, ${sY}
  ${sX + 10}, ${eY}
  ${eX}, ${eY}`;
}
function getPointsBackwards(sX: number, sY: number, eX: number, eY: number) {
  return `
  ${sX}, ${sY}
  ${sX + 10}, ${sY}
  ${sX + 10}, ${sY + offSetTop - 1}
  ${eX - 10}, ${sY + offSetTop - 1}
  ${eX - 10}, ${eY}
  ${eX}, ${eY}`;
}

function draw(chartSvg: SVGElement, points: any, id: string) {
  let Polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  Polyline.setAttribute("points", points);
  Polyline.setAttribute("data-id", id);
  Polyline.setAttribute("marker-end", "url(#endarrow)");
  Polyline.classList.add("ganttConnector");
  chartSvg.appendChild(Polyline);
  return Polyline;
}
