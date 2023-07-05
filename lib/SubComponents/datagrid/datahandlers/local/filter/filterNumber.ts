import { iFilterData } from "../../../provide/datagridTypes";
import { getFilterfunction } from "./filterUtils";

export default function filterNumber(filter: iFilterData) {
  const value1 = Number(filter.value1);
  const value2 = Number(filter.value2);

  const filterfunction = getFilterfunction(filter, value1, value2);

  return filterfunction;
}
