<template>
  <div>
    <div class="colors">
      <div class="flexRow flexWrap">
        <div class="bgBox" style="background-color: var(--col-pri)">bg0</div>
        <div class="bgBox pri">bg1</div>
        <div class="bgBox" style="background-color: var(--col-ok)">bg2</div>
        <div class="bgBox" style="background-color: var(--col-err)">bg3</div>
        <div class="bgBox" style="background-color: var(--col-warn)">bg4</div>
        <div class="bgBox" style="background-color: var(--col-info)">bg5</div>
        <div class="bgBox pri bg-darker">bg6</div>
      </div>
      <div class="flexRow flexWrap">
        <div class="bgBox" style="background-color: var(--col-bg-0)">bg0</div>
        <div class="bgBox" style="background-color: var(--col-bg-1)">bg1</div>
        <div class="bgBox" style="background-color: var(--col-bg-2)">bg2</div>
        <div class="bgBox" style="background-color: var(--col-bg-3)">bg3</div>
        <div class="bgBox" style="background-color: var(--col-bg-4)">bg4</div>
        <div class="bgBox" style="background-color: var(--col-bg-5)">bg5</div>
        <div class="bgBox" style="background-color: var(--col-bg-6)">bg6</div>
      </div>
      <div class="flexRow flexWrap">
        <div class="bgBox bg0">bg0</div>
        <div class="bgBox bg1">bg1</div>
        <div class="bgBox bg2">bg2</div>
        <div class="bgBox bg3">bg3</div>
        <div class="bgBox bg4">bg4</div>
        <div class="bgBox bg5">bg5</div>
        <div class="bgBox bg6">bg-bg6</div>
      </div>
      <div class="flexRow flexWrap" style="margin-top: 10px">
        <div class="bgBox" style="background-color: var(--col-txt-0)">txt0</div>
        <div class="bgBox" style="background-color: var(--col-txt-1)">txt1</div>
        <div class="bgBox" style="background-color: var(--col-txt-2)">txt2</div>
        <div class="bgBox" style="background-color: var(--col-txt-3)">txt3</div>
        <div class="bgBox" style="background-color: var(--col-txt-4)">txt4</div>
        <div class="bgBox" style="background-color: var(--col-txt-5)">txt5</div>
        <div class="bgBox" style="background-color: var(--col-txt-6)">txt6</div>
      </div>
      <div class="flexRow flexWrap">
        <div class="bgBox txt0">txt0</div>
        <div class="bgBox txt1">txt1</div>
        <div class="bgBox txt2">txt2</div>
        <div class="bgBox txt3">txt3</div>
        <div class="bgBox txt4">txt4</div>
        <div class="bgBox txt5">txt5</div>
        <div class="bgBox txt6">txt6</div>
      </div>
    </div>
    <div style="border: 1px solid gray; display: flex; margin-top: 20px; flex-direction: column; height: 200px">
      <H_input v-model="txt" label="TEXT"> </H_input>
      <div style="background-color: aqua; width: 100px; height: 50px">ddd</div>
      <H_input v-model="txt" label="TEXT"> </H_input>
    </div>
    <div style="border: 1px solid gray; display: flex; align-items: center; margin-top: 20px">
      <H_textarea v-model="txt" label="TEXT"> </H_textarea>
    </div>
    <div style="border: 1px solid gray; display: flex; align-items: center; margin-top: 20px">
      <H_datetime v-model="date" label="DATE"> </H_datetime>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import H_input from "../../../lib/Components/H_input.vue";
import H_textarea from "../../../lib/Components/H_textarea.vue";
import H_datetime from "../../../lib/Components/H_datetime.vue";

const txt = ref("text");
const date = ref();
</script>

<style>
.colors {
  overflow: auto;
  --col-lightness: 60%;
  --col-chroma: 0;
  --col-hue: 0;
  --col-space: 0.05;
  --col-lightCalc: calc(-100% * 0.05);
  --colx-pri: oklch(var(--col-lightness) 0.3362 252.98);
}
.bgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 112px;
}

.pri {
  background-color: var(--colx-pri);
}

.bg-darker {
  --col-lightness: 33%;
  filter: brightness(1.75);
}

.bg0 {
  background-color: oklab(var(--col-lightness) var(--col-chroma) var(--col-hue));
}
.bg1 {
  background-color: oklab(calc(var(--col-lightness) + var(--col-lightCalc)) var(--col-chroma) var(--col-hue));
}
.bg2 {
  background-color: oklab(calc(var(--col-lightness) + calc(var(--col-lightCalc) * 2)) var(--col-chroma) var(--col-hue));
}
.bg3 {
  background-color: oklab(calc(var(--col-lightness) + calc(var(--col-lightCalc) * 3)) var(--col-chroma) var(--col-hue));
}
.bg4 {
  background-color: oklab(calc(var(--col-lightness) + calc(var(--col-lightCalc) * 4)) var(--col-chroma) var(--col-hue));
}
.bg5 {
  background-color: oklab(calc(var(--col-lightness) + calc(var(--col-lightCalc) * 5)) var(--col-chroma) var(--col-hue));
}
.bg6 {
  background-color: oklab(calc(var(--col-lightness) + calc(var(--col-lightCalc) * 6)) var(--col-chroma) var(--col-hue));
}

.txt0 {
  background-color: color-mix(in srgb, var(--bcolor1) 0%, var(--bcolor2));
}
.txt1 {
  background-color: color-mix(in srgb, var(--bcolor1) 14%, var(--bcolor2));
}
.txt2 {
  background-color: color-mix(in srgb, var(--bcolor1) 22%, var(--bcolor2));
}
.txt3 {
  background-color: color-mix(in srgb, var(--bcolor1) 34%, var(--bcolor2));
}
.txt4 {
  background-color: color-mix(in srgb, var(--bcolor1) 45%, var(--bcolor2));
}
.txt5 {
  background-color: color-mix(in srgb, var(--bcolor1) 58%, var(--bcolor2));
}
.txt6 {
  background-color: color-mix(in srgb, var(--bcolor1) 68%, var(--bcolor2));
}
</style>
