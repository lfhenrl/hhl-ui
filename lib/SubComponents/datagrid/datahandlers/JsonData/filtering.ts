import { iQueryObject } from "../../datagridTypes";
import getFilterFunctions from "./filter";

export default async function filtering(arr: any[], QueryObject: iQueryObject) {
  if (!QueryObject.filterList && !QueryObject.searchString) return arr;
  const searchFieldsCount = QueryObject.searchFields.length;
  const filtFuncs = getFilterFunctions(QueryObject.filterList);
  const filterData: any = [];
  await arr.forEach((item: any) => {
    let inclute = true;
    inclute = Object.keys(filtFuncs).every((key: any) => {
      const val = item[key];
      const v = filtFuncs[key](val);
      return v;
    });
    if (inclute && searchFieldsCount > 0 && QueryObject.searchString !== "") {
      inclute = QueryObject.searchFields.some((key: any) => {
        const val: string = item[key].toString().toLowerCase();
        return val.includes(QueryObject.searchString);
      });
    }
    if (inclute) filterData.push(Object.assign({}, item));
  });

  return filterData;
}
