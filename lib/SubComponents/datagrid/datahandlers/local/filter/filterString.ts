import { iFilterData } from "../../../provide/datagridTypes";
import { getFilterfunction } from "./filterUtils";

export default function filterString(filter: iFilterData) {
  const value1 = filter.value1;
  const value2 = filter.value2;

  const filterfunction = getFilterfunction(filter, value1, value2);

  return filterfunction;
}
