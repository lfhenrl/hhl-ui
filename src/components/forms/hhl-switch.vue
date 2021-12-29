<template>
  <label class="hhl-switch flx-inline-row flx-align-center relative cursor-pointer col-bg-transparent col-pri" :style="st"
    ><input
      class="absolute cursor-pointer opacity-0 borderRadius-full"
      type="checkbox"
      v-bind="$attrs"
      v-model="checkValue"
      :value="value"
    />
    <div class="hhl-switch__box flx-row flx-align-center relative">
      <div class="hhl-switch__box__knot absolute z-1 top-0 left-0 borderRadius-full"></div>
      <div class="hhl-switch__box__rail left-0 opacity-60"></div>
    </div>
    <span :label-left="labelLeft">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, CSSProperties, PropType } from "vue";

const hhlSwitch = defineComponent({
  name: "hhl-switch",
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: false
    },
    value: { type: String, default: "" },
    label: { type: String, default: "" },
    size: { type: String, default: "1.4em" },
    labelLeft: { type: Boolean as PropType<boolean>, default: false }
  },
  setup(props, { emit }) {
    const checkValue = computed({
      get: () => props.modelValue as string | number,
      set: (val: any) => {
        emit("update:modelValue", val);
      }
    });

    const st = computed(() => {
      return {
        "--hhl-switch-size": props.size
      } as CSSProperties;
    });

    return {
      checkValue,
      st
    };
  }
});
declare global {
  interface __VLS_GlobalComponents {
    "hhl-switch": typeof hhlSwitch;
  }
}
export type ihhlSwitch = InstanceType<typeof hhlSwitch>;
export default hhlSwitch;
</script>
<style>
.hhl-switch {
  --hhl-switch-size: 1.4em;
  font-size: 0.9rem;
  line-height: 1rem;
}

.hhl-switch__box {
  height: var(--hhl-switch-size);
}

.hhl-switch__box__rail {
  height: calc(var(--hhl-switch-size) * 0.6);
  width: calc(var(--hhl-switch-size) * 1.7);
  border-radius: calc(var(--hhl-switch-size) * 0.4);
  border: solid 1px var(--col-bg-5, hsl(0, 0%, 76%));
  background-color: var(--col-bg-5, hsl(0, 0%, 76%));
}

.hhl-switch__box__knot {
  height: var(--hhl-switch-size);
  width: var(--hhl-switch-size);
  background-color: var(--col-bg-5, hsl(0, 0%, 76%));
  transition: left 0.3s;
}

.hhl-switch input:checked + .hhl-switch__box .hhl-switch__box__rail {
  background-color: var(--current-bg-col);
  border-color: var(--current-bg-col);
}

.hhl-switch input:checked + .hhl-switch__box .hhl-switch__box__knot {
  left: calc(var(--hhl-switch-size) * 0.7);
  background-color: var(--current-bg-col);
}

.hhl-switch span {
  margin-left: 5px;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  font-size: 0.9em;
  line-height: 1em;
}

.hhl-switch span[label-left="true"] {
  order: -1;
  margin-right: 5px;
}

.hhl-switch input:focus + .hhl-switch__box .hhl-switch__box__knot {
  box-shadow: 0px 0px 5px 1px var(--comp-border-color-focus, dodgerblue);
}
</style>
