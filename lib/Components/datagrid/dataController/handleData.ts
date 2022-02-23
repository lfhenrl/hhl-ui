import { iQueryObject } from "../datagridTypes";

export default function handleData(
  data: any[],
  totalCount: number,
  level: number,
  index: number,
  QueryObject: iQueryObject,
  dataStore: any,
  dataKeyFront: string
) {
  let xIndex = index;

  const isGrouped = QueryObject.groupBy !== "";
  data.forEach((item) => {
    const rec = dataKeyFront + xIndex;
    dataStore[rec] = {
      id: rec,
      index: xIndex,
      name: isGrouped ? item.id : rec,
      groupField: QueryObject.groupBy,
      expanded: false,
      haveExpandData: false,
      rowsLeft: totalCount - xIndex - 1,
      rowsTotal: totalCount,
      childRowsCount: item.count ?? 0,
      type: isGrouped ? "group" : "data",
      level: level,
      data: item,
      children: {}
    };
    xIndex++;
  });
}
