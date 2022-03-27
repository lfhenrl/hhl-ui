import { icolumnData } from "../datagridTypes";
import { iDatagrid } from "../provide";

export default function buildQueryObject(dg: iDatagrid, level: number) {
  const QueryLists: any = getLists(dg.Columns.value, dg.GroupBy);
  const searchFields = dg.searchFields;
  const searchString = dg.searchString;
  return {
    sortingList: QueryLists.sortings,
    filterList: QueryLists.filters,
    searchFields,
    searchString,
    groupByList: QueryLists.groupBy,
    groupBy: QueryLists.groupBy.length > level - 1 ? QueryLists.groupBy[level - 1] : "",
    paging: {
      page: 0,
      size: dg.pageSize
    }
  };
}

function getLists(columns: Array<icolumnData>, grBy: any) {
  const QueryLists = {
    sortings: [] as any,
    filters: [] as any,
    groupBy: [] as any
  };

  const groupList: any = {};
  columns.forEach((item) => {
    if (item.filt.active) {
      const filt = {
        field: item.filt.field,
        condition: item.filt.condition,
        type: item.filt.type,
        value1: item.filt.value1,
        value2: item.filt.value2
      };
      QueryLists.filters.push(filt);
    }
    if (item.sort.index < 1000) {
      const sort = {
        field: item.sort.field,
        direction: item.sort.sorting,
        index: item.sort.index
      };
      QueryLists.sortings.push(sort);
    }
    if (grBy.includes(item.props.title)) {
      groupList[item.props.field] = item.props.title;
    }
  });
  QueryLists.sortings = QueryLists.sortings.sort((a: any, b: any) => a.index - b.index);
  QueryLists.groupBy = Object.keys(groupList);
  return QueryLists;
}
