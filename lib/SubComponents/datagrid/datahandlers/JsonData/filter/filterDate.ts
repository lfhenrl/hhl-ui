import { icolumnFilterData } from "../../../datagridTypes";

export default function filterNumber(filter: icolumnFilterData) {
  const filtV1 = new Date(filter.value1).valueOf();
  const filtV2 = new Date(filter.value2).valueOf();
  console.log("FilterDate", filtV1, filtV2);
  switch (filter.condition) {
    case "equal":
      return (value: any) => {
        const val = new Date(value).valueOf();
        return val === filtV1;
      };
    case "not_equal":
      return (value: any) => {
        const val = new Date(value).valueOf();
        return val !== filtV1;
      };
    case "greater":
      return (value: any) => {
        const val = new Date(value).valueOf();
        return val > filtV1;
      };
    case "less":
      return (value: any) => {
        const val = new Date(value).valueOf();
        return val < filtV1;
      };
    case "between":
      return (value: any) => {
        const val = new Date(value).valueOf();
        return val >= filtV1 && val <= filtV2;
      };
    default:
      return;
  }
}
