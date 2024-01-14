import { createNewSortInstance } from "./sort";

export type iSortData = {
  field: string;
  direction: string;
};

const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  }).compare,
});

function makeFunc(direction: string, prop: string) {
  if (direction === "asc") {
    return {
      asc: (u: any) => u[prop],
    };
  }
  return {
    desc: (u: any) => u[prop],
  };
}

export function Sorting(sort?: iSortData[], data?: any[]) {
  if (!data) return;

  const sortArray: any = [];
  sort?.forEach((item) => sortArray.push(makeFunc(item.direction, item.field)));
  if (sortArray.length > 0) {
    return naturalSort(data).by(sortArray);
  } else return data;
}
