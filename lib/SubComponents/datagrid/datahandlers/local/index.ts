import { ref, toRaw } from "vue";
import { iSortData, iFilterData } from "../../provide/datagridTypes";
import Sorting from "./sorting/sorting";
import { filtering } from "./filter/filtering";
import { groupBy } from "./grouping";
import { debounce } from "../../../../utils/debounce";
import Excel from "../../../../utils/exportToExcel";
import { icolumnData } from "../../provide/datagridTypes";

export type iDatahandler = InstanceType<typeof localData>;

export class localData {
  public rows = ref<any[]>([]);
  public rowsCount = ref(0);
  public rowsLoading = ref(false);
  public rowsCountTotal = ref(0);
  public MaxSizeRow: any = ref();
  public _MaxSizeRow: any = {};
  private SizeStore: any = {};
  public dataSource: any[] = [];
  public sortData: any[] = [];
  public groupData: any[] = [];
  private sortArray: iSortData[] = [];
  public filterArray: iFilterData[] = [];
  private groupList: string[] = [];
  public seekFilterList: string[] = [];
  public seekFilterString: string = "";
  public newDataEvent: any;

  debouncedUpdate = debounce(async () => {
    if (this.dataSource.length < 1) {
      this.rowsLoading.value = false;
      return;
    }

    const filterData = await filtering(this);
    this.sortData = await Sorting.Sort(this.sortArray, filterData);
    if (this.groupList.length > 0) {
      this.groupData = await groupBy(this.groupList[0], this.sortData, 0, "");
    } else {
      this.groupData = this.sortData;
    }

    this.rowsCount.value = this.sortData.length;
    this.makeCalcMaxRowSize(this.groupData);

    console.log("groupData", this.groupData);
    this.rows.value = this.groupData;
    this.newDataEvent();
    this.rowsLoading.value = false;
  }, 50);


  public async setDataSource(_dataSource: any[]) {
    this.dataSource = (await _dataSource) ?? [];
    this.rowsCountTotal.value = _dataSource.length;
    this.makeMaxRowStore();
  }

  private makeMaxRowStore() {
    if (this.rowsCountTotal.value > 0) {
      this.SizeStore = {};
      this._MaxSizeRow = structuredClone(this.dataSource[0]);

      for (const key in this._MaxSizeRow) {
        this.SizeStore[key] = 1;
      }
    }
  }

  private makeCalcMaxRowSize(data: any[]) {
    const slicedArray = data.slice(0, 100);
    slicedArray.forEach((item: any) => {
      if (item._type === "group") return;
      for (const key in item) {
        const val = item[key];
        const valStr: string = val?.toString() ?? "";
        if (valStr && this.SizeStore[key] < valStr.length) {
          this.SizeStore[key] = valStr.length;
          this._MaxSizeRow[key] = val;
        }
      }
    });
    console.log(this.SizeStore, this._MaxSizeRow);
    this.MaxSizeRow.value = null;
    this.MaxSizeRow.value = this._MaxSizeRow;
  }

  public loadData() {
    this.rowsLoading.value = true;
    this.debouncedUpdate();
  }

  public async setSorting(_sortArray: iSortData[]) {
    this.sortArray = _sortArray;
    this.loadData();
  }

  public setFilter(_filterArray: iFilterData[]) {
    this.filterArray = _filterArray;
    this.loadData();
  }

  public setGrouping(_groupList: string[]) {
    this.groupList = _groupList;
    this.loadData();
  }

  public async expanding(row: any) {
    const index = this.groupData.indexOf(toRaw(row));

    if (row.expanded) {
      this.groupData.splice(index + 1, row.count);
      row.expanded = false;
    } else {
      const parentArr = row.id.split("/");
      const raw = this.sortData.filter((item) => {
        for (let i = 0; i < row.level + 1; i++) {
          if (item[this.groupList[i]] !== parentArr[i]) {
            return false;
          }
        }
        return true;
      });

      if (this.groupList.length > row.level + 1) {
        const GroupProp = this.groupList[row.level + 1];
        const rr = await groupBy(GroupProp, raw, row.level + 1, row.id);
        row.count = rr.length;
        this.groupData.splice(index + 1, 0, ...rr);
      } else {
        this.groupData.splice(index + 1, 0, ...raw);
      }

      this.rows.value = this.groupData;
      row.expanded = true;

      console.log("RRRR ", index);
    }
  }

  public setExpanding(_expandList: string[]) {
    this.loadData();
  }

  public setSeekFilterList(_seekFilterList: string[]) {
    this.seekFilterList = _seekFilterList;
    this.loadData();
  }

  public setseekFilterString(_seekFilterString: string) {
    this.seekFilterString = _seekFilterString;
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
