export function getDateFunction(
  condition: string,
  field: any,
  compareValue: number
) {
  switch (condition) {
    case "equal":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val == compareValue;
      };
      break;
    case "notEqual":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val != compareValue;
      };
      break;
    case "greater":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val > compareValue;
      };
      break;
    case "greaterOrEqual":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val >= compareValue;
      };
      break;
    case "less":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val < compareValue;
      };
      break;
    case "lessOrEqual":
      return (value: any) => {
        const val = new Date(value[field]).valueOf();
        return val <= compareValue;
      };
      break;
    default:
      return;
  }
}
