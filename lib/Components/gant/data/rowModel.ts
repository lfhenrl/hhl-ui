export type iRow = InstanceType<typeof Row>;
export class Row {
  public Id: number = 0;
  public Name: string = "";
  public StartTime: Date = new Date();
  public EndTime: Date = new Date();
  public Progress: number = 0;
  public Expanded: boolean = false;
  public Children: iRow[] = [];
}
