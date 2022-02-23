import { icolumnFilterData } from "../../../datagridTypes";

export default function filterNumber(filter: icolumnFilterData) {
  const filtV1 = Number(filter.value1);
  const filtV2 = Number(filter.value2);
  switch (filter.condition) {
    case "equal":
      return (value: any) => {
        const val = Number(value);
        return val === filtV1;
      };
    case "not_equal":
      return (value: any) => {
        const val = Number(value);
        return val !== filtV1;
      };
    case "greater":
      return (value: any) => {
        const val = Number(value);
        return val > filtV1;
      };
    case "less":
      return (value: any) => {
        const val = Number(value);
        return val < filtV1;
      };
    case "between":
      return (value: any) => {
        const val = Number(value);
        return val >= filtV1 && val <= filtV2;
      };
    default:
      return;
  }
}
