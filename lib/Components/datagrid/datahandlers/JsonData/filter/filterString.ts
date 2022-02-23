import { icolumnFilterData } from "../../../datagridTypes";

export default function filterString(filter: icolumnFilterData) {
  const filtV1 = String(filter.value1).toLowerCase();
  switch (filter.condition) {
    case "contain":
      return (value: any) => {
        const val = value ? value.toLowerCase() : "";
        return val.includes(filtV1);
      };
    case "equal":
      return (value: any) => {
        const val = value ? value.toLowerCase() : "";
        return val === filtV1;
      };
    case "startswith":
      return (value: any) => {
        const val = value ? value.toLowerCase() : "";
        return val.startsWith(filtV1);
      };
    case "endswith":
      return (value: any) => {
        const val = value ? value.toLowerCase() : "";
        return val.endsWith(filtV1);
      };
    default:
      return;
  }
}
