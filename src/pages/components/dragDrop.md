# DragDrop

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
        <H_drag-drop v-model="list1" class="list">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="item">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
        <div class="json">
          {{ list1 }}
        </div>
        <H_drag-drop v-model="list2" class="list" :max-items="3">
          <template v-slot:item="{ item }">
            <!-- example -->
            <div class="item">
              {{ item.title }}
            </div>
            <!-- or your own template -->
          </template>
        </H_drag-drop>
        <div class="json">
          {{ list2 }}
        </div>
      </H_row>
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
      <style>
      .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 400px;
        width: 140px;
        gap: 5px;
        border: solid 1px var(--col-bg-4);
        padding: 5px;
      }
      .json {
        padding: 8px;
        height: 400px;
        width: 200px;
        background-color: var(--col-bg-4)
      }
      .item {
        border: 1px solid var(--col-bg-4);
        padding: 0 4px;
        width: 100px;
        text-align: center;
        background-color: var(--col-pri)
      }
      </style>
'>
</hhl-live-editor>

<br>
