# Tabs

The `H_tabs` component gives you navigation with tabs.
Tabs are elements that help you organize and navigate multiple documents in a single container. They can be used for switching between items in the container.

<br>

**The H_tabs component har 3 properties.**<br>

- `default-tab=""`: The name of the tab that should be active when page load.<br>
- `willChange=""`: Event that trigger before change to a new tab, the function called shall return true for navigate to the new tab.

**The H_tab component har 3 properties.**<br>

- `label=""`: The text on the tab.<br>
- `name=""`: The name of the tab.
- `keep-alive`: By default the content of the tab will be destroyed or mounthed when navigating, when using `keep-alive` it will not.

<br>

<hhl-live-editor title="" htmlCode='
		<template>
			<div class="flex items-center gap-4 flex-wrap">
				<H_tabs>
					<H_tab name="tab1" label="Tab 1."><div class="p-10 h-full">This is TAB 1...</div></H_tab>
					<H_tab name="tab2" label="Tab 2."><div class="p-10">This is TAB 2...</div></H_tab>
					<H_tab name="tab3" label="Tab 3."><div class="p-10">This is TAB 3...</div></H_tab>
				</H_tabs>
			</div>
		</template>
'>
</hhl-live-editor>

<br>

## Disabled

You can add `disabled` to a tab<br>

<hhl-live-editor title="" htmlCode='
		<template>
			<div class="flex items-center gap-4 flex-wrap">
				<H_tabs>
					<H_tab name="tab1" label="Tab 1."><div class="p-10">This is TAB 1...</div></H_tab>
					<H_tab :disabled="true" name="tab2" label="Tab 2."><div class="p-10">This is TAB 2...</div></H_tab>
					<H_tab name="tab3" label="Tab 3."><div class="p-10">This is TAB 3...</div></H_tab>
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
			<div class="flex items-center gap-4 flex-wrap">
				<H_tabs :will-change="canChange">
					<H_tab name="tab1" label="Tab 1."><div class="p-10">This is TAB 1...</div></H_tab>
					<H_tab name="tab2" label="Tab 2."><div class="p-10">This is TAB 2...</div></H_tab>
					<H_tab name="tab3" label="Tab 3."><div class="p-10">This is TAB 3...</div></H_tab>
				</H_tabs>
			</div>
		</template>
		<script>
    function canChange(e) {
      if (e==="tab1" || e===undefined) {return true;}
      if (confirm("Will you navigate away from " + e)) {
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
