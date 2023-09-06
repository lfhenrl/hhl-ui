import { iDatahandler } from "../odata";

export async function setGroupList(DH: iDatahandler) {
  const select = [`${DH.groupList[0]} AS title`, `Count(${DH.groupList[0]}) AS count`];
  const groupBy = [DH.groupList[0]];

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: DH.filterArray,
    Order: DH.OrderArray,
    Select: select,
    GroupBy: groupBy
  };

  const data: any = await DH.dataFetch.post("", Qpara);

  const gData = data.data.map((item: any) => {
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

  const dataCount = gData.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const rowsLeft = DH.rowsLevel0_Count - DH.rowsCount.value;

  if (rowsLeft > 0) {
    gData.push({
      _type: "loadmore",
      nextPage: DH.pageSize,
      level: 0,
      rowsLeft,
      rowsLoaded: 0,
      select,
      groupBy,
      isGroup: true,
      id: crypto.randomUUID()
    });
  }

  DH.rows.value = gData;
}
