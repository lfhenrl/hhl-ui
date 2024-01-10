import { iFilterData } from "../../../provide/datagridTypes";

export default function filterSeek(filter: iFilterData) {
  const fieldList = filter.field?.split(",");
  const V = filter.value1;

  return (value: any) => {
    let returnValue = false;
    fieldList.forEach((it: string) => {
      const itemValue = value[it].toString().toLowerCase();
      if (itemValue.includes(V)) {
        returnValue = true;
      }
    });
    return returnValue;
  };
}
