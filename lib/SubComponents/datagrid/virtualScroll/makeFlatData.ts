export default async function makeFlatData(dataObj: any, newData: any[]) {
  let LastElement: any = {};
  for (const key in dataObj) {
    if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
      LastElement = dataObj[key];

      if (LastElement.expanded) {
        newData.push(LastElement);
        await makeFlatData(LastElement.children, newData);
      } else {
        newData.push(LastElement);
      }
    }
  }

  if (LastElement.rowsLeft) {
    const rec = LastElement.id + "_";
    const loadMore = {
      id: rec,
      name: "loadMore",
      groupField: LastElement.groupField,
      expanded: LastElement.expanded,
      rowsLeft: LastElement.rowsLeft,
      rowsTotal: LastElement.rowsTotal,
      type: "loader",
      level: 1,
      data: {},
      children: {}
    };
    newData.push(loadMore);
  }

  return newData;
}
