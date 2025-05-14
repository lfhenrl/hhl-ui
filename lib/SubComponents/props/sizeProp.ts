import type { PropType, Ref } from "vue";
import { ref, watch } from "vue";
export const sizeProp = {
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg" | "xl">,
    default: "md",
  },
};

const sizes: any = {
  xs: "0.7rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
};
export function useSize(sizeProp: Ref<string>) {
  const endSize = ref("1rem");

  watch(
    sizeProp,
    (newSize) => {
      endSize.value = sizes[newSize] || "1rem";
    },
    { immediate: true }
  );

  return { endSize };
}
