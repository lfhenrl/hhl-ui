import { ref } from "vue";
import { type iColumn } from "./columnModel";

export const Columns: iColumn[] = [
  {
    Id: 0,
    Field: "Name",
    Title: "Name",
    Type: "cell",
    Width: ref("160px"),
  },
  {
    Id: 1,
    Field: "Id",
    Title: "Id",
    Type: "cell",
    Width: ref("30px"),
  },

  {
    Id: 2,
    Field: "StartTime",
    Title: "StartTime",
    Type: "Date",
    Width: ref("100px"),
  },
  {
    Id: 2,
    Field: "EndTime",
    Title: "EndTime",
    Type: "Date",
    Width: ref("100px"),
  },
  {
    Id: 4,
    Field: "Progress",
    Title: "Progress",
    Type: "cell",
    Width: ref("60px"),
  },
  {
    Id: 5,
    Field: "Duration",
    Title: "Duration",
    Type: "Duration",
    Width: ref("60px"),
  },
];
