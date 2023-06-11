
import filterNumber from "./filterNumber";
import filterString from "./filterString";
import filterBool from "./filterBool";
import filterDate from "./filterDate";
import filterSelect from "./filterSelect";
import { icolumnFilterData } from "../../../datagridTypes";

export default function getFilterFunctions(filterList: any[]) {
  const fList: any = {};
  filterList.forEach((item: icolumnFilterData) => {
    switch (item.type) {
      case "number":
        fList[item.field] = filterNumber(item);
        break;
      case "string":
        fList[item.field] = filterString(item);
        break;
      case "bool":
        fList[item.field] = filterBool(item);
        break;
      case "date":
        fList[item.field] = filterDate(item);
        break;
      case "datetime":
        fList[item.field] = filterDate(item);
        break;
      case "select":
        fList[item.field] = filterSelect(item);
        break;
      default:
    }
  });

  return fList;
}
