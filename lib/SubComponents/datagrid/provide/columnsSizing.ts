import { iColumns } from "./Columns";
import { icolumnData } from "./datagridTypes";

export type iColumnsResizing = InstanceType<typeof ColumnsResizing>;

export class ColumnsResizing {
  private Columns: iColumns;

  constructor(_Columns: iColumns) {
    this.Columns = _Columns;
  }

  public autoColumns() {
    for (const col of this.Columns.getVisibelColumns()) {

        this.autoColumn(col);
       
    }
    setTimeout(() => {
      this.adjust();
      return;
    });
  }

  private autoColumn(col: icolumnData) {
    if (col.dom) {
      col.dom.style.maxWidth = "";
      col.dom.style.minWidth = "";
    }
    col.cssRule.style.maxWidth = "";
    col.cssRule.style.minWidth = "";
    col.cssRule.style.width = "auto";

  }

  public adjust() {
    const cols: any[] = [];
    this.Columns.getVisibelColumns().forEach((item) => {
      const col = {
        width: item.dom?.offsetWidth,
        style: item.cssRule.style
      };
      cols.push(col);
    });

    cols.forEach((item: any) => {
      this.setWidth(item.width ?? 0, item.style);
    });
  }

  public adjustColumn(column: icolumnData) {
    this.autoColumn(column)
    this.setWidth(column.dom?.offsetWidth ?? 0, column.cssRule.style);
  }

  private setWidth(w: number, s: any) {
    const newWidthString = w + "px";
    s.maxWidth = newWidthString;
    s.minWidth = newWidthString;
  }
}
