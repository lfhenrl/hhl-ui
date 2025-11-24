import { type iColumn } from "./Column";
import { type iDgrid } from "./Dgrid";
import { type iSortData } from "../../../utils/sorting";

export type iSorting = InstanceType<typeof Sorting>;
export class Sorting {
  public Dgrid: iDgrid;
  public sortArray: iSortData[] = [];

  constructor(_Dgrid: iDgrid) {
    this.Dgrid = _Dgrid;
    this.init();
  }

  init() {
    const sArray: any[] = [];
    this.Dgrid.columns.forEach((item: iColumn) => {
      if (item.props.sorting && item.props.sorting !== "none") {
        sArray.push({
          field: item.props.field,
          direction: item.props.sorting,
          index: item.props.sortIndex,
        });
      }
    });
    sArray.sort((a, b) => a.index - b.index);
    sArray.sort((a, b) => a.index - b.index).map((item) => ({ field: item.field, direction: item.direction }));

    this.sortArray = sArray;
    this.updateIndexes();
  }

  updateIndexes() {
    this.Dgrid.columns.forEach((col: iColumn) => {
      col.sortIndex.value = this.sortArray.findIndex((i) => i.field === col.props.field);
    });
  }

  update(col: iColumn) {
    const index = this.sortArray.findIndex((i) => i.field === col.props.field);
    if (index < 0) {
      if (col.sortDirection.value !== "none") {
        this.sortArray.push({
          direction: col.sortDirection.value,
          field: col.props.field,
        });
      }
    } else {
      const oldValue = this.sortArray[index];
      if (oldValue && (col.sortDirection.value === "none" || oldValue.direction === col.sortDirection.value)) {
        this.sortArray.splice(index, 1);
      } else if (oldValue) {
        oldValue.direction = col.sortDirection.value;
      }
    }
    this.updateIndexes();
    this.Dgrid.dataHandler?.loadData();
  }
}
