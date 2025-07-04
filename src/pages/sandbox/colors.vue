<template>
  <div>
    <div class="m-6 p-2 flex items-center gap-1 border border-bg6 border-solid font-normal text-base">
      <H_select
        label="Henrik"
        show-filter
        justify-between
        label-left
        variant="radio"
        placeholder="Vælg noget"
        :validator="[v.required]"
        :list="[
          { value: `nr1`, label: `Number 1` },
          { value: `nr2`, label: `Number 2` },
          { value: `nr3`, label: `Number 3` },
          { value: `nr4`, label: `Number 4` },
        ]"
        v-model="selList"
      >
        <H_icon name="mail"></H_icon>
      </H_select>
      <H_btn @click="dialogOpen">PopUp</H_btn>
      <H_dialog ref="dialog">
        <div moveable-drag class="col-pri py-1 text-center">Drag me!</div>
        <div class="p-33">Hej</div>
      </H_dialog>
      <div class="henrik">
        <svg class="larsen w-10 h-10">hej</svg>
      </div>
    </div>
    <div class="m-6 p-2 flex items-center gap-1 border border-err border-solid">
      ssdsd:
      <H_selectbox
        row
        label="Henrik"
        v-model="selList"
        disabled
        multi
        variant="radio"
        label-left
        hint-start="start"
        hint-end="end"
        :validator="[v.required]"
        :list="[
          { value: `nr1`, label: `Number 1` },
          { value: `nr2`, label: `Number 2` },
          { value: `nr3`, label: `Number 3` },
          { value: `nr4`, label: `Number 4` },
        ]"
      >
      </H_selectbox>
      <H_input v-model="selList" />
      {{ selList }}
    </div>
    <div class="m-6 p-2 flex items-center gap-1 border text-err border-solid relative">
      <div class="">
        <H_popover>
          <template v-slot:referance>
            <H_btn>PopUp</H_btn>
          </template>
          <div class="h-24 w-28 bg-bg6">ssss</div>
        </H_popover>
      </div>
      <H_btn @click="check = !check">Check</H_btn>
      <div class="flex gap-3 border border-solid border-pri p-10">
        <H_switchbase :check="check" variant="switch" />
        <H_switchbase :check="check" variant="checkbox" />
        <H_switchbase :check="check" variant="radio" />
      </div>
    </div>

    <div class="m-6 p-2 flex items-center gap-3 border border-solid">
      as checkbox
      <H_switch v-model="sw2" color="err" size="xs" variant="checkbox" />
      <H_switch v-model="sw2" color="info" size="sm" variant="checkbox" />
      <H_switch v-model="sw2" color="pri" size="md" variant="checkbox" />
      <H_switch v-model="sw2" color="txt0" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt0" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt1" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt2" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt3" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt4" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt5" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="txt6" size="lg" variant="checkbox" />
      <H_switch v-model="sw2" color="ok" size="xl" variant="checkbox" />
      <H_switch v-model="sw2" color="pri" size="xl" variant="checkbox" />
      <H_switch v-model="sw2" color="sec" size="xl" variant="checkbox" />
      <H_switch v-model="sw2" color="warn" size="xl" variant="checkbox" />
      {{ sw2 }}
    </div>
    <div class="m-6 p-2 flex items-center gap-3 border border-solid">
      as radio
      <H_switch v-model="sw3" size="xs" value="n1" variant="radio" />
      <H_switch v-model="sw3" size="sm" value="n2" variant="radio" />
      <H_switch v-model="sw3" size="md" value="n3" variant="radio" />
      <H_switch v-model="sw3" size="lg" value="n4" variant="radio" />
      <H_switch v-model="sw3" size="xl" value="n5" variant="radio" />
      {{ sw3 }}
    </div>
    <div class="m-6 p-2 flex items-center gap-3 border border-solid">
      as multi {{ id }}
      <H_switch v-model="sw4" color="ok" size="xs" value="n1" variant="switch" />
      <H_switch v-model="sw4" color="ok" size="sm" value="n2" variant="switch" />
      <H_switch v-model="sw4" color="ok" size="md" value="n3" variant="switch" />
      <H_switch v-model="sw4" color="ok" size="lg" value="n4" variant="switch" />
      <H_switch v-model="sw4" color="err" size="xl" value="n5" variant="switch" />
      {{ sw4 }}
    </div>
    <div class="flex items-center gap-4 flex-wrap">
      <H_tabs :default-tab="tab">
        <H_tab name="tab1" label="Tab 1.">
          <div class="p-10 h-full" keep-alive>
            This is TAB 1... <H_btn @click="changeTab('tab2')" class="justify-end w-96 bg-warn">{{ tab }}</H_btn>
          </div>
        </H_tab>
        <H_tab name="tab2" label="Tab 2.">
          <div class="p-10" keep-alive>This is TAB 2...</div>
        </H_tab>
        <H_tab name="tab3" label="Tab 3.">
          <div class="p-10" keep-alive>This is TAB 3...</div>
        </H_tab>
      </H_tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useId } from "vue";
import { validator as v } from "../../../lib/utils/validator";

const tab = ref("tab1");
const selList = ref("");

const check = ref(false);
//const dialogOpen = ref(false);
const dialog: any = ref();
function dialogOpen() {
  dialog.value.open();
}

const id = useId();

const sw2 = ref(false);
const sw3 = ref("n3");
const sw4 = ref(["n1", "n2"]);

function changeTab(tabName: string) {
  tab.value = "";
  setTimeout(() => {
    tab.value = tabName;
  }, 0);
}

//"x: attr(x type(*))"
function ddd() {
  if (CSS.supports("position-anchor")) {
    return true;
  }
  return "NO";
}

console.log("tjek ", ddd()); // outputs: `Chrome 62`
</script>

<style>
.henrik {
  --xxx: "base";
}

@container style(--xxx: "base") {
  .larsen {
    background-color: aqua;
  }
}

.my-popoverx {
  anchor-name: --thumb;
}

.my-popover {
  position: absolute;
  border: 1px solid red;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 16px 20px;
  margin: 2px 0;
  --pop-position: top;
  --pop-align: span-right;

  width: calc(anchor-size(width) * 3);
  position-anchor: --thumb;
  position-area: var(--pop-position) var(--pop-align);

  position-try-fallbacks: flip-block;

  /* Final state of the exit animation */
  opacity: 0;
  transform: scaleY(0);

  transition: opacity 0.7s, transform 0.7s, overlay 0.7s allow-discrete, display 0.7s allow-discrete;
  /* Equivalent to
  transition: all 0.7s allow-discrete; */
}

.my-popover:popover-open {
  opacity: 1;
  transform: scaleY(1);
}

/* Needs to be after the previous [popover]:popover-open rule
to take effect, as the specificity is the same */
@starting-style {
  [popover]:popover-open {
    opacity: 0;
    transform: scaleY(0);
  }
}
</style>
