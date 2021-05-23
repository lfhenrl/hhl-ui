import { ref, Slots } from "vue";
import { iDatagrid } from ".";

export type icolumnData = {
  dom: HTMLElement | null;
  props: any;
  slot: any;
  index: number;
  orgIndex: number;
  className: string;
  width: number;
  maxWidth: number;
  minWidth: number;
  sortIndex: number;
  sorting: string;
  filter_type: string;
  filter_active: boolean;
  filter_value: any;
  filter_value_2: any;
  filter_condition: string;
  defaults: {
    sorting: string;
    filter_value: any;
    filter_value_2: any;
    filter_condition: string;
  };
};

export class Columns {
  public columns = ref<icolumnData[] | unknown[]>([]);
  constructor(public slots: Slots, public dg: iDatagrid) {
    this.loadColumns();
  }

  loadColumns() {
    if (this.slots && this.slots.default) {
      this.slots
        .default()
        .filter((vnode: any) => {
          return vnode.type.name === "hhl-column";
        })
        .forEach((item: any, index: number) => {
          const f_condition = this.filterCondition(item.props.filter_type, item.props.filter_condition);
          const f_type = item.props.filter_type ?? "none";
          const f_active = this.filterActive(item.props.filter_type, item.props.filter_value, f_condition);
          const className = `col-${index}`;
          const column: icolumnData = {
            dom: null,
            props: item.props,
            slot: item.children,
            index: index,
            orgIndex: index,
            className,
            width: 0,
            maxWidth: 0,
            minWidth: 0,
            sorting: item.props.sorting ?? "none",
            sortIndex: item.props.sorIndex ?? 1000,
            filter_active: f_active,
            filter_type: f_type,
            filter_value: this.filterValue(item.props.filter_value, f_type),
            filter_value_2: this.filterValue(item.props.filter_value_2, f_type),
            filter_condition: f_condition,
            defaults: {
              sorting: item.props.sorting ?? "none",
              filter_value: this.filterValue(item.props.filter_value, f_type),
              filter_value_2: this.filterValue(item.props.filter_value_2, f_type),
              filter_condition: f_condition
            }
          };
          this.classInit(index);
          this.columns.value.push(column);
        });
    }
  }

  classInit(index: number) {
    this.dg.StyleSheet.insertRule(`.${this.dg.ClassGuid} .col-${index.toString()} { width: 0 }`);
  }

  filterCondition(f_type: string = "none", f_condition = "none") {
    if (f_type === "none") return "none";
    if (f_condition !== "none") return f_condition;

    switch (f_type) {
      case "string":
        return "contains";
      case "number":
        return "=";
      case "bool":
        return "in";
      case "date":
        return ">";
      case "dateTime":
        return ">";
      case "select":
        return "in";
      default:
        return "none";
    }
  }

  filterActive(f_type: string = "none", f_value: string = "", f_value_2: string = "", f_condition = "none") {
    if (f_type === "none") return false;
    if (f_value === "") return false;
    if (f_condition === "none") return false;
    if (f_type === "select" && f_value === "*") return false;
    if (f_type === "bool" && f_value.length === 3) return false;
    if (f_type === "date" && f_value === null) return false;
    if (f_type === "dateTime" && f_value === null) return false;
    if (f_condition === ">==<" && f_value === "") return false;
    if (f_condition === ">==<" && f_value_2 === "") return false;
    if (f_condition === ">==<" && f_value === null) return false;
    if (f_condition === ">==<" && f_value_2 === null) return false;
    return true;
  }

  filterValue(filterValue: any, filterType: string) {
    if (filterType === "bool" && !filterValue) return ["true", "false", "null"];
    if (filterType === "select" && !filterValue) return "*";
    if (filterType === "date" && !filterValue) return null;
    if (filterType === "dateTime" && !filterValue) return null;
    return "";
  }
}
