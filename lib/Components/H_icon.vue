<template>
  <svg
    viewBox="0 0 24 24"
    class="H_icon"
    :class="{
      'pointer-events-none opacity-35': disabled,
      'border border-current p-[0.15em]': outline,
      'rounded-full': round,
      'border-none p-[0.2em] text-(--icon-bgcolor) bg-(--icon-color)': filled,
      'hover:outline-2 hover:outline-offset-2 hover:outline-(--color-pri) active:scale-90': btn,
    }"
    :style="{ '--icon-color': txtColor, '--icon-bgcolor': bgColor, '--icon-size': size }"
    height="24"
    width="24"
    fill="none"
  >
    <path fill="currentColor" :d="icon" />
  </svg>
</template>

<script setup lang="ts">
import { iconsProp } from "../SubComponents/icons/iconProp";
import { colorProp } from "../SubComponents/icons/colorProp";
import { useColor } from "../SubComponents/icons/useColors";
import { icons } from "../SubComponents/icons/icons";
import { ref, toRef, watch } from "vue";

const P = defineProps({
  ...iconsProp,
  ...colorProp,
  size: {
    type: String,
    default: "1.4rem",
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
});

const { bgColor, txtColor } = useColor(toRef(() => P.color));

const icon = ref("");

watch(
  () => P.name,
  () => {
    icons[P.name]().then((res: any) => {
      icon.value = res.ico;
    });
  },
  { immediate: true }
);
</script>
<style>
@layer components {
  .H_icon {
    display: block;
    min-width: var(--icon-size);
    max-width: var(--icon-size);
    min-height: var(--icon-size);
    max-height: var(--icon-size);
    color: var(--icon-color);
    aspect-ratio: 1/1;
    border-radius: 4px;
  }
}
</style>
