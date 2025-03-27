import { type iFilterData } from "../../../provide/datagridTypes";

export default function filterBool(filter: iFilterData) {
  const filtList = filter.value1?.split(",");
  let trueCheck = filtList?.includes("true");
  let falseCheck = filtList?.includes("false");
  let nullCheck = filtList?.includes("null");
  const field = filter.field;
  return (value: any) => {
    let sand = false;
    const val = value[field];
    if (trueCheck && val === true) sand = true;
    if (falseCheck && val === false) sand = true;
    if (nullCheck && val === null) sand = true;

    return sand;
  };
}
