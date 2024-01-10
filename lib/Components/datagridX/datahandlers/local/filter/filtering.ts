import getFilterFunctions from "./getFilterFunctions";
import { iDatahandler } from "../index";
import { iFilterData } from "../../../provide/datagridTypes";

export async function filtering(DH: iDatahandler, filterList: iFilterData[]) {
  const filtFuncs = getFilterFunctions(filterList);
  if (filtFuncs.length > 0) {
    return DH.orgData.filter((item: any) => {
      return filtFuncs.every((filt: any) => {
        return filt(item);
      });
    });
  }

  return DH.orgData;
}
