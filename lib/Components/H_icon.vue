<template>
  <component
    :is="ic"
    class="H_icon"
    :disabled="disabled ? '' : undefined"
    :tabindex="btn === 'none' || $attrs.disabled == true ? '' : '0'"
    :class="{
      btn: btn !== 'none',
      'btn-standard': btn === 'standard',
      'btn-fill': btn === 'fill',
      'fill-round': btn === 'fill-round',
      'btn-outline': btn === 'outline',
      'btn-outline-round': btn === 'outline-round',
    }"
  />
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { type IconNames, Icons } from "../SubComponents/icons/iconNames";

const P = defineProps({
  size: { type: String, default: "24px" },
  btn: {
    type: String as PropType<"outline" | "outline-round" | "fill" | "fill-round" | "standard" | "none">,
    default: "none",
  },
  icon: {
    type: String as PropType<IconNames>,
    default: "close",
  },
  disabled: { type: Boolean, default: false },
});

const ic: any = Icons[P.icon];
</script>

<style>
@layer hhl-components {
  .H_icon {
    --icon-size: v-bind(size);
    height: var(--icon-size);
    width: var(--icon-size);
    min-height: var(--icon-size);
    min-width: var(--icon-size);
    aspect-ratio: 1 / 1;
  }

  .H_icon.btn {
    border-radius: 50px;
  }

  .H_icon.btn-outline {
    background-color: transparent !important;
    color: var(--current-bg-col, currentColor, var(--col-txt-2));
    border: solid 1px currentColor;
    border-radius: 4px;
  }

  .H_icon.btn-outline-round {
    background-color: transparent !important;
    color: var(--current-bg-col, currentColor, var(--col-txt-2));
    border: solid 1px currentColor;
    padding: 3px;
    border-radius: 50%;
  }

  .H_icon.btn-fill {
    background-color: var(--current-bg-col, var(--col-bg-4));
    color: var(--current-txt-col, var(--col-txt-0));
    padding: 4px;
    border-radius: 4px;
  }

  .H_icon.fill-round {
    background-color: var(--current-bg-col, var(--col-bg-4));
    color: var(--current-txt-col, var(--col-txt-0));
    padding: 4px;
    border-radius: 50%;
  }

  .H_icon.btn:hover {
    outline: 2px solid var(--col-pri);
    outline-offset: 1px;
    aspect-ratio: 1 / 1;
  }

  .H_icon.btn:active {
    transform: scale(0.9);
  }
}
</style>
