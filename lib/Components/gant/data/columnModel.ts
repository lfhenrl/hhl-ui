import { ref } from "vue";

export type iColumn = InstanceType<typeof Column>;
export class Column {
  public Id: number = 0;
  public Field: string = "";
  public Title: string = "";
  public Width = ref("");
  public Type: string = "Cell";
}
