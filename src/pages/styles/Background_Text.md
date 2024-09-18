## Background colors
<style>
  .bgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 90px;
  }
</style>
<hhl-live-editor title="Background colors" htmlCode='
    <template>
    <div class="flex flex-wrap"> 
      <div style="background: var(--col-bg-0)" class="bgBox">bg-bg0</div>
      <div style="background: var(--col-bg-1)" class="bgBox">bg-bg1</div>
      <div style="background: var(--col-bg-2)" class="bgBox">bg-bg2</div>
      <div style="background: var(--col-bg-3)" class="bgBox">bg-bg3</div>
      <div style="background: var(--col-bg-4)" class="bgBox">bg-bg4</div>
      <div style="background: var(--col-bg-5)" class="bgBox">bg-bg5</div>
      <div style="background: var(--col-bg-6)" class="bgBox">bg-bg6</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Text colors

<hhl-live-editor title="Text colors" htmlCode='
<template>

   <div class="flex flex-wrap">
      <div style="background: var(--col-txt-0); color: var(--col-bg-0)" class="bgBox">txt0</div>
      <div style="background: var(--col-txt-1); color: var(--col-bg-0)" class="bgBox">txt1</div>
      <div style="background: var(--col-txt-2); color: var(--col-bg-0)" class="bgBox">txt2</div>
      <div style="background: var(--col-txt-3); color: var(--col-bg-0)" class="bgBox">txt3</div>
      <div style="background: var(--col-txt-4); color: var(--col-bg-0)" class="bgBox">txt4</div>
      <div style="background: var(--col-txt-5); color: var(--col-bg-0)" class="bgBox">txt5</div>
      <div style="background: var(--col-txt-6); color: var(--col-bg-0)" class="bgBox">txt6</div>
    </div>
</template>
'>
</hhl-live-editor>
<br/>

## Color css variables

  <br/>

### Background colors.

| Name       | Color                                                                          | Describtion                |
| ---------- | ------------------------------------------------------------------------------ | -------------------------- |
| --col-bg-0 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-0)"></div> | The bg-0 background color. |
| --col-bg-1 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-1)"></div> | The bg-1 background color. |
| --col-bg-2 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-2)"></div> | The bg-2 background color. |
| --col-bg-3 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-3)"></div> | The bg-3 background color. |
| --col-bg-4 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-4)"></div> | The bg-4 background color. |
| --col-bg-5 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-5)"></div> | The bg-5 background color. |
| --col-bg-6 | <div class="colors-bgBox shadow" style="background-color: var(--col-bg-6)"></div> | The bg-6 background color. |

<br/>

### Text colors.

| Name        | Color                                                                           | Describtion      |
| ----------- | ------------------------------------------------------------------------------- | ---------------- |
| --col-txt-0 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-0)"></div> | The txt-0 color. |
| --col-txt-1 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-1)"></div> | The txt-1 color. |
| --col-txt-2 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-2)"></div> | The txt-2 color. |
| --col-txt-3 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-3)"></div> | The txt-3 color. |
| --col-txt-4 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-4)"></div> | The txt-4 color. |
| --col-txt-5 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-5)"></div> | The txt-5 color. |
| --col-txt-6 | <div class="colors-bgBox shadow" style="background-color: var(--col-txt-6)"></div> | The txt-6 color. |

<br/>
