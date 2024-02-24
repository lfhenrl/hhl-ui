import filterNumber from "./filterNumber";
import filterString from "./filterString";
import filterBool from "./filterBool";
import filterDate from "./filterDate";
import filterSelect from "./filterSelect";
import filterSeek from "./filterSeek";
import { iFilterData } from "../../../provide/datagridTypes";

export default function getFilterFunctions(filterList: any[]) {
  const fList: any = [];
  filterList.forEach((item: iFilterData) => {
    switch (item.type) {
      case "number":
        fList.push(filterNumber(item));
        break;
      case "string":
        fList.push(filterString(item));
        break;
      case "bool":
        fList.push(filterBool(item));
        break;
      case "date":
        fList.push(filterDate(item));
        break;
      case "datetime":
        fList.push(filterDate(item));
        break;
      case "select":
        fList.push(filterSelect(item));
        break;
      case "seek":
        fList.push(filterSeek(item));
        break;
      default:
    }
  });

  return fList;
}
