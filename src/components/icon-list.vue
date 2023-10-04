<template>
      <H_icon ref="icon" v-show="false"></H_icon>
      <div class="flex flex-wrap gap-3 pt-5">
        <div :name="key" v-for="({}, key) in iconList" :key="key" class="flex flex-col items-center shadow-md p-1 w-36">
          <H_icon :icon="String(key)"></H_icon>
          <div>{{ key }}</div>
        </div>
      </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import H_icon from "../../lib/Components/H_icon.vue";

const IconList = defineComponent({
  name: "icon-list",
  components: { H_icon },
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

export type iIconList = InstanceType<typeof IconList>;
export default IconList;
</script>

