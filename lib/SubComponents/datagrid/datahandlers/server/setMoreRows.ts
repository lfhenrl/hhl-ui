import { iDatahandler } from "../server";
import type { iServerData } from "../../provide/datagridTypes";

export async function setMoreRows(DH: iDatahandler, row: any, index: number = 0) {
  const skip = !row ? 0 : row.__nextPage;

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: skip,
    MoreRows: true,
    Filter: JSON.stringify(DH.filterArray),
    Order: JSON.stringify(DH.OrderArray),
    Select: row.__select,
    GroupBy: JSON.stringify(row.__groupBy),
  };

  if (row.__filter) {
    const f = [...DH.filterArray, ...row.__filter];
    Qpara.Filter = JSON.stringify(f);
  }

  const { data, ok, message } = await DH.dataFetch.get("", Qpara);
  if (ok) {
    const Server: iServerData = data;

    let gData: any;
    if (row.__isGroup) {
      gData = Server.rows.map((item: any) => {
        const title = item.title === "" || item.title === null ? "__No Value__" : item.title;
        return {
          __id: title,
          __title: title,
          __type: "group",
          __count_total: item.count,
          __count: item.count,
          __rowsLoaded: 0,
          __level: 0,
          __nextPage: 0,
          __pid: row.__id,
        };
      });
    } else {
      const d = Server.rows.map((it: any) => {
        it.__pid = row.__pid;
        return it;
      });
      gData = d;
    }

    const dataCount = gData.length;
    DH.rowsCount.value = DH.rowsCount.value + dataCount;
    const __rowsLeft = row.__rowsLeft - dataCount;
    row.__rowsLoaded = row.__rowsLoaded + dataCount;

    if (__rowsLeft > 0) {
      gData.push({
        __type: "loadmore",
        __nextPage: DH.pageSize + skip,
        __level: 0,
        __rowsLeft,
        __isGroup: row.__isGroup,
        __rowsLoaded: row.__rowsLoaded,
        __filter: row.__filter ?? [],
        __groupBy: row.__groupBy,
        __select: row.__select,
        __id: crypto.randomUUID(),
        __pid: row.__pid,
      });
    }
    console.log("setMoreRows", gData);
    DH.outData.value.splice(index, 1);
    DH.outData.value.splice(index, 0, ...gData);
    DH.outData.value = [...DH.outData.value];
  } else {
    hhl.alert("err", "Server Error", message);
    return;
  }
}
