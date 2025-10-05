<template>
  <div class="H_tabs" h-display="grid" h-height="100%" h-width="100%" h-overflow="hidden" h-grid-tmp-rows="auto 1fr">
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
        :h-bgcolor="activeTab === index ? activeColor : 'transparent'"
        h-cursor="pointer"
        h-padding="0.25em"
        :h-border-width="activeTab === index ? '1px 1px 0 1px' : '0'"
        :h-margin="activeTab === index ? '0 0 -1px 0' : '0'"
        h-border-radius="4px 4px 0 0"
        h-border-color="var(--col-6)"
        h-z-index="1"
        @click="changeTab(index)"
      >
        <div
          class="H_tabs__tab_label"
          h-display="inline-flex"
          h-align-items="center"
          h-position="relative"
          h-padding="0 0.25em"
          :h-border-color="activeTab === index ? 'var(--col-pri)' : 'transparent'"
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
      :h-border-radius="activeTab === 0 ? '0 4px 4px 4px' : '4px'"
      h-max-height="100%"
      h-overflow="hidden"
      :h-bgcolor="activeColor"
      h-border="1px solid var(--col-6)"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots, provide, watch } from "vue";
const P = defineProps({
  defaultIndex: { type: Number, default: 0 },
  defaultTab: { type: String, default: "??" },
  willChange: { type: Function, default: () => true },
  activeColor: { default: "var(--bgcol-2)", type: String },
});

const slots = useSlots();
const activeTab = ref(0);
const tabs = ref<any>([]);

watch(
  () => P.defaultTab,
  (newVal) => {
    if (newVal !== "??") {
      const index = getIndexFromName(newVal);
      if (index >= 0) {
        changeTab(index);
      }
    }
  }
);

function getIndexFromName(name: string) {
  const index = tabs.value.findIndex((t: any) => t.props.name === name);
  return index >= 0 ? index : P.defaultIndex;
}

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
    changeTab(getIndexFromName(P.defaultTab));
  });
});

function changeTab(e: number) {
  console.log("tabData.name ", tabData.name, tabs.value[e].props.name);
  const navigate = P.willChange(tabData.name, tabs.value[e].props.name);
  if (navigate) {
    tabData.oldSelectedIndex = tabData.selectedIndex.value;
    tabData.selectedIndex.value = e;
    tabData.name = tabs.value[e].props.name;
    activeTab.value = e;
  }
}
</script>
