import { DateAddDays, DateGetToday } from "../../../utils/dateFunctions";
import { iTask } from "./taskModel";
const tidNu = DateGetToday();
export const testData: iTask[] = [
  {
    Id: 1,
    Name: "Task 1",
    StartTime: DateAddDays(tidNu, -4),
    EndTime: DateAddDays(tidNu, 1),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 2,
    Name: "Task 2",
    StartTime: DateAddDays(tidNu, 1),
    EndTime: DateAddDays(tidNu, 2),
    Progress: 0,
    Expanded: false,
    Children: [
      {
        Id: 20,
        Name: "subTask 1 (2)",
        StartTime: DateAddDays(tidNu, 1),
        EndTime: DateAddDays(tidNu, 2),
        Progress: 0,
        Expanded: false,
        Children: [
          {
            Id: 201,
            Name: "subsubTask 1 (2)",
            StartTime: DateAddDays(tidNu, 1),
            EndTime: DateAddDays(tidNu, 4),
            Progress: 0,
            Expanded: false,
            Children: [],
          },
          {
            Id: 211,
            Name: "subsubTask 2 (2)",
            StartTime: DateAddDays(tidNu, 1),
            EndTime: DateAddDays(tidNu, 2),
            Progress: 0,
            Expanded: false,
            Children: [],
          },
        ],
      },
      {
        Id: 21,
        Name: "subTask 2 (2)",
        StartTime: DateAddDays(tidNu, 1),
        EndTime: DateAddDays(tidNu, 2),
        Progress: 0,
        Expanded: false,
        Children: [],
      },
    ],
  },
  {
    Id: 3,
    Name: "Task 3",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 4,
    Name: "Task 4",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 5,
    Name: "Task 5",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [
      {
        Id: 50,
        Name: "subTask 1 (2)",
        StartTime: DateAddDays(tidNu, 1),
        EndTime: DateAddDays(tidNu, 2),
        Progress: 0,
        Expanded: false,
        Children: [],
      },
      {
        Id: 51,
        Name: "subTask 2 (2)",
        StartTime: DateAddDays(tidNu, 1),
        EndTime: DateAddDays(tidNu, 2),
        Progress: 0,
        Expanded: false,
        Children: [],
      },
    ],
  },
  {
    Id: 6,
    Name: "Task 6",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 7,
    Name: "Task 7",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 8,
    Name: "Task 8",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
  {
    Id: 9,
    Name: "Task 9",
    StartTime: DateAddDays(tidNu, 2),
    EndTime: DateAddDays(tidNu, 3),
    Progress: 0,
    Expanded: false,
    Children: [],
  },
];
