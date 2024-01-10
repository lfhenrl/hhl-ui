import { Ref, ref } from "vue";
import { iDgrid } from "../../provide/Dgrid";
import { filtering } from "./filter/filtering";
import { groupBy } from "./grouping";
import { Sorting } from "./sorting";
import { iFilterData } from "../../provide/datagridTypes";

export type iDatahandler = InstanceType<typeof localData>;

export class localData {
  public Dgrid?: iDgrid;
  public dataKey = "";
  public orgData: any[] = [];
  public outData: Ref<unknown[]> = ref([]);
  public rowsCount = ref(0);
  public rowsCountTotal = ref(0);
  public rowsLoading = ref(false);
  public selectedIndex = ref(-1);
  public selectedDataKey: unknown;
  public groupList: string[] = ["val2", "val4", "val7"];

  init(_Dgrid: iDgrid) {
    this.Dgrid = _Dgrid;
  }

  async setData(data: any[]) {
    this.orgData = data;
  }

  async getFilt_sortData(filter: iFilterData[]) {
    const filterData = await filtering(this, filter);
    return (await Sorting(this.Dgrid?.Sorting.sortArray, filterData)) ?? [];
  }

  async loadData() {
    await this.startLoading();
    this.rowsCountTotal.value = this.orgData.length;
    const newData = await this.getFilt_sortData(this.Dgrid!.Filter);
    if (this.groupList.length > 0) {
      const result = await groupBy(this.groupList[0], newData, 0, "");
      this.outData.value = result;
    } else {
      this.outData.value = newData;
    }
    this.rowsCount.value = this.outData.value.length ?? 0;
    this.findAndSetSelectedIndex();
    this.rowsLoading.value = false;
  }

  findAndSetSelectedIndex() {
    const index = this.outData.value.findIndex(
      (item: any) => item[this.dataKey] === this.selectedDataKey
    );
    if (index >= 0) this.setSelectedIndex(index);
  }

  public async startLoading() {
    this.rowsLoading.value = true;
    return new Promise((resolve) => setTimeout(resolve));
  }

  async getExpandingData(row: any) {
    const GrFilter = structuredClone(this.Dgrid?.Filter) ?? [];
    const parentArr = row.__id.split("/");

    for (let i = 0; i < row.__level + 1; i++) {
      const Nfilter: iFilterData = {
        active: true,
        condition1: "equal",
        condition2: "equal",
        field: this.groupList[i],
        logical: "and",
        value1: parentArr[i],
        value2: null,
        type: "string",
      };
      GrFilter.push(Nfilter);
    }
    return await this.getFilt_sortData(GrFilter);
  }

  public async expanding(row: any, index: number) {
    console.log("EXPAND", row);
    if (row.__expanded) {
      this.outData.value.splice(index + 1, row.__count);
      row.__expanded = false;
    } else {
      const raw: any[] = (await this.getExpandingData(row)) ?? [];

      if (this.groupList.length > row.__level + 1) {
        const GroupProp = this.groupList[row.__level + 1];
        const rr = await groupBy(GroupProp, raw, row.__level + 1, row.__id);
        row.__count = rr.length;
        this.outData.value.splice(index + 1, 0, ...rr);
      } else {
        this.outData.value.splice(index + 1, 0, ...raw);
      }

      row.__expanded = true;
    }
  }
  public setSelectedIndex(index: number) {
    this.selectedIndex.value = index;
    const item: any = this.outData.value[index];
    this.selectedDataKey = item[this.dataKey];
  }

  public async getSelectList(field: string) {
    const objArr = this.orgData.reduce((acc: any, obj: any) => {
      let key = obj[field];
      if (!acc[key]) {
        acc[key] = key;
      }

      return acc;
    }, {});
    return Object.values(objArr);
  }
}
