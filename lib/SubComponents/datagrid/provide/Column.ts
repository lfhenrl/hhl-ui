import { type Ref, reactive, ref, watch } from "vue";
import { type iDgrid } from "./Dgrid";
import { type iFilterData } from "./datagridTypes";
import { debounce } from "../../../utils/debounce";
import { D_01_dec_2021, D_01_dec_2021_HHMMSS } from "../../../utils/dateFormat";

export type iColumn = InstanceType<typeof Column>;

export class Column {
  public Dgrid: iDgrid;
  public dom: HTMLElement | null;
  private filtType: string = "none";
  public props: {
    field: string;
    title: string;
    type: string;
    width: string;
    autoWidth: boolean;
    autoHeight: boolean;
    cell_class: string;
    format: Function;
    cell_style: Function;
    select_list: [];
    sorting: string;
    sortIndex: number;
    filter: string;
    filter_condition1: string;
    filter_condition2: string;
    filter_value1: string;
    filter_value2: string;
    filter_logical: string;
    visibel: boolean;
  };
  public filter: iFilterData;
  public slot: any;
  public index: number;
  public orgIndex: number;
  public width = ref("auto");
  public head_width = ref("auto");
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
      autoWidth: item.props["auto-width"] === false ? false : true,
      autoHeight: item.props["auto-height"] === true ? true : false,
      cell_class: item.props.cell_class,
      format: this.getFormat(item.props),
      cell_style: item.props.cell_style,
      select_list: item.props.select_list,
      sorting: item.props.sorting,
      sortIndex: item.props["sort-index"] ?? 1000,
      filter: item.props.filter,
      filter_condition1: item.props.filter_condition1 ?? "",
      filter_condition2: item.props.filter_condition2 ?? "",
      filter_value1: item.props.filter_value1,
      filter_value2: item.props.filter_value2,
      filter_logical: item.props.filter_logical,
      visibel: item.props.visibel ?? true,
    };
    this.filtType = this.props.type;
    if (this.filtType === "action") this.filtType = "none";
    if (this.props.filter === "none") this.filtType = "none";
    if (this.props.filter === "select") this.filtType = "select";

    this.filter = reactive({
      field: this.props.field,
      condition1: this.props.filter_condition1 ?? "",
      condition2: this.props.filter_condition2 ?? "",
      value1: this.props.filter_value1 ?? "",
      value2: this.props.filter_value2 ?? "",
      logical: this.props.filter_logical ?? "and",
      type: this.filtType,
      active: this.props.filter_condition1 !== "" && this.props.filter_value1 !== "" ? true : false,
    });
    const sd: string = this.props.sorting === undefined || this.props.sorting === "none" ? "none" : this.props.sorting;
    this.sortDirection = ref(sd);
    this.sortIndex = ref(0);
    this.slot = item.children;
    this.index = index;
    this.orgIndex = index;
    this.width.value = item.props.width;
    this.head_width.value = item.props.width;
    this.autoWidth =
      item.props.width === undefined || (item.props.width === "auto" && item.props.autoWidth === true) ? true : false;
    this.maxValue = "x";
    watch(this.sortDirection, () => this.Dgrid.Sorting.update(this));
    this.debouncedUpdate();
  }

  getFormat(props: any) {
    if (props.format) {
      return props.format;
    }
    if (props.type === "date") {
      return this.formatDate;
    }
    if (props.type === "datetime") {
      return this.formatDateTime;
    }
    return props.format;
  }

  formatDate(value: any) {
    return D_01_dec_2021(value);
  }

  formatDateTime(value: any) {
    return D_01_dec_2021_HHMMSS(value);
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
      this.head_width.value = Math.max(textW, headW) + "px";
    }, 10);
  }, 20);
}
