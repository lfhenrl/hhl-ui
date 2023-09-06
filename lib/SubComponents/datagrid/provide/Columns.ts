import { Slots, ref, reactive } from "vue";
import { iSortData, icolumnData, iFilterData } from "./datagridTypes";
import { iDatahandler } from "../datahandlers/local";
import { iColumnsResizing } from "./columnsSizing";

export type iColumns = InstanceType<typeof Columns>;

export class Columns {
  // private isResized = false;
  public TableDom: any = null;
  public StyleSheet = {} as CSSStyleSheet;
  public columns: icolumnData[] = [];
  public sortArray = ref<iSortData[]>([]);
  public filterArray: iFilterData[] = [];
  public dataHandler?: iDatahandler;
  public H_datagridRef: any = {};
  public dataRowTemplate: any = null;
  public haveDataRowTemplate = false;
  public changeCounter = ref(0);
  public expandList: string[] = [];
  // public groupList: string[] = ["val2", "val3", "val4"];"
  public groupList: string[] = ["val2", "val4", "val7"];
  public rowStyle?: Function = undefined;
  public adjustColumns?: iColumnsResizing;
  public insObserver?: IntersectionObserver;

  loadColumns(slots: Slots, guid: string, H_datagridRef: any) {
    this.H_datagridRef = H_datagridRef;
    const style = document.createElement("style");
    document.body.appendChild(style) as HTMLStyleElement;
    this.StyleSheet = style.sheet! as CSSStyleSheet;

    const slotData = this.getSlotsData(slots, "H_column");
    if (slotData.length < 1) return;
    const tempColumns: any = [];
    slotData.forEach((item: any, index: number) => {
      const className = `col-${index}`;
      this.StyleSheet.insertRule(`.${guid} .col-${index.toString()} { max-width: ${item.props.width}}`);
      const cssList = Array.from(this.StyleSheet.cssRules);
      const column: icolumnData = {
        dom: null,
        className: className,
        cssRule: cssList[0] as CSSStyleRule,
        visibel: ref(item.props.visibel ?? true),
        props: {
          field: item.props.field,
          title: item.props.title ?? item.props.field,
          type: item.props.type,
          width: item.props.width,
          autoHeight: item.props["auto-height"] === "" ? true : false,
          className: item.props.className,
          format: item.props.format,
          cell_style: item.props.cell_style,
          select_list: item.props.select_list,
          no_sorting: item.props.no_sorting ?? false,
          sorting: item.props.sorting,
          sortIndex: item.props["sort-index"],
          filter_type: item.props.filter_type,
          filter_condition1: item.props.filter_condition ?? "none",
          filter_condition2: item.props.filter_condition ?? "none",
          filter_value1: item.props.filter_value1,
          filter_value2: item.props.filter_value2,
          visibel: item.props.visibel ?? true
        },
        filter: reactive({
          field: item.props.field,
          condition1: item.props.filter_condition1 ?? "",
          condition2: item.props.filter_condition2 ?? "",
          value1: item.props.filter_value1 ?? "",
          value2: item.props.filter_value2 ?? "",
          logical: "and",
          type: item.props.filter_type ?? "none",
          active: false
        }),
        slot: item.children,
        index: index,
        orgIndex: index,
        width: item.props.width
      };

      column.cssRule.style.minWidth = column.props.width;
      column.cssRule.style.whiteSpace = column.props.autoHeight === true ? "break-spaces" : "nowrap";
      column.filter.active = column.filter.value1 !== "";
      tempColumns.push(column);
    });

    this.columns = tempColumns;
    this.updateSortArray();
    this.updateFilterArray();
    this.updateExpandList();
    this.updateGroupList(this.groupList);
    this.createObserver();
  }

  getVisibelColumns() {
    return this.columns.filter((item) => item.visibel.value);
  }

  getSlotsData(slots: Slots, name: string) {
    if (!slots || !slots.default) return [];
    this.dataRowTemplate = slots.dataRow;
    this.haveDataRowTemplate = this.dataRowTemplate !== undefined;
    const sl = slots.default().filter((vnode: any) => {
      return vnode.type.name === name;
    });
    return sl;
  }

  createObserver() {
    let options = {
      root: null
    };

    this.insObserver = new IntersectionObserver(this.handleIntersect, options);
  }

  handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const s = entry.target as HTMLElement;
        if (s.dataset.row) {
          const row = JSON.parse(s.dataset.row);
          console.log("OPSERVES ", row);
          this.dataHandler?.moreRows(row);
        }

        observer.unobserve(entry.target);
      }
    });
  };

  columnsChange() {
    this.changeCounter.value++;
  }

  updateSortArray() {
    const sArray: any[] = [];
    this.columns.forEach((item: icolumnData) => {
      if (item.props.sorting && item.props.sorting !== "none") {
        sArray.push({ field: item.props.field, direction: item.props.sorting, index: item.props.sortIndex });
      }
    });

    sArray.sort((a, b) => a.index - b.index);
    sArray.sort((a, b) => a.index - b.index).map((item) => ({ field: item.field, direction: item.direction }));

    this.sortArray.value = sArray;
    this.dataHandler?.setSorting(this.sortArray.value);
  }

  updateFilterArray() {
    const sArray: iFilterData[] = [];
    this.columns.forEach((item) => {
      if (item.filter.active) {
        sArray.push(item.filter);
      }
    });
    this.filterArray = sArray;
    this.expandList = [];
    this.dataHandler?.setFilter(this.filterArray);
  }

  updateGroupList(groupList: string[]) {
    this.groupList = groupList;
    this.dataHandler?.setGrouping(groupList);
  }

  expandRow(row: any) {
    console.log("Expand", row);
    this.dataHandler?.expanding(row);
  }

  moreRows(row: any) {
    this.dataHandler?.moreRows(row);
  }

  updateExpandList() {
    this.dataHandler?.setExpanding(this.expandList);
  }

  updateSeekFilterList(_seekFilterList: string[]) {
    this.dataHandler?.setSeekFilterList(_seekFilterList);
  }

  updateSeekFilterString(_seekFilterString: string) {
    this.dataHandler?.setseekFilterString(_seekFilterString);
  }
}
