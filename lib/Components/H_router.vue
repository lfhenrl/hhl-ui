<template>
  <Transition name="H_router-slide-fade" mode="out-in">
    <keep-alive :include="cachedPages">
      <component :is="currentView" class="H_router" />
    </keep-alive>
  </Transition>
</template>

<script lang="ts">
const beforenavigateList: any[] = [];
let cachedPages: string[] = [];
export const Pages = ref<{ name: string; path: string }[]>([]);
export const activeRoute = ref(window.location.hash.slice(1));

export const beforenavigate = (fn: (to: string, from: string) => boolean) => {
  onMounted(() => beforenavigateList.push(fn));
  onUnmounted(() => {
    const idx: number = beforenavigateList.indexOf(fn);
    if (idx > -1) {
      beforenavigateList.splice(idx, 1);
    }
  });
};
</script>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const P = defineProps({
  routes: { type: Object, default: {} },
});

const currentView = computed(() => {
  return P.routes[activeRoute.value || "/"].component;
});

function getcachedPages() {
  Object.keys(P.routes).forEach((item: any) => {
    const val = P.routes[item];
    const page = {
      name: val["name"],
      path: "#" + item,
    };
    Pages.value.push(page);
    if (val["cache"] === true) cachedPages.push(val["name"]);
  });
}

window.addEventListener("hashchange", () => {
  const newRoute = window.location.hash.slice(1);
  let canNavigate = true;
  if (newRoute === activeRoute.value) return;

  beforenavigateList.forEach((beforenavigate: any) => {
    const isTrue = beforenavigate(newRoute, activeRoute.value);
    if (!isTrue) canNavigate = false;
  });

  if (canNavigate) {
    activeRoute.value = newRoute;
  } else {
    window.location.hash = activeRoute.value;
  }
  console.log("eventList ", beforenavigateList.length);
});
getcachedPages();
</script>

<style>
@layer hhl-components {
  .H_router {
    overflow: auto;
    height: 100%;
    width: 100%;
  }

  .H_router-slide-fade-enter-active {
    transition: all 0.2s ease-out;
  }

  .H_router-slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .H_router-slide-fade-enter-from {
    transform: translateY(-40px);
    opacity: 0;
  }

  .H_router-slide-fade-leave-to {
    transform: translateY(40px);
    opacity: 0;
  }
}
</style>
