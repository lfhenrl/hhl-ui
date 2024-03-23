import { iTask } from "./taskModel";

export type iMoveTask = InstanceType<typeof MoveTask>;
export class MoveTask {
  public row: iTask | null = null;
  public parentRow: iTask | null = null;
  public rowComp: any = null;
  constructor(_row: iTask, _parentRow: iTask, _rowComp: any) {
    this.row = _row;
    this.parentRow = _parentRow;
    this.rowComp = _rowComp;
  }
}
