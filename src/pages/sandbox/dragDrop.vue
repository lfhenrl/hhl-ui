<template>
  <div>
    <div class="dragDrop items-center gap-4">
      <VueDraggable v-model="list1" ref="el" class="dragContainer" animation="150" @update="update">
        <div v-for="item in list1" :key="item.id" class="dragItem col-pri shadow">
          {{ item.title }}
        </div>
      </VueDraggable>
      <div class="dragContainer">
        {{ list1 }}
      </div>
      <VueDraggable v-model="list2" class="dragContainer">
        <div v-for="item in list2" :key="item.id" class="dragItem col-pri shadow">
          {{ item.title }}
        </div>
      </VueDraggable>
      <div class="dragContainer">
        {{ list2 }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";

const list1 = ref([
  { id: 1, title: "Nummer1" },
  { id: 2, title: "Nummer2" },
  { id: 3, title: "Nummer3" },
  { id: 4, title: "Nummer4" },
  { id: 5, title: "Nummer5" },
  { id: 6, title: "Nummer6" },
  { id: 7, title: "Nummer7" },
  { id: 8, title: "Nummer8" },
]);

const list2: any = ref([]);
function update(e: any) {
  console.log("update ", e);
}
</script>

<style>
.dragDrop {
  display: flex;
}
.dragContainer {
  display: flex;
  flex-direction: column;
  height: 460px;
  width: 160px;
  border: 1px solid var(--col-bg-5);
  border-radius: 4px;
  padding: 16px;
  gap: 10px;
}
.dragItem {
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
}
</style>
