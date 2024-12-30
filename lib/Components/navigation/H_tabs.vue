<template>
  <div class="H_tabs grid grid-rows-[auto_1fr] h-full w-full overflow-hidden">
    <div class="H_tabs__tabs flex">
      <div
        v-for="tab in tabs"
        :key="tab.props.name"
        :disabled="tab.props.disabled"
        :selected="tab.props.name === tabData.selected.value"
        :class="[
          tab.props.tab_class,
          {
            'font-black border border-txt4 border-b-transparent bg-bg0 top-[1px]':
              tab.props.name === tabData.selected.value,
            'opacity-50 pointer-events-none cursor-none': tab.props.disabled,
          },
        ]"
        class="H_tabs__tab inline-flex relative py-1 px-3 rounded-t cursor-pointer"
        @click="changeTab(tab.props.name)"
      >
        <div
          class="H_tabs__tab_label inline-flex items-center relative border-b-4 border-transparent"
          :class="{ 'border-b-pri': tab.props.name === tabData.selected.value }"
        >
          <div class="iconBtn" :class="tab.props.icon" v-if="tab.props.icon" />
          {{ tab.props.label }}
        </div>
      </div>
      <div class="flex-1" />
    </div>

    <div class="rounded overflow-hidden h-full relative border border-txt4 bg-bg0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, useSlots } from "vue";

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
    tabs.value = slots.default?.({});
  },
};

provide("tabData", tabData);

onMounted(() => {
  tabs.value = slots.default?.({});
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
