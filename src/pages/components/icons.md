# Icon

## Size

You can change the size by the property `size`<br>
Default is `1.4rem`<br>

<hhl-live-editor title="" htmlCode='
    <template>
    <div h-display="flex" h-gap="1rem">        
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>1rem</p><H_icon name="edit" h-font-size="1rem"></H_icon></div> 
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>standard</p><H_icon name="edit" ></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>2rem</p><H_icon name="edit" h-font-size="2rem"></H_icon></div>  
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>40px</p><H_icon name="edit" h-font-size="40px"></H_icon></div> 
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>style</p><H_icon name="edit" style="font-size: 45px"></H_icon></div>        
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the`h-color` property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "col-0" | "col-1" | "col-2" | "col-3" | "col-4" | "col-t5" | "col-6" | "col-7" | "col-8" | "col-9"`. <br>

If you need a special color then just use `h-color="purple"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
      <div h-display="flex" h-gap="1rem">
            <div><p>pri</p><H_icon name="edit" h-color="var(--col-pri)"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--col-sec)"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--col-ok)"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--col-err)"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--col-warn)"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--col-info)"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--col-0)"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--col-1)"></H_icon></div> 
            <div><p>txt2</p><H_icon name="edit" h-color="var(--col-2)"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--col-3)"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--col-4)"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--col-5)"></H_icon></div>
            <div><p>txt6</p><H_icon name="edit" h-color="var(--col-6)"></H_icon></div>
            <div><p>txt7</p><H_icon name="edit" h-color="var(--col-7)"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--col-8)"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--col-9)"></H_icon></div>
            <div><p>purple</p><H_icon name="edit" h-color="purple"></H_icon></div>             
      </div>
            <div h-display="flex" h-gap="1rem" h-margin-top="1rem">
            <div><p>pri</p><H_icon name="edit" h-color="var(--col-pri)" variant="outline-round"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--col-sec)" variant="outline-round"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--col-ok)" variant="outline-round"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--col-err)" variant="outline-round"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--col-warn)" variant="outline-round"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--col-info)" variant="outline-round"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white" variant="outline-round"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black" variant="outline-round"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--col-0)" variant="outline-round"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--col-1)" variant="outline-round"></H_icon></div> 
            <div><p>txt2</p><H_icon name="edit" h-color="var(--col-2)" variant="outline-round"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--col-3)" variant="outline-round"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--col-4)" variant="outline-round"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--col-5)" variant="outline-round"></H_icon></div>
            <div><p>txt6</p><H_icon name="edit" h-color="var(--col-6)" variant="outline-round"></H_icon></div>
            <div><p>txt7</p><H_icon name="edit" h-color="var(--col-7)" variant="outline-round"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--col-8)" variant="outline-round"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--col-9)" variant="outline-round"></H_icon></div>
            <div><p>purple</p><H_icon name="edit" h-color="purple" variant="outline-round"></H_icon></div>             
      </div>
            <div h-display="flex" h-gap="1rem" h-margin-top="1rem">
            <div><p>pri</p><H_icon name="edit" h-color="var(--col-pri)" variant="filled-round"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--col-sec)" variant="filled-round"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--col-ok)" variant="filled-round"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--col-err)" variant="filled-round"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--col-warn)" variant="filled-round"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--col-info)" variant="filled-round"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white" variant="filled-round"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black" variant="filled-round"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--col-0)" variant="filled-round"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--col-1)" variant="filled-round"></H_icon></div>
            <div><p>txt2</p><H_icon name="edit" h-color="var(--col-2)" variant="filled-round"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--col-3)" variant="filled-round"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--col-4)" variant="filled-round"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--col-5)" variant="filled-round"></H_icon></div> 
            <div><p>txt6</p><H_icon name="edit" h-color="var(--col-6)" variant="filled-round"></H_icon></div> 
            <div><p>txt7</p><H_icon name="edit" h-color="var(--col-7)" variant="filled-round"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--col-8)" variant="filled-round"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--col-9)" variant="filled-round"></H_icon></div>
            <div><p>purple</p><H_icon name="edit" h-color="purple" variant="filled-round"></H_icon></div>             
      </div>
      </div>
      </template>
'>
</hhl-live-editor>
<br>

## Icon variant

You can change the shape by the variant property `"base" | "outline" | "outline-round" | "filled" | "filled-round"`. <br>
Default is `"base"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div h-display="flex" h-gap="1rem">
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>base</p><H_icon name="edit" variant="base"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline</p><H_icon name="edit" variant="outline"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline-round</p><H_icon name="edit" variant="outline-round"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>filled</p><H_icon name="edit" variant="filled"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>filled-round</p><H_icon name="edit" variant="filled-round"></H_icon></div>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Icon as button

By adding the attributes `btn"`, the icon vill act as a button.<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <div h-display="flex" h-gap="1rem">
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>base</p><H_icon name="edit" btn></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline</p><H_icon name="edit" btn variant="outline"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline-round</p><H_icon name="edit" outline btn variant="outline-round"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>filled</p><H_icon name="edit" btn variant="filled"></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>filled-round</p><H_icon name="edit" btn variant="filled-round"></H_icon></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon button Disabled

<hhl-live-editor title="" htmlCode='
 <template>
     <div h-display="flex" h-gap="1rem">
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline</p><H_icon name="edit" outline btn disabled></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>round false</p><H_icon name="edit" outline :round="false" btn disabled></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>outline filled</p><H_icon name="edit" outline filled btn disabled></H_icon></div>
        <div h-display="flex" h-flex-direction="column" h-align-items="center"><p>round false filled</p><H_icon name="edit" outline :round="false" filled btn disabled></H_icon></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<ico-list/>
<br>
<br>
