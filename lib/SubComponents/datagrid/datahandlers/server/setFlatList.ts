import { type iDatahandler } from "../server";
import type { iServerData } from "../../provide/datagridTypes";

export async function setFlatList(DH: iDatahandler) {
  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify(DH.filterArray),
    Order: JSON.stringify(DH.OrderArray),
  };

  let __rowsLeft = 0;
  let dataCount = 0;

  const { data, ok, message } = await DH.dataFetch.get("", Qpara);

  if (ok) {
    const Server: iServerData = data;
    if (Server.rows.length > 0) {
      dataCount = Server.rows.length;
      DH.rowsCount.value = dataCount;
      DH.rowsCountTotal.value = Server.totalCount;
      __rowsLeft = DH.rowsCountTotal.value - DH.rowsCount.value;

      if (__rowsLeft > 0) {
        Server.rows.push({
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
      DH.outData.value = [...Server.rows];
    } else {
      DH.rowsCountTotal.value = 0;
      DH.rowsCount.value = 0;
    }
  } else {
    hhl.alert("err", "Server Error", message);
    return;
  }
}
