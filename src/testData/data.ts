import { DateAddDays } from "../../lib/utils/dateFunctions";
export type testDataItem = {
  id: number;
  val1: string;
  val2: string;
  val3: string;
  val4: string;
  val5: boolean | null;
  val6: Date;
  val7: string;
};

export function getData(rowsCount: number = 1000) {
  const l: any = [];
  const dato = new Date(2022, 0, 1, 0, 0, 0);
  let count20 = 1;
  let count10 = 1;
  let count5 = 1;
  for (let i = 0; i <= rowsCount - 1; i++) {
    const item: testDataItem = {
      id: i + 1,
      val1: `Row ${i + 1} cell 1.`,
      val2: `Group ${count20}.`,
      val3: `Row ${i + 1} cell 3.`,
      val4: `SubGroup ${count5}.`,
      val5: count5 > 3 ? true : count5 > 2 ? null : false,
      val6: DateAddDays(dato, i),
      val7: `SubXXGroup ${count10}.`,
    };
    l.push(item);
    count20++;
    count10++;
    count5++;
    if (count20 > 50) count20 = 1;
    if (count10 > 20) count10 = 1;
    if (count5 > 30) count5 = 1;
  }
  return l;
}
