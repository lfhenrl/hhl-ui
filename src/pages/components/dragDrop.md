# DragDrop

## Data binding

<style>
.dragContainer {
  display: flex;
  flex-direction: column;
  height:460px;
  width:160px;
  border: 1px solid var(--col-bg-5);
  border-radius: 4px;
  padding: 16px;
  gap: 10px;
}
.dragItem {
  border-radius: 4px;
  padding: 4px 12px;
}

</style>

<hhl-live-editor title="" htmlCode='
      <template>
     <div class="flexRow items-center gap-4">
        <H_drag-drop v-model="list1" class="dragContainer">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="dragItem col-pri shadow">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
        <div class="dragContainer">
          {{ list1 }}
        </div>
        <H_drag-drop v-model="list2" class="dragContainer" :max-items="3">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="dragItem col-pri shadow">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
        <div class="dragContainer">
          {{ list2 }}
        </div>
      </div>
      </template>
      <script>
      const list1 = ref([
        { id: 1, title: "Nummer1" },
        { id: 2, title: "Nummer2" },
        { id: 3, title: "Nummer3" },
        { id: 4, title: "Nummer4" },
        { id: 5, title: "Nummer5" },
        { id: 6, title: "Nummer6" },
        { id: 7, title: "Nummer7" },
        { id: 8, title: "Nummer8" }
      ]);
      const list2 = ref([]);
      return {list1, list2}
      </script>
'>
</hhl-live-editor>

<br>
