export declare const validator: {
  required: (v: string) => true | "Need input.";
  dateRequired: (v: date) => true | "Need input.";
  email: (v: string) => string | true;
  strMin: (Length: number) => (v: string) => string | true;
  strMax: (Length: number) => (v: string) => string | true;
  numMin: (Length: number) => (v: number) => string | true;
  numMax: (Length: number) => (v: number) => string | true;
};
