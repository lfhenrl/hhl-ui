<template>
  <div @dragover.prevent.stop="onDragOver">
    <transition-group name="draggable-item-list">
      <H_dragDropItem
        v-for="(item, index) in items"
        :key="item.id"
        :item="item"
        :maxItems="maxItems"
        :containerId="id"
        :position="index"
        @itemDragOver="onItemDragOver"
        @dragenter.prevent
        :class="itemClass"
        class="__ItemSelector"
        :data-id="item.data.id"
      >
        <slot name="item" :item="item.data" :index="index"></slot>
      </H_dragDropItem>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, type PropType } from "vue";
import H_dragDropItem from "../SubComponents/draggable/H_dragDropItem.vue";
import { useDraggableContainer } from "../SubComponents/draggable/composables/draggable";

const props = defineProps({
  modelValue: { type: Array as PropType<any> },
  maxItems: { type: Number, default: 10000 },
  itemClass: {
    type: String,
    default: "H_dragItem",
  },
  transition: {
    default: "200",
    type: String,
  },
});

const emit = defineEmits(["update:modelValue", "itemDragOver"]);

const context = {
  emit,
};

const { modelValue, maxItems } = toRefs(props);
const { id, items, onDragOver, onItemDragOver } = useDraggableContainer(modelValue!, context, props.maxItems);

const transitionStyle = computed(() => `transform ${props.transition}ms`);
</script>

<style>
@layer components {
  .draggable-item-list-move {
    transition: v-bind(transitionStyle);
  }
}
</style>
