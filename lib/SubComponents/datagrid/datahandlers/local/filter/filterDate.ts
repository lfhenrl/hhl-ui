import { iFilterData } from "../../../provide/datagridTypes";
import { getFilterfunction } from "./filterUtils";

export default function filterNumber(filter: iFilterData) {
  const value1 = new Date(filter.value1 ?? "").valueOf();
  const value2 = new Date(filter.value2 ?? "").valueOf();

  const filterfunction = getFilterfunction(filter, value1, value2);
  return filterfunction;
}
