<template>
  <div ref="root" class="H_virtualList" @scroll="onScroll">
    <slot name="header" />
    <div class="H_virtualList-scroller" role="group" :style="paddingStyle">
      <H_virtualListItem
        v-for="item in items"
        :key="item[dataKey]"
        :uniqueKey="item[dataKey]"
        :horizontal="isHorizontal"
        :setSize="onItemResized"
        :data="item"
        :data-id="item[dataKey]"
        :itemClass="itemClass"
        :selected="selectedId == item[dataKey] ? true : null"
      >
        <slot :item="item" />
      </H_virtualListItem>
    </div>

    <div
      ref="shepherd"
      :style="{
        width: isHorizontal ? '0px' : '100%',
        height: isHorizontal ? '100%' : '0px'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Virtual from "./virtual";
import H_virtualListItem from "./H_virtualListItem.vue";

const props = defineProps({
  dataKey: {
    type: [String, Number],
    required: true
  },
  dataSources: {
    type: Array,
    required: true
  },
  keeps: {
    type: Number,
    default: 50
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
    default: "H_virtualListItem"
  },
  selectedId: { type: [Number, String, Date, Object] }
});
const emit = defineEmits(["scrollLeft", "tobottom", "totop", "scroll", "resized"]);

defineExpose({
  scrollToIndex,
  scrollToOffset,
  getOffset,
  getScrollSize
});

const root = ref(<HTMLElement | null>null);
const shepherd = ref(<HTMLElement | null>null);
const items = ref(<any[]>[]);
const paddingStyle = ref({});
let virtual: any;
let range: any = {};
const isHorizontal = props.direction === "horizontal";
const directionKey = isHorizontal ? "scrollLeft" : "scrollTop";
let leftScroll = 0;

installVirtual();

// const widthStyle = computed(() => {
//   return { width: root.value?.scrollWidth + "px" };
// });

watch(
  () => props.dataSources,
  (val: any) => {
    virtual.updateParam("uniqueIds", getUniqueIdFromDataSources());
    virtual.handleDataSourcesChange();
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
    padding: isHorizontal ? `0px ${range.padBehind}px 0px ${range.padFront}px` : `${range.padFront}px 0px ${range.padBehind}px`
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
.H_virtualList {
  display: flex;
  flex-direction: column;
}
.H_virtualList-scroller {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  border-right: solid 1px var(--col-bg-3);
}
</style>
