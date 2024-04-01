import { iRow } from "./rowModel";

export type iMoveRow = InstanceType<typeof MoveRow>;
export class MoveRow {
  public row: iRow | null = null;
  public parentRow: iRow | null = null;
  public rowComp: any = null;
  constructor(_row: iRow, _parentRow: iRow, _rowComp: any) {
    this.row = _row;
    this.parentRow = _parentRow;
    this.rowComp = _rowComp;
  }
}
