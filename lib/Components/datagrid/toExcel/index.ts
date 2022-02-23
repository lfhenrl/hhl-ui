import { inject } from "vue";
import { iDatagrid } from "../provide";
import { icolumnData } from "../provide/Columns";
import Excel from "./exportToExcel";

export function toExcel(data: any, Columns: any, name: string) {
  const fields: any = {};
  Columns.forEach((item: icolumnData) => {
    const it = {
      type: item.props.type,
      title: item.props.title
    };
    fields[item.props.field] = it;
  });

  Excel.load(data, fields, name);
}
