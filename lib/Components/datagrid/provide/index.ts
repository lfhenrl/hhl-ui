import { Ref, Slots } from "vue";
import { EventHandler } from "../../../utils/eventHandler";
import { icolumnData } from "../datagridTypes";
import { iDataController, iDataHandler } from "../dataController";
export type iDatagrid = InstanceType<typeof Datagrid>;

export class Datagrid {
  public Event = new EventHandler<"groupExpanded" | "showDialog" | "isLoading">();

  public MainContainer = {} as HTMLElement;
  public Header = {} as HTMLElement;
  public StyleSheet = {} as CSSStyleSheet;
  public ClassGuid = "";
  public Columns = [] as any;
  public searchFields = [] as string[];
  public searchString = "";
  public pageSize = 20;
  public excelMaxRows = 5000;
  public isLoading = false;

  public DataHandler = {} as iDataHandler;
  public DataController = {} as iDataController;
  public OrgGroupBy = [] as string[];
  public GroupBy = [] as string[];

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
  }

  Init() {
    this.MainContainer = this.mainDom.value;
    setTimeout(() => {
      this.Header = this.MainContainer.querySelector(".H_datagrid-header")! as HTMLElement;
      window.addEventListener("resize", this.Resize.bind(this));
      this.resizeColSize();
    });
  }

  async UpdateData() {
    this.isLoading = true;
    this.Event.emit("isLoading", true);
    const scroller: any = this.MainContainer.firstChild;
    scroller.scrollTop = 0;
    this.DataController.reLoad();
  }

  async MoreRows(id: string) {
    this.isLoading = true;
    this.Event.emit("isLoading", true);
    this.DataController.moreRows(id);
  }

  async getSelectlist(field: string) {
    this.isLoading = true;
    this.Event.emit("isLoading", true);
    const data = await this.DataHandler.loadSelectList(field);
    this.Event.emit("isLoading", false);
    return data;
  }

  getStyleSheetRule(selectText: string): CSSStyleRule {
    const compare = `.${this.ClassGuid} .${selectText}`;
    const list = Array.from(this.StyleSheet.cssRules).filter((it: any) => it.selectorText === compare);
    return list[0] as CSSStyleRule;
  }

  setColumnBodyWidth(column: icolumnData) {
    if (column.visibel) {
      const rule = this.getStyleSheetRule(column.className);
      rule.style.width = column.width + "px";
      rule.style.maxWidth = column.width + "px";
      rule.style.minWidth = column.width + "px";
    }
  }

  setColumnsBodyWidth() {
    let totalWidth = 0;
    this.Columns.value.forEach((item: icolumnData) => {
      if (item.visibel) {
        const w = item.width;
        item.width = w;
        totalWidth = totalWidth + w;
        this.setColumnBodyWidth(item);
      }
    });
    // this.ScrollContainer.style.width = totalWidth + 1 + "px";
  }

  setColumnsHeadWidth() {
    this.Columns.value.forEach((item: icolumnData) => {
      if (item.visibel) {
        const maxW = item.props.width ? parseInt(item.props.width) : 300;
        const minW = item.props.width ? parseInt(item.props.width) : 50;
        item.maxWidth = Math.round(maxW);
        item.minWidth = Math.round(minW);
      }
    });
    setTimeout(() => this.setColumnsHeadWidth_next());
  }

  setColumnsHeadWidth_next() {
    this.Columns.value.forEach((item: icolumnData) => {
      if (item.visibel) {
        const w = item.dom!.getBoundingClientRect().width;
        item.width = w ?? "10px";
      }
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
}
