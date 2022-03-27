import { iQueryObject } from "../datagridTypes";
import { iDatagrid } from "../provide";

export class dataHandler {
  public loadData: (arg0: iQueryObject) => Promise<any>;
  public loadCount: (arg0: iQueryObject) => Promise<number>;
  public loadSelectList: (arg0: string) => Promise<string[]>;
  private dg = {} as iDatagrid;

  constructor(
    getData: (arg0: iQueryObject) => Promise<any>,
    getCount: (arg0: iQueryObject) => Promise<number>,
    getSelectList: (arg0: string) => Promise<string[]>
  ) {
    this.loadData = getData;
    this.loadCount = getCount;
    this.loadSelectList = getSelectList;
  }

  setRefToDg(_dg: iDatagrid) {
    this.dg = _dg;
  }

  public async Load() {
    await this.dg.UpdateData();
    return;
  }
}
