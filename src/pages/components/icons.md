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
        <div><p>1rem</p><H_icon-edit size="1rem"></H_icon-edit></div> 
        <div><p>standard</p><H_icon-edit ></H_icon-edit></div>
        <div><p>3rem</p><H_icon-edit size="3rem"></H_icon-edit></div>  
        <div><p>60px</p><H_icon-edit size="60px"></H_icon-edit></div>        
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the class `color` by using the standard theme colors<br>
The default is `pri`.<br>

If you need a special color then just use `style="color: lime"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="iconBox">
            <div><p>pri</p><H_icon-edit color="pri"></H_icon-edit></div>
            <div><p>sec</p><H_icon-edit color="sec"></H_icon-edit></div>
            <div><p>ok</p><H_icon-edit color="ok"></H_icon-edit></div>
            <div><p>err</p><H_icon-edit color="err"></H_icon-edit></div>
            <div><p>warn</p><H_icon-edit color="warn"></H_icon-edit></div>
            <div><p>info</p><H_icon-edit color="info"></H_icon-edit></div>
            <div><p>black</p><H_icon-edit color="black"></H_icon-edit></div>
            <div><p>white</p><H_icon-edit color="white"></H_icon-edit></div>
            <div><p>txt0</p><H_icon-edit color="txt0"></H_icon-edit></div>
            <div><p>txt1</p><H_icon-edit color="txt1"></H_icon-edit></div> 
            <div><p>txt2</p><H_icon-edit color="txt2"></H_icon-edit></div> 
            <div><p>txt3</p><H_icon-edit color="txt3"></H_icon-edit></div> 
            <div><p>txt4</p><H_icon-edit color="txt4"></H_icon-edit></div> 
            <div><p>txt5</p><H_icon-edit color="txt5"></H_icon-edit></div> 
            <div><p>txt6</p><H_icon-edit color="txt6"></H_icon-edit></div>
            <div><p>bg0</p><H_icon-edit color="bg0"></H_icon-edit></div>
            <div><p>bg1</p><H_icon-edit color="bg1"></H_icon-edit></div>
            <div><p>bg2</p><H_icon-edit color="bg2"></H_icon-edit></div>
            <div><p>bg3</p><H_icon-edit color="bg3"></H_icon-edit></div>
            <div><p>bg4</p><H_icon-edit color="bg4"></H_icon-edit></div>
            <div><p>bg5</p><H_icon-edit color="bg5"></H_icon-edit></div>
            <div><p>bg6</p><H_icon-edit color="bg6"></H_icon-edit></div> 
            <div><p>bg6</p><H_icon-edit style="color:lime"></H_icon-edit></div>             
      </div>
      </template>
'>
</hhl-live-editor>
<br>

## Icon shape

You can change the shape by the attributes `round (default), filled outline"`.


<hhl-live-editor title="" htmlCode='
      <template>
      <div class="iconBox">
        <div><p>outline</p><H_icon-edit outline></H_icon-edit></div>
        <div><p>round false</p><H_icon-edit outline :round="false"></H_icon-edit></div>
        <div><p>outline filled</p><H_icon-edit outline filled></H_icon-edit></div>
        <div><p>round false filled</p><H_icon-edit outline :round="false" filled></H_icon-edit></div>
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
        <div><p>outline</p><H_icon-edit outline btn></H_icon-edit></div>
        <div><p>round false</p><H_icon-edit outline :round="false" btn></H_icon-edit></div>
        <div><p>outline filled</p><H_icon-edit outline filled btn></H_icon-edit></div>
        <div><p>round false filled</p><H_icon-edit outline :round="false" filled btn></H_icon-edit></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon button Disabled

<hhl-live-editor title="" htmlCode='
 <template>
     <div class="iconBox">
        <div><p>outline</p><H_icon-edit outline btn disabled></H_icon-edit></div>
        <div><p>round false</p><H_icon-edit outline :round="false" btn disabled></H_icon-edit></div>
        <div><p>outline filled</p><H_icon-edit outline filled btn disabled></H_icon-edit></div>
        <div><p>round false filled</p><H_icon-edit outline :round="false" filled btn disabled></H_icon-edit></div>
    </div>
    </template>
'>
</hhl-live-editor>

<br>

## Icon list

<ico-list/>
<br>
<br>
