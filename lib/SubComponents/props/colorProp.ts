import type { PropType, Ref } from "vue";
import { ref, watch } from "vue";
export const colorProp = {
  color: {
    type: String as PropType<"pri" | "ok" | "sec" | "warn" | "err" | "info" | "neutral" | "neutral-light">,
    default: "neutral",
  },
};

export function useColorProp(_default: string) {
  return {
    color: {
      type: String as PropType<"pri" | "ok" | "sec" | "warn" | "err" | "info" | "neutral" | "neutral-light">,
      default: _default,
    },
  };
}

export function useColor(colorProp: Ref<string>) {
  const bgColor = ref("var(--color-currentBg)");
  const txtColor = ref("var(--color-current)");

  watch(
    colorProp,
    (newColor) => {
      if (newColor === "neutral") {
        txtColor.value = `var(--color-txt1)`;
        bgColor.value = `var(--color-bg0)`;
      } else if (newColor === "neutral-light") {
        txtColor.value = `var(--color-txt4)`;
        bgColor.value = `var(--color-bg0)`;
      } else {
        txtColor.value = `var(--color-${newColor})`;
        bgColor.value = `var(--color-${newColor}Txt)`;
      }
    },
    { immediate: true }
  );

  return { bgColor, txtColor };
}
