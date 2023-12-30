<template>
  <div class="icon-list">
    <div
      :name="item"
      v-for="item in iconList.toSorted()"
      :key="item"
      class="icon-list-item shadow"
    >
      <H_icon :icon="String(item)"></H_icon>
      <div>{{ item }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import H_icon from "../../lib/Components/H_icon.vue";
import { iconList } from "../../lib/SubComponents/icons/iconNames";

const IconList = defineComponent({
  name: "icon-list",
  components: { H_icon },
  setup() {
    const icon = ref<any>(null);
    return {
      icon,
      iconList,
    };
  },
});

export type iIconList = InstanceType<typeof IconList>;
export default IconList;
</script>
<style>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 20px;
}
.icon-list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 144px;
  padding: 4px;
}
</style>
