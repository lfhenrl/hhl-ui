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

export type iSortData = {
  field: string;
  direction: string;
};

export type iClickData = {
  type: string;
  colIndex: number;
  colOrgIndex: number;
  subType: string;
  dataId: any;
  dataItem: unknown;
  column: icolumnData;
  field: string;
};
