export function getNumberFunction(condition: string, field: any, compareValue: number) {
  switch (condition) {
    case "equal":
      return (value: any) => {
        return value[field] == compareValue;
      };
      break;
    case "notEqual":
      return (value: any) => {
        return value[field] != compareValue;
      };
      break;
    case "greater":
      return (value: any) => {
        return value[field] > compareValue;
      };
      break;
    case "greaterOrEqual":
      return (value: any) => {
        return value[field] >= compareValue;
      };
      break;
    case "less":
      return (value: any) => {
        return value[field] < compareValue;
      };
      break;
    case "lessOrEqual":
      return (value: any) => {
        return value[field] <= compareValue;
      };
      break;
    default:
      return;
  }
}
