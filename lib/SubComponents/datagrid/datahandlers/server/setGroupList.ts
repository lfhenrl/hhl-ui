import { iDatahandler } from "../server";

export async function setGroupList(DH: iDatahandler) {
  const __select = [`${DH.groupList[0]} AS title`, `Count(${DH.groupList[0]}) AS count`];
  const __groupBy = [DH.groupList[0]];

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
    Select: __select,
    GroupBy: __groupBy,
  };
  console.log("Filter2 ", Qpara);
  const data: any = await DH.dataFetch.post("", Qpara);

  const gData = data.data.map((item: any) => {
    return {
      __id: item.title,
      __title: item.title,
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
  const __rowsLeft = DH.rowsLevel0_Count - DH.rowsCount.value;

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
}
