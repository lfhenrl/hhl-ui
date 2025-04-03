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
      | "white"
      | "black"
      | "txt0"
      | "txt1"
      | "txt2"
      | "txt3"
      | "txt4"
      | "txt5"
      | "txt6"
      | "bg0"
      | "bg1"
      | "bg2"
      | "bg3"
      | "bg4"
      | "bg5"
      | "bg6"
    >,
    default: "pri",
  },
  size: {
    type: String,
    default: "1.8rem",
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
  disabled: { type: Boolean, default: false },
};
