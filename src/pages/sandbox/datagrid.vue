<template>
  <div class="datagrid">
    <hhl-btn @click="load" start-icon="zoom_out_map" end-icon="filter">Load</hhl-btn>
    <hhl-datagrid :data="list">
      <hhl-column field="id" title="Id" />
      <hhl-column field="val1" title="Value 1" />
      <hhl-column field="val2" title="Value 2" />
      <hhl-column field="val3" title="Value 3" />
      <hhl-column field="val4" title="Value 4" />
    </hhl-datagrid>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "datagrid",
  setup({}, {}) {
    const list = ref(<any[]>[]);
    const groups = ref(<string[]>["val2"]);
    // let groupList = [] as any;

    function load() {
      const l: any = [];

      let count10 = 1;
      let count5 = 1;
      for (let i = 0; i <= 1500; i++) {
        const item: any = {
          id: i,
          val1: `Row ${i + 1} cell 1.`,
          val2: `Group ${count10}.`,
          val3: `Row ${i + 1} cell 3.`,
          val4: `SubGroup ${count5}.`
        };
        l.push(item);
        count10++;
        count5++;
        if (count10 > 10) count10 = 1;
        if (count5 > 3) count5 = 1;
      }
      // Object.freeze(l);

      list.value = l;

      // const _list = groupBy(l, ["val2"]);

      // const group = Object.keys(_list);
      // // const gData = group.map((item) => {
      // //   return {
      // //     group: item,
      // //     data: data[item]
      // //   };
      // // });
      // groupList = [];
      // group.forEach((item, index) => {
      //   const gr = {
      //     type: "group",
      //     item: { name: item },
      //     id: "gr" + index,
      //     expanded: false,
      //     items: _list[item]
      //   };
      //   groupList.push(gr);
      // });
      // list.value = groupList;
      // console.log(groupList);
    }

    // function groupItems() {
    //   const gData = [] as any;
    //   groupList.forEach((item: any) => {
    //     gData.push(item);
    //     if (item.expanded) {
    //       item.items.forEach((item: any) => {

    //         gData.push(item);
    //       });
    //     }
    //   });
    //   list.value = gData;
    //   console.log(list.value);
    // }

    // function rowExpanded(e: any) {
    //   groupList.forEach((element: any) => {
    //     if (element.id === e.id) {
    //       element.expanded = e.expanded;
    //     }
    //   });
    //   groupItems();
    // }

    return {
      list,
      load,
      groups
    };
  }
});
</script>

<style>
.datagrid {
  height: 95vh;
}
</style>
