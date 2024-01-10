import { iFilterData } from "../../../provide/datagridTypes";
import { getStringFunction } from "./stringFunctions";

export default function filterString(filter: iFilterData) {
  const V1 = filter.value1?.toLowerCase() ?? "";
  const V2 = filter.value2?.toLowerCase() ?? "";
  const field = filter.field;

  const filterfunction1 = getStringFunction(filter.condition1, field, V1);
  if (!filterfunction1) return;

  if (filter.value2) {
    const filterfunction2 = getStringFunction(filter.condition2, field, V2);

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
