<template>
  <div>
    <div h-display="flex" h-align-items="center" h-gap="1.0rem">
      <VueDraggable v-model="list1" ref="el" class="dragContainer" animation="150" @update="update">
        <div
          v-for="item in list1"
          :key="item.id"
          h-shadow="md"
          h-color="var(--col-pri)"
          h-border-radius="4px"
          h-padding="4px 12px"
          h-cursor="pointer"
        >
          {{ item.title }}
        </div>
      </VueDraggable>
      <div
        class="dragContainer"
        h-display="flex"
        h-flex-direction="column"
        h-height="460px"
        h-width="160px"
        h-border="1px solid var(--col-9)"
        h-border-radius="4px"
        h-padding="16px"
        h-gap="10px"
      >
        {{ list1 }}
      </div>
      <VueDraggable
        v-model="list2"
        h-display="flex"
        h-flex-direction="column"
        h-height="460px"
        h-width="160px"
        h-border="1px solid var(--col-9)"
        h-border-radius="4px"
        h-padding="16px"
        h-gap="10px"
      >
        <div
          v-for="item in list2"
          :key="item.id"
          h-shadow="md"
          h-color="var(--col-pri)"
          h-border-radius="4px"
          h-padding="4px 12px"
          h-cursor="pointer"
        >
          {{ item.title }}
        </div>
      </VueDraggable>
      <div
        h-display="flex"
        h-flex-direction="column"
        h-height="460px"
        h-width="160px"
        h-border="1px solid var(--col-9)"
        h-border-radius="4px"
        h-padding="16px"
        h-gap="10px"
      >
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
