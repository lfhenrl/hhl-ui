import getFilterFunctions from "./getFilterFunctions";
import { iFilterData } from "../../../provide/datagridTypes";

export async function filtering(arr: any[], filterList: iFilterData[]) {
  const filtFuncs = getFilterFunctions(filterList);
  const filterData: any = [];
  await arr.forEach((item: any) => {
    let inclute = true;
    inclute = Object.keys(filtFuncs).every((key: any) => {
      const val = item[key];
      const v = filtFuncs[key](val);
      return v;
    });
    if (inclute) filterData.push(Object.assign({}, item));
  });

  return filterData;
}
