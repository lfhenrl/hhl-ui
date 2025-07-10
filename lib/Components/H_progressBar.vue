<template>
  <div class="H_progressBar" :color="col.txt" :color2="col2.txt" :size="endSize" :speed>
    <div v-if="show" class="H_progressBar-value"></div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useColor, colorProps } from "../SubComponents/props/colorProp";
import { sizeProp, useSize } from "../SubComponents/props/sizeProp";

const P = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: { type: sizeProp, default: "sm" },
  color: { type: colorProps, default: "pri" },
  color2: { type: colorProps, default: "transparent" },
  speed: { type: String, default: "1s" },
});

const col = useColor(toRef(() => P.color));
const col2 = useColor(toRef(() => P.color2));
const endSize = useSize(toRef(() => P.size));
</script>
<style>
@layer components {
  .H_progressBar {
    --progress-color: attr(color type(<color>));
    --progress-color2: attr(color2 type(<color>));
    --progress-size: calc(attr(size type(<length>)) * 0.3);
    --progress-speed: attr(speed type(<time>));
    background-color: var(--progress-color2);
    overflow: hidden;
    min-height: var(--progress-size);
    width: 100%;
    border-radius: 4px;
  }

  .H_progressBar-value {
    background-color: var(--progress-color);
    min-height: var(--progress-size);
    width: 50%;
    height: 100%;
    animation: indeterminateAnimation var(--progress-speed) infinite linear;
  }

  @keyframes indeterminateAnimation {
    0% {
      transform: translateX(-100%);
    }
    70% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(200%);
    }
  }
}
</style>
