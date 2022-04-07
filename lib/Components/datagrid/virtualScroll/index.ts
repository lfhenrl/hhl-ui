import { iQueryObject, iReturnData } from "../datagridTypes";
import { iDatagrid } from "../provide";
import buildQueryObject from "../provide/buildQueryObject";
import getActRootNode from "./getActRootNode";
import handleData from "./handleData";
import makeFlatData from "./makeFlatData";
import { dataHandler } from "./dataHandler";
export { dataHandler, iDataHandler, dataController, iDataController };

type iDataHandler = InstanceType<typeof dataHandler>;
type iDataController = InstanceType<typeof dataController>;
class dataController {
  private dg = {} as iDatagrid;
  public DataHandler: iDataHandler;
  public setInternalData = (_data: iReturnData) => {};
  public dataStore: any = {};
  private totalCount = 0;

  constructor(_dg: iDatagrid, _DataHandler: iDataHandler) {
    this.dg = _dg;
    this.DataHandler = _DataHandler;
    this.dg.Event.on("groupExpanded", this.groupExpanded.bind(this));
  }

  public async getRawData() {
    const QueryObject = buildQueryObject(this.dg, 1);
    QueryObject.paging.size = this.dg.excelMaxRows;
    QueryObject.groupBy = "";
    const data = await this.DataHandler.loadData(QueryObject);
    return data;
  }

  private async getData(QueryObject: iQueryObject, dataStore: any, level: number, index: number, dataId: string = "_") {
    const data = await this.DataHandler.loadData(QueryObject);
    if (!data.items) {
      this.returnData([]);
      return;
    }
    handleData(data.items, data.count, level, index, QueryObject, dataStore, dataId);
    const FlatData = await makeFlatData(this.dataStore, []);
    await this.returnData(FlatData);
  }

  private async groupExpanded(data: any) {
    console.log("this.dataStore", this.dataStore);
    this.dg.Event.emit("isLoading", true);
    const { actRow, filters } = getActRootNode(data.id, this.dataStore);
    actRow.expanded = data.expanded;
    if (!actRow.haveExpandData) {
      actRow.haveExpandData = true;
      const QueryObject = buildQueryObject(this.dg, actRow.level + 1);
      QueryObject.paging.page = 0;

      filters.forEach((item) => {
        QueryObject.filterList.push(item);
      });
      await this.getData(QueryObject, actRow.children, actRow.level + 1, 0, data.id + "_");
    } else {
      const FlatData = await makeFlatData(this.dataStore, []);
      await this.returnData(FlatData);
    }
  }

  public async moreRows(id: string) {
    const { rootRow, actRow, index, filters } = getActRootNode(id, this.dataStore);
    const QueryObject = buildQueryObject(this.dg, actRow.level);

    QueryObject.paging.page = index + 1;
    let dSource = this.dataStore;
    let frontId = "_";

    if (actRow.level > 1) {
      filters.forEach((item) => {
        QueryObject.filterList.push(item);
      });
      dSource = rootRow.children;
      frontId = rootRow.id + "_";
    }
    await this.getData(QueryObject, dSource, actRow.level, index + 1, frontId);
    return;
  }

  private returnData(newData: any[]) {
    const returnData: iReturnData = {
      rowCount: newData.length,
      totalCount: this.totalCount,
      data: newData
    };
    this.setInternalData(returnData);
    return;
  }

  public async reLoad() {
    this.dataStore = {};
    const QueryObject = buildQueryObject(this.dg, 1);
    this.totalCount = await this.DataHandler.loadCount(QueryObject);
    QueryObject.paging.page = 0;
    await this.getData(QueryObject, this.dataStore, 1, 0);
    return;
  }
}
