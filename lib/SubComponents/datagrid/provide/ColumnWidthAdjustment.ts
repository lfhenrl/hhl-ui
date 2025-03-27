import { type iColumn } from "./Column";
import { type iDgrid } from "./Dgrid";

export function ColumnWidthAdjustment(_Dgrid: iDgrid) {
  const Dgrid: iDgrid = _Dgrid;

  function getActiveColumns() {
    return Dgrid.columns.filter((item) => item.autoWidth === true);
  }

  function setMaxValue(col: iColumn, row: any) {
    const id = col.props.field;
    const val = row[id];

    const valFormatted = col.props.format?.(val, col, row) ?? val?.toString() ?? "";
    const valStr: string = valFormatted.toString() ?? "xxx";

    if (!valStr) return;
    if (valStr.length <= col.maxValue.length) return;
    col.setMaxValue(valFormatted);
  }

  function findMaxSingelColumn(col: iColumn) {
    if (col.props.autoWidth === true) {
      col.autoWidth = true;
      col.width.value = "auto";
      col.head_width.value = "auto";
      col.setMaxValue(col.maxValue);
    }
  }

  function findMaxAllColumns(row: any) {
    getActiveColumns().forEach((col) => setMaxValue(col, row));
  }

  function adjustAll() {
    Dgrid.columns.forEach((col) => {
      if (col.props.autoWidth === true) {
        col.autoWidth = true;
        col.width.value = "auto";
        col.head_width.value = "auto";
        col.setMaxValue(col.maxValue);
      }
    });
  }

  return {
    findMaxSingelColumn,
    findMaxAllColumns,
    adjustAll,
  };
}
