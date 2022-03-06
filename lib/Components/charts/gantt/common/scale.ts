import { iChartGantt } from ".";

export type iChartGanttScale = InstanceType<typeof chartGanttScale>;

export class chartGanttScale {
  public gantt: iChartGantt;
  public monthNames = [
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
    "December",
  ];

  constructor(_gantt: iChartGantt) {
    this.gantt = _gantt;
  }

  load() {
    this.gantt.ctxScale.lineWidth = 0.16;
    this.gantt.ctxScale.font = "10px Arial";
    this.gantt.ctxScale.textAlign = "center";

    this.makeGridVandret(this.gantt.gridLinesHeightAmount);
    this.makeGridLodret(
      this.gantt.gridLinesWidthAmount,
      this.gantt.canvasScale.height
    );
    this.makeScale(this.gantt.canvasScale.height);
    this.gantt.ctxScale.stroke();
  }

  makeGridVandret(antal: number) {
    const { gridTimeHeight, gridHeight, ctxScale, canvasScale } = this.gantt;
    let top = gridTimeHeight;

    ctxScale.beginPath();
    ctxScale.strokeStyle = "black";
    ctxScale.moveTo(0, 0);
    ctxScale.lineTo(canvasScale.width, 0);

    ctxScale.moveTo(0, top);
    ctxScale.lineTo(canvasScale.width, top);
    top = top + gridTimeHeight;
    this.gantt.ganttChartTop = top;

    ctxScale.moveTo(0, top);
    ctxScale.lineTo(canvasScale.width, top);
    top = top + gridHeight;

    for (let i = 1; i <= antal; i++) {
      ctxScale.moveTo(0, top);
      ctxScale.lineTo(canvasScale.width, top);
      top = top + gridHeight;
    }
  }

  makeGridLodret(antal: number, height: number) {
    const { gridTimeHeight, ctxScale, gridWidth } = this.gantt;
    var left = gridWidth;
    ctxScale.moveTo(0, gridTimeHeight);
    ctxScale.lineTo(0, height);
    console.log(" makeGridLodret", antal, height);

    for (let i = 0; i < antal; i++) {
      ctxScale.moveTo(left, gridTimeHeight);
      ctxScale.lineTo(left, height);
      left = left + gridWidth;
    }
  }

  makeScale(height: number) {
    const { startDate, endDate, ctxScale, gridTimeHeight, gridWidth } =
      this.gantt;
    let left = 10;
    const months = [];
    let oldMonth = startDate.getMonth();
    let oldYear = startDate.getFullYear();
    let days = 0;
    for (var d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const day = d.getDate().toString();
      const month = d.getMonth();
      ctxScale.fillText(day, left, gridTimeHeight * 1.75);
      left = left + gridWidth;
      if (month !== oldMonth) {
        const m = {
          year: oldYear,
          month: oldMonth,
          days: days,
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
        days: days,
      };
      months.push(m);
    }

    const mTop = gridTimeHeight * 0.75;
    let runningWidth = 0;
    console.log("months", months);

    ctxScale.moveTo(0, 0);
    ctxScale.lineTo(0, gridTimeHeight);
    months.forEach((item) => {
      const header = `${this.monthNames[item.month]} ${item.year}`;
      const mWidth = item.days * gridWidth;
      runningWidth = runningWidth + mWidth;
      ctxScale.moveTo(runningWidth, 0);
      ctxScale.lineTo(runningWidth, height);
      if (item.days > 3) {
        ctxScale.fillText(header, runningWidth - mWidth / 2, mTop);
      }
    });
  }
}
