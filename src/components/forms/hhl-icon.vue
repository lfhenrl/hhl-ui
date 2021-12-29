<template>
  <svg viewBox="0 0 24 24" class="hhl-icon" :style="style" >
    <path v-for="(val, index) in getPath()" :key="index" :d="val" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import icons from "../utils/icons.json";
const hhlIcon = defineComponent({
  props: {
    icon: {
      type: String,
      default: "close"
    },
    size: String
  },
  setup(props) {
    const getPath = () => icons[props.icon] as Array<any>;
    const getIconList = () => icons;

    const style: object = computed(() => {
      return {
        "--hhl-icon-size": props.size || null,
      };
    });

    return {
      getPath,
      getIconList,
      style
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-icon": typeof hhlIcon;
  }
}
export type ihhlIcon = InstanceType<typeof hhlIcon>;
export default hhlIcon;
</script>

<style>
:root {
  --hhl-icon-size: 24px;
}

.hhl-icon {
  fill: currentColor;
  width: var(--hhl-icon-size);
  height: var(--hhl-icon-size);
}
.hhl-icon[btn] {
  cursor: pointer;
  transition: transform 0.2s ease-out;
}

.hhl-icon[btn]:hover {
  transform: scale(1.25);
}
.hhl-icon[btn]:active {
  transform: scale(1.4);
}
</style>
