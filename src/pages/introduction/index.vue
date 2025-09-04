<template>
  <div class="markdown-body">
    <h1>Introduction</h1>
    <h2>Installation</h2>
    <div h-padding="5px">npm i hhl-ui</div>
    <p>This is how I setup my development</p>
    <div class="linkList">
      <router-link v-for="route in links" :key="route.id" :to="route.path">-{{ route.name }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getRouteData } from "../../components/routeData";

const Index = defineComponent({
  name: "index",
  props: {
    modelValue: { type: String, default: "" },
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
  },
});

export type iIndex = InstanceType<typeof Index>;
export default Index;
</script>
