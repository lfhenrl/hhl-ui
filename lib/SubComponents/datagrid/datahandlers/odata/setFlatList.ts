import { iDatahandler } from "../odata";

export async function setFlatList(DH: iDatahandler) {
  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
  };

  const data: any = await DH.dataFetch.post("", Qpara);
  const dataCount = data.data.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const __rowsLeft = DH.rowsCountTotal.value - DH.rowsCount.value;

  if (__rowsLeft > 0) {
    data.data.push({
      __type: "loadmore",
      __nextPage: DH.pageSize,
      __level: 0,
      __rowsLeft,
      __rowsLoaded: dataCount,
      __isGroup: false,
      __id: crypto.randomUUID(),
    });
  }

  DH.rows.value = data.data;
}
