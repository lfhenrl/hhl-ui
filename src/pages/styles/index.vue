<template>
  <div class="index">
    <h1>Styles</h1>
    <p>This is the documentation for how to use the stylesheets</p>
    <H_col gap="7px" class="col-txt-ok">
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
        const _links = routeData.routeLinks["styles"];
        links.value = _links.children;
      });
    });
    return { links };
  }
});

export type iIndex = InstanceType<typeof Index>;
export default Index;
</script>

<style>
.index {
  overflow: auto;
}
</style>
