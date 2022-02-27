# DragDrop

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex  gap-2 p-3">
        <H_drag-drop v-model="list1" class="w-30 h-100 border border-bg4 flex flex-col items-center gap-1 p-3">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="border border-bg4 flex flex-col items-center px-2">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
      <div class="w-40 bg-bg4">
        {{ list1 }}
      </div>
        <H_drag-drop v-model="list2" class="w-30 h-100 border border-bg4 flex flex-col items-center gap-1 p-3" :max-items="3">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="border border-bg4 flex flex-col items-center px-2">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
      <div class="w-40 bg-bg4">
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
