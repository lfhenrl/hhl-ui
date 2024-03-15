<template>
  <div class="colors">
    <div class="flexRow flexWrap">
      <div class="colors-bgBox bg-bg0">bg-bg0</div>
      <div class="colors-bgBox bg-bg1">bg-bg1</div>
      <div class="colors-bgBox bg-bg2">bg-bg2</div>
      <div class="colors-bgBox bg-bg3">bg-bg3</div>
      <div class="colors-bgBox bg-bg4">bg-bg4</div>
      <div class="colors-bgBox bg-bg5">bg-bg5</div>
      <div class="colors-bgBox bg-bg6">bg-bg6</div>
    </div>
    <div class="flexRow flexWrap">
      <div class="colors-bgBox bg0">bg-bg0</div>
      <div class="colors-bgBox bg1">bg-bg1</div>
      <div class="colors-bgBox bg2">bg-bg2</div>
      <div class="colors-bgBox bg3">bg-bg3</div>
      <div class="colors-bgBox bg4">bg-bg4</div>
      <div class="colors-bgBox bg5">bg-bg5</div>
      <div class="colors-bgBox bg6">bg-bg6</div>
    </div>
    <div class="flexRow flexWrap">
      <div class="colors-bgBox" style="background-color: var(--col-txt-0)">bg-bg0</div>
      <div class="colors-bgBox text-txt1" style="background-color: var(--col-txt-1)">bg-bg1</div>
      <div class="colors-bgBox bg-bg2" style="background-color: var(--col-txt-2)">bg-bg2</div>
      <div class="colors-bgBox bg-bg3" style="background-color: var(--col-txt-3)">bg-bg3</div>
      <div class="colors-bgBox bg-bg4" style="background-color: var(--col-txt-4)">bg-bg4</div>
      <div class="colors-bgBox bg-bg5" style="background-color: var(--col-txt-5)">bg-bg5</div>
      <div class="colors-bgBox bg-bg6" style="background-color: var(--col-txt-6)">bg-bg6</div>
    </div>
    <div class="flexRow flexWrap">
      <div class="colors-bgBox txt0">bg-bg0</div>
      <div class="colors-bgBox txt1">bg-bg1</div>
      <div class="colors-bgBox txt2">bg-bg2</div>
      <div class="colors-bgBox txt3">bg-bg3</div>
      <div class="colors-bgBox txt4">bg-bg4</div>
      <div class="colors-bgBox txt5">bg-bg5</div>
      <div class="colors-bgBox txt6">bg-bg6</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.colors {
  overflow: auto;
}
.colors-bgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 112px;
}
.bg0 {
  background-color: color-mix(in srgb, var(--bcolor2) 0%, var(--bcolor1));
}
.bg1 {
  background-color: color-mix(in srgb, var(--bcolor2) 6%, var(--bcolor1));
}
.bg2 {
  background-color: color-mix(in srgb, var(--bcolor2) 8%, var(--bcolor1));
}
.bg3 {
  background-color: color-mix(in srgb, var(--bcolor2) 12%, var(--bcolor1));
}
.bg4 {
  background-color: color-mix(in srgb, var(--bcolor2) 16%, var(--bcolor1));
}
.bg5 {
  background-color: color-mix(in srgb, var(--bcolor2) 20%, var(--bcolor1));
}
.bg6 {
  background-color: color-mix(in srgb, var(--bcolor2) 25%, var(--bcolor1));
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
