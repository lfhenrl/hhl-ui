<template>
  <div class="index">
    <h1>Sandbox</h1>
    <p>This is a sandbox area for development</p>
      <H_flex flx_direction="column" flx_align="start" class="col-txt-ok">
      <router-link v-for="route in links" :key="route.id" class="cursor-pointer" :to="route.path"
        >-{{ route.name }}</router-link
      >
      </H_flex>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getRouteData } from "../../components/routeData";

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
        const _links = routeData.routeLinks["sandbox"];
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
