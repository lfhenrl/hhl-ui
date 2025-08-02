<template>
  <div class="H_tabs h_grid h_h-full h_w-full">
    <div class="H_tabs__tabs h_flex">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled ? '' : null"
        :selected="activeTab === index"
        :class="[tab.props.tab_class]"
        class="H_tabs__tab h_flexInline h_relative h_cursor-pointer"
        @click="changeTab(index)"
      >
        <div
          class="H_tabs__tab_label h_flexInline h_items-center h_relative"
          :selected="activeTab === index ? '' : null"
        >
          <div class="iconBtn" :class="tab.props.icon" v-if="tab.props.icon" />
          {{ tab.props.label }} {{ tab.props.sofus }}
        </div>
      </div>
    </div>

    <div class="H_tabs__tab_content h_relative h_rounded h_h-full" :first="activeTab === 0 ? '' : null">
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
    grid-template-rows: auto 1fr;
    overflow: hidden;

    .H_tabs__tab {
      padding: 0.25em;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      border-color: transparent;

      &[selected="true"] {
        border: 1px solid var(--color-txt4);
        border-bottom-color: transparent;
        background-color: var(--color-bg2);
        margin-bottom: -1px;
        z-index: 10;
      }

      &[disabled] {
        pointer-events: none;
        cursor: none;
        opacity: 0.5;
      }
    }

    .H_tabs__tab_label {
      border-bottom: 3px solid transparent;
      padding-inline: 0.25em;
      &[selected] {
        border-bottom-color: var(--color-pri);
      }
    }

    .H_tabs__tab_content {
      overflow: hidden;
      background-color: var(--color-bg2);
      border: 1px solid var(--color-txt6);
      &[first] {
        border-top-left-radius: 0;
      }
    }
  }
}
</style>
