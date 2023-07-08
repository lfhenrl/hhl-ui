import { iColumns } from "./Columns";

export class ColumnsResizing {
  private sizeMode = "fit";
  // private changeTracker = -1;
  private Columns: iColumns;
  private Cols: any[] = [];

  constructor(_Columns: iColumns, _sizeMode: string) {
    this.Columns = _Columns;
    this.sizeMode = _sizeMode;
  }

  public adjust() {
    this.makeCols();
    const l = this.Cols.length;
    this.Cols.forEach((item: any, index: number) => {
      if (l === index + 1) {
        item.width = item.width - 1;
      }
      this.setWidth(item.width ?? 0, item.style);
    });
  }

  private makeCols() {
    this.Cols = [];
    this.Columns.getVisibelColumns().forEach((item) => {
      const col = {
        width: item.dom?.offsetWidth,
        style: item.cssRule.style
      };
      this.Cols.push(col);
    });
  }

  private setWidth(w: number, s: any) {
    const newWidthString = w + "px";
    s.maxWidth = newWidthString;
    s.minWidth = newWidthString;
  }
}
