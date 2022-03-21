export type iGanttTimeItem = {
  id: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  first: boolean;
  last: boolean;
};

export function makeTimelist(startTime: Date, endTime: Date, span: string = "month") {
  const AddingValue = getAddingValue(span);
  const DayValue = getDayValue(span);
  const HourValue = getHourValue(span);
  const timelist: Array<iGanttTimeItem> = [];
  for (var d = new Date(startTime); d <= endTime; AddingValue(d)) {
    d.setDate(1);
    const rec: iGanttTimeItem = {
      id: d.valueOf(),
      year: d.getFullYear(),
      month: d.getMonth(),
      day: DayValue(d),
      hour: HourValue(d),
      minute: 0,
      first: false,
      last: false
    };
    timelist.push(rec);
  }
  const first = timelist[0];
  first.day = startTime.getDate();
  first.hour = startTime.getHours();
  first.minute = startTime.getMinutes();
  first.first = true;
  const last = timelist.slice(-1)[0];
  last.day = endTime.getDate();
  last.hour = endTime.getHours();
  last.minute = endTime.getMinutes();
  last.last = true;
  // console.log("Timelist", timelist);
  return timelist;
}

function getAddingValue(span: string) {
  switch (span) {
    case "month":
      return (d: Date) => d.setMonth(d.getMonth() + 1);
    case "day":
      return (d: Date) => d.setDate(d.getDate() + 1);
    default:
      return (d: Date) => d.setMonth(d.getMonth() + 1);
  }
}

function getDayValue(span: string) {
  switch (span) {
    case "day":
      return (d: Date) => d.getDate();
    case "hour":
      return (d: Date) => d.getDate();
    default:
      return (_d: Date) => 1;
  }
}

function getHourValue(span: string) {
  switch (span) {
    case "hour":
      return (d: Date) => d.getHours();
    default:
      return (_d: Date) => 0;
  }
}

// startTime: Date, endTime: Date, span: string = "month"
