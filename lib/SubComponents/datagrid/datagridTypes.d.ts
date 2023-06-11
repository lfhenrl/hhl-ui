export type iReturnData = {
  rowCount: number;
  totalCount: number;
  data: any[];
};

export type icolumnSortData = {
  field: string;
  index: number;
  sorting: string;
  default_index: number;
  default_sorting: string;
  no_sorting: boolean;
  organize: any;
  count: any;
};
export type icolumnFilterData = {
  active: boolean;
  isValid: boolean;
  field: string;
  type: string;
  condition: string;
  value1: string;
  value2: string;
  default_active: boolean;
  default_condition: string;
  default_value1: any;
  default_value2: any;
  selectList: string[];
  autoSelectList: boolean;
};

export type icolumnData = {
  dom: HTMLElement | null;
  props: {
    field: string;
    title: string;
    type: string;
    width: string;
    className: string;
    format: Function;
    cell_style: Function;
    row_style: Function;
    select_list: [];
    no_sorting: boolean;
    sorting: string;
    sortIndex: number;
    filter_type: string;
    filter_condition: string;
    filter_value1: string;
    filter_value2: string;
    visibel: boolean;
  };
  slot: any;
  index: number;
  orgIndex: number;
  className: string;
  width: number;
  maxWidth: number;
  minWidth: number;
  visibel: boolean;
  sort: icolumnSortData;
  filt: icolumnFilterData;
};

export type iQueryObject = {
  sortingList: iSortingItem[];
  filterList: iFilterItem[];
  searchFields: string[];
  searchString: string;
  groupByList: string[]
  groupBy: string;
  paging: {
    page: number;
    size: number;
  };
};

type iSortingItem = {
  field: string;
  direction: string;
  index: number;
};

type iFilterItem = {
  field: string;
  condition: string;
  type: string;
  value1: string | number;
  value2: string | number;
};
