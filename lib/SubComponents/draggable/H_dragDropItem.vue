<template>
  <div
    draggable="true"
    @transitionStart="transitionStart"
    @transitionEnd="transitionEnd"
    @dragover.prevent.stop="onDragOver"
    @dragstart.stop="onDragStart"
    @dragend.stop="onDragEnd"
    @dragenter.prevent
    ref="draggableItemEl"
    role="listitem"
    :class="{ isDragging }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { useDraggableItem } from "./composables/draggable";

const props = defineProps({
  item: { type: Object as PropType<any>, default: {} },
  maxItems: { type: Number, default: 10000 },
  position: { type: Number, default: 0 },
  containerId: { type: Number, default: 0 }
});

const emit = defineEmits(["update:modelValue", "itemDragOver"]);

const context = {
  emit
};

const { item, position, containerId } = toRefs(props);
const { draggableItemEl, isDragging, onDragStart, onDragOver, onDragEnd, transitionStart, transitionEnd } = useDraggableItem(
  item,
  position,
  containerId,
  context,
  props.maxItems
);
</script>

<style scoped>
.isDragging {
  opacity: 0.4;
}
</style>
