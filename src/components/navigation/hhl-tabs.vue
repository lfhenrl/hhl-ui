<template>
  <div class="hhl-tabs">
    <div class="hhl-tabs__tabs">
      <div
        v-for="tab in tabs"
        :key="tab.props.label"
        :selected="tab.props.route === selectedView"
        class="hhl-tabs__tab"
        @click="changeTab(tab.props.route)"
      >
        {{ tab.props.label }}
      </div>
    </div>

    <div class="tabs-details">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, provide } from "vue";

const HhlTabs = defineComponent({
  name: "hhl-tabs",
  props: {
    root: { type: String },
    defaultRoute: { type: String, required: true },
    willChange: { type: Function, default: () => true }
  },
  setup(props, { slots }) {
    const selectedView = ref(props.defaultRoute);
    const tabs = ref<any>([]);
    const show = ref(false);

    const state = {
      selectedTab: ref(props.defaultRoute),
     };

    provide("state", state);

    watch(selectedView, (value: string) => {
    state.selectedTab.value = value
    });

    onMounted(() => {
      tabs.value = slots.default?.();
      console.log("tabs", tabs.value.children);
      changeTab(props.defaultRoute);
    });

    function changeTab(e: string) {
      if (selectedView.value === e) {
        return;
      }

      selectedView.value = e;
    }

    return { selectedView, tabs, show, changeTab };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-tabs": typeof HhlTabs;
  }
}
export type iHhlTabs = InstanceType<typeof HhlTabs>;
export default HhlTabs;
</script>

<style>
.hhl-tabs {
  --hhl-tabs-active-bgColor: var(--col-bg-1);
  --hhl-tabs-bgColor: var(--col-pri);
  --hhl-tabs-color: var(--col-txt-on-pri);
  --hhl-tabs-active-color: var(--col-txt-1);
  display: flex;
  flex-direction: column;
  background-color: var(--hhl-tabs-active-bgColor);
  border-radius: 4px 4px 0 0;
  min-height: 100px;
  padding: 20px;
}
.hhl-tabs__spacer {
  height: 6px;
}
.hhl-tabs__tabs {
  display: flex;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  background-color: var(--hhl-tabs-bgColor);
}

.hhl-tabs__tab {
  padding: 1px 19px 3px 19px;
  margin-right: 3px;
  border-radius: 4px 4px 0 0;
  color: var(--hhl-tabs-color);
}

.hhl-tabs__tab[selected] {
  background-color: var(--hhl-tabs-active-bgColor);
  color: var(--hhl-tabs-active-color);
}

.tabs-details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  color: var(--col-txt-1);
}

.hhl-tabs-slide-enter-to,
.hhl-tabs-slide-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.hhl-tabs-slide-leave-active,
.hhl-tabs-slide-enter-active {
  transition: all 0.22s;
}

.hhl-tabs-slide-enter {
  opacity: 0;
  transform: translate3d(-18px, 0, 0);
}

.hhl-tabs-slide-leave-to {
  opacity: 0;
  transform: translate3d(18px, 0, 0);
}
</style>
