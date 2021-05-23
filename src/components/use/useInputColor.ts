import { ref, watch } from "vue";

export function useInputColor(props: any) {
  const bgColor = ref("");
  const color = ref("");
  watch(
    () => props.color,
    (value) => {
      if (value) {
        if (value.startsWith("bg-")) {
          const Tcol = value.replace("bg-", "");
          color.value = `var(--col-txt-on-${Tcol})`;
          bgColor.value = `var(--col-${Tcol})`;
        } else if (value.includes("/")) {
          const colArr = value.split("/");
          color.value = colArr[1];
          bgColor.value = colArr[0];
        } else {
          color.value = value;
          bgColor.value = value;
        }
      } else {
        bgColor.value = "";
      }
    },
    { immediate: true }
  );
  return {
    bgColor,
    color
  };
}
