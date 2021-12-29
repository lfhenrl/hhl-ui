<template>
  <div ref="root" class="hhl-virtual-list" @scroll="onScroll">
    <slot name="header" />
    <div class="hhl-virtual-list-scroller" role="group" :style="paddingStyle">
        <hhl-virtual-list-item
          v-for="item in items"
          :key="item[String(dataKey)]"
          :uniqueKey="item[String(dataKey)]"
          :horizontal="isHorizontal"
          :setSize="onItemResized"
          :data="item"
          :data-id="item[String(dataKey)]"
          :itemClass="itemClass"
        >
          <slot :item="item" />
        </hhl-virtual-list-item>
    </div>
    <div ref="shepherd" :style="{ width: isHorizontal ? '0px' : '10%', height: isHorizontal ? '100%' : '0px' }" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Virtual from "./virtual";

export default defineComponent({
  name: "hhl-virtual-list",
  props: {
    dataKey: {
      type: [String, Function],
      required: true
    },
    dataSources: {
      type: Array,
      required: true
    },
    keeps: {
      type: Number,
      default: 10
    },
    estimateSize: {
      type: Number,
      default: 50
    },

    direction: {
      type: String,
      default: "vertical" // the other value is horizontal
    },
    start: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    topThreshold: {
      type: Number,
      default: 0
    },
    bottomThreshold: {
      type: Number,
      default: 0
    },
    itemClass: {
      type: String,
      default: "hhl-virtual-list-itemXXXXXXXXXXXX"
    }
  },
  setup(props, { emit }) {
    const root = ref(<HTMLElement | null>null);
    const shepherd = ref(<HTMLElement | null>null);
    const items = ref([]);
    const paddingStyle = ref({});
    let virtual: any;
    let range: any = {};
    const isHorizontal = props.direction === "horizontal";
    const directionKey = isHorizontal ? "scrollLeft" : "scrollTop";
    let leftScroll = 0;

    installVirtual();

    watch(
      () => props.dataSources,
      () => {
        virtual.updateParam("uniqueIds", getUniqueIdFromDataSources());
        virtual.handleDataSourcesChange();
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
      }
    );
    watch(
      () => props.keeps,
      (newValue) => {
        virtual.updateParam("keeps", newValue);
        virtual.handleSlotSizeChange();
      }
    );
    watch(
      () => props.start,
      (newValue) => {
        scrollToIndex(newValue);
      }
    );

    watch(
      () => props.offset,
      (newValue) => {
        scrollToOffset(newValue);
      }
    );

    onActivated(() => {
      scrollToOffset(virtual.offset);
    });

    onMounted(() => {
      if (props.start) {
        scrollToIndex(props.start);
      } else if (props.offset) {
        scrollToOffset(props.offset);
      }
    });

    onBeforeUnmount(() => {
      virtual.destroy();
    });

    function installVirtual() {
      virtual = new Virtual(
        {
          keeps: props.keeps,
          estimateSize: props.estimateSize,
          buffer: Math.round(props.keeps / 3), // recommend for a third of keeps
          uniqueIds: getUniqueIdFromDataSources()
        },

        onRangeChanged
      );
      // sync initial range
      range = virtual.getRange();
    }

    // return current scroll offset
    function getOffset() {
      return root.value ? Math.ceil(root.value[directionKey]) : 0;
    }

    // return client viewport size
    function getClientSize() {
      const key = isHorizontal ? "clientWidth" : "clientHeight";
      return root.value ? Math.ceil(root.value[key]) : 0;
    }

    // return all scroll size
    function getScrollSize() {
      const key = isHorizontal ? "scrollWidth" : "scrollHeight";
      return root.value ? Math.ceil(root.value[key]) : 0;
    }

    // set current scroll position to a expectant offset
    function scrollToOffset(offset: number) {
      if (root.value) {
        root.value[directionKey] = offset;
      }
    }

    // set current scroll position to a expectant index
    function scrollToIndex(index: number) {
      // scroll to bottom
      if (index >= props.dataSources!.length - 1) {
        scrollToBottom();
      } else {
        const offset = virtual.getOffset(index);
        scrollToOffset(offset);
      }
    }

    // set current scroll position to bottom
    function scrollToBottom() {
      const _shepherd = shepherd.value as any;
      if (_shepherd) {
        const offset = _shepherd[isHorizontal ? "offsetLeft" : "offsetTop"];
        scrollToOffset(offset);

        // check if it's really scrolled to the bottom
        // maybe list doesn't render and calculate to last range
        // so we need retry in next event loop until it really at bottom
        setTimeout(() => {
          if (getOffset() + getClientSize() < getScrollSize()) {
            scrollToBottom();
          }
        }, 3);
      }
    }

    // reset all state back to initial
    function reset() {
      virtual.destroy();
      scrollToOffset(0);
      installVirtual();
    }

    function getUniqueIdFromDataSources() {
      const { dataKey } = props;
      return props.dataSources!.map((dataSource: any) =>
        typeof dataKey === "function" ? dataKey(dataSource) : dataSource[dataKey!]
      );
    }

    // event called when each item mounted or size changed
    function onItemResized(id: any, size: number) {
      virtual.saveSize(id, size);
      emit("resized", id, size);
    }

    function onRangeChanged(r: any) {
      range = r;
      paddingStyle.value = {
        padding: isHorizontal
          ? `0px ${range.padBehind}px 0px ${range.padFront}px`
          : `${range.padFront}px 0px ${range.padBehind}px`
      };
      items.value = props.dataSources.slice(range.start, range.end) as any;
    }

    function onScroll(evt: any) {
      const offset = getOffset();
      const clientSize = getClientSize();
      const scrollSize = getScrollSize();

      // iOS scroll-spring-back behavior will make direction mistake
      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      virtual.handleScroll(offset);
      emitEvent(offset, clientSize, scrollSize, evt);
    }

    // emit event in special position
    function emitEvent(offset: number, clientSize: number, scrollSize: number, evt: any) {
      emit("scroll", evt, virtual.getRange());

      if (virtual.isFront() && !!props.dataSources!.length && offset - props.topThreshold <= 0) {
        emit("totop");
      } else if (virtual.isBehind() && offset + clientSize + props.bottomThreshold >= scrollSize) {
        emit("tobottom");
      }

      if (evt.target.scrollLeft !== leftScroll) {
        leftScroll = evt.target.scrollLeft;
        emit("scrollLeft", evt.target.scrollLeft);
      }
    }

    return {
      root,
      shepherd,
      onItemResized,
      reset,
      onScroll,
      paddingStyle,
      isHorizontal,
      items
    };
  }
});
</script>

<style>
.hhl-virtual-list {
  display: flex;
  flex-direction: column;
}
.hhl-virtual-list-shepherd {
  width: 100%;
  height: 0;
}
</style>
