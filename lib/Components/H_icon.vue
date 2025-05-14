<template>
  <svg
    viewBox="0 0 24 24"
    class="H_icon"
    :class="{
      'pointer-events-none opacity-35': disabled,
      'border border-current p-[0.15em]': variant.includes('outline'),
      'rounded-full': variant.includes('round') || variant === 'base',
      'border-none p-[0.2em] text-(--color-current) bg-currentBg': variant.includes('filled'),
      'hover:outline-2 hover:outline-offset-2 hover:outline-(--color-pri) active:scale-90': btn,
    }"
    :style="{ '--color-currentBg': txtColor, '--color-current': bgColor, '--icon-size': size }"
    height="24"
    width="24"
    fill="none"
  >
    <path fill="currentColor" :d="icon" />
  </svg>
</template>

<script setup lang="ts">
import { iconsProp } from "../SubComponents/icons/iconProp";
import { useColor, useColorProp } from "../SubComponents/props/colorProp";
import { icons } from "../SubComponents/icons/icons";
import { ref, toRef, watch, type PropType } from "vue";

const P = defineProps({
  ...iconsProp,
  ...useColorProp("neutral"),
  size: {
    type: String,
    default: "1.4rem",
  },
  variant: {
    type: String as PropType<"base" | "outline" | "outline-round" | "filled" | "filled-round">,
    default: "base",
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
    color: var(--color-currentBg);
    aspect-ratio: 1/1;
    border-radius: 4px;
  }
}
</style>
