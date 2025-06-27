/* stylelint-disable declaration-property-value-no-unknown */
<template>
  <svg
    :size
    :color="col.bg"
    :bgcolor="col.txt"
    viewBox="0 0 24 24"
    class="H_icon"
    :class="{
      'pointer-events-none opacity-35': disabled,
      'border border-current p-[0.15em]': variant.includes('outline'),
      'rounded-full': variant.includes('round') || variant === 'base',
      'border-none p-[0.2em] text-(--icon-color) bg-(--icon-bgcolor)': variant.includes('filled'),
      'hover:outline-2 hover:outline-offset-1 hover:outline-(--color-txt6) active:scale-90': btn,
    }"
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
import { shallowRef, toRef, watch, type PropType } from "vue";

const P = defineProps({
  ...iconsProp,
  ...useColorProp("txt2"),
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

const col = useColor(toRef(() => P.color));

const icon = shallowRef("");

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
/* stylelint-disable declaration-property-value-no-unknown */
@layer components {
  .H_icon {
    display: block;
    font-size: attr(size type(<length>));
    --icon-color: attr(color type(<color>));
    --icon-bgcolor: attr(bgcolor type(<color>));
    color: var(--icon-bgcolor);
    min-width: 1em;
    max-width: 1em;
    min-height: 1em;
    max-height: 1em;
    aspect-ratio: 1/1;
    border-radius: 4px;
  }
}
</style>
