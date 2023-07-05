import { iColumns } from "./Columns";
import { icolumnData } from "./datagridTypes";

export class datagridClickHandler {
  private dataRows: any[];
  private dataKey: number | string;
  private columns: iColumns;

  constructor(rows: any, dataKey: number | string, columns: iColumns) {
    this.dataRows = rows?.value ?? [];
    this.dataKey = dataKey;
    this.columns = columns;
  }
  newData(rows: any) {
    this.dataRows = rows;
  }
  click(e: MouseEvent) {
    const ele = e.target as HTMLElement;
    if (!ele) return null;
    const data = getData(ele);

    if (data.dataId !== "") {
      data.dataItem = this.dataRows.find((item: any) => item[this.dataKey] == data.dataId);
    }

    if (data.colIndex >= 0) {
      data.column = this.columns.columns[data.colIndex];
      data.field = data.column.props.field;
      data.colOrgIndex = data.column.orgIndex;
    }

    return data;
  }
}

function getData(ele0: HTMLElement) {
  const val = {
    type: "",
    colIndex: -1,
    colOrgIndex: -1,
    subType: "",
    dataId: "",
    dataItem: null,
    column: (<any>[]) as icolumnData,
    field: ""
  };
  getDetails(val, ele0);
  const ele1 = ele0.parentElement ?? undefined;
  getDetails(val, ele1);
  const ele2 = ele1?.parentElement ?? undefined;
  getDetails(val, ele2);
  const ele3 = ele2?.parentElement ?? undefined;
  getDetails(val, ele3);
  const ele4 = ele3?.parentElement ?? undefined;
  getDetails(val, ele4);
  const ele5 = ele4?.parentElement ?? undefined;
  getDetails(val, ele5);
  return val;
}

function getDetails(val: any, ele?: HTMLElement) {
  if (!ele) return;
  if (ele.dataset.type) {
    val.type = ele.dataset.type;
  }
  if (ele.dataset.index) {
    val.colIndex = ele.dataset.index;
  }
  if (ele.dataset.subtype) {
    val.subType = ele.dataset.subtype;
  }

  if (ele.dataset.id) {
    val.dataId = ele.dataset.id;
  }
}
