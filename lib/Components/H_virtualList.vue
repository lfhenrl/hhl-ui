<template>
  <div class="H_virtualList">
    <div class="H_virtualList-body" ref="root" @scroll="onScroll">
      <slot name="header" />
      <div class="H_virtualList-scroller" role="group" :style="paddingStyle">
        <H_virtualListItem
          v-for="item in items"
          :key="getId(item)"
          :uniqueKey="getId(item)"
          :horizontal="isHorizontal"
          :setSize="onItemResized"
          :item_style="item_style"
          :data="item"
          :data-id="getId(item)"
          :itemClass="itemClass"
          :selected="selectedId == getId(item) ? true : null"
        >
          <slot :item="item" />
        </H_virtualListItem>
      </div>
      <slot name="absoluteItems" />
    </div>

    <div
      ref="shepherd"
      :style="{
        width: isHorizontal ? '0px' : '100%',
        height: isHorizontal ? '0px' : '0px',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { debounce } from "../utils/debounce";
import Virtual from "../SubComponents/virtualList/virtual";
import H_virtualListItem from "../SubComponents/virtualList/H_virtualListItem.vue";

const props = defineProps({
  dataKey: {
    type: [String, Number],
    required: true,
  },
  item_style: { type: Function, default: null },
  dataSources: {
    type: Array,
    required: true,
  },
  overscan: {
    type: Number,
    default: 20,
  },
  estimateSize: {
    type: Number,
    default: 30,
  },

  direction: {
    type: String,
    default: "vertical", // the other value is horizontal
  },
  start: {
    type: Number,
    default: 0,
  },
  offset: {
    type: Number,
    default: 0,
  },
  topThreshold: {
    type: Number,
    default: 0,
  },
  bottomThreshold: {
    type: Number,
    default: 0,
  },
  itemClass: {
    type: String,
    default: "H_virtualListItem",
  },
  selectedId: { type: [Number, String, Date, Object] },
});
const emit = defineEmits(["scrollLeft", "tobottom", "totop", "scroll", "resized"]);

defineExpose({
  scrollToIndex,
  scrollToOffset,
  getOffset,
  getScrollSize,
  reset,
  update,
  getvirtualRows,
});

const root = ref<HTMLElement | null>(null);
const shepherd = ref<HTMLElement | null>(null);
const items = ref<any[]>([]);
const paddingStyle = ref({});
let virtual: any;
let range: any = {};
const isHorizontal = props.direction === "horizontal";
const directionKey = isHorizontal ? "scrollLeft" : "scrollTop";
let leftScroll = 0;
let scrollHeight = 0;
let keeps = 50;

function update() {
  virtual.handleDataSourcesChange();
}

function getId(item: any) {
  if (item.__type && item.__type === "group") {
    return item.__id;
  } else {
    return item[props.dataKey];
  }
}

function getvirtualRows() {
  return items.value;
}

watch(
  () => props.dataSources,
  () => {
    virtual.updateParam("uniqueIds", getUniqueIdFromDataSources());
    virtual.handleDataSourcesChange();
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
  installVirtual();
});

onBeforeUnmount(() => {
  virtual.destroy();
});

function installVirtual() {
  virtual = new Virtual(
    {
      keeps: keeps,
      estimateSize: props.estimateSize,
      buffer: Math.round(keeps / 5), // recommend for a third of keeps
      uniqueIds: getUniqueIdFromDataSources(),
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
  return props.dataSources!.map((dataSource: any) => dataSource[dataKey!]);
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
      : `${range.padFront}px 0px ${range.padBehind}px`,
    "flex-direction": isHorizontal ? "row" : "column",
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
</script>
<style>
@layer hhl-components {
  .H_virtualList {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto;
    height: 100%;
    min-height: 200px;
    border-radius: 4px;
  }

  .H_virtualList-body {
    position: relative;
    display: inline-block;
    overflow: scroll;
    height: 100%;
  }

  .H_virtualList-scroller {
    position: relative;
    display: inline-block;
    min-width: 100%;
  }
}
</style>
