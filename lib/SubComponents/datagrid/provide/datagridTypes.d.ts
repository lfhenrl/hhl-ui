export type iClickData = {
  type: string;
  colIndex: number;
  colOrgIndex: number;
  subType: string;
  dataId: string;
  dataItem: any;
  column: icolumnData;
  field: string;
};

export type iSortData = {
  field: string;
  direction: string;
};

export type iFilterData = {
  active: boolean;
  field: string;
  type: string;
  condition1: string;
  condition2: string;
  value1: string | null;
  value2: string | null;
  logical: string;
};

export type icolumnData = {
  dom: HTMLElement | null;
  className: string;
  cssRule: CSSStyleRule;
  props: {
    field: string;
    title: string;
    type: string;
    width: string;
    autoHeight: boolean;
    className: string;
    format: Function;
    cell_style: Function;
    select_list: [];
    no_sorting: boolean;
    sorting: string;
    sortIndex: number;
    filter_type: string;
    filter_condition1: string;
    filter_condition2: string;
    filter_value1: string;
    filter_value2: string;
    visibel: boolean;
  };
  filter: iFilterData;
  slot: any;
  index: number;
  orgIndex: number;
  width: string;
  visibel: Ref<boolean> = ref(true);
};

export type iQueryObject = {
  sortingList: iSortingItem[];
  filterList: iFilterItem[];
  searchFields: string[];
  searchString: string;
  groupByList: string[];
  groupBy: string;
  paging: {
    page: number;
    size: number;
  };
};
