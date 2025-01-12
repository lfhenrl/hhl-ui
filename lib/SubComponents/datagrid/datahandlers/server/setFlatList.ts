import { iDatahandler } from "../server";

export async function setFlatList(DH: iDatahandler) {
  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify(DH.filterArray),
    Order: JSON.stringify(DH.OrderArray),
  };

  let __rowsLeft = 0;
  let dataCount = 0;

  const { data, ok } = await DH.dataFetch.get("", Qpara);
  if (ok) {
    if (data.length > 0) {
      dataCount = data.length;
      DH.rowsCount.value = dataCount;
      __rowsLeft = DH.rowsCountTotal.value - DH.rowsCount.value;
    } else {
      DH.rowsCountTotal.value = 0;
    }
  } else {
    return;
  }

  if (__rowsLeft > 0) {
    data.push({
      __type: "loadmore",
      __nextPage: DH.pageSize,
      __level: 0,
      __rowsLeft,
      __rowsLoaded: dataCount,
      __isGroup: false,
      __id: crypto.randomUUID(),
      __pid: "",
    });
  }
  DH.outData.value = [...data];
}
