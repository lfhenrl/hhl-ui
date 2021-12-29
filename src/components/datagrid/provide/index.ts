import { Ref, Slots } from "vue";
import { icolumnData } from "./Columns";
import { EventHandler } from "../../utils/eventHandler";
import { GridData } from "./GridData";
export type iDatagrid = InstanceType<typeof Datagrid>;

export class Datagrid {
  public Event = new EventHandler<"newdata" | "groupExpanded" | "showDialog">();

  public MainContainer = {} as HTMLElement;
  public Header = {} as HTMLElement;
  public StyleSheet = {} as CSSStyleSheet;
  public ClassGuid = "";
  public Columns = [] as any;

  public GridData: any;
  private _groupBy = [] as any;
  private _data = [] as any;

  private rowResizeActive = false;

  private rowResizePosX = 0;
  private rowResizeWidth = 0;
  private activeColumn = {} as icolumnData;
  private bound_rowResizeMouseMove: any;
  private bound_rowResizeMouseUp: any;

  constructor(public mainDom: Ref, public Slots: Slots) {
    let guid = `g${new Date().getTime().toString()}`;

    this.ClassGuid = guid;
    const style = document.createElement("style");
    document.body.appendChild(style) as HTMLStyleElement;
    this.StyleSheet = style.sheet! as CSSStyleSheet;
    this.bound_rowResizeMouseMove = this.rowResizeMouseMove.bind(this);
    this.bound_rowResizeMouseUp = this.rowResizeMouseUp.bind(this);
    this.GridData = GridData(this).gridData;
  }

  Init() {
    this.MainContainer = this.mainDom.value;
    setTimeout(() => {
      this.Header = this.MainContainer.querySelector(".hhl-datagrid-header")! as HTMLElement;
      window.addEventListener("resize", this.Resize.bind(this));
      this.resizeColSize();
    });
  }

  get Data() {
    return this._data;
  }

  set Data(val: any) {
    this._data = val;
    this.GridData.setData(val);
  }

  set GroupBy(val: any) {
    this._groupBy = val;
    console.log("GroupBYyyyyyyyyyyy", this._groupBy);
  }

  get GroupBy() {
    return this._groupBy;
  }

  GetColumnByField(field: string) {
    return this.Columns.value.find((el: any) => el.props.field === field);
  }

  getStyleSheetRule(selectText: string): CSSStyleRule {
    const compare = `.${this.ClassGuid} .${selectText}`;
    const list = Array.from(this.StyleSheet.cssRules).filter((it: any) => it.selectorText === compare);
    return list[0] as CSSStyleRule;
  }

  setColumnBodyWidth(column: icolumnData) {
    const rule = this.getStyleSheetRule(column.className);
    rule.style.width = column.width + "px";
    rule.style.maxWidth = column.width + "px";
    rule.style.minWidth = column.width + "px";
  }

  setColumnsBodyWidth() {
    let totalWidth = 0;
    this.Columns.value.forEach((item: icolumnData) => {
      const w = item.width;
      item.width = w;
      totalWidth = totalWidth + w;
      this.setColumnBodyWidth(item);
    });
    // this.ScrollContainer.style.width = totalWidth + 1 + "px";
  }

  setColumnsHeadWidth() {
    this.Columns.value.forEach((item: icolumnData) => {
      const maxW = item.props.width ? item.props.width : 300;
      const minW = item.props.width ? item.props.width : 200;
      item.maxWidth = Math.round(maxW);
      item.minWidth = Math.round(minW);
    });

    console.log("Head resize");
    setTimeout(() => this.setColumnsHeadWidth_next());
  }

  setColumnsHeadWidth_next() {
    this.Columns.value.forEach((item: icolumnData) => {
      const w = item.dom!.getBoundingClientRect().width;
      item.width = w ?? 0;
    });
    this.rowResizeActive = false;
  }

  resizeColSize() {
    this.setColumnsHeadWidth();
    setTimeout(() => {
      this.setColumnsBodyWidth();
    });
  }

  Resize() {
    // this.setColumnsBodyWidth();
    this.setColumnsHeadWidth_next();
    this.setColumnsBodyWidth();
    console.log("resize");
  }

  rowResize(e: MouseEvent, column: icolumnData) {
    document.addEventListener("mousemove", this.bound_rowResizeMouseMove, false);
    document.addEventListener("mouseup", this.bound_rowResizeMouseUp, false);
    if (!this.rowResizeActive) {
      this.Columns.value.forEach((item: icolumnData) => {
        const w = item.width;
        item.maxWidth = w;
        item.minWidth = w;
      });
      this.rowResizeActive = true;
    }
    this.rowResizePosX = e.screenX;
    this.rowResizeWidth = column.dom!.clientWidth;
    this.activeColumn = column;
  }

  rowResizeMouseMove(e: MouseEvent) {
    const diffX = e.screenX - this.rowResizePosX;
    let w = this.rowResizeWidth + diffX;
    if (w < 30) return;
    this.activeColumn.width = w;
    this.activeColumn.maxWidth = w;
    this.activeColumn.minWidth = w;
    this.setColumnsBodyWidth();
  }

  rowResizeMouseUp() {
    document.removeEventListener("mousemove", this.bound_rowResizeMouseMove, false);
    document.removeEventListener("mouseup", this.bound_rowResizeMouseUp, false);
  }

  columnsReorder(from: number, to: number) {
    console.log("før", this.Columns.value);
    setTimeout(() => {
      const f = this.Columns.value.splice(from, 1)[0];
      this.Columns.value.splice(to, 0, f);
      console.log("efter", this.Columns.value);
    });
  }
}
