import { iColumns } from "./Columns";

export type iColumnsResizing = InstanceType<typeof ColumnsResizing>;

export class ColumnsResizing {
  private Columns: iColumns;

  constructor(_Columns: iColumns) {
    this.Columns = _Columns;
  }

  public async autoColumns() {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1));

    for (const col of this.Columns.getVisibelColumns()) {
      await this.autoColumn(col);
      await delay();
    }
  }

  public autoColumn(col: any, incluteDom: boolean = false) {
    if (col.dom && incluteDom) {
      col.dom.style.maxWidth = "";
      col.dom.style.minWidth = "";
    }
    col.cssRule.style.maxWidth = "";
    col.cssRule.style.minWidth = "";
    col.cssRule.style.width = "auto";
    setTimeout(() => {
      this.adjust();
      return;
    });
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

  private setWidth(w: number, s: any) {
    const newWidthString = w + "px";
    s.maxWidth = newWidthString;
    s.minWidth = newWidthString;
  }
}
