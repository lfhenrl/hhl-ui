import { iFilterData } from "../../../provide/datagridTypes";
import { getDateFunction } from "./dateFunctions";

export default function filterNumber(filter: iFilterData) {
  const V1 = new Date(filter.value1 ?? "").valueOf();
  const V2 = new Date(filter.value2 ?? "").valueOf();
  const field = filter.field;

  const filterfunction1 = getDateFunction(filter.condition1, field, V1);
  if (!filterfunction1) return;

  if (filter.value2) {
    const filterfunction2 = getDateFunction(filter.condition2, field, V2);

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
