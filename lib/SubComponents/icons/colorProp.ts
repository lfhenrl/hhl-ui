import type { PropType } from "vue";
export const colorProp = {
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
      | "current"
    >,
    default: "current",
  },
};
