import { DateAddDays, getFirstDayInMonth, getLastDayInMonth } from "../../../utils/dateFunctions";

export type iScaleItem = {
  id: number;
  year: number;
  month: number;
  dayFirst: Date;
  dayLast: Date;
};

export function makeTimelist(startTime: Date, endTime: Date, span: string = "month") {
  switch (span) {
    case "week":
      return makeWeeklist(startTime, endTime);
    case "month":
      return makeMonthlist(startTime, endTime);
    case "year":
      return makeYearlist(startTime, endTime);
    default:
      return makeMonthlist(startTime, endTime);
  }
}

function makeWeeklist(_startTime: Date, endTime: Date) {
  const x_startTime = new Date(_startTime.getFullYear(), _startTime.getMonth(), _startTime.getDate());
  const dayNumber = _startTime.getDay();
  const calcStartDay = dayNumber === 0 ? 6 : dayNumber === 1 ? 0 : dayNumber - 1;
  const startTime = DateAddDays(x_startTime, -calcStartDay);
  const timelist: Array<iScaleItem> = [];
  for (var d = new Date(startTime); d <= endTime; d.setDate(d.getDate() + 7)) {
    //d.setDate(1);

    const rec: iScaleItem = {
      id: d.valueOf(),
      year: d.getFullYear(),
      month: d.getMonth(),
      dayFirst: new Date(d),
      dayLast: DateAddDays(d, 6),
    };
    timelist.push(rec);
  }

  return timelist;
}

function makeMonthlist(_startTime: Date, endTime: Date) {
  const startTime = new Date(_startTime.getFullYear(), _startTime.getMonth(), _startTime.getDate());
  const timelist: Array<iScaleItem> = [];
  for (var d = new Date(startTime); d <= endTime; d.setMonth(d.getMonth() + 1)) {
    d.setDate(1);
    const rec: iScaleItem = {
      id: d.valueOf(),
      year: d.getFullYear(),
      month: d.getMonth(),
      dayFirst: getFirstDayInMonth(d),
      dayLast: getLastDayInMonth(d),
    };
    timelist.push(rec);
  }
  const first = timelist[0];
  first.dayFirst = startTime;
  const last = timelist.slice(-1)[0];
  last.dayLast = endTime;

  return timelist;
}

function makeYearlist(_startTime: Date, endTime: Date) {
  const startTime = new Date(_startTime.getFullYear(), _startTime.getMonth(), _startTime.getDate());
  const timelist: Array<iScaleItem> = [];
  let year = 0;
  const rec: iScaleItem = {
    id: 0,
    year: 2022,
    month: 0,
    dayFirst: new Date(),
    dayLast: new Date(),
  };
  let firstRun = true;
  for (var d = new Date(startTime); d <= endTime; d.setMonth(d.getMonth() + 1)) {
    d.setDate(1);
    if (year !== d.getFullYear()) {
      if (!firstRun) {
        // @ts-ignore: structuredClone is new
        timelist.push(structuredClone(rec));
      }
      rec.id = d.valueOf();
      rec.year = d.getFullYear();
      rec.dayFirst = new Date(d);
      rec.dayLast = new Date(d);
    }
    rec.dayLast = getLastDayInMonth(d);
    year = d.getFullYear();
    firstRun = false;
  }
  // @ts-ignore: structuredClone is new
  timelist.push(structuredClone(rec));
  return timelist;
}
