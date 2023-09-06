import { iDatahandler } from "../odata";

export async function setFlatList(DH: iDatahandler) {
  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: DH.filterArray,
    Order: DH.OrderArray
  };

  const data: any = await DH.dataFetch.post("", Qpara);
  const dataCount = data.data.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const rowsLeft = DH.rowsCountTotal.value - DH.rowsCount.value;

  if (rowsLeft > 0) {
    data.data.push({ _type: "loadmore", nextPage: DH.pageSize, level: 0, rowsLeft, isGroup: false, id: crypto.randomUUID() });
  }

  DH.rows.value = data.data;
}
