<template>
  <div h-display="flex" h-flex-direction="column" h-gap="24px" h-padding="20px">
    <H_themeSelector />
    <h1>Some text in H1</h1>
    <div
      h-display="grid"
      h-grid-tmp-rows="100px 100px 100px"
      h-grid-tmp-cols="100px 100px 100px"
      h-gap="0.5rem"
      h-border="2px solid red"
    >
      <div h-bgcolor="var(--col-ok)" h-grid-col="3" h-grid-row="3 / 4">A</div>
      <div h-bgcolor="var(--col-ok)" h-grid-row="2" h-grid-col="span 2">B</div>
      <div h-bgcolor="var(--col-ok)" h-grid-row="1" h-grid-col="2 / 4">C</div>
    </div>

    <H_icon btn name="account" h-color="var(--col-pri)" h-font-size="4em" />
    <H_input label="Input" />
    <H_textarea label="TextArea" />
    <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
    <H_dialog closedby="any" v-model="dialogOpen">
      <div>hej</div>
      <div>
        <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
      </div>
    </H_dialog>
    <H_datePicker label="DatePicker" />
    <H_progressBar show />
    <H_range :model-value="50" :min="0" :max="100" label="Slider Label"></H_range>
    <H_select autofocus :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"> </H_select>
    <H_selectbox variant="switch" row :list="[`nr1`, `nr2`, `nr3`]" v-model="selection" label="Selector"></H_selectbox>
    <H_switch autofocus label="Switch" v-model="check" variant="checkbox"></H_switch>
    <H_timePicker label="Time"></H_timePicker>
    <H_tabs>
      <H_tab name="tab1" label="Tab 1."><div class="p-10">This is TAB 1...</div></H_tab>
      <H_tab name="tab2" label="Tab 2."><div class="p-10">This is TAB 2...</div></H_tab>
      <H_tab name="tab3" label="Tab 3."><div class="p-10">This is TAB 3...</div></H_tab>
    </H_tabs>
    <H_datagrid
      h-height="300px"
      :dataHandler="lData"
      :filter-list="['id', 'val1', 'val2', 'val3', 'val4', 'val7']"
      :group-list="[]"
      data-key="id"
    >
      <template v-slot:head>
        <div
          h-display="flex"
          h-flex="1"
          h-padding-block="0.5rem"
          h-align-items="center"
          h-justify-content="space-between"
        >
          <H_btn @click="load" h-width="100px">Load</H_btn>
          <div h-flex="1" />
        </div>
      </template>
      <H_column field="id" title="Id" type="number" />
      <H_column field="val1" title="Value 1" type="string" />
      <H_column field="val2" title="Value 2" type="string" filter="select" />
      <H_column field="val3" title="Value 3" type="string" :auto-height="true" />
      <H_column field="val4" title="Value 4" type="string" />
      <H_column field="val5" title="Value 5" type="bool" />
      <H_column field="val6" title="Value 6" type="date" :auto-height="true" />
      <H_column field="val7" title="Value 7" type="string" />
    </H_datagrid>
  </div>
</template>

<script setup lang="ts">
import { getData } from "../../testData/data";
import { localData } from "../../../lib/Components/datagrid";
import { ref } from "vue";

const dialogOpen = ref(false);
const selection = ref("nr2");
const check = ref(true);

const lData = new localData();

async function load() {
  await lData.startLoading();
  const data = await getData(5000);
  lData.setData(data);
  lData.loadData();
}
</script>

