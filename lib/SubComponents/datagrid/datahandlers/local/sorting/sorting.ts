import { firstBy } from "./thenby";

export default {
  async Sort(sort: any, data: any) {
    if (sort.length > 0 && data.length > 1) {
      let sortStack = firstBy(sort[0].field, sort[0].direction === "asc" ? 1 : -1);
      await sort.forEach((element: any) => {
        sortStack = sortStack.thenBy(element.field, element.direction === "desc" ? 1 : -1);
      });
      return data.sort(sortStack);
    } else {
      return data;
    }
  }
};
