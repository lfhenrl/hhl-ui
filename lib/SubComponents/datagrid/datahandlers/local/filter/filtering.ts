import getFilterFunctions from "./getFilterFunctions";
import { iDatahandler } from "..";


export async function filtering(DH:iDatahandler) {
  const filtFuncs = getFilterFunctions(DH.filterArray);
  const filterData: any = [];
  const haveFilter = Object.keys(filtFuncs).length > 0 ? true : false
  if (DH.dataSource.length > 0) {

  await DH.dataSource.forEach((item: any) => {
    let inclute = true;
    let seekInclute = true;
    item._type = "row";
    
    if (haveFilter) {
    inclute = Object.keys(filtFuncs).every((key: any) => {
      const val = item[key];
      const v = filtFuncs[key](val);
      return v;
    });
  }

    if (DH.seekFilterList && DH.seekFilterList.length > 0 && DH.seekFilterString !== "") {
      seekInclute = seekFilter(DH.seekFilterList, DH.seekFilterString, item);
    }

    if (inclute && seekInclute) filterData.push(Object.assign({}, item));

  });
}

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
