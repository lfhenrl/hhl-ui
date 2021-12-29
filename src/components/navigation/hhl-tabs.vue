<template>
  <div class="hhl-tabs flx-col w-100pr">
    <div class="hhl-tabs__tabs flx-row">
      <div
        v-for="tab in tabs"
        :key="tab.props.label"
        :disabled="tab.props.disabled"
        :selected="tab.props.name === selectedTab"
        class="hhl-tabs__tab col-txt-1 px-15 cursor-pointer border-b borderColor-bg-4 borderRadius-tl-4 borderRadius-tr-4"
        @click="changeTab(tab.props.name)"
      >
        <div v-if="tab.props.icon" class="hhl-tabs__tab_icon block-inline">
          <hhl-icon :icon="tab.props.icon" />
        </div>
        <div v-else class="hhl-tabs__tab_label block-inline">
          {{ tab.props.label }}
        </div>
      </div>
      <div class="hhl-tabs__tab-spacer flx-1 border-b borderColor-bg-4" />
    </div>

    <transition name="slide-fade">
      <div class="tabs-details border border-t-none borderColor-bg-4" v-show="show">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, provide } from "vue";

const HhlTabs = defineComponent({
  name: "hhl-tabs",
  props: {
    defaultTab: { type: String, default: "" },
    willChange: { type: Function, default: () => true }
  },
  setup(props, { slots }) {
    const tabs = ref<any>([]);
    const show = ref(true);
    const selectedTab = ref();

    provide("selectedTab", selectedTab);

    onMounted(() => {
      const sl = slots.default?.();
      let selected: string = props.defaultTab;
      if (props.defaultTab === "" && sl) {
        const firstChild: any = sl[0];
        selected = firstChild.props.name as string;
      }
      console.log(sl);
      tabs.value = sl;
      changeTab(selected);
    });

    function changeTab(e: string) {
      if (selectedTab.value === e) {
        return;
      }
      if (props.willChange(e)) {
        show.value = false;

        setTimeout(() => {
          selectedTab.value = e;
          show.value = true;
        }, 250);
      }
    }

    return { selectedTab, tabs, show, changeTab };
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
.hhl-tabs__tab[selected="true"] {
  font-weight: bold;
  border: solid 1px var(--col-bg-4);
  border-bottom: none;
}

.hhl-tabs__tab[selected="true"] .hhl-tabs__tab_label {
  border-bottom: 3px solid var(--col-pri);
  line-height: 1;
}

.tabs-details {
  transform-origin: top;
}

.slide-fade-enter-active {
  transition: all 0.25s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>
