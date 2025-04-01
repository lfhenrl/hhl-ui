import type { PropType } from "vue";

export const Props = {
  color: {
    type: String as PropType<
      | "pri"
      | "ok"
      | "sec"
      | "warn"
      | "err"
      | "info"
      | "info"
      | "txt0"
      | "txt1"
      | "txt2"
      | "txt3"
      | "txt4"
      | "txt5"
      | "txt6"
    >,
    default: "pri",
  },
  size: {
    type: String,
    default: "1.4em",
  },
  outline: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: true,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  btn: {
    type: Boolean,
    default: false,
  },
};
