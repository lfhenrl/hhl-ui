import { iFilterData } from "../../../provide/datagridTypes";
import { getNumberFunction } from "./numberFunctions";

export default function filterNumber(filter: iFilterData) {
  const V1 = Number(filter.value1) ?? 0;
  const V2 = Number(filter.value2) ?? 0;
  const field = filter.field;

  const filterfunction1 = getNumberFunction(filter.condition1, field, V1);
  if (!filterfunction1) return;

  if (filter.value2) {
    const filterfunction2 = getNumberFunction(filter.condition2, field, V2);

    if (filterfunction2) {
      return (value: any) => {
        if (filter.logical === "and") {
          return filterfunction1(value) && filterfunction2(value);
        } else {
          return filterfunction1(value) || filterfunction2(value);
        }
      };
    }
  }

  return filterfunction1;
}
