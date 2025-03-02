import { iDatahandler } from "../server";
import type { iServerData } from "../../provide/datagridTypes";

export async function setGroupListExpand(DH: iDatahandler, row: any, index: number = 0) {
  const level = row.__level ?? 0;
  const parentId = row.__id.tostring();
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

  const __order: string[] = [];
  if (DH.OrderArray.length > 0) {
    DH.OrderArray.forEach((item) => {
      if (item.Field === DH.groupList[level + 1]) __order.push(item);
    });
  }

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify([...DH.filterArray, ...filter]),
    Order: JSON.stringify(__order),
    Select: ["grouping"],
    GroupBy: JSON.stringify([DH.groupList[level + 1]]),
  };
  DH.rowsLoading.value = true;
  const { data, ok, message } = await DH.dataFetch.get("", Qpara);
  if (ok) {
    const Server: iServerData = data;

    const gData: any = Server.rows.map((item: any) => {
      const __id = row.__id + "/" + item.title;
      const title = item.title === "" || item.title === null ? "__No Value__" : item.title;
      return {
        __id,
        __title: title,
        __type: "group",
        __count_total: item.count,
        __count: item.count,
        __rowsLoaded: 0,
        __level: level + 1,
        __nextPage: 0,
        __pid: row.__id,
      };
    });

    const dataCount = gData.length;

    DH.rowsCount.value = DH.rowsCount.value + dataCount;
    row.__count = dataCount;
    const __rowsLeft = row.__count - dataCount;
    row.__rowsLoaded = row.__rowsLoaded + dataCount;

    if (__rowsLeft > 0) {
      gData.push({
        __type: "loadmore",
        __nextPage: DH.pageSize,
        __level: 1,
        __rowsLeft,
        __rowsLoaded: row.__rowsLoaded,
        __isGroup: true,
        __filter: filter,
        __pid: row.__id,
        __id: crypto.randomUUID(),
      });
    }
    DH.outData.value.splice(index + 1, 0, ...gData);
    DH.outData.value = [...DH.outData.value];
    DH.rowsLoading.value = false;
  } else {
    DH.rowsLoading.value = false;
    hhl.alert("err", "Server Error", message);
    return;
  }
}
