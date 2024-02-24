import { iSortData } from "../../provide/datagridTypes";

export function getSortList(_sortArray: iSortData[]) {
  return _sortArray.map((item: iSortData) => {
    return {
      field: item.field,
      desc: item.direction === "up" ? false : true,
    };
  });
}
