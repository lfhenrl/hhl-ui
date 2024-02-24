import { Ref, reactive, ref, watch } from "vue";
import { iDgrid } from "./Dgrid";
import { iFilterData } from "./datagridTypes";
import { debounce } from "../../../utils/debounce";

export type iColumn = InstanceType<typeof Column>;

export class Column {
  public Dgrid: iDgrid;
  public dom: HTMLElement | null;
  public props: {
    field: string;
    title: string;
    type: string;
    width: string;
    autoHeight: boolean;
    className: string;
    format: Function;
    cell_style: Function;
    select_list: [];
    no_sorting: boolean;
    sorting: string;
    sortIndex: number;
    filter_type: string;
    filter_condition1: string;
    filter_condition2: string;
    filter_value1: string;
    filter_value2: string;
    visibel: boolean;
  };
  public filter: iFilterData;
  public slot: any;
  public index: number;
  public orgIndex: number;
  public width = ref("auto");
  public autoWidth: boolean;
  public maxValue = "x";
  public maxValueRef = ref("x");
  public visibel: Ref<boolean> = ref(true);
  public sortDirection: Ref<string>;
  public sortIndex: Ref<number>;

  constructor(_Dgrid: iDgrid, item: any, index: number) {
    this.Dgrid = _Dgrid;
    this.dom = null;
    this.visibel = ref(item.props.visibel ?? true);
    this.props = {
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
      sortIndex: item.props["sort-index"] ?? 1000,
      filter_type: item.props.filter_type,
      filter_condition1: item.props.filter_condition ?? "none",
      filter_condition2: item.props.filter_condition ?? "none",
      filter_value1: item.props.filter_value1,
      filter_value2: item.props.filter_value2,
      visibel: item.props.visibel ?? true,
    };

    this.filter = reactive({
      field: item.props.field,
      condition1: item.props.filter_condition1 ?? "",
      condition2: item.props.filter_condition2 ?? "",
      value1: item.props.filter_value1 ?? "",
      value2: item.props.filter_value2 ?? "",
      logical: "and",
      type: item.props.filter_type ?? "none",
      active: false,
    });
    const sd: string = this.props.sorting === undefined || this.props.sorting === "none" ? "none" : this.props.sorting;
    this.sortDirection = ref(sd);
    this.sortIndex = ref(0);
    this.slot = item.children;
    this.index = index;
    this.orgIndex = index;
    this.width.value = item.props.width;
    this.autoWidth = item.props.width === undefined || item.props.width === "auto" ? true : false;
    this.maxValue = "x";
    watch(this.sortDirection, () => this.Dgrid.Sorting.update(this));
    this.debouncedUpdate();
  }

  setMaxValue(val: string) {
    this.maxValue = val;
    if (this.autoWidth) {
      this.debouncedUpdate();
    }
  }
  debouncedUpdate = debounce(async () => {
    this.maxValueRef.value = this.maxValue;
    setTimeout(() => {
      const spaceDiv = this.dom?.querySelector(".H_HeadCell-space") as HTMLElement;
      const textW = spaceDiv?.offsetWidth! + 6;
      let headW = this.dom?.offsetWidth! + 1;
      this.width.value = Math.max(textW, headW) + "px";
    }, 10);
  }, 20);
}
