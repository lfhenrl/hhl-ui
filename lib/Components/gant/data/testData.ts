import { DateAddHours, DateGetToday } from "../../../utils/dateFunctions";
import { iTask } from "./taskModel";
const tidNu = DateGetToday();
export const testData: iTask[] = [
  {
    Id: 1,
    Name: "Task 1",
    StartTime: tidNu,
    EndTime: DateAddHours(tidNu, 1),
    progress: 0,
  },
  {
    Id: 2,
    Name: "Task 2",
    StartTime: DateAddHours(tidNu, 1),
    EndTime: DateAddHours(tidNu, 2),
    progress: 0,
  },
  {
    Id: 3,
    Name: "Task 3",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 4,
    Name: "Task 4",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 5,
    Name: "Task 5",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 6,
    Name: "Task 6",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 7,
    Name: "Task 7",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 8,
    Name: "Task 8",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
  {
    Id: 9,
    Name: "Task 9",
    StartTime: DateAddHours(tidNu, 2),
    EndTime: DateAddHours(tidNu, 3),
    progress: 0,
  },
];
