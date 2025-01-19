import { iDatahandler } from "../server";
import type { iServerData } from "../../provide/datagridTypes";

export async function setGroupList(DH: iDatahandler) {
  //const __select = [`${DH.groupList[0]} AS title`, `Count(${DH.groupList[0]}) AS count`];
  const __select = "grouping";
  const __groupBy = [DH.groupList[0]];

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify(DH.filterArray),
    Order: JSON.stringify(DH.OrderArray),
    Select: __select,
    GroupBy: JSON.stringify(__groupBy),
  };

  const { data, ok, message } = await DH.dataFetch.get("", Qpara);
  if (ok) {
    const Server: iServerData = data;
    DH.rowsCountTotal.value = Server.totalCount;
    const gData: any = Server.rows.map((item: any) => {
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
        __pid: "",
      };
    });

    const dataCount = gData.length;
    DH.rowsCount.value = dataCount;
    const __rowsLeft = Server.count - DH.rowsCount.value;

    if (__rowsLeft > 0) {
      gData.push({
        __type: "loadmore",
        __nextPage: DH.pageSize,
        __level: 0,
        __rowsLeft,
        __rowsLoaded: 0,
        __select,
        __groupBy,
        __isGroup: true,
        __id: crypto.randomUUID(),
        __pid: "",
      });
    }
    DH.outData.value = gData;
  } else {
    hhl.alert("err", "Server Error", message);
    return;
  }
}
