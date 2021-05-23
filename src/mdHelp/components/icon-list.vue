<template>
  <div class="icon-list">
    <div class="page-icons__content">
      <hhl-icon ref="icon" v-show="false"></hhl-icon>
      <div class="grid page-icons_list">
        <div :name="key" v-for="({}, key) in iconList" :key="key" class="iconListItem">
          <hhl-icon :icon="String(key)"></hhl-icon>
          <div>{{ key }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

const IconList = defineComponent({
  name: "icon-list",
  setup() {
    const icon = ref<any>(null);
    const iconList = ref([]);

    onMounted(() => {
      iconList.value = icon.value.getIconList();
    });

    return {
      icon,
      iconList
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "icon-list": typeof IconList;
  }
}
export type iIconList = InstanceType<typeof IconList>;
export default IconList;
</script>

<style>
.page-icons_list {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}
.iconListItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  padding: 3px;
  box-shadow: var(--shadow-1);
}
</style>
