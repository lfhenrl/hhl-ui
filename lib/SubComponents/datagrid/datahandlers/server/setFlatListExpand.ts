import { iDatahandler } from "../server";

export async function setFlatListExpand(DH: iDatahandler, row: any, index: number = 0) {
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
    Filter: filter,
    Order: DH.OrderArray,
  };

  const data: any = await DH.dataFetch.post("", Qpara);
  const dataCount = data.data.length;
  DH.rowsCount.value = DH.rowsCount.value + dataCount;
  const __rowsLeft = row.__count - dataCount;
  row.__rowsLoaded = row.__rowsLoaded + dataCount;

  if (__rowsLeft > 0) {
    data.data.push({
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

  const d = data.data.map((it: any) => {
    it.__pid = row.__id;
    return it;
  });
  DH.outData.value.splice(index + 1, 0, ...d);
  DH.outData.value = [...DH.outData.value];
}
