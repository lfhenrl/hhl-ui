## Brand colors

<style>
  .bgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 90px;
  }
</style>

This is the Brand colors all defined as css properties, like `--col-xxx`.<br>
For each color there is a color on `--col-on-xxx`, that have the text color that looks best on the background  color

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <div class="flexRow flexWrap">
      <div style="background: var(--col-pri); color:var(--col-on-pri)" class="bgBox">pri</div>
      <div style="background: var(--col-sec); color:var(--col-on-sec)" class="bgBox">sec</div>
      <div style="background: var(--col-ok); color:var(--col-on-ok)" class="bgBox">ok</div>
      <div style="background: var(--col-err); color:var(--col-on-err)" class="bgBox">err</div>
      <div style="background: var(--col-warn); color:var(--col-on-warn)" class="bgBox">warn</div>
      <div style="background: var(--col-info); color:var(--col-on-info)" class="bgBox">info</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>


## Theme css variables

  <br/>

| Name          | Color                                                                               | Describtion                   |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| --col-pri     | <div style="background: var(--col-pri)" class="bgBox"></div> | The primary color.            |
| --col-on-pri  | <div style="background: var(--col-on-pri)" class="bgBox"></div> | The text color for primary.   |
| --col-sec     | <div style="background: var(--col-sec)" class="bgBox"></div> | The secondary color.          |
| --col-on-sec  | <div style="background: var(--col-on-sec)" class="bgBox"></div> | The text color for secondary. |
| --col-ok      | <div style="background: var(--col-ok)" class="bgBox"></div> | The ok color.                 |
| --col-on-ok   | <div style="background: var(--col-on-ok)" class="bgBox"></div> | The text color for ok.        |
| --col-err     | <div style="background: var(--col-err)" class="bgBox"></div> | The error color.              |
| --col-on-err  | <div style="background: var(--col-on-err)" class="bgBox"></div> | The text color for error.     |
| --col-warn    | <div style="background: var(--col-warn)" class="bgBox"></div> | The warning color.            |
| --col-on-warn | <div style="background: var(--col-on-warn)" class="bgBox"></div> | The text color for warning.   |
| --col-info    | <div style="background: var(--col-info)" class="bgBox"></div> | The info color.               |
| --col-on-info | <div style="background: var(--col-on-info)" class="bgBox"></div> | The text color for info.      |

<br/>
