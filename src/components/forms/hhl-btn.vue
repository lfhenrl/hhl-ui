<template>
  <button
    class="hhl-btn flx-inline-row flx-justify-center flx-align-center borderRadius-4 txt-nowrap cursor-pointer col-pri"
    type="button"
    :class="cl"
  >
    <hhl-icon v-if="icon !== ''" :icon="icon"></hhl-icon><slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

const hhlBtn = defineComponent({
  name: "hhl-btn",
  props: {
    type: {
      type: String as PropType<"standard" | "outline" | "text" | "icon" | "icon-outline" | "icon-text">,
      default: "standard"
    },
    size: {
      type: String as PropType<"lg" | "md" | "sm">,
      default: "md"
    },
    icon: { type: String, default: "" },
    iconRight: { type: Boolean, default: false }
  },
  setup(props) {
    const cl = computed(() => {
      return {
        "btn-outline": props.type.includes("outline"),
        "btn-text": props.type.includes("text"),
        "btn-icon": props.type.includes("icon"),
        "btn-lg": props.size.includes("lg"),
        "btn-sm": props.size.includes("sm"),
        "btn-icon-right": props.iconRight
      };
    });
    return { cl };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-btn": typeof hhlBtn;
  }
}
export type ihhlBtn = InstanceType<typeof hhlBtn>;
export default hhlBtn;
</script>

<style>
.hhl-btn {
  --btn-size: 2rem;
  --btn-icon-size: 1rem;
  padding: 0 1em;
  height: var(--btn-size);
  font-size: 1rem;
  gap: 0.2em;
}

.hhl-btn:active {
  transform: scale(0.93);
}

.hhl-btn:focus {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}

.hhl-btn.btn-lg {
  --btn-size: 2.5rem;
  --btn-icon-size: 1.3rem;
  font-size: 1.4rem;
}

.hhl-btn.btn-sm {
  --btn-size: 1.6rem;
  --btn-icon-size: 0.8rem;
  font-size: 0.8rem;
}

.hhl-btn.btn-outline {
  background-color: transparent;
  color: var(--current-bg-col);
  border: 1px solid var(--current-bg-col);
}

.hhl-btn.btn-text {
  background-color: transparent;
  color: var(--current-bg-col);
  border-color: transparent;
}

.hhl-btn.btn-text.btn-icon {
  color: var(--current-bg-col);
}

.hhl-btn.btn-icon {
  padding: 0;
  width: var(--btn-size);
}

.hhl-btn .hhl-icon {
  --hhl-icon-size: var(--btn-icon-size);
}

.hhl-btn.btn-icon-right .hhl-icon {
  order: 1;
}

.hhl-btn.btn-icon .hhl-icon {
  color: currentColor;
  --hhl-icon-size: calc(var(--btn-icon-size) * 1.3);
}

.hhl-btn:hover {
  background-color: var(--col-bg-2);
  color: var(--col-txt-2);
}
</style>
