import { iDatahandler } from "../odata";

export async function setFlatListExpand(DH: iDatahandler, row: any, index: number = 0) {
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
    Order: DH.OrderArray
  };

  const data: any = await DH.dataFetch.post("", Qpara);
  const dataCount = data.data.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const rowsLeft = row.count - dataCount;
  row.rowsLoaded = row.rowsLoaded + dataCount;

  if (rowsLeft > 0) {
    data.data.push({
      _type: "loadmore",
      nextPage: DH.pageSize,
      level: 0,
      rowsLeft,
      rowsLoaded: row.rowsLoaded,
      isGroup: false,
      filter,
      Pid: row.id,
      id: crypto.randomUUID()
    });
  }

  DH.rows.value.splice(index + 1, 0, ...data.data);
}
