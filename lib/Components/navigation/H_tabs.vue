<template>
  <div class="H_tabs">
    <div class="H_tabs__tabs">
      <div
        v-for="tab in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled"
        :selected="tab.props.name === tabData.selected.value"
        :class="tab.props.tab_class"
        class="H_tabs__tab"
        @click="changeTab(tab.props.name)"
      >
        <div class="H_tabs__tab_label">
          <H_icon :icon="tab.props.icon" size="1.5em" v-if="tab.props.icon" btn="standard" />
          {{ tab.props.label }}
        </div>
      </div>
      <div class="flex-1" />
    </div>

    <transition name="H_tabsFade" mode="out-in">
      <div class="H_tabs-details">
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
  willChange: { type: Function, default: () => true },
});

const slots = useSlots();
const tabs = ref<any>([]);
const show = ref(true);

const tabData = {
  selected: ref(),
  changed() {
    tabs.value = slots.default?.();
  },
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
  height: 100%;
  width: 100%;
}

.H_tabs__tabs {
  display: flex;
}

.H_tabs__tab {
  display: inline-flex;
  position: relative;
  padding: 4px 12px;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.H_tabs__tab_label {
  display: inline-flex;
  align-items: center;
  position: relative;
  border-color: transparent;
  border-bottom-width: 4px;
}

.H_tabs-details {
  border-radius: 4px;
  border: 1px solid var(--col-txt-4);
  background-color: var(--col-bg-0);
}

.H_tabs__tab[selected="true"] {
  font-weight: bold;
  border: solid 1px var(--col-txt-4);
  border-bottom: none;
  background-color: var(--col-bg-0);
  top: 1px;
}

.H_tabs__tab[selected="true"] .H_tabs__tab_label {
  border-bottom-color: var(--col-pri);
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
