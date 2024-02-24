export function getSortList(_sortArray: any[]) {
  return _sortArray.map((item: any) => {
    return {
      Field: item.field,
      Desc: item.direction === "asc" ? false : true,
    };
  });
}
