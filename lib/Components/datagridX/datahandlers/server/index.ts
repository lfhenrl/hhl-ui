import { Ref, ref } from "vue";
import { iDgrid } from "../../provide/Dgrid";
import { hhlFetch } from "../../../../utils/hhlFetch";
import { getFilterList } from "./getFilterList";
import { getSortList } from "./getSortList";
import { setCounters } from "./setCounters";
import { setFlatList } from "./setFlatList";
import { setMoreRows } from "./setMoreRows";
import { setGroupList } from "./setGroupList";
import { setGroupListExpand } from "./setGroupListExpand";
import { setFlatListExpand } from "./setFlatListExpand";

export type iDatahandler = InstanceType<typeof serverData>;
export class serverData {
  public Dgrid?: iDgrid;
  public dataKey = "";
  public Url: string = "";
  public outData: Ref<unknown[]> = ref([]);
  public rowsCount = ref(0);
  public rowsCountTotal = ref(0);
  public rowsLevel0_Count = 0;
  public rowsLoading = ref(false);
  public groupList: string[] = [];
  public pageSize = 50;
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
  }

  public async loadData() {
    await this.startLoading();
    this.filterArray = getFilterList(this.Dgrid?.Filter ?? []);
    this.OrderArray = getSortList(this.Dgrid?.Sorting.sortArray ?? []);
    await setCounters(this);
    if (this.groupList.length > 0) {
      await setGroupList(this);
    } else {
      await setFlatList(this);
    }

    this.rowsLoading.value = false;
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
      console.log("EXPAND");
      this.outData.value = this.outData.value.filter((item: any) => !item.__pid.startsWith(row.__id));

      // row.__rowsLoaded = 0;
      row.__expanded = false;
      this.outData.value = [...this.outData.value];
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
    return [field];
  }

  public getIndexByItem(dataItem: any) {
    if (dataItem.__type) {
      return this.outData.value.findIndex((item: any) => item.__id == dataItem.__id);
    } else {
      return this.outData.value.findIndex((item: any) => item[this.dataKey] == dataItem[this.dataKey]);
    }
  }
}
