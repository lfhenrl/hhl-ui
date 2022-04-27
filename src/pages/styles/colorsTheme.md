## Theme colors

This is the themes colors that can be added by class.
It set the background-color and the color .

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <H_flex>
      <div class="col-pri">col-pri</div>
      <div class="col-sec">col-sec</div>
      <div class="col-err">col-err</div>
      <div class="col-warn">col-warn</div>
      <div class="col-ok">col-ok</div>
      <div class="col-info">col-info</div>
      <div class="col-black">col-black</div>
      <div class="col-white">col-white</div>
    </H_flex>
    </template>
    <xstyle>
      div div {
        padding: 9px 0;
        margin: 4px;
        width: 120px;
        text-align: center; 
        box-shadow: var(--shadow-1);
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Theme background colors

This is the themes background colors that can be added by class.

<hhl-live-editor title="Theme background colors" htmlCode='
    <template>
    <H_flex>
      <div class="col-bg-pri">col-bg-pri</div>
      <div class="col-bg-sec">col-bg-sec</div>
      <div class="col-bg-err">col-bg-err</div>
      <div class="col-bg-warn">col-bg-warn</div>
      <div class="col-bg-ok">col-bg-ok</div>
      <div class="col-bg-info">col-bg-info</div>
      <div class="col-bg-black">col-bg-black</div>
      <div class="col-bg-white">col-bg-white</div>
    </H_flex>
    </template>
    <xstyle>
      div div {
        padding: 9px 0;
        margin: 4px;
        width: 120px;
        text-align: center; 
        box-shadow: var(--shadow-1);
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Theme text colors

This is the themes text colors that can be added by class.

<hhl-live-editor title="Theme text colors" htmlCode='
    <template>
      <H_flex>
        <h3 class="col-txt-pri">col-txt-pri</h3>
        <h3 class="col-txt-sec">col-txt-sec</h3>
        <h3 class="col-txt-err">col-txt-err</h3>
        <h3 class="col-txt-warn">col-txt-warn</h3>
        <h3 class="col-txt-ok">col-txt-ok</h3>
        <h3 class="col-txt-info">col-txt-info</h3>
        <h3 class="col-txt-black">col-txt-black</h3>
        <h3 class="col-txt-white col-bg-black">col-txt-white</h3>
      </H_flex>
    </template>
    <xstyle>
      h3 {
        padding:3px 9px;
        box-shadow: var(--shadow-1);
        margin: 0;
      }
    </xstyle>
'>
</hhl-live-editor>
<br/>

## Theme css variables

  <br/>

| Name              | Color                                      | Describtion                   |
| ----------------- | ------------------------------------------ | ----------------------------- |
| --col-pri         | <div class="boxCssVar col-pri"></div>      | The primary color.            |
| --col-txt-on-pri  | <div class="boxCssVar col-pri">TEXT</div>  | The text color for primary.   |
| --col-sec         | <div class="boxCssVar col-sec"></div>      | The secondary color.          |
| --col-txt-on-sec  | <div class="boxCssVar col-sec">TEXT</div>  | The text color for secondary. |
| --col-ok          | <div class="boxCssVar col-ok"></div>       | The ok color.                 |
| --col-txt-on-ok   | <div class="boxCssVar col-ok">TEXT</div>   | The text color for ok.        |
| --col-err         | <div class="boxCssVar col-err"></div>      | The error color.              |
| --col-txt-on-err  | <div class="boxCssVar col-err">TEXT</div>  | The text color for error.     |
| --col-warn        | <div class="boxCssVar col-warn"></div>     | The warning color.            |
| --col-txt-on-warn | <div class="boxCssVar col-warn">TEXT</div> | The text color for warning.   |
| --col-info        | <div class="boxCssVar col-info"></div>     | The info color.               |
| --col-txt-on-info | <div class="boxCssVar col-info">TEXT</div> | The text color for info.      |

<br/>

<style>
.boxCssVar {
    height: 40px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}
</style>
