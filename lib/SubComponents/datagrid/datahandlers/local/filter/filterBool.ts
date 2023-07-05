import { iFilterData } from "../../../provide/datagridTypes";

export default function filterBool(filter: iFilterData) {
  const filtList = filter.value1?.split(",");
  let trueCheck = filtList?.includes("true");
  let falseCheck = filtList?.includes("false");
  let nullCheck = filtList?.includes("null");
  return (value: any) => {
    let sand = false;
    if (trueCheck && value === true) sand = true;
    if (falseCheck && value === false) sand = true;
    if (nullCheck && value === null) sand = true;

    return sand;
  };
}
