import { DateAddDays } from "../../lib/utils/dateFunctions";

export function getData(rowsCount: number = 1000) {
  const l: any = [];
  const dato = new Date(2022, 0, 1, 0, 0, 0);
  let count20 = 1;
  let count5 = 1;
  for (let i = 0; i <= rowsCount - 1; i++) {
    const item: any = {
      id: i + 1,
      val1: `Row ${i + 1} cell 1.`,
      val2: `Group ${count20}.`,
      val3: `Row ${i + 1} cell 3.`,
      val4: `SubGroup ${count5}.`,
      val5: count5 > 3 ? true : count5 > 2 ? null : false,
      val6: DateAddDays(dato, i)
    };
    l.push(item);
    count20++;
    count5++;
    if (count20 > 50) count20 = 1;
    if (count5 > 30) count5 = 1;
  }
  return l;
}
