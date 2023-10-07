<template>
  <div class="markdown-body overflow-auto">
    <h1>Introduction</h1>
    <h2>Installation</h2>
    <div class="col-bg-2" style="padding: 5px">npm i hhl-ui</div>
    <p>This is how I setup my development</p>
    <div class="flex flex-col text-ok">
      <router-link
        v-for="route in links"
        :key="route.id"
        class="cursor-pointer"
        :to="route.path"
        >-{{ route.name }}</router-link
      >
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
