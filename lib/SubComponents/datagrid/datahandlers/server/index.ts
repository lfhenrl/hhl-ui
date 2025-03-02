import { Ref, ref } from "vue";
import { iDgrid } from "../../provide/Dgrid";
import { hhlFetch } from "../../../../utils/hhlFetch";
import { getFilterList } from "./getFilterList";
import { getSortList } from "./getSortList";
import { setFlatList } from "./setFlatList";
import { setMoreRows } from "./setMoreRows";
import { setGroupList } from "./setGroupList";
import { setGroupListExpand } from "./setGroupListExpand";
import { setFlatListExpand } from "./setFlatListExpand";
import type { iServerData } from "../../provide/datagridTypes";

export type iDatahandler = InstanceType<typeof serverData>;
export class serverData {
  public Dgrid?: iDgrid;
  public dataKey = "";
  public Url: string = "";
  public outData: Ref<unknown[]> = ref([]);
  public rowsCount = ref(0);
  public rowsCountTotal = ref(0);
  public rowsLoading = ref(false);
  public groupList: string[] = [];
  public pageSize = 200;
  public dataFetch: hhlFetch;
  public filterArray: any[] = [];
  public OrderArray: any[] = [];
  public scrollPos = 0;

  constructor(_url: string = "") {
    this.Url = _url;
    this.dataFetch = new hhlFetch(_url);
  }

  init(_Dgrid: iDgrid) {
    this.Dgrid = _Dgrid;
    this.pageSize = _Dgrid.PageSize;
  }

  public async loadData() {
    this.pageSize = this.Dgrid?.PageSize ?? this.pageSize;
    this.Dgrid?.Vscroller?.reset();
    this.outData.value = [];

    await this.startLoading();
    this.filterArray = getFilterList(this.Dgrid?.Filter ?? []);
    this.OrderArray = getSortList(this.Dgrid?.Sorting.sortArray ?? []);

    setTimeout(async () => {
      this.Dgrid?.Vscroller?.reset();
      // await setCounters(this);
      if (this.groupList.length > 0) {
        await setGroupList(this);
      } else {
        await setFlatList(this);
      }
      this.rowsLoading.value = false;
    }, 1);
  }

  public async moreRows(row: any) {
    await this.startLoading();
    const index = this.getIndexByItem(row);
    await setMoreRows(this, row, index);
    this.rowsLoading.value = false;
  }

  public async expanding(row: any) {
    const index = this.getIndexByItem(row);
    if (row.__expanded) {
      var t = this.outData.value.filter((item: any) => !item.__pid.toString().startsWith(row.__id.toString()));
      row.__expanded = false;
      this.Dgrid?.Vscroller?.reset();
      this.outData.value = [...t];
      this.rowsCount.value = this.outData.value.length;
    } else {
      if (this.groupList.length > row.__level + 1) {
        await setGroupListExpand(this, row, index);
      } else {
        await setFlatListExpand(this, row, index);
      }

      row.__expanded = true;
    }
  }

  public async startLoading() {
    this.rowsLoading.value = true;
    return new Promise((resolve) => setTimeout(resolve));
  }

  public getItemById(id: any) {
    return this.outData.value.find((item: any) => item[this.dataKey] == id);
  }

  public async getSelectList(field: string) {
    const selectPara: any = {
      Select: ["selectlist"],
      GroupBy: JSON.stringify([field]),
      Order: JSON.stringify([
        {
          Field: field,
          Direction: "asc",
        },
      ]),
    };
    const { data, message, ok } = await this.dataFetch.get("", selectPara);
    if (ok) {
      const Server: iServerData = data;
      return Server.rows.map((a: any) => a[field]);
    } else {
      window["hhl"].alert("err", "Server Error", message);
      return;
    }
  }

  public getIndexByItem(dataItem: any) {
    if (dataItem.__type) {
      return this.outData.value.findIndex((item: any) => item.__id == dataItem.__id);
    } else {
      return this.outData.value.findIndex((item: any) => item[this.dataKey] == dataItem[this.dataKey]);
    }
  }

  public async getExcel() {
    return this.outData.value;
  }

  public async SetUrl(url: string) {
    this.Url = url;
    this.dataFetch = new hhlFetch(url);
  }
}
