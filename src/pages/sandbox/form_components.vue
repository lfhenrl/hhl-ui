<template>
  <div class="overflow-auto p-20">
    <div class="flx-row flx-wrap p-12 gap-2">
      <hhl-btn>PRI</hhl-btn>
      <hhl-btn class="col-sec">SEC</hhl-btn>
      <hhl-btn class="col-err">ERR</hhl-btn>
      <hhl-btn class="col-info">INFO</hhl-btn>
      <hhl-btn class="col-ok">OK</hhl-btn>
      <hhl-btn class="col-warn">Warn</hhl-btn>
      <hhl-btn class="col-black">BLACK</hhl-btn>
      <hhl-btn class="col-white">WHITE</hhl-btn>
    </div>
    <div class="flx-row flx-wrap p-12 gap-2 border">
      <hhl-btn class="borderRadius-full" type="standard">STANDARDmm</hhl-btn>
      <hhl-btn type="outline">OUTLINE</hhl-btn>
      <hhl-btn type="text" class="col-err">TEXT</hhl-btn>
      <hhl-btn type="icon" icon="edit"></hhl-btn>
      <hhl-btn type="icon-outline" icon="edit"></hhl-btn>
      <hhl-btn type="icon-text" icon="info" size="lg" class="col-err"></hhl-btn>
      <hhl-btn type="text" icon="edit"></hhl-btn>
    </div>

    <div class="flx-row flx-wrap flx-align-center flx-justify-center border p-20 gap-2">
      <hhl-btn size="sm" icon="edit">SM</hhl-btn>
      <hhl-btn size="md" icon="edit">MD</hhl-btn>
      <hhl-btn size="lg" icon="mail">LG</hhl-btn>
      <hhl-select :select-data="['nr1', 'nr2', 'nr3']" v-model="radioVal" label="Selector" />
    </div>
    <div class="flx-row flx-wrap flx-align-center w-100pr border p-20">
      <hhl-checkbox label="Check" class="col-warn" v-model="checkArr" value="c1" />
      <hhl-select :select-data="['nr1', 'nr2', 'nr3']" v-model="radioVal" label="Selector" />
      <hhl-radio label="radio1" v-model="radio" value="r1" label-left />
      <hhl-radio label="radio2" v-model="radio" value="r2" class="col-warn" />
      <hhl-switch label="Switch" class="col-warn" />
      <hhl-input
        label="TextInput"
        counter="10"
        clearable
        hint="Dette er et hint"
        @end_icon_click="log('end-icon-click')"
        @start_icon_click="log('start-icon-click')"
        @input_click="log('input-click')"
        end-icon="mail"
        start-icon="filter"
        v-model="txt"
        :validator="[v.required, v.email]"
      />
    </div>
    <div class="flx-col w-100pr border p-12 gap-5">
      <hhl-checkbox label="Check" class="col-warn" v-model="checkBool" />
      <hhl-pop>
        <template v-slot:reference>
          <hhl-btn>default</hhl-btn>
        </template>
        <div class="p-25 col-bg-warn">Hello</div>
      </hhl-pop>
      <hhl-textarea v-model="longTxt" label="Text Area" />
    </div>
    <div class="flx-row p-10 flx-align-center">
      <hhl-dt-picker label="Date" v-model="dato" type="dateTime" />
      <hhl-select :select-data="['nr1', 'nr2', 'nr3']" v-model="radioVal" label="Selector" />
      <hhl-input label="Value" :modelValue="FormatDate(dato)" />
      <hhl-btn @click="modal = true">Modal</hhl-btn>
      <hhl-modal v-model="modal">
        <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
          <div>----- This is the content. -----</div>
          <hhl-btn size="sm" @click="modal = false" class="flx-self-align-end mt-25 col-ok">CLOSE</hhl-btn>
        </div>
      </hhl-modal>
      <hhl-btn @click="utilDialog">utilDialog</hhl-btn>
      <hhl-btn @click="utilSnack">utilSnack</hhl-btn>
    </div>
    <div>
      <hhl-tabs default-tab="tab2">
        <hhl-tab label="Tab 1" name="tab1" keep-alive> Tab 1
          <input/> </hhl-tab>
        <hhl-tab label="Tab 2" name="tab2"> Tab 2 </hhl-tab>
      </hhl-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { validator } from "../../components/utils/validator";
import { D_mon_01_dec_2021_HHMMSS } from "../../components/utils/dateFormat";

export default defineComponent({
  name: "form_components",
  setup() {
    const radio = ref("r1");
    const txt = ref("");
    const longTxt = ref("");
    const selection = ref(["nr1"]);
    const radioVal = ref("nr1");
    const checkArr = ref([]);
    const checkBool = ref(false);
    const modal = ref(false);
    const dato = ref<Date>(new Date());
    function log(e: string) {
      console.log(e);
    }

    function FormatDate(val: Date) {
      return D_mon_01_dec_2021_HHMMSS(val);
    }

    function utilDialog() {
      hhl
        .dialog("I am the Title", "I am the Text ")
        .then(() => {
          alert("You clicked OK");
        })
        .catch(() => {
          alert("You clicked CANCEL");
        });
    }

    function utilSnack() {
      hhl.alert("err", "TITLE", "Showing information");
    }

    const v = validator;
    return {
      radio,
      radioVal,
      txt,
      log,
      v,
      longTxt,
      selection,
      checkArr,
      checkBool,
      dato,
      FormatDate,
      modal,
      utilDialog,
      utilSnack
    };
  }
});
</script>

<style>
.gridDemo > div {
  height: 25px;
  min-width: 24px;
  line-height: 24px;
  background-color: var(--col-pri);
  color: white;
  text-align: center;
}
</style>
