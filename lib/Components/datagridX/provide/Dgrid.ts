import { Slots } from "vue";
import { Column, iColumn } from "./Column";
import { iSorting, Sorting } from "./Sorting";
import { iDatahandler } from "../datahandlers/local";
import H_vscroll from "../../H_vscroll.vue";
import { ColumnWidthAdjustment } from "./ColumnWidthAdjustment";
import { iFilterData } from "./datagridTypes";

export type iDgrid = InstanceType<typeof Dgrid>;
type iVscroller = InstanceType<typeof H_vscroll>;

export class Dgrid {
  public columns: iColumn[] = [];
  public Guid = "";
  public StyleSheet = {} as CSSStyleSheet;
  public Sorting: iSorting;
  public Filter: iFilterData[] = [];
  public SeekList: string[] = [];
  public SeekString: string = "";
  public dataHandler?: iDatahandler;
  public Vscroller?: iVscroller;
  public ColumnWidthAdjustment = ColumnWidthAdjustment(this);

  constructor(slots: Slots, DHandler: iDatahandler) {
    this.dataHandler = DHandler;
    this.Guid = `g${new Date().getTime().toString()}`;
    const style = document.createElement("style");
    document.body.appendChild(style) as HTMLStyleElement;
    this.StyleSheet = style.sheet! as CSSStyleSheet;
    const slotData = this.getSlotsData(slots, "H_column");
    this.columns = [];
    slotData.forEach((item: any, index: number) => {
      const col = new Column(this, item, index);
      this.columns.push(col);
    });
    this.Sorting = new Sorting(this);
    this.dataHandler?.init(this);
  }

  public getVisibelColumns() {
    return this.columns.filter((item) => item.visibel.value);
  }

  getSlotsData(slots: Slots, name: string) {
    if (!slots || !slots.default) return [];
    const sl = slots.default().filter((vnode: any) => {
      return vnode.type.name === name;
    });
    return sl;
  }

  updateFilter() {
    const sArray: iFilterData[] = [];
    this.columns.forEach((item) => {
      if (item.filter.active) {
        sArray.push(item.filter);
      }
    });
    this.updateSeekFilter(sArray);
    this.Filter = sArray;
    this.dataHandler?.loadData();
  }

  updateSeekFilter(sArray: iFilterData[]) {
    if (this.SeekList.length > 0 && this.SeekString != "") {
      const Nfilter: iFilterData = {
        active: true,
        condition1: "seek",
        condition2: "equal",
        field: this.SeekList.toString(),
        logical: "and",
        value1: this.SeekString.toString(),
        value2: null,
        type: "seek",
      };
      sArray.push(Nfilter);
    }
  }
}
