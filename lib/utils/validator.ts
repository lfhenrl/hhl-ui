

function regExValidator(message: string, regEx: RegExp) {
  const regex = new RegExp(regEx);
  return (v: string) => regex.test(v || "") || message;
}


export const validator = {
  required: (v: string) => (v || "").length > 0 || "Need input.",
  dateRequired: (v: Date) => (v || null) !== null || "Need input.",
  email: regExValidator(
    "Invalid email address!.",
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  strMin: (Length: number) => (v: string) => (v || "").length >= Length || `Min ${Length} characters.`,
  strMax: (Length: number) => (v: string) => (v || "").length <= Length || `Max ${Length} characters.`,
  numMin: (Length: number) => (v: number) => (v || 0) >= Length || `Min value is ${Length}.`,
  numMax: (Length: number) => (v: number) => (v || 0) <= Length || `Max value is ${Length}.`
};