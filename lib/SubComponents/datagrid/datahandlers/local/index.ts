import { ref } from "vue";
import { iSortData, iFilterData } from "../../provide/datagridTypes";
import Sorting from "./sorting/sorting";
import { filtering } from "./filter/filtering";
import { grouping } from "./grouping";
import { debounce } from "../../../../utils/debounce";
import Excel from "../../../../utils/exportToExcel";
import { icolumnData } from "../../provide/datagridTypes";

export type iDatahandler = InstanceType<typeof localData>;

export class localData {
  public rows = ref<any[]>([]);
  public rowsCount = ref(0);
  public rowsLoading = ref(false);
  public rowsCountTotal = ref(0);
  public MaxSizeRow:any = ref();
  public dataSource: any[] = [];
  private sortArray: iSortData[] = [];
  public filterArray: iFilterData[] = [];
  private expandList: string[] = [];
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
    const sortData = await Sorting.Sort(this.sortArray, filterData);
    const groupData = await grouping(sortData, this.groupList, this.expandList);
    this.rowsCount.value = sortData.length;
    this.rows.value = groupData;
    this.newDataEvent();
    this.rowsLoading.value = false;
  }, 50);

  public async setDataSource(_dataSource: any[]) {
    this.dataSource = (await _dataSource) ?? [];
    this.rowsCountTotal.value = _dataSource.length;
    this.makeCalcMaxRowSize();
    

  }

  private makeCalcMaxRowSize() {

    if (this.rowsCountTotal.value>0) {
      const SizeStore:any = {};
      const MaxSizeRow = structuredClone(this.dataSource[0])

      for (const key in MaxSizeRow) {
        SizeStore[key] = 1;      
      }

    const slicedArray = this.dataSource.slice(0, 100);
    slicedArray.forEach((item:any) => {
      for (const key in item) {
            const val = item[key];
            const valStr:string = val?.toString() ?? "";
            if(valStr && SizeStore[key] < valStr.length) {
             SizeStore[key] = valStr.length;
              MaxSizeRow[key] = val

            }  
      }        
        
    })
    console.log(SizeStore,MaxSizeRow)
    this.MaxSizeRow.value = MaxSizeRow;
    }

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
    this.expandList = [];
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
