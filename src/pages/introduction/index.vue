<template>
  <div class="index">
    <h1>Introduction</h1>
    <h2>Installation</h2>
    <div class="col-bg-2" style="padding: 5px">npm i hhl-ui</div>
    <p>This is how I setup my development</p>
    <H_col gap="6px" class="col-txt-ok">
      <router-link v-for="route in links" :key="route.id" class="cursor-pointer" :to="route.path">-{{ route.name }}</router-link>
    </H_col>
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
        const _links = routeData.routeLinks["introduction"];
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
