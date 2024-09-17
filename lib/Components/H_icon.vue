<template>
  <div
    class="H_icon"
    :class="{
      btn: btn !== 'none',
      'btn-standard': btn === 'standard',
      'btn-fill': btn === 'fill',
      'fill-round': btn === 'fill-round',
      'btn-outline': btn === 'outline',
      'btn-outline-round': btn === 'outline-round',
    }"
  >
    <component
      :is="ic"
      :disabled="disabled ? '' : undefined"
      :tabindex="btn === 'none' || $attrs.disabled == true ? '' : '0'"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
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
  color: {
    type: String as PropType<"current" | "pri" | "sec" | "ok" | "err" | "warn" | "info">,
    default: "current",
  },
});
const bgColor = computed(() => {
  if (P.btn.startsWith("fill")) {
    if (P.color === "current") return "var(--col-bg-4)";
    return `var(--col-${P.color})`;
  } else return "transparent";
});
const txtColor = computed(() => {
  if (P.btn.startsWith("fill")) {
    if (P.color === "current") return "currentColor";
    return `var(--col-on-${P.color})`;
  } else return `var(--col-${P.color})`;
});

const ic: any = Icons[P.icon];
</script>

<style>
.H_icon {
  --icon-size: v-bind(size);
  height: var(--icon-size);
  width: var(--icon-size);
  min-height: var(--icon-size);
  min-width: var(--icon-size);
  aspect-ratio: 1 / 1;
  background-color: v-bind(bgColor);
  color: v-bind(txtColor);
  display: flex;
  align-items: center;
}

.H_icon svg {
  height: 100%;
  width: 100%;
}

.H_icon[disabled] {
  opacity: 0.4;
  pointer-events: none;
  cursor: none;
}

.H_icon.btn {
  border-radius: 50%;
}

.H_icon.btn-outline {
  border: solid 1px currentColor;
  border-radius: 4px;
}

.H_icon.btn-outline-round {
  border: solid 1px currentColor;
  padding: 3px;
}

.H_icon.btn-fill {
  padding: 4px;
  border-radius: 4px;
}

.H_icon.fill-round {
  padding: 4px;
}

.H_icon.btn:hover {
  outline: 2px solid var(--col-pri);
  outline-offset: 1px;
  aspect-ratio: 1 / 1;
}

.H_icon.btn:active {
  transform: scale(0.9);
}
</style>
