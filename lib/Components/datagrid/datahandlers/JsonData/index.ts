import filtering from "./filtering";
import Sorting from "./sorting/sorting";
import { iQueryObject } from "../../datagridTypes";

export type iJsonData = InstanceType<typeof JsonData>;
export class JsonData {
  private dataSource?: any[];
  private dataStore?: any[];

  public async setDataSource(_dataSource: any[]) {
    this.dataSource = await _dataSource;
  }

  public async getCount(QueryObject: iQueryObject) {
    const rawData = this.dataSource ?? [];
    const filterData = await filtering(rawData, QueryObject);
    return filterData.length;
  }

  public async getData(QueryObject: iQueryObject) {
    const rawData = this.dataSource ?? [];
    const filterData = await filtering(rawData, QueryObject);
    const sortData = await Sorting.Sort(QueryObject.sortingList, filterData);
    const groupData = await this.groupBy(QueryObject.groupBy, sortData);
    const pagedData = await this.pagedData(QueryObject, groupData);
    return pagedData;
  }

  public async getSelectList(field: string) {
    const rawData = this.dataSource ?? [];
    const gData = await this.groupByField(field, rawData);
    return gData;
  }

  private pagedData(QueryObject: iQueryObject, _data: any[]) {
    const count = _data.length ?? 0;
    const items = _data.slice(QueryObject.paging.page, QueryObject.paging.page + QueryObject.paging.size);
    return { items, count };
  }

  private groupBy(property: any, data: any) {
    if (!property) return data;
    const objArr = data.reduce((acc: any, obj: any) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = { id: key, count: 0 };
      }
      acc[key].count++;

      return acc;
    }, {});
    return Object.values(objArr);
  }

  private groupByField(property: any, data: any) {
    if (!property) return data;
    const objArr = data.reduce((acc: any, obj: any) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = key;
      }

      return acc;
    }, {});
    return Object.values(objArr);
  }
}
