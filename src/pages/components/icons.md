# Icon

## Size

<style>
  .iconBox {
    display: flex;
    flex-wrap: wrap;
    gap:10px;
  }
  .iconBox div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

You can change the size by the property `size`<br>
Default is `1.8rem`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="iconBox">        
        <div><p>1rem</p><H_icon name="edit" size="1rem"></H_icon></div> 
        <div><p>standard</p><H_icon name="edit" ></H_icon></div>
        <div><p>3rem</p><H_icon name="edit" size="3rem"></H_icon></div>  
        <div><p>60px</p><H_icon name="edit" size="60px"></H_icon></div>        
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "neutral" | "neutral-light"`. <br>
The default is `neutral`.<br>

If you need a special color then just use `style="color: lime"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div>
      <div class="iconBox">
            <div><p>pri</p><H_icon name="edit" color="pri"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" color="sec"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" color="ok"></H_icon></div>
            <div><p>err</p><H_icon name="edit" color="err"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" color="warn"></H_icon></div>
            <div><p>info</p><H_icon name="edit" color="info"></H_icon></div>
            <div><p>neutral</p><H_icon name="edit" color="neutral"></H_icon></div>
            <div><p>neutral-light</p><H_icon name="edit" color="neutral-light"></H_icon></div> 
            <div><p>Lime</p><H_icon name="edit" style="color:lime"></H_icon></div>             
      </div>
            <div class="iconBox mt-10">
            <div><p>pri</p><H_icon name="edit" color="pri" variant="filled-round"></H_icon></div>
            <div><p>sec</p><H_icon name="edit" color="sec" variant="filled-round"></H_icon></div>
            <div><p>ok</p><H_icon name="edit" color="ok" variant="filled-round"></H_icon></div>
            <div><p>err</p><H_icon name="edit" color="err" variant="filled-round"></H_icon></div>
            <div><p>warn</p><H_icon name="edit" color="warn" variant="filled-round"></H_icon></div>
            <div><p>info</p><H_icon name="edit" color="info" variant="filled-round"></H_icon></div>
            <div><p>neutral</p><H_icon name="edit" color="neutral" variant="filled-round"></H_icon></div>
            <div><p>neutral-light</p><H_icon name="edit" color="neutral-light" variant="filled-round"></H_icon></div> 
            <div><p>Lime</p><H_icon name="edit" style="background-color:lime; color:black" variant="filled-round"></H_icon></div>             
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
      <div class="iconBox">
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
     <div class="iconBox">
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
     <div class="iconBox">
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
