<template>
  <div class="index">
    <h1>Components</h1>
    <p>This is the documentation for the HHL-UI components</p>
    <div class="flx-col gap-2 col-txt-ok">
      <router-link v-for="route in links" :key="route.id" class="cursor-pointer borderColor-ok" :to="route.path"
        >-{{ route.name }}</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getRouteData } from "../../mdHelp/plugins/routeData";

const Index = defineComponent({
  name: "index",
  props: {
    modelValue: { type: String, default: "" }
  },
  setup() {
    const routeData = getRouteData();
    const links = ref<any[]>([]);
    onMounted(() => {
      setTimeout(() => {
        const _links = routeData.routeLinks["components"];
        links.value = _links.children;
      });
    });
    return { links };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    index: typeof Index;
  }
}
export type iIndex = InstanceType<typeof Index>;
export default Index;
</script>

<style>
.index {
  overflow: auto;
}
</style>
