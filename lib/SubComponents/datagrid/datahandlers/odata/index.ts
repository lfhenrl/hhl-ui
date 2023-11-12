import { ref } from "vue";
import { iSortData, iFilterData } from "../../provide/datagridTypes";
import { getFilterList } from "./getFilterList";
import { setCounters } from "./setCounters";
import { setGroupList } from "./setGroupList";
import { setFlatList } from "./setFlatList";
import { setMoreRows } from "./setMoreRows";
import { setFlatListExpand } from "./setFlatListExpand";
import { setGroupListExpand } from "./setGroupListExpand";
import { debounce } from "../../../../utils/debounce";
import Excel from "../../../../utils/exportToExcel";
import { icolumnData } from "../../provide/datagridTypes";
import { hhlFetch } from "../../../../utils/hhlFetch";

export type iDatahandler = InstanceType<typeof odata>;

export class odata {
  public rows = ref<any[]>([]);
  public rowsCount = ref(0);
  public rowsLevel0_Count = 0;
  public rowsLoading = ref(false);
  public rowsCountTotal = ref(0);
  public MaxSizeRow: any = ref();
  public _MaxSizeRow: any = {};
  private SizeStore: any = {};
  public dataSource: any[] = [];
  public filterArray: any[] = [];
  public OrderArray: any[] = [];
  public expandList: string[] = [];
  public groupList: string[] = [];
  public seekFilterList: string[] = [];
  public seekFilterString: string = "";
  public newDataEvent: any;

  public Url: string = "";
  public dataFetch: hhlFetch;
  public pageSize = 25;

  constructor(_Url: string) {
    this.Url = _Url;
    this.dataFetch = new hhlFetch(_Url);
  }

  debouncedUpdate = debounce(async () => {
    await setCounters(this);

    if (this.groupList.length > 0) {
      await setGroupList(this);
    } else {
      await setFlatList(this);
    }

    this.makeCalcMaxRowSize(this.rows.value);

    this.newDataEvent();
    this.rowsLoading.value = false;
  }, 50);

  public async setDataSource() {
    this.makeMaxRowStore();
    this.debouncedUpdate();
  }

  public async moreRows(row: any) {
    const index = this.rows.value.findIndex((item) => item.id === row.id);
    await setMoreRows(this, row, index);
  }

  public async expanding(row: any) {
    const index = this.rows.value.findIndex((item) => item.id === row.id);
    if (row.expanded) {
      const moreRowsIndex = this.rows.value.findIndex(
        (item) => item.Pid === row.id,
      );
      if (moreRowsIndex) this.rows.value.splice(moreRowsIndex, 1);
      this.rows.value.splice(index + 1, row.rowsLoaded);
      row.rowsLoaded = 0;
      row.expanded = false;
    } else {
      if (this.groupList.length > row.level + 1) {
        await setGroupListExpand(this, row, index);
      } else {
        await setFlatListExpand(this, row, index);
      }

      row.expanded = true;
    }
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
    this.OrderArray = _sortArray.map((item: iSortData) => {
      return {
        field: item.field,
        desc: item.direction === "up" ? false : true,
      };
    });

    this.loadData();
  }

  public setFilter(_filterArray: iFilterData[]) {
    this.filterArray = getFilterList(_filterArray);
    this.expandList = [];
    this.loadData();
  }

  public setGrouping(_groupList: string[]) {
    this.groupList = _groupList;
    // this.loadData();
  }

  public setExpanding(_expandList: string[]) {
    this.expandList = _expandList;
    // this.loadData();
  }

  public setSeekFilterList(_seekFilterList: string[]) {
    this.seekFilterList = _seekFilterList;
    //this.loadData();
  }

  public setseekFilterString(_seekFilterString: string) {
    this.seekFilterString = _seekFilterString;
    // this.loadData();
  }

  public toExcel(Columns: any) {
    const fields: any = {};
    Columns.forEach((item: icolumnData) => {
      const it = {
        type: item.props.type,
        title: item.props.title,
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
