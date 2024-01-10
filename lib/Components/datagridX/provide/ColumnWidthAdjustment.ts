import { iColumn } from "./Column";
import { iDgrid } from "./Dgrid";

export function ColumnWidthAdjustment(_Dgrid: iDgrid) {
  const Dgrid: iDgrid = _Dgrid;

  function setCss(col: iColumn) {
    if (col.autoWidth === true) {
      setTimeout(() => {
        col.cssRule.style.minWidth = col.dom?.offsetWidth + "px";
        col.cssRule.style.maxWidth = col.dom?.offsetWidth + "px";
      }, 10);
    }
  }

  function resetCss(col: iColumn) {
    col.autoWidth = true;
    col.cssRule.style.minWidth = "";
    col.cssRule.style.maxWidth = "";
  }

  function getvirtualRows(): any[] {
    const rows: any[] | undefined = Dgrid.Vscroller?.getvirtualRows();
    return rows ?? [];
  }

  function getActiveColumns() {
    return Dgrid.columns.filter((item) => item.autoWidth === true);
  }

  function setMaxValue(col: iColumn, row: any) {
    const id = col.props.field;
    const val = row[id];

    const valFormatted =
      col.props.format?.(val, col, row) ?? val?.toString() ?? "";
    const valStr: string = valFormatted.toString() ?? "";
    if (valStr && col.maxValue.value.length < valStr.length) {
      resetCss(col);
      col.maxValue.value = valFormatted;
      setCss(col);
    }
  }

  function findMaxSingelColumn(col: iColumn) {
    resetCss(col);
    getvirtualRows().forEach((row) => setMaxValue(col, row));
    setCss(col);
  }

  function findMaxAllColumns(row: any) {
    getActiveColumns().forEach((col) => setMaxValue(col, row));
  }

  function adjustAll() {
    Dgrid.columns.forEach((col) => {
      resetCss(col);
      col.maxValue.value = "x";
    });
  }

  return {
    setCss,
    findMaxSingelColumn,
    findMaxAllColumns,
    adjustAll,
  };
}
