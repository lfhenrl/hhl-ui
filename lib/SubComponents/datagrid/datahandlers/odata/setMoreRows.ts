import { iDatahandler } from "../odata";

export async function setMoreRows(DH: iDatahandler, row: any, index: number = 0) {
  const skip = !row ? 0 : row.nextPage;
  // const level = !row ? 0 : row.level;

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: skip,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
    Select: row.select,
    GroupBy: row.groupBy
  };

  if (!row.isGroup) {
    Qpara.Filter = row.filter;
    Qpara.Select = null;
    Qpara.GroupBy = null;
  }

  const data: any = await DH.dataFetch.post("", Qpara);
  let gData: any;

  if (row.isGroup) {
    gData = data.data.map((item: any) => {
      return {
        id: item.title,
        title: item.title,
        _type: "group",
        count_total: item.count,
        count: item.count,
        rowsLoaded: 0,
        level: 0,
        nextPage: 0
      };
    });
  } else {
    gData = data.data;
  }

  const dataCount = gData.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const rowsLeft = row.rowsLeft - dataCount;
  row.rowsLoaded = row.rowsLoaded + dataCount;

  if (rowsLeft > 0) {
    gData.push({
      _type: "loadmore",
      nextPage: DH.pageSize + skip,
      level: 0,
      rowsLeft,
      rowsLoaded: row.rowsLoaded,
      filter: row.filter ?? [],
      Pid: row.Pid,
      id: crypto.randomUUID()
    });
  }
  const pRow = DH.rows.value.find((item) => item.id === row.Pid);
  pRow.rowsLoaded = pRow.rowsLoaded + dataCount;
  DH.rows.value.splice(index, 1);
  DH.rows.value.splice(index, 0, ...gData);
}
