import { ref } from "vue";
import { iSortData, iFilterData } from "../../provide/datagridTypes";
import { getFilterList } from "./filter/getFilterList";
import { debounce } from "../../../../utils/debounce";
import Excel from "../../../../utils/exportToExcel";
import { icolumnData } from "../../provide/datagridTypes";
import { hhlFetch } from "../../../../utils/hhlFetch";

export type iDatahandler = InstanceType<typeof odata>;

export class odata {
  public rows = ref<any[]>([]);
  public rowsCount = ref(0);
  public rowsLoading = ref(false);
  public rowsCountTotal = ref(0);
  public MaxSizeRow: any = ref();
  public _MaxSizeRow: any = {};
  private SizeStore: any = {};
  public dataSource: any[] = [];
  public groupData: any[] = [];
  // public filterArray: iFilterData[] = [];
  private expandList: string[] = [];
  private groupList: string[] = [];
  public seekFilterList: string[] = [];
  public seekFilterString: string = "";
  public newDataEvent: any;

  public Url: string = "";
  private dataFetch: hhlFetch;
  private Qpara: any = {
    Take: 100,
    Skip: 0
  };

  private CountPara: any = {
    Select: ["Count(*) as count"]
  };

  constructor(_Url: string) {
    this.Url = _Url;
    this.dataFetch = new hhlFetch(_Url);
  }

  debouncedUpdate = debounce(async () => {
    // if (this.dataSource.length < 1) {
    //   this.rowsLoading.value = false;
    //   return;
    // }

    const count: any = await this.dataFetch.post("", this.CountPara);
    this.rowsCountTotal.value = count.data[0].count;

    const data: any = await this.dataFetch.post("", this.Qpara);

    this.groupData = data.data;
    console.log("odata: ", data.data);
    this.groupData.push({ _type: "loadmore", nextPage: 100, level: 0, root: [] });

    this.makeCalcMaxRowSize(this.groupData);

    console.log("groupData", this.groupData);
    this.rows.value = this.groupData;
    this.rowsCount.value = this.rows.value.length - 1;
    this.newDataEvent();
    this.rowsLoading.value = false;
  }, 50);

  public async setDataSource() {
    this.makeMaxRowStore();
    this.debouncedUpdate();
  }

  public async moreRows(row: any) {
    this.groupData.pop();
    this.Qpara.Skip = this.Qpara.Skip + this.Qpara.Take;
    const data: any = await this.dataFetch.post("", this.Qpara);

    this.groupData = this.groupData.concat(data.data);
    this.groupData.push({ _type: "loadmore", nextPage: 200, level: 0, root: [] });
    console.log("groupData", this.groupData);
    this.rows.value = this.groupData;
    this.rowsCount.value = this.rows.value.length - 1;
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
    this.Qpara.Order = _sortArray.map((item: iSortData) => {
      return { field: item.field, desc: item.direction === "up" ? false : true };
    });

    this.loadData();
  }

  public setFilter(_filterArray: iFilterData[]) {
    const filter = getFilterList(_filterArray);
    this.Qpara.Filter = filter;
    this.CountPara.Filter = filter;
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
