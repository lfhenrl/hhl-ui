import { iDatahandler } from "../server";
import type { iServerData } from "../../provide/datagridTypes";

export async function setFlatListExpand(DH: iDatahandler, row: any, index: number = 0) {
  const parentId = row.__id.toString();
  const parentArr = parentId.split("/");
  const filter = [];

  for (let i = 0; i < row.__level + 1; i++) {
    const F = {
      Front: "AND",
      Field: DH.groupList[i],
      Condition: "=",
      Type: "string",
      Value: parentArr[i],
      End: "",
    };
    filter.push(F);
  }
  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify([...DH.filterArray, ...filter]),
    Order: JSON.stringify(DH.OrderArray),
  };
  DH.rowsLoading.value = true;
  const { data, ok, message } = await DH.dataFetch.get("", Qpara);
  if (ok) {
    const Server: iServerData = data;

    const dataCount = Server.rows.length;
    DH.rowsCount.value = DH.rowsCount.value + dataCount;
    const __rowsLeft = row.__count - dataCount;
    row.__rowsLoaded = row.__rowsLoaded + dataCount;

    if (__rowsLeft > 0) {
      Server.rows.push({
        __type: "loadmore",
        __nextPage: DH.pageSize,
        __level: 0,
        __rowsLeft,
        __rowsLoaded: row.rowsLoaded,
        __isGroup: false,
        __filter: filter,
        __pid: row.id,
        __id: crypto.randomUUID(),
      });
    }

    const d = Server.rows.map((it: any) => {
      it.__pid = row.__id;
      return it;
    });
    DH.outData.value.splice(index + 1, 0, ...d);
    DH.outData.value = [...DH.outData.value];
    DH.rowsLoading.value = false;
  } else {
    DH.rowsLoading.value = false;
    hhl.alert("err", "Server Error", message);
    return;
  }
}
