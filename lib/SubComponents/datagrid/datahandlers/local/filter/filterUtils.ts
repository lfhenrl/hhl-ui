import { iFilterData } from "../../../provide/datagridTypes";

function filterCondition(condition: string, compareValue: any) {
  const conditionList: any = {
    equal: `val === ${compareValue}`,
    not_equal: `val !== ${compareValue}`,
    greater: `val > ${compareValue}`,
    greaterOrEqual: `val >= ${compareValue}`,
    less: `val < ${compareValue}`,
    lessOrEqual: `val <= ${compareValue}`,
    contain: `val.includes("${compareValue}")`,
    startwith: `val.startsWith("${compareValue}")`,
    endwith: `val.endsWith("${compareValue}")`,
    notContain: `!val.includes("${compareValue}")`,
    notStartwith: `!val.startsWith("${compareValue}")`,
    notEndwith: `!val.endsWith("${compareValue}")`,
  };
  return conditionList[condition];
}

function valueType(filter: iFilterData) {
  const typeList: any = {
    date: `const val = new Date(value).valueOf();`,
    number: `const val = Number(value);`,
    string: `const val = value ? value.toLowerCase() : "";`,
  };
  return typeList[filter.type];
}

function logical(val: string) {
  return val === "and" ? "&&" : "||";
}

function getFilter1(filter: iFilterData, value: any) {
  return `${filterCondition(filter.condition1, value)}`;
}

function getFilter2(filter: iFilterData, value: any) {
  let filter2 = ``;
  if (filter.value2) {
    filter2 = `${logical(filter.logical)} ${filterCondition(
      filter.condition2,
      value,
    )}`;
  }
  return filter2;
}

export function getFilterfunction(
  filter: iFilterData,
  value1: any,
  value2: any,
) {
  const filter1 = getFilter1(filter, value1);
  const filter2 = getFilter2(filter, value2);
  const filterfunction = eval(`(value) => {
  ${valueType(filter)}
  return ${filter1} ${filter2};
  }
  `);
  return filterfunction;
}
