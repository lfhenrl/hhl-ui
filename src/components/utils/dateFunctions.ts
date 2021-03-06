const hour = 60 * 60 * 1000;
const day = hour * 24;

export function DateAddSeconds(date: Date, seconds: number) {
  const t = 1000 * seconds;
  const newDate = new Date(date);
  newDate.setTime(date.getTime() + t);
  return newDate;
}

export function DateAddMinutes(date: Date, minutes: number) {
  const t = 60000 * minutes;
  const newDate = new Date(date);
  newDate.setTime(date.getTime() + t);
  return newDate;
}

export function DateAddHours(date: Date, hours: number) {
  const t = hours * hour;
  const newDate = new Date(date);
  newDate.setTime(date.getTime() + t);
  return newDate;
}

export function DateAddDays(date: Date, days: number) {
  const d = days * day;
  const newDate = new Date(date);
  newDate.setTime(date.getTime() + d);
  return newDate;
}

export function DateAddWeeks(date: Date, weeks: number) {
  const w = weeks * day * 7;
  const newDate = new Date(date);
  newDate.setTime(date.getTime() + w);
  return newDate;
}

export function DateAddMonths(date: Date, months: number) {
  const newDate = new Date(date);
  const m = newDate.getMonth() + months;
  newDate.setMonth(m);
  return newDate;
}

export function DateAddYears(date: Date, years: number) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

export function DateDiffDays(date1: Date, date2: Date) {
  const differenceMs = Math.abs(date1.valueOf() - date2.valueOf());
  return Math.round(differenceMs / day);
}

export function DateGetWeek(date: Date) {
  var date = new Date(date);
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function DateGetToday() {
    const nDate = new Date();
    nDate.setHours(0);
    nDate.setMinutes(0);
    nDate.setSeconds(0);
    nDate.setMilliseconds(0);
    return nDate;
}
