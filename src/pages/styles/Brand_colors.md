## Brand colors

This is the Brand colors all defined as css properties, like `--col-xxx`.<br>

<hhl-live-editor title="Theme colors" htmlCode='
    <template>
    <div  h-display="flex" h-flex-wrap="wrap">
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem" h-bgcolor="var(--col-pri)" h-color-contrast-fromBg>pri</div>
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem"  h-bgcolor="var(--col-sec)" h-color-contrast-fromBg>sec</div>
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem"  h-bgcolor="var(--col-ok)" h-color-contrast-fromBg>ok</div>
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem"  h-bgcolor="var(--col-err)" h-color-contrast-fromBg>err</div>
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem"  h-bgcolor="var(--col-warn)" h-color-contrast-fromBg>warn</div>
      <div h-display="flex" h-justify-content="center" h-align-items="center" h-width="6rem" H-height="2rem" h-bgcolor="var(--col-info)" h-color-contrast-fromBg>info</div>
    </div>
    </template>
'>
</hhl-live-editor>
<br/>

## Theme css variables

  <br/>

| Name       | Color                                                                  | Describtion          |
| ---------- | ---------------------------------------------------------------------- | -------------------- |
| --col-pri  | <div h-bgcolor="var(--col-pri)" h-width="6rem" H-height="2rem"></div>  | The primary color.   |
| --col-sec  | <div h-bgcolor="var(--col-sec)" h-width="6rem" H-height="2rem"></div>  | The secondary color. |
| --col-ok   | <div h-bgcolor="var(--col-ok)" h-width="6rem" H-height="2rem"></div>   | The ok color.        |
| --col-err  | <div h-bgcolor="var(--col-err)" h-width="6rem" H-height="2rem"></div>  | The error color.     |
| --col-warn | <div h-bgcolor="var(--col-warn)" h-width="6rem" H-height="2rem"></div> | The warning color.   |
| --col-info | <div h-bgcolor="var(--col-info)" h-width="6rem" H-height="2rem"></div> | The info color.      |

<br/>
