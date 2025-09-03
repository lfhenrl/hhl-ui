import type { PropType, Ref } from "vue";
import { computed } from "vue";

export const colorProps = String as PropType<
  | "pri"
  | "ok"
  | "sec"
  | "warn"
  | "err"
  | "info"
  | "white"
  | "black"
  | "transparent"
  | "bg0"
  | "bg1"
  | "bg2"
  | "bg3"
  | "bg4"
  | "bg5"
  | "bg6"
  | "txt1"
  | "txt2"
  | "txt3"
  | "txt4"
  | "txt5"
  | "txt6"
  | "txt7"
  | "txt8"
  | "txt9"
>;

const colors: any = {
  pri: { txt: "var(--col-pri)", bg: "var(--col-priTxt)" },
  ok: { txt: "var(--col-ok)", bg: "var(--col-okTxt)" },
  sec: { txt: "var(--col-sec)", bg: "var(--col-secTxt)" },
  warn: { txt: "var(--col-warn)", bg: "var(--col-warnTxt)" },
  err: { txt: "var(--col-err)", bg: "var(--col-errTxt)" },
  info: { txt: "var(--col-info)", bg: "var(--col-infoTxt)" },
  white: { txt: "white", bg: "black" },
  black: { txt: "black", bg: "white" },
  transparent: { txt: "transparent", bg: "var(--bgcol-0)" },
  txt0: { txt: "var(--col-0)", bg: "var(--bgcol-0)" },
  txt1: { txt: "var(--col-1)", bg: "var(--bgcol-0)" },
  txt2: { txt: "var(--col-2)", bg: "var(--bgcol-0)" },
  txt3: { txt: "var(--col-3)", bg: "var(--bgcol-0)" },
  txt4: { txt: "var(--col-4)", bg: "var(--bgcol-0)" },
  txt5: { txt: "var(--col-5)", bg: "var(--bgcol-0)" },
  txt6: { txt: "var(--col-6)", bg: "var(--col-0)" },
  txt7: { txt: "var(--col-7)", bg: "var(--col-0)" },
  txt8: { txt: "var(--col-8)", bg: "var(--col-0)" },
  txt9: { txt: "var(--col-9)", bg: "var(--col-0)" },
};

interface HColor {
  txt: string;
  bg: string;
}

const colorsx: any = {
  pri: "white",
  ok: "white",
  sec: "white",
  warn: "black",
  err: "white",
  info: "white",
  white: "black",
  black: "white",
  transparent: "bg0",
  txt0: "bg0",
  txt1: "bg0",
  txt2: "bg0",
  txt3: "bg0",
  txt4: "bg0",
  txt5: "bg0",
  txt6: "txt0",
  txt7: "txt0",
  txt8: "txt0",
  txt9: "txt0",
};

interface HColor {
  txt: string;
  bg: string;
}

export function useColor(colorProp: Ref<string>) {
  const color = computed(() => {
    return colors[colorProp.value] || colors["txt2"];
  });
  return color as Ref<HColor>;
}

export function useColorx(colorProp: Ref<string>) {
  const color = computed(() => {
    return colorsx[colorProp.value] || colorsx["txt2"];
  });
  return color as Ref<string>;
}
