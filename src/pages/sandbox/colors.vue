<template>
  <div>
    <div class="m-6 p-2 flex items-center gap-8 border border-err border-solid font-normal text-base">
      <H_iconAdd color="err" size="2em" />
      <H_iconAdd color="pri" size="2em" outline />
      <H_iconAdd color="pri" size="2em" outline round />
      <H_iconAdd color="pri" size="2em" filled />
      <H_iconAdd color="pri" size="2em" filled />
      <H_iconAdd color="pri" size="2em" round filled />

      <H_iconAdd color="ok" size="2em" btn />
      <H_iconAdd color="ok" size="2em" outline btn />
      <H_iconAdd color="ok" size="2em" outline round btn />
      <H_iconAdd color="ok" size="2em" filled btn />
      <H_iconAdd color="ok" size="2em" filled btn />
      <H_iconAdd color="ok" size="2em" round filled btn />

      <H_input label="Input"> </H_input>
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
    <div class="text-base">
      <IcoList />
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
