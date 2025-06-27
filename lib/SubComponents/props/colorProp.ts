import type { PropType, Ref } from "vue";
import { computed } from "vue";

export function useColorProp(_default: string) {
  return {
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
      >,
      default: _default || "txt2",
    },
  };
}

const colors: any = {
  pri: { txt: "var(--color-pri)", bg: "var(--color-priTxt)" },
  ok: { txt: "var(--color-ok)", bg: "var(--color-okTxt)" },
  sec: { txt: "var(--color-sec)", bg: "var(--color-secTxt)" },
  warn: { txt: "var(--color-warn)", bg: "var(--color-warnTxt)" },
  err: { txt: "var(--color-err)", bg: "var(--color-errTxt)" },
  info: { txt: "var(--color-info)", bg: "var(--color-infoTxt)" },
  white: { txt: "white", bg: "black" },
  black: { txt: "black", bg: "white" },
  txt0: { txt: "var(--color-txt0)", bg: "var(--color-bg0)" },
  txt1: { txt: "var(--color-txt1)", bg: "var(--color-bg0)" },
  txt2: { txt: "var(--color-txt2)", bg: "var(--color-bg0)" },
  txt3: { txt: "var(--color-txt3)", bg: "var(--color-bg0)" },
  txt4: { txt: "var(--color-txt4)", bg: "var(--color-bg0)" },
  txt5: { txt: "var(--color-txt5)", bg: "var(--color-bg0)" },
  txt6: { txt: "var(--color-txt6)", bg: "var(--color-bg0)" },
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
