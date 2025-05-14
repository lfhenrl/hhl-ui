<template>
  <div>
    <div class="m-6 p-2 flex items-center gap-1 border border-err border-solid font-normal text-base">
      <H_icon color="err" size="2em" />

      <H_input label="Input"> </H_input>
      <H_icon name="edit" color="err" size="2em" btn variant="filled-round" />
      <H_btn size="xs"><H_icon name="edit" color="neutral" size="1.1em" /> XXX-xs</H_btn>
      <H_btn size="xs">XXX-xs</H_btn>
      <H_btn size="sm">XXX-sm</H_btn>
      <H_btn size="md">XXX-md</H_btn>
      <H_btn size="lg">XXX-lg</H_btn>
      <H_btn size="xl" color="err">XXX-xl</H_btn>
      <H_select label="Select" />
      <H_datePicker label="Date" v-model="date" show-seconds></H_datePicker>
      {{ mytime }}
      <input
        type="time"
        step="1"
        v-model="mytime"
        class="border border-txt5 rounded focus:outline-none px-1 py-0.5 focus:border-pri"
      />
      <H_timePicker label="Dato" v-model="mytime" />
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <H_tabs :default-tab="tab">
        <H_tab name="tab1" label="Tab 1."
          ><div class="p-10 h-full" keep-alive>
            This is TAB 1... <H_btn @click="changeTab('tab2')" class="justify-end w-96 bg-warn">{{ tab }}</H_btn>
          </div></H_tab
        >
        <H_tab name="tab2" label="Tab 2."><div class="p-10" keep-alive>This is TAB 2...</div></H_tab>
        <H_tab name="tab3" label="Tab 3."><div class="p-10" keep-alive>This is TAB 3...</div></H_tab>
      </H_tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref(new Date());
const mytime = ref();
const tab = ref("tab1");

function changeTab(tabName: string) {
  tab.value = "";
  setTimeout(() => {
    tab.value = tabName;
  }, 0);
}
</script>

<style></style>
