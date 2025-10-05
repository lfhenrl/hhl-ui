# Tabs

The `H_tabs` component gives you navigation with tabs.
Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.

<br>

**The H_tabs component har 3 properties.**<br>

- `default-tab=""`: The name of the tab that should be active when page load.<br>
- `willChange=""`: Event that trigger before change to a new tab, the function called shall return true for navigate to the new tab.
- `active-color=""`: The color of the active tab.

**The H_tab component har 3 properties.**<br>

- `label=""`: The text on the tab.<br>
- `name=""`: The name of the tab.
- `keep-alive`: By default the content of the tab will be destroyed or mounthed when navigating, when using `keep-alive` it will not.

<br>

<hhl-live-editor title="" htmlCode='
        <template>
        <div h-display="flex" h-flex-direction="column" h-align-items="center" h-gap="1rem">
        <H_btn @click="tab=`tab1`">Tab1</H_btn>
        <H_tabs h-height="20rem" active-color="lime" :default-tab="tab">
        <H_tab name="tab1" label="Tab 1." keep-alive><div h-height="100%" h-padding="2.5rem">This is TAB 1...</div></H_tab>
        <H_tab name="tab2" label="Tab 2." keep-alive><div h-padding="2.5rem">
        <H_datagrid
        :data-handler="lData"
        data-key="id"  
        >
        <H_column field="id" type="number"></H_column>
        <H_column field="val1" type="string"></H_column>
        <H_column field="val2" type="string" filter="select"></H_column>
        <H_column field="val3" type="string"></H_column>
        <H_column field="val4" type="string"></H_column>
        <H_column field="val5" type="bool"></H_column>
        <H_column field="val6" type="date"></H_column>
        <H_column field="val7" type="string"></H_column>
        </H_datagrid>
        </div></H_tab>
        <H_tab name="tab3" label="Tab 3." keep-alive><div h-padding="2.5rem" >This is TAB 3...</div></H_tab>
        </H_tabs>
        </div>
        </template>
        <script>
        // import { localData } from "HHL-UI/Components/datagrid";  
        const { localData, getData, dateFormat } = fakeImport;
        const lData = new localData();
        const tab = ref("tab3");
        async function load() {
        await lData.startLoading();
        const data = await getData(100);
        lData.setData(data);
        lData.loadData();
        }
        function formatDate(value) {
        return dateFormat.D_01_dec_2021_HHMM(value);
        }
        return { lData,formatDate,tab }
        </script>
'>
</hhl-live-editor>

<br>

## Disabled

You can add `disabled` to a tab<br>

<hhl-live-editor title="" htmlCode='
		<template>
			<div h-display="flex" h-align-items="center" h-gap="1rem">
				<H_tabs h-height="150px">
					<H_tab name="tab1" label="Tab 1."><div h-padding="2.5rem">This is TAB 1...</div></H_tab>
					<H_tab :disabled="true" name="tab2" label="Tab 2."><div h-padding="2.5rem">This is TAB 2...</div></H_tab>
					<H_tab name="tab3" label="Tab 3."><div h-padding="2.5rem">This is TAB 3...</div></H_tab>
				</H_tabs>
			</div>
		</template>
'>
</hhl-live-editor>

<br>

## WillChange event

You can use a `will-change` event to do some work or validation before leaving the active tab<br>

<hhl-live-editor title="" htmlCode='
		<template>
			<div h-display="flex" h-align-items="center" h-gap="1rem">
				<H_tabs :will-change="canChange" h-height="150px">
					<H_tab name="tab1" label="Tab 1."><div h-padding="2.5rem">This is TAB 1...</div></H_tab>
					<H_tab name="tab2" label="Tab 2."><div h-padding="2.5rem">This is TAB 2...</div></H_tab>
					<H_tab name="tab3" label="Tab 3."><div h-padding="2.5rem">This is TAB 3...</div></H_tab>
				</H_tabs>
			</div>
		</template>
		<script>
    function canChange(from,to) {
      if (from==="tab1" || from==="") {return true;}
      if (confirm("Will you navigate away from " + from + " to " + to)) {
					return true;
				} else {
					return false;
				}
			}
			return { canChange }
		</script>
'>
</hhl-live-editor>

<br>
