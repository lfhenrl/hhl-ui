/* stylelint-disable declaration-property-value-no-unknown */
<template>
  <svg
    :size
    :color="col.bg"
    :bgcolor="col.txt"
    :variant
    :btn="btn ? '' : undefined"
    :disabled="disabled ? '' : undefined"
    viewBox="0 0 24 24"
    class="H_icon"
    height="24"
    width="24"
    fill="none"
  >
    <path fill="currentColor" :d="icon" />
  </svg>
</template>

<script setup lang="ts">
import { iconsProp } from "../SubComponents/icons/iconProp";
import { colorProps, useColor } from "../SubComponents/props/colorProp";
import { icons } from "../SubComponents/icons/icons";
import { shallowRef, toRef, watch, type PropType } from "vue";

const P = defineProps({
  ...iconsProp,
  color: { type: colorProps, default: "txt2" },
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
    color: attr(bgcolor type(<color>));
    background-color: transparent;
    min-width: 1em;
    max-width: 1em;
    min-height: 1em;
    max-height: 1em;
    aspect-ratio: 1/1;
    border-radius: 4px;

    &[btn] {
      &:hover {
        outline: 1px solid currentColor;
        opacity: 0.8;
        outline-offset: 1px;
      }
      &:active {
        transform: scale(0.9);
      }
    }
    &[disabled] {
      pointer-events: none;
      opacity: 0.35;
    }
    &[variant="base"] {
      border-radius: 50%;
    }
    &[variant^="outline"] {
      border: 1px solid currentColor;
      padding: 0.15em;
    }
    &[variant^="filled"] {
      color: attr(color type(<color>));
      background-color: attr(bgcolor type(<color>));
      padding: 0.2em;
    }
    &[variant$="round"] {
      border-radius: 50%;
    }
  }
}
</style>
