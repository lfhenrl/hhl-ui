import { iFilterData } from "../../../provide/datagridTypes";

export default function filterSelect(filter: iFilterData) {
  const filterList = filter.value1?.split(",");

  switch (filter.condition1) {
    case "equal":
      return (value: any) => {
        return filterList?.includes(value);
      };
    case "not_equal":
      return (value: any) => {
        return !filterList?.includes(value);
      };

    default:
      return;
  }
}
