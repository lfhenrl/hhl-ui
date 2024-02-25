import { iFilterData } from "../../provide/datagridTypes";

export function getFilterList(_filterArray: iFilterData[]) {
  const fList: any = [];
  _filterArray.forEach((item: iFilterData) => {
    if (item.type === "select") {
      const nFilt = {
        Front: "AND",
        Field: item.field,
        Condition: item.condition1 === "equal" ? "IN" : "NOT IN (",
        Value: item.value1?.split(","),
        End: "",
      };
      fList.push(nFilt);
    } else {
      const F1 = filterCondition(item.condition1, item.value1 ?? "");
      const F2 = filterCondition(item.condition2, item.value2 ?? "");
      if (item.value2) {
        if (item.logical === "and") {
          const nFilt1 = {
            Front: "AND",
            Field: item.field,
            Condition: F1.condition,
            Value: F1.value,
            End: "",
          };
          const nFilt2 = {
            Front: "AND",
            Field: item.field,
            Condition: F2.condition,
            Value: F2.value,
            End: "",
          };
          fList.push(nFilt1);
          fList.push(nFilt2);
        } else {
          const nFilt1 = {
            Front: "AND(",
            Field: item.field,
            Condition: F1.condition,
            Value: F1.value,
            End: "",
          };
          const nFilt2 = {
            Front: "OR",
            Field: item.field,
            Condition: F2.condition,
            Value: F2.value,
            End: ")",
          };
          fList.push(nFilt1);
          fList.push(nFilt2);
        }
      } else {
        const nFilt = {
          Front: "AND",
          Field: item.field,
          Condition: F1.condition,
          Value: F1.value,
          End: "",
        };
        fList.push(nFilt);
      }
    }
  });

  return fList;
}

function filterCondition(condition: string, value: string) {
  // `'${value}'`;
  const obj = {
    condition: "",
    value: "",
  };
  if (!value) return obj;
  const conditionList: any = {
    equal: () => ((obj.condition = "="), (obj.value = value)),
    notEqual: () => ((obj.condition = "<>"), (obj.value = value)),
    greater: () => ((obj.condition = ">"), (obj.value = value)),
    greaterOrEqual: () => ((obj.condition = ">="), (obj.value = value)),
    less: () => ((obj.condition = "<"), (obj.value = value)),
    lessOrEqual: () => ((obj.condition = "<="), (obj.value = value)),
    contain: () => ((obj.condition = "LIKE"), (obj.value = `%${value}%`)),
    startwith: () => ((obj.condition = "LIKE"), (obj.value = `${value}%`)),
    endwith: () => ((obj.condition = "LIKE"), (obj.value = `%${value}`)),
    notContain: () => ((obj.condition = "NOT LIKE"), (obj.value = `%${value}%`)),
    notStartwith: () => ((obj.condition = "NOT LIKE"), (obj.value = `${value}%`)),
    notEndwith: () => ((obj.condition = "NOT LIKE"), (obj.value = `%${value}`)),
  };
  conditionList[condition]();
  return obj;
}
