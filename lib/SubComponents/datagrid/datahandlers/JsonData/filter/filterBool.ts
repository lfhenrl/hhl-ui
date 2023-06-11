import { icolumnFilterData } from "../../../datagridTypes";

export default function filterBool(filter: icolumnFilterData) {
  const filtList = filter.value1.split(",");
  let trueCheck = filtList.includes("true");
  let falseCheck = filtList.includes("false");
  let nullCheck = filtList.includes("null");

  return (value: any) => {
    if (trueCheck) return value === true;
    if (falseCheck) return value === false;
    if (nullCheck) return value === null;
    return false;
  };
}
