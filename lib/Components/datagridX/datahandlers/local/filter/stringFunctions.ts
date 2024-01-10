export function getStringFunction(
  condition: string,
  field: any,
  compareValue: string
) {
  switch (condition) {
    case "equal":
      return (value: any) => {
        const val = value[field].toString();
        return val.toLowerCase() == compareValue;
      };
      break;
    case "notEqual":
      return (value: any) => {
        const val = value[field].toString();
        return val.toLowerCase() != compareValue;
      };
      break;
    case "contain":
      return (value: any) => {
        const val = value[field].toString();
        return val.toLowerCase().includes(compareValue);
      };
      break;
    case "startwith":
      return (value: any) => {
        const val = value[field].toString();
        return val.toLowerCase().startsWith(compareValue);
      };
      break;
    case "endwith":
      return (value: any) => {
        const val = value[field].toString();
        return val.toLowerCase().endsWith(compareValue);
      };
      break;
    case "notContain":
      return (value: any) => {
        const val = value[field].toString();
        return !val.toLowerCase().includes(compareValue);
      };
      break;
    case "notStartwith":
      return (value: any) => {
        const val = value[field].toString();
        return !val.toLowerCase().startsWith(compareValue);
      };
      break;
    case "notEndwith":
      return (value: any) => {
        const val = value[field].toString();
        return !val.toLowerCase().endsWith(compareValue);
      };
      break;

    default:
      return;
  }
}
