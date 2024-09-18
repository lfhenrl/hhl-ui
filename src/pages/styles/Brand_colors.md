## Brand colors

This is the Brand colors all defined as css properties, like `--col-xxx`.<br>
For each color there is a color on `--col-on-xxx`, that have the text color that looks best on the background  color

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <div class="flex flex-wrap">
      <div class="col-pri flex items-center justify-center w-24 h-9">pri</div>
      <div class="col-sec flex items-center justify-center w-24">sec</div>
      <div class="col-ok flex items-center justify-center w-24">ok</div>
      <div class="col-err flex items-center justify-center w-24">err</div>
      <div class="col-warn flex items-center justify-center w-24">warn</div>
      <div class="col-info flex items-center justify-center w-24">info</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>


## Theme css variables

  <br/>

| Name          | Color                                                                               | Describtion                   |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| --col-pri     | <div class="bgBox col-pri"></div> | The primary color.            |
| --col-on-pri  | <div style="background: var(--col-on-pri)" class="flex items-center justify-center w-24 h-9"></div> | The text color for primary.   |
| --col-sec     | <div style="background: var(--col-sec)" class="flex items-center justify-center w-24 h-9"></div> | The secondary color.          |
| --col-on-sec  | <div style="background: var(--col-on-sec)" class="flex items-center justify-center w-24 h-9"></div> | The text color for secondary. |
| --col-ok      | <div style="background: var(--col-ok)" class="flex items-center justify-center w-24 h-9"></div> | The ok color.                 |
| --col-on-ok   | <div style="background: var(--col-on-ok)" class="flex items-center justify-center w-24 h-9"></div> | The text color for ok.        |
| --col-err     | <div style="background: var(--col-err)" class="flex items-center justify-center w-24 h-9"></div> | The error color.              |
| --col-on-err  | <div style="background: var(--col-on-err)" class="flex items-center justify-center w-24 h-9"></div> | The text color for error.     |
| --col-warn    | <div style="background: var(--col-warn)" class="flex items-center justify-center w-24 h-9"></div> | The warning color.            |
| --col-on-warn | <div style="background: var(--col-on-warn)" class="flex items-center justify-center w-24 h-9"></div> | The text color for warning.   |
| --col-info    | <div style="background: var(--col-info)" class="flex items-center justify-center w-24 h-9"></div> | The info color.               |
| --col-on-info | <div style="background: var(--col-on-info)" class="flex items-center justify-center w-24 h-9"></div> | The text color for info.      |

<br/>
