import { ref } from "vue";
import { iSortData, iFilterData } from "../../provide/datagridTypes";
import Sorting from "./sorting/sorting";
import { filtering } from "./filter/filtering";
import { grouping } from "./grouping";
import { debounce } from "../../../../utils/debounce";
import Excel from "../../../../utils/exportToExcel";
import { icolumnData } from "../../provide/datagridTypes";

export class localData {
  public rows = ref<any[]>([]);
  public rowsCount = ref(0);
  public rowsCountTotal = ref(0);
  private dataSource: any[] = [];
  private sortArray: iSortData[] = [];
  private filterArray: iFilterData[] = [];
  private expandList: string[] = [];
  private groupList: string[] = [];
  private newDataEvent: any;

  debouncedUpdate = debounce(async () => {
    if (this.dataSource.length < 1) return;
    const filterData = await filtering(this.dataSource, this.filterArray);
    const sortData = await Sorting.Sort(this.sortArray, filterData);
    const groupData = await grouping(sortData, this.groupList, this.expandList);
    this.rowsCount.value = sortData.length;
    this.rows.value = groupData;
    this.newDataEvent();
  }, 50);

  public async setDataSource(_dataSource: any[]) {
    this.dataSource = (await _dataSource) ?? [];
    this.rowsCountTotal.value = _dataSource.length;
  }

  public loadData() {
    this.debouncedUpdate();
  }

  public async setSorting(_sortArray: iSortData[], _expandList: string[]) {
    this.sortArray = _sortArray;
    this.expandList = _expandList;
    this.loadData();
  }

  public setFilter(_filterArray: iFilterData[], _expandList: string[]) {
    this.filterArray = _filterArray;
    this.expandList = _expandList;
    this.loadData();
  }

  public setGrouping(_groupList: string[]) {
    this.groupList = _groupList;
    this.loadData();
  }

  public setExpanding(_expandList: string[]) {
    this.expandList = _expandList;
    this.loadData();
  }

  public toExcel(Columns: any) {
    const fields: any = {};
    Columns.forEach((item: icolumnData) => {
      const it = {
        type: item.props.type,
        title: item.props.title
      };
      fields[item.props.field] = it;
    });

    Excel.load(this.rows.value, fields, "GridData");
  }

  public async getSelectList(field: string) {
    const objArr = this.dataSource.reduce((acc: any, obj: any) => {
      let key = obj[field];
      if (!acc[key]) {
        acc[key] = key;
      }

      return acc;
    }, {});
    return Object.values(objArr);
  }
}
