<template>
  <div class="H_tabs">
    <div class="H_tabs__tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled ? '' : null"
        :selected="activeTab === index"
        :class="[tab.props.tab_class]"
        class="H_tabs__tab"
        @click="changeTab(index)"
      >
        <div class="H_tabs__tab_label" :selected="activeTab === index ? '' : null">
          <div class="iconBtn" :class="tab.props.icon" v-if="tab.props.icon" />
          {{ tab.props.label }} {{ tab.props.sofus }}
        </div>
      </div>
    </div>

    <div class="H_tabs__tab_content" :first="activeTab === 0 ? '' : null">
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
  changeTab(P.defaultIndex);
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
    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    height: 100%;
    width: 100%;

    .H_tabs__tabs {
      display: flex;
    }

    .H_tabs__tab {
      display: inline-flex;
      position: relative;
      padding: 0.25em;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;
      border-color: transparent;
      cursor: pointer;

      &[selected="true"] {
        border: 1px solid var(--color-txt4);
        border-bottom-color: transparent;
        background-color: var(--color-bg0);
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
      display: inline-flex;
      align-items: center;
      position: relative;
      border-bottom: 3px solid transparent;
      padding-inline: 0.25em;
      &[selected] {
        border-bottom-color: var(--color-pri);
      }
    }

    .H_tabs__tab_content {
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      height: 100%;
      background-color: var(--color-bg0);
      border: 1px solid var(--color-txt4);
      &[first] {
        border-top-left-radius: 0;
      }
    }
  }
}
</style>
