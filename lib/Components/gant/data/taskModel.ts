export type iTask = InstanceType<typeof Task>;
export class Task {
  public Id: number = 0;
  public Name: string = "";
  public StartTime: Date = new Date();
  public EndTime: Date = new Date();
  public progress: number = 0;
}
