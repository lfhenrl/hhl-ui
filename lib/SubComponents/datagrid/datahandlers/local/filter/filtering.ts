import getFilterFunctions from "./getFilterFunctions";
import { iFilterData } from "../../../provide/datagridTypes";

export async function filtering(arr: any[], filterList: iFilterData[]) {
  const seekFilterList = ["id"];
  let seekFilterString = "3";
  const filtFuncs = getFilterFunctions(filterList);
  const filterData: any = [];
  await arr.forEach((item: any) => {
    let inclute = true;
    let seekInclute = true;
    item._type = "row";
    inclute = Object.keys(filtFuncs).every((key: any) => {
      const val = item[key];
      const v = filtFuncs[key](val);
      return v;
    });
    if (seekFilterList && seekFilterList.length > 0 && seekFilterString !== "") {
      seekInclute = seekFilter(seekFilterList, seekFilterString, item);
    }

    if (inclute && seekInclute) filterData.push(Object.assign({}, item));
  });

  return filterData;
}

function seekFilter(seekFilterList: string[], seekFilterString: string, item: any): boolean {
  let returnValue = true;
  seekFilterList.forEach((it: string) => {
    const itemValue = item[it].toString();
    returnValue = itemValue.includes(seekFilterString);
  });
  return returnValue;
}
