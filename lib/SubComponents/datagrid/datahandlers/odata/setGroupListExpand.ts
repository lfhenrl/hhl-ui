import { iDatahandler } from "../odata";

export async function setGroupListExpand(DH: iDatahandler, row: any, index: number = 0) {
  const level = row.level ?? 0;
  const parentArr = row.id.split("/");
  const filter = [];

  for (let i = 0; i < row.level + 1; i++) {
    const F = {
      Front: "AND",
      Field: DH.groupList[i],
      Condition: "=",
      Value: parentArr[i],
      End: ""
    };
    filter.push(F);
  }

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: filter,
    Order: DH.OrderArray,
    Select: [`${DH.groupList[level + 1]} AS title`, `Count(${DH.groupList[level + 1]}) AS count`],
    GroupBy: [DH.groupList[level + 1]]
  };

  const data: any = await DH.dataFetch.post("", Qpara);

  const gData = data.data.map((item: any) => {
    const id = row.id + "/" + item.title;
    return {
      id,
      title: item.title,
      _type: "group",
      count_total: item.count,
      count: item.count,
      rowsLoaded: 0,
      level: level + 1,
      nextPage: 0
    };
  });

  const dataCount = gData.length;

  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  row.count = dataCount;
  const rowsLeft = row.count - dataCount;
  row.rowsLoaded = row.rowsLoaded + dataCount;

  if (rowsLeft > 0) {
    gData.push({
      _type: "loadmore",
      nextPage: DH.pageSize,
      level: 1,
      rowsLeft,
      rowsLoaded: row.rowsLoaded,
      isGroup: true,
      filter,
      Pid: row.id,
      id: crypto.randomUUID()
    });
  }

  DH.rows.value.splice(index + 1, 0, ...gData);
}
