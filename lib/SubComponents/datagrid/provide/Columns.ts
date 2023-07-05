import { Slots, ref, reactive } from "vue";
import { iSortData, icolumnData, iFilterData } from "./datagridTypes";

export type iColumns = InstanceType<typeof Columns>;

export class Columns {
  // private isResized = false;
  public TableDom: any = null;
  public StyleSheet = {} as CSSStyleSheet;
  public columns: icolumnData[] = [];
  public sortArray = ref<iSortData[]>([]);
  public filterArray: iFilterData[] = [];
  public dataHandler: any = {};
  public H_datagridRef: any = {};
  public dataRowTemplate: any = null;
  public haveDataRowTemplate = false;
  public changeCounter = ref(0);
  public expandList: string[] = [];
  public groupList: string[] = ["val2", "val3", "val4"];

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
        className,
        cssRule: cssList[0] as CSSStyleRule,
        visibel: ref(item.props.visibel ?? true),
        props: {
          field: item.props.field,
          title: item.props.title ?? item.props.field,
          type: item.props.type,
          width: item.props.width,
          className: item.props.className,
          format: item.props.format,
          cell_style: item.props.cell_style,
          row_style: item.props.row_style,
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
      column.filter.active = column.filter.value1 !== "";
      tempColumns.push(column);
    });

    this.columns = tempColumns;
    this.updateSortArray();
    this.updateFilterArray();
    this.updateExpandList();
    this.updateGroupList(this.groupList);
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

  columnsChange() {
    this.changeCounter.value++;
  }

  updateSortArray() {
    const sArray: any[] = [];
    this.columns.forEach((item: icolumnData) => {
      if (item.props.sorting) {
        sArray.push({ field: item.props.field, direction: item.props.sorting, index: item.props.sortIndex });
      }
    });

    sArray.sort((a, b) => a.index - b.index);
    sArray.sort((a, b) => a.index - b.index).map((item) => ({ field: item.field, direction: item.direction }));

    this.sortArray.value = sArray;
    this.dataHandler.setSorting(this.sortArray.value);
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
    this.dataHandler.setFilter(this.filterArray, this.expandList);
  }

  updateGroupList(groupList: string[]) {
    this.groupList = groupList;
    this.dataHandler.setGrouping(groupList);
  }

  updateExpandList() {
    this.dataHandler.setExpanding(this.expandList);
  }
}
