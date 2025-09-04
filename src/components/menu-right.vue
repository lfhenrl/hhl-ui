<template>
  <div
    h-display="flex"
    h-flex-direction="column"
    h-min-width="160px"
    h-max-width="160px"
    h-overflow="auto"
    h-bgcolor="var(--bgcol-1)"
    h-padding="8px"
    h-font-size="14px"
    h-margin-top="0.25rem"
  >
    <div
      h-cursor="pointer"
      :class="{ 'menu-right-links-selected': item.id === activeIndex }"
      :hh="item.id"
      :dd="activeIndex"
      v-for="item in indexList"
      @click="linkClick(item.id)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { debounce } from "../../lib/utils/debounce";

function jsUcfirst(string: string) {
  let str = string.charAt(0).toUpperCase() + string.slice(1);
  return str.replaceAll("-", " ");
}

const MenuRight = defineComponent({
  name: "menu-right",
  props: {
    view: { type: Object, default: {} },
  },
  setup(props, {}) {
    const _onScroll = debounce(onScroll);
    const route = useRoute();
    const indexList = ref();
    const activeIndex = ref("");
    let domList: HTMLElement[];
    let page: HTMLElement;

    function updateIndex() {
      setTimeout(() => {
        if (!page) return;
        const list = page.querySelectorAll("h1, h2");
        const newList = Array.from(list).map((item) => {
          return {
            id: item.id,
            name: jsUcfirst(item.id),
          };
        });
        domList = Array.from(list) as HTMLElement[];
        indexList.value = newList;
        page.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }, 10);
    }

    function linkClick(name: string) {
      const yy = document.getElementById(name);
      yy?.scrollIntoView();
    }

    function onScroll() {
      const scrollTop = page.scrollTop;
      const scrollHight = page.clientHeight;
      const posInView = scrollTop + scrollHight;
      let active = "";
      let posTop = 0;
      domList.forEach((item: HTMLElement) => {
        const pos = posInView - item.offsetTop;
        if (pos > 30 && posTop < 20) active = item.id;
        posTop = item.offsetTop - scrollTop;
      });
      activeIndex.value = active;
    }

    watch(
      () => route.path,
      async () => {
        updateIndex();
      }
    );

    onMounted(() => {
      setTimeout(() => {
        page = props.view as HTMLElement;
        page.addEventListener("scroll", _onScroll);
      });
      updateIndex();
    });

    onUnmounted(() => {
      page.removeEventListener("scroll", _onScroll);
    });

    return { indexList, linkClick, activeIndex };
  },
});

export type iMenuRight = InstanceType<typeof MenuRight>;
export default MenuRight;
</script>
<style>
.menu-right-links-selected {
  color: var(--col-ok);
  font-weight: bold;
}
</style>
