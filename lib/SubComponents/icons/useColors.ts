import { ref, watch, type Ref } from "vue";

export function useColor(colorProp: Ref<string>) {
  const bgColor = ref("var(--color-currentBg)");
  const txtColor = ref("var(--color-current)");

  watch(
    colorProp,
    (newColor) => {
      if (newColor === "current") {
        txtColor.value = `var(--color-current)`;
        bgColor.value = `var(--color-currentBg)`;
      } else {
        txtColor.value = `var(--color-${newColor})`;
        bgColor.value = `var(--color-${newColor}Txt)`;
      }
    },
    { immediate: true }
  );

  return { bgColor, txtColor };
}
