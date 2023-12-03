<template>
  <H_icon ref="icon" v-show="false"></H_icon>
  <div class="flex flex-wrap gap-3 pt-5">
    <div
      :name="item"
      v-for="item in iconList.toSorted()"
      :key="item"
      class="flex w-36 flex-col items-center p-1 shadow-md"
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
    /*     const iconList = ref([]); */

    /*     onMounted(() => {
      iconList.value = iconList.value;
    }); */

    return {
      icon,
      iconList,
    };
  },
});

export type iIconList = InstanceType<typeof IconList>;
export default IconList;
</script>
