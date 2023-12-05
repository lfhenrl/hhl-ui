<template>
  <component
    :is="icon"
    class="H_icon"
    :tabindex="btn === 'none' || $attrs.disabled == true ? '' : '0'"
    :class="{
      btn: btn !== 'none',
      'btn-fill': btn.startsWith('fill'),
      'btn-outline': btn.startsWith('outline'),
      'btn-round': btn.endsWith('round'),
    }"
  />
</template>

<script setup lang="ts">
import { PropType, defineAsyncComponent } from "vue";
import { type IconNames } from "../SubComponents/icons/iconNames";

const P = defineProps({
  size: { type: String, default: "24px" },
  btn: {
    type: String as PropType<
      "outline" | "outline-round" | "fill" | "fill-round" | "standard" | "none"
    >,
    default: "none",
  },
  icon: {
    type: String as PropType<IconNames>,
    default: "account",
  },
});

const icon = defineAsyncComponent(
  () => import(`../SubComponents/icons/ico-${P.icon}.vue`),
);
</script>

<style>
@layer hhl-components {
  .H_icon {
    --icon-size: v-bind(size);
    height: var(--icon-size);
    width: var(--icon-size);
  }

  .H_icon:not(.btn),
  .H_icon.btn-outline {
    background-color: transparent !important;
    color: var(--current-bg-col, var(--col-txt-2));
  }

  .H_icon.btn {
    border-radius: 4px;
  }

  .H_icon.btn-fill {
    background-color: var(--current-bg-col, var(--col-bg-4));
    color: var(--current-txt-col, var(--col-txt-0));
    padding: 4px;
  }

  .H_icon.btn.btn-outline {
    border: solid 1px currentColor;
    padding: 4px;
  }

  .H_icon.btn-round {
    border-radius: 50%;
  }

  .H_icon.btn:hover {
    filter: brightness(70%);
    -webkit-backdrop-filter: drop-shadow(4px 4px 10px red);
    backdrop-filter: drop-shadow(4px 4px 10px red);
  }

  .H_icon.btn:active {
    transform: scale(0.9);
  }
}
</style>
