export function validateFunc(validator: any, modelValue: any) {
  if (!validator) {
    return "";
  }
  let returnValue = "";

  validator.some((v: any) => {
    const valid = typeof v === "function" ? v(modelValue) : v;
    if (typeof valid === "string") {
      returnValue = valid;
      return true;
    } else if (typeof valid !== "boolean") {
      console.log(
        `VALIDATION: Rules should return a string or boolean, received '${typeof valid}' instead`,
      );
      return true;
    }
    return false;
  });
  return returnValue;
}
