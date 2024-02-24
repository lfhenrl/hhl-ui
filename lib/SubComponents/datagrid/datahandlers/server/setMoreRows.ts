import { iDatahandler } from "../server";

export async function setMoreRows(DH: iDatahandler, row: any, index: number = 0) {
  const skip = !row ? 0 : row.__nextPage;
  // const level = !row ? 0 : row.level;

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: skip,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
    Select: row.__select,
    GroupBy: row.__groupBy,
  };

  if (!row.__isGroup) {
    Qpara.Filter = row.__filter;
    Qpara.Select = null;
    Qpara.GroupBy = null;
  }

  const data: any = await DH.dataFetch.post("", Qpara);
  let gData: any;
  if (row.__isGroup) {
    gData = data.data.map((item: any) => {
      return {
        __id: item.title,
        __title: item.title,
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
    const d = data.data.map((it: any) => {
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
      __rowsLoaded: row.__rowsLoaded,
      __filter: row.__filter ?? [],
      __Pid: row.__Pid,
      __id: crypto.randomUUID(),
      __pid: row.__id,
    });
  }
  if (row.__isGroup) {
    const pRow: any = DH.outData.value.find((item: any) => item.__id === row.__Pid);
    pRow.__rowsLoaded = pRow.__rowsLoaded + dataCount;
  }
  DH.outData.value.splice(index, 1);
  DH.outData.value.splice(index, 0, ...gData);
  DH.outData.value = [...DH.outData.value];
}
