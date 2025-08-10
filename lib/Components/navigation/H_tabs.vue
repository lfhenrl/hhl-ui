<template>
  <div
    class="H_tabs"
    h-display="grid"
    h-height="100%"
    h-width="100%"
    h-overflow="hidden"
    h-grid-template-rows="auto 1fr"
  >
    <div class="H_tabs__tabs" h-display="flex">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled ? '' : null"
        :h-disabled="tab.props.disabled ? '50%' : undefined"
        :selected="activeTab === index ? '' : null"
        :class="[tab.props.tab_class]"
        class="H_tabs__tab"
        h-display="inline-flex"
        h-position="relative"
        h-cursor="pointer"
        h-padding="0.25em"
        h-border-color="transparent"
        h-border-radius="4px 4px 0 0"
        h-z-index="1"
        @click="changeTab(index)"
      >
        <div
          class="H_tabs__tab_label"
          h-display="inline-flex"
          h-align-items="center"
          h-position="relative"
          h-padding="0 0.25em"
          h-border-color="transparent"
          h-border-width="0 0 3px 0"
        >
          <div class="iconBtn" :class="tab.props.icon" v-if="tab.props.icon" />
          {{ tab.props.label }} {{ tab.props.sofus }}
        </div>
      </div>
    </div>

    <div
      class="H_tabs__tab_content"
      h-position="relative"
      h-border-radius="4px"
      h-height="100%"
      h-overflow="hidden"
      h-bgcolor="var(--color-bg2)"
      h-border="1px solid var(--color-txt6)"
      :first="activeTab === 0 ? '' : null"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots, provide } from "vue";
const P = defineProps({
  defaultIndex: { type: Number, default: 0 },
  willChange: { type: Function, default: () => true },
});

const slots = useSlots();
const activeTab = ref(0);
const tabs = ref<any>([]);

const tabData = {
  selectedIndex: ref(0),
  oldSelectedIndex: 0,
  name: "",
};

provide("tabData", tabData);

onMounted(() => {
  tabs.value = slots.default?.({});
  tabData.selectedIndex.value = -1;
  setTimeout(() => {
    changeTab(P.defaultIndex);
  });
});

function changeTab(e: number) {
  tabData.oldSelectedIndex = tabData.selectedIndex.value;
  tabData.selectedIndex.value = e;
  tabData.name = tabs.value[e].props.name;
  activeTab.value = e;
}
</script>
<style>
@layer components {
  .H_tabs {
    .H_tabs__tab {
      &[selected] {
        border: 1px solid var(--color-txt4);
        border-bottom-color: transparent;
        background-color: var(--color-bg2);
        margin-bottom: -1px;

        .H_tabs__tab_label {
          border-bottom-color: var(--color-pri);
        }
      }
    }

    .H_tabs__tab_content {
      &[first] {
        border-top-left-radius: 0;
      }
    }
  }
}
</style>
