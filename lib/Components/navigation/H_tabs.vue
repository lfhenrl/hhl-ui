<template>
  <div class="H_tabs">
    <div class="H_tabs__tabs">
      <div
        v-for="tab in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled"
        :selected="tab.props.name === tabData.selected.value"
        :class="tab.props.tab_class"
        class="H_tabs__tab col-txt-1"
        @click="changeTab(tab.props.name)"
      >
        <div class="H_tabs__tab_label">
          <h_icon :icon="tab.props.icon" size="1.5em" v-if="tab.props.icon" btn />
          {{ tab.props.label }}
        </div>
      </div>
      <div class="H_tabs__tab-spacer" />
    </div>

    <transition name="H_tabsFade" mode="out-in">
      <div v-if="show" class="H_tabs-details">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, useSlots } from "vue";
import H_icon from "../H_icon.vue";

const props = defineProps({
  defaultTab: { type: String, default: "" },
  willChange: { type: Function, default: () => true }
});

const slots = useSlots();
const tabs = ref<any>([]);
const show = ref(true);
const chCount = ref(0);

const tabData = {
  selected: ref(),
  changed() {
    tabs.value = slots.default?.();
  }
};

provide("tabData", tabData);

onMounted(() => {
  tabs.value = slots.default?.();
  let selected: string = props.defaultTab;
  if (props.defaultTab === "" && tabs.value) {
    const firstChild: any = tabs.value[0];
    selected = firstChild.props.name as string;
  }
  changeTab(selected);
});

function changeTab(e: string) {
  if (tabData.selected.value === e) {
    return;
  }
  if (props.willChange(tabData.selected.value, e)) {
    show.value = false;

    setTimeout(() => {
      tabData.selected.value = e;
      show.value = true;
    }, 1);
  }
}
</script>

<style>
.H_tabs {
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
}

.H_tabs__tabs {
  display: flex;
  padding: 0;
}

.H_tabs__tab {
  display: inline-flex;
  position: relative;
  padding: 3px 8px 0 8px;
  cursor: pointer;
  /* border-bottom: 1px solid var(--col-txt-4); */
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.H_tabs__tab-spacer {
  flex: 1;
  /* border-bottom: 1px solid var(--col-txt-4); */
}

.H_tabs__tab[selected="true"] {
  position: relative;
  font-weight: bold;
  border: solid 1px var(--col-txt-4);
  border-bottom: none;
  background-color: var(--col-bg-0);
  top: 1px;
}

.H_tabs__tab_label {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px 4px 0 4px;
  border-bottom: 4px solid transparent;
  line-height: 1;
}

.H_tabs__tab[selected="true"] .H_tabs__tab_label {
  border-bottom-color: var(--col-pri);
}

.H_tabs-details {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border: 1px solid var(--col-txt-4);
  border-radius: 4px;
  /* border-top: none; */
  background-color: var(--col-bg-0);
}

.H_tabsFade-enter-active,
.H_tabsFade-leave-active {
  transition: opacity 0.2s ease;
}

.H_tabsFade-enter-from,
.H_tabsFade-leave-to {
  opacity: 0;
}
</style>
