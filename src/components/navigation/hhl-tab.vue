<template>
  <div v-if="selected || useShow" v-show="selected" class="hhl-tab">
    hej
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

const HhlTab = defineComponent({
  name: "hhl-tab",
  props: {
    label: { default: "???", type: String },
    route: { default: "???", type: String },
    useShow: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    selected: { default: false, type: Boolean }
  },
  setup(props) {
      const state: any = inject('state')
        const selected = computed(()=>(state.selectedTab.value===props.route));
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

<style>
.hhl-tab {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
