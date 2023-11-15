import { iDatahandler } from "../odata";

export async function setMoreRows(
  DH: iDatahandler,
  row: any,
  index: number = 0,
) {
  const skip = !row ? 0 : row.__nextPage;
  // const level = !row ? 0 : row.level;

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: skip,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
    Select: row.select,
    GroupBy: row.groupBy,
  };

  if (!row.__isGroup) {
    Qpara.Filter = row.__filter;
    Qpara.Select = null;
    Qpara.GroupBy = null;
  }

  const data: any = await DH.dataFetch.post("", Qpara);
  let gData: any;
  console.log("DATA", data);
  if (row.__isGroup) {
    gData = data.data.map((item: any) => {
      return {
        id: item.title,
        title: item.title,
        _type: "group",
        count_total: item.count,
        count: item.count,
        rowsLoaded: 0,
        level: 0,
        nextPage: 0,
      };
    });
  } else {
    gData = data.data;
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
      __filter: row.filter ?? [],
      __Pid: row.Pid,
      __id: crypto.randomUUID(),
    });
  }
  if (row.isGroup) {
    const pRow = DH.rows.value.find((item) => item.__id === row.__Pid);
    pRow.rowsLoaded = pRow.rowsLoaded + dataCount;
  }
  DH.rows.value.splice(index, 1);
  DH.rows.value.splice(index, 0, ...gData);
}
