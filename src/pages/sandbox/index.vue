<template>
  <div class="markdown-body">
    <h1>Sandbox</h1>
    <p>This is a sandbox area for development</p>
    <div class="linkList" h-display="flex" h-flex-direction="column" h-color="var(--col-ok)">
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
        const _links = routeData.routeLinks["sandbox"];
        links.value = _links.children;
      });
    });
    return { links };
  },
});

export type iIndex = InstanceType<typeof Index>;
export default Index;
</script>
