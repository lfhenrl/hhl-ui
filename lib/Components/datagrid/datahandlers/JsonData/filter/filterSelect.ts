import { icolumnFilterData } from "../../../datagridTypes";

export default function filterSelect(filter: icolumnFilterData) {
  const filterList = filter.value1.split(",");

  switch (filter.condition) {
    case "equal":
      return (value: any) => {
        return filterList.includes(value);
      };
    case "not_equal":
      return (value: any) => {
        const val = value ? value.toLowerCase() : "";
        return !filterList.includes(value);
      };

    default:
      return;
  }
}
