import { iDatahandler } from "../server";

export async function setGroupListExpand(DH: iDatahandler, row: any, index: number = 0) {
  const level = row.__level ?? 0;
  const parentArr = row.__id.split("/");
  const filter = [];

  for (let i = 0; i < row.__level + 1; i++) {
    const F = {
      Front: "AND",
      Field: DH.groupList[i],
      Condition: "=",
      Value: parentArr[i],
      End: "",
    };
    filter.push(F);
  }

  const Qpara: any = {
    Take: DH.pageSize,
    Skip: 0,
    Filter: JSON.stringify(filter),
    Order: JSON.stringify(DH.OrderArray),
    Select: [`${DH.groupList[level + 1]} AS title`, `Count(${DH.groupList[level + 1]}) AS count`],
    GroupBy: [DH.groupList[level + 1]],
  };

  const data: any = await DH.dataFetch.get("", Qpara);

  const gData = data.data.map((item: any) => {
    const __id = row.__id + "/" + item.title;
    return {
      __id,
      __title: item.title,
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
}
