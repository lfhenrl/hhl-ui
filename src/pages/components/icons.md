# Icon

## Size

You can change the size by the property `size`<br>
Default is `1.4rem`<br>
If you need a special size then just use `style="font-size: 44px"` or `class="text-3xl"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex gap-4">        
        <div class="flex flex-col items-center"><p>1rem</p><H_icon name="edit" h-font-size="1rem"></H_icon></div> 
        <div class="flex flex-col items-center"><p>standard</p><H_icon name="edit" ></H_icon></div>
        <div class="flex flex-col items-center"><p>2rem</p><H_icon name="edit" h-font-size="2rem"></H_icon></div>  
        <div class="flex flex-col items-center"><p>40px</p><H_icon name="edit" h-font-size="40px"></H_icon></div> 
        <div class="flex flex-col items-center"><p>style</p><H_icon name="edit" style="font-size: 45px"></H_icon></div> 
        <div class="flex flex-col items-center"><p>class</p><H_icon name="edit" class="text-5xl"></H_icon></div>        
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the`h-color` property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>

If you need a special color then just use `h-color="purple"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
      <div class="flex gap-4">
            <div><p>pri</p><H_icon name="edit" h-color="var(--color-pri)"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--color-sec)"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--color-ok)"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--color-err)"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--color-warn)"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--color-info)"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--color-txt0)"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--color-txt1)"></H_icon></div> 
            <div><p>txt2</p><H_icon name="edit" h-color="var(--color-txt2)"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--color-txt3)"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--color-txt4)"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--color-txt5)"></H_icon></div>
            <div><p>txt6</p><H_icon name="edit" h-color="var(--color-txt6)"></H_icon></div>
            <div><p>txt7</p><H_icon name="edit" h-color="var(--color-txt7)"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--color-txt8)"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--color-txt9)"></H_icon></div>
            <div><p>purple</p><H_icon name="edit" h-color="purple"></H_icon></div>             
      </div>
            <div class="flex gap-4">
            <div><p>pri</p><H_icon name="edit" h-color="var(--color-pri)" variant="outline-round"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--color-sec)" variant="outline-round"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--color-ok)" variant="outline-round"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--color-err)" variant="outline-round"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--color-warn)" variant="outline-round"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--color-info)" variant="outline-round"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white" variant="outline-round"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black" variant="outline-round"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--color-txt0)" variant="outline-round"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--color-txt1)" variant="outline-round"></H_icon></div> 
            <div><p>txt2</p><H_icon name="edit" h-color="var(--color-txt2)" variant="outline-round"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--color-txt3)" variant="outline-round"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--color-txt4)" variant="outline-round"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--color-txt5)" variant="outline-round"></H_icon></div>
            <div><p>txt6</p><H_icon name="edit" h-color="var(--color-txt6)" variant="outline-round"></H_icon></div>
            <div><p>txt7</p><H_icon name="edit" h-color="var(--color-txt7)" variant="outline-round"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--color-txt8)" variant="outline-round"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--color-txt9)" variant="outline-round"></H_icon></div>
            <div><p>purple</p><H_icon name="edit" h-color="purple" variant="outline-round"></H_icon></div>             
      </div>
            <div class="flex gap-4 mt-4">
            <div><p>pri</p><H_icon name="edit" h-color="var(--color-pri)" variant="filled-round"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" h-color="var(--color-sec)" variant="filled-round"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" h-color="var(--color-ok)" variant="filled-round"></H_icon></div>
            <div><p>err</p><H_icon name="edit" h-color="var(--color-err)" variant="filled-round"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" h-color="var(--color-warn)" variant="filled-round"></H_icon></div>
            <div><p>info</p><H_icon name="edit" h-color="var(--color-info)" variant="filled-round"></H_icon></div>
            <div><p>white</p><H_icon name="edit" h-color="white" variant="filled-round"></H_icon></div>
            <div><p>black</p><H_icon name="edit" h-color="black" variant="filled-round"></H_icon></div>
            <div><p>txt0</p><H_icon name="edit" h-color="var(--color-txt0)" variant="filled-round"></H_icon></div>
            <div><p>txt1</p><H_icon name="edit" h-color="var(--color-txt1)" variant="filled-round"></H_icon></div>
            <div><p>txt2</p><H_icon name="edit" h-color="var(--color-txt2)" variant="filled-round"></H_icon></div>
            <div><p>txt3</p><H_icon name="edit" h-color="var(--color-txt3)" variant="filled-round"></H_icon></div>
            <div><p>txt4</p><H_icon name="edit" h-color="var(--color-txt4)" variant="filled-round"></H_icon></div>
            <div><p>txt5</p><H_icon name="edit" h-color="var(--color-txt5)" variant="filled-round"></H_icon></div> 
            <div><p>txt6</p><H_icon name="edit" h-color="var(--color-txt6)" variant="filled-round"></H_icon></div> 
            <div><p>txt7</p><H_icon name="edit" h-color="var(--color-txt7)" variant="filled-round"></H_icon></div>
            <div><p>txt8</p><H_icon name="edit" h-color="var(--color-txt8)" variant="filled-round"></H_icon></div>
            <div><p>txt9</p><H_icon name="edit" h-color="var(--color-txt9)" variant="filled-round"></H_icon></div>
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
      <div class="flex gap-4">
        <div><p>base</p><H_icon name="edit" variant="base"></H_icon></div>
        <div><p>outline</p><H_icon name="edit" variant="outline"></H_icon></div>
        <div><p>outline-round</p><H_icon name="edit" variant="outline-round"></H_icon></div>
        <div><p>filled</p><H_icon name="edit" variant="filled"></H_icon></div>
        <div><p>filled-round</p><H_icon name="edit" variant="filled-round"></H_icon></div>
      </div>
      </template>
'>
</hhl-live-editor>

<br>

## Icon as button

By adding the attributes `btn"`, the icon vill act as a button.<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex gap-4">
        <div><p>base</p><H_icon name="edit" btn></H_icon></div>
        <div><p>outline</p><H_icon name="edit" btn variant="outline"></H_icon></div>
        <div><p>outline-round</p><H_icon name="edit" outline btn variant="outline-round"></H_icon></div>
        <div><p>filled</p><H_icon name="edit" btn variant="filled"></H_icon></div>
        <div><p>filled-round</p><H_icon name="edit" btn variant="filled-round"></H_icon></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon button Disabled

<hhl-live-editor title="" htmlCode='
 <template>
     <div class="flex gap-4">
        <div><p>outline</p><H_icon name="edit" outline btn disabled></H_icon></div>
        <div><p>round false</p><H_icon name="edit" outline :round="false" btn disabled></H_icon></div>
        <div><p>outline filled</p><H_icon name="edit" outline filled btn disabled></H_icon></div>
        <div><p>round false filled</p><H_icon name="edit" outline :round="false" filled btn disabled></H_icon></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<ico-list/>
<br>
<br>
