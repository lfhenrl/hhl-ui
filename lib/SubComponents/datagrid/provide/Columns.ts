import { ref, Slots } from "vue";
import { iDatagrid } from ".";
import { icolumnData } from "../datagridTypes";

export class Columns {
  public columns = ref<icolumnData[]>([]);
  constructor(public slots: Slots, public dg: iDatagrid) {
    this.loadColumns();
  }

  loadColumns() {
    const slotData = this.dg.getSlotsData(this.slots, "H_column");
    if (slotData.length > 0) {
      const tempColumns: any = [];

      slotData.forEach((item: any, index: number) => {
        const f_active = this.filterActive(
          item.props.filter_type,
          item.props.filter_value1,
          item.props.filter_value1,
          item.props.filter_condition ?? "none"
        );
        const className = `col-${index}`;

        const column: icolumnData = {
          dom: null,
          visibel: item.props.visibel ?? true,
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
            sortIndex: item.props.sortIndex,
            filter_type: item.props.filter_type,
            filter_condition: item.props.filter_condition ?? "none",
            filter_value1: item.props.filter_value1,
            filter_value2: item.props.filter_value2,
            visibel: item.props.visibel ?? true
          },
          slot: item.children,
          index: index,
          orgIndex: index,
          className,
          width: 0,
          maxWidth: 0,
          minWidth: 0,
          sort: {
            field: item.props.field,
            index: this.getSortIndex(item),
            sorting: item.props.sorting ?? "none",
            default_index: this.getSortIndex(item),
            default_sorting: item.props.sorting ?? "none",
            no_sorting: item.props.no_sorting === "" ? true : false,
            organize: this.SortOrganize.bind(this),
            count: this.getSortCount.bind(this)
          },
          filt: {
            active: f_active,
            isValid: true,
            default_active: f_active,
            field: item.props.field,
            condition: item.props.filter_condition ?? "none",
            default_condition: item.props.filter_condition ?? "none",
            value1: item.props.filter_value1 ?? "",
            value2: item.props.filter_value2 ?? "",
            default_value1: item.props.filter_value1 ?? "",
            default_value2: item.props.filter_value2 ?? "",
            type: item.props.filter_type ?? "none",
            selectList: item.props.select_list ?? [],
            autoSelectList: item.props.filter_type === "select" && !item.props.select_list ? true : false
          }
        };
        this.classInit(index);
        if (column.filt.default_value1 === "") {
          column.filt.condition = "none";
          column.filt.default_condition = "none";
          column.filt.value2 = "";
          column.filt.default_value2 = "";
        }
        tempColumns.push(column);
      });

      this.columns.value = tempColumns;
      this.SortOrganize();
    }
  }

  classInit(index: number) {
    this.dg.StyleSheet.insertRule(`.${this.dg.ClassGuid} .col-${index.toString()} { width: 0 }`);
  }
  SortOrganize() {
    const cols = this.getSortColumns();
    const colsSorted = cols.sort((a, b) => a.sort.index - b.sort.index);
    colsSorted.forEach((item: icolumnData, i) => (item.sort.index = i));
  }
  getSortIndex(col: icolumnData) {
    if (col.props.sorting === "none" || !col.props.sorting) {
      return 1000;
    } else {
      if (col.props.sortIndex && col.props.sortIndex < 1000) {
        return col.props.sortIndex;
      }
      return this.getSortCount();
    }
  }

  getSortCount() {
    const sColumns = this.getSortColumns();
    return sColumns.length;
  }

  getSortColumns(): Array<icolumnData> {
    return this.columns.value.filter((item: icolumnData) => item.sort.index < 1000);
  }

  filterActive(type: string = "none", _value1: string = "", _value2: string = "", condition = "none") {
    if (type === "none") return false;
    if (_value1 === "") return false;
    if (condition === "none") return false;
    if (type === "select" && _value1 === "") return false;
    if (type === "bool" && _value1 === "") return false;
    if (type === "date" && _value1 === null) return false;
    if (type === "dateTime" && _value1 === null) return false;
    return true;
  }
}
