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
      <div style="background: var(--color-bg0)" class="bgBox">bg-bg0</div>
      <div style="background: var(--color-bg1)" class="bgBox">bg-bg1</div>
      <div style="background: var(--color-bg2)" class="bgBox">bg-bg2</div>
      <div style="background: var(--color-bg3)" class="bgBox">bg-bg3</div>
      <div style="background: var(--color-bg4)" class="bgBox">bg-bg4</div>
      <div style="background: var(--color-bg5)" class="bgBox">bg-bg5</div>
      <div style="background: var(--color-bg6)" class="bgBox">bg-bg6</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Text colors

<hhl-live-editor title="Text colors" htmlCode='
<template>

   <div class="flex flex-wrap">
      <div style="background: var(--color-txt0); color: var(--color-bg0)" class="bgBox">txt0</div>
      <div style="background: var(--color-txt1); color: var(--color-bg0)" class="bgBox">txt1</div>
      <div style="background: var(--color-txt2); color: var(--color-bg0)" class="bgBox">txt2</div>
      <div style="background: var(--color-txt3); color: var(--color-bg0)" class="bgBox">txt3</div>
      <div style="background: var(--color-txt4); color: var(--color-bg0)" class="bgBox">txt4</div>
      <div style="background: var(--color-txt5); color: var(--color-bg0)" class="bgBox">txt5</div>
      <div style="background: var(--color-txt6); color: var(--color-bg0)" class="bgBox">txt6</div>
    </div>
</template>
'>
</hhl-live-editor>
<br/>

## Color css variables

  <br/>

### Background colors.

| Name        | Color                                                                              | Describtion                |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------- |
| --color-bg0  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg0)"></div>  | The bg-0 background color. |
| --color-bg1 | <div class="colors-bgBox shadow" style="background-color: var(--color-bg1)"></div> | The bg-1 background color. |
| --color-bg2  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg2)"></div>  | The bg-2 background color. |
| --color-bg3  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg3)"></div>  | The bg-3 background color. |
| --color-bg4  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg4)"></div>  | The bg-4 background color. |
| --color-bg5  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg5)"></div>  | The bg-5 background color. |
| --color-bg6  | <div class="colors-bgBox shadow" style="background-color: var(--color-bg6)"></div>  | The bg-6 background color. |

<br/>

### Text colors.

| Name        | Color                                                                              | Describtion      |
| ----------- | ---------------------------------------------------------------------------------- | ---------------- |
| --color-txt0 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt0)"></div> | The txt-0 color. |
| --color-txt1 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt1)"></div> | The txt-1 color. |
| --color-txt2 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt2)"></div> | The txt-2 color. |
| --color-txt3 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt3)"></div> | The txt-3 color. |
| --color-txt4 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt4)"></div> | The txt-4 color. |
| --color-txt5 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt5)"></div> | The txt-5 color. |
| --color-txt6 | <div class="colors-bgBox shadow" style="background-color: var(--color-txt6)"></div> | The txt-6 color. |

<br/>
