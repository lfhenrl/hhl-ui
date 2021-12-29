import { DateAddMonths, DateAddDays, DateGetWeek, DateDiffDays } from "../utils/dateFunctions";

export const getDaysArray = (_year: number, _month: number) => {
  let startDate = new Date(_year, _month, 1);
  let endDate = DateAddMonths(startDate, 1);
  const activeMonth = startDate.getMonth();
  let datesBack = startDate.getDay() - 1;
  if (datesBack < 1) {
    datesBack = datesBack + 7;
  }

  const datesAhead = 7 - endDate.getDay();
  startDate = DateAddDays(startDate, -datesBack);
  endDate = DateAddDays(endDate, datesAhead);
  const dayDiff = DateDiffDays(startDate, endDate);
  if (dayDiff < 36) {
    endDate = DateAddDays(endDate, 7);
  }
  let oldWeek = -1;
  const header = ["W", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const arr = [];
  header.forEach((item) => {
    arr.push({
      type: "head",
      value: item,
      title: item,
      daytype: null,
      activeMonth: null
    });
  });

  for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    const dato = new Date(dt);
    const week = DateGetWeek(dato);
    const weekItem = {
      type: "week",
      value: week.toString(),
      title: week.toString(),
      daytype: null,
      activeMonth: null
    };
    if (oldWeek !== week) {
      arr.push(weekItem);
    }
    oldWeek = week;
    const day = dato.getDay();
    const month = dato.getMonth();
    const dataDaytype = day === 6 || day === 0 ? "weekend" : "day";
    const dataActiveMonth = month === activeMonth ? true : null;
    const dayItem = {
      type: "day",
      value: `${dato.getDate()}/${month}/${dato.getFullYear()}`,
      title: dato.getDate().toString(),
      daytype: dataDaytype,
      activeMonth: dataActiveMonth
    };

    arr.push(dayItem);
  }
  return arr;
};
