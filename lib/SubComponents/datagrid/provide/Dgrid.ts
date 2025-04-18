import { type Slots, ref } from "vue";
import { Column, type iColumn } from "./Column";
import { type iSorting, Sorting } from "./Sorting";
import { type iDatahandler } from "../datahandlers/server";
//import H_virtualList from "../../../Components/H_virtualList.vue";
import { ColumnWidthAdjustment } from "./ColumnWidthAdjustment";
import { type iFilterData } from "./datagridTypes";

export type iDgrid = InstanceType<typeof Dgrid>;
//type iVscroller = InstanceType<typeof H_virtualList>;

export class Dgrid {
  public datagridRef?: HTMLElement;
  public columns: iColumn[] = [];
  public headDom?: HTMLElement | null;
  public Guid = "";
  public changeCounter = ref(0);
  public StyleSheet = {} as CSSStyleSheet;
  public PageSize: number = 500;
  public Sorting: iSorting;
  public Filter: iFilterData[] = [];
  public SeekList: string[] = [];
  public SeekString: string = "";
  public StickyGroups: boolean = true;
  public dataHandler?: iDatahandler;
  public Vscroller?: any;
  public ColumnWidthAdjustment = ColumnWidthAdjustment(this);

  constructor(slots: Slots, DHandler: iDatahandler, P: any) {
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
    this.PageSize = P.pagesize;
    this.SeekList = P.filterList;
    this.StickyGroups = P.stickyGroups;
    this.dataHandler!.dataKey = P.dataKey;
    this.dataHandler!.groupList = P.groupList;
    this.setFilter();
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

  columnsChange() {
    this.changeCounter.value++;
  }

  scrollToOffset(offset: number) {
    this.Vscroller!.scrollToOffset(offset);
  }

  setFilter() {
    const sArray: iFilterData[] = [];
    this.columns.forEach((item) => {
      if (item.filter.active) {
        sArray.push(item.filter);
      }
    });
    this.updateSeekFilter(sArray);
    this.Filter = sArray;
  }

  updateFilter() {
    this.setFilter();
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
