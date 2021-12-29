<template>
  <div v-if="selected || keepAlive" v-show="selected" class="hhl-tab">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

const HhlTab = defineComponent({
  name: "hhl-tab",
  props: {
    label: { default: "???", type: String },
    name: { default: "???", type: String },
    icon: { default: "", type: String },
    keepAlive: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    selected: { default: false, type: Boolean }
  },
  setup(props) {
    const selectedTab: any = inject("selectedTab");
    const selected = computed(() => selectedTab.value === props.name);
    return { selected };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-tab": typeof HhlTab;
  }
}
export type iHhlTab = InstanceType<typeof HhlTab>;
export default HhlTab;
</script>
