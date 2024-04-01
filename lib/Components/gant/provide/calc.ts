import { iGantt } from "./gantt";

export function calc(_GT: iGantt) {
  const GT = _GT;

  function PixFrSec(seconds: number) {
    return seconds * GT.pixelPrSec;
  }

  function SecFr2dates(Date1: Date, Date2: Date) {
    return (Date1.valueOf() - Date2.valueOf()) / 1000;
  }

  return {
    PixFrSec,
    SecFr2dates,
  };
}
