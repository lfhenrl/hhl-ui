# Popover

<style>
  .popUpBox {
    border-radius: 4px;
    padding: 20px;
    background-color: var(--color-warn); 
  }
</style>

The `H_popover` will give you a popUp as a dropdown or dropup box.<br>
The `H_popover` will display the popup relative to the `v-slot:referance`.<br>
If you want to relate to something else inside the v-slot you van use the property `query-selector` to specify a css selector.<br>
If there not is place enough it will automatically change the position.<br>

## By click.

The default is that it toggle the popup when you click on the `v-slot:referance`.<br>


<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex  items-center gap-4 flex-wrap">
          <H_popover>
            <template v-slot:referance>
                <H_btn>Toggle</H_btn>
            </template>
            <div class="popUpBox">Hello</div>
          </H_popover>
     </div> 
    </template>
'>
</hhl-live-editor>

<br/>

## By v-model.

You can also use the v-model to control the open/close of the popup.

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex items-center gap-4 flex-wrap">
        <H_popover v-model="open">
          <div class="popUpBox">Hello</div>
        </H_popover>
        <H_switch v-model="open" label="open"> </H_switch>
      </div>
    </template>
    <script>
    const open = ref(false)
    return {open}
    </script>
'>
</hhl-live-editor>

<br/>

## By functions.

You can also make a ref to the popover.<br>
The popover have a open and a close command.

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex items-center gap-4 flex-wrap">
        <H_popover ref="pop" close-action="manual">
            <template v-slot:referance>
                <div style="border: 1px solid red;line-height:2">referance</div>
            </template>
          <div class="popUpBox">Hello</div>
        </H_popover>
    <H_btn @click="open">open</H_btn>
    <H_btn @click="close">close</H_btn>
      </div>
    </template>
    <script>
    const pop = ref();
    function open() {
    pop.value.open();
    }
    function close() {
    pop.value.close();
    }
    return {open,close,pop}
    </script>
'>
</hhl-live-editor>

<br/>

## Close Action.

By default the popup will close when you click outside the popup or by the Escape key.<br>

By adding the property `close-action="manual"` the popup will not close when you click outside the popup or by the Escape key.<br>

If you need to disable the toggle click on  `v-slot:referance` you can add the readonly property.<br>

You the have to possibillities to close the popup: by using the V-model or by making a ref to the popover and call `ref.close()`

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4 flex-wrap">
        <H_popover close-action="manual">
          <template v-slot:referance>
              <H_btn>close-action="manual"</H_btn>
          </template>
          <div class="popUpBox">Hello</div>
        </H_popover>
        <H_popover v-model="open" close-action="manual" readonly>
          <template v-slot:referance>
              <H_btn>close-action="manual" & readonly</H_btn>
          </template>
          <div class="popUpBox">Hello</div>
        </H_popover>
        <H_switch v-model="open" label="open">
      </div>
    </template>
    <script>
    const open = ref(false)
    return {open}
    </script>
'>
</hhl-live-editor>

<br/>


## PopUp placement.

### Placement.

By adding the property `placement` you can change the position of the popup.<br>
The values are `top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end, center` .<br>
The default is `bottom-start`.<br>

### Padding.

By adding the property `padding` you can define the padding as a number of pixcel for the outer border of the Popup container.<br>
The default is `20` that will adjust the placement 20px from the body.
<br>

### Offset Top.

By adding the property `offset-top` it will adjust the top position with the value. It can be positive or negative.<br>

### Offset left.

By adding the property `offset-left` it will adjust the left position with the value. It can be positive or negative.<br>
<br>
<br>
<hhl-live-editor title="" htmlCode='
    <template>
    <div class="thisContainer" style="border: 1px red dashed">
      <div class="flex flex-col gap-4 flex-wrap">
       <div class="flex gap-12 items-center">
        <H_popover  :placement="placement" 
                :padding="padding"
                :offset-top="offsetTop"
                :offset-left="offsetLeft">      
            <template v-slot:referance>
              <H_btn>Open</H_btn>
            </template>
          <div class="popUpBox" >Hello</div>
        </H_popover>
      </div>
     <div class="flex items-center gap-4 mt-4" >
        <H_select hide-filter :list="selectData" v-model="placement" label="Placement"></H_select>
         <H_input type="number" v-model="padding" label="padding" style="max-width:150px"></H_input>
         <H_input type="number" v-model="offsetTop" label="offset-top" style="max-width:150px"></H_input>
         <H_input type="number" v-model="offsetLeft" label="offset-left" style="max-width:150px"></H_input>
      </div>
    </div>
    </div>
    </template>
    <script>
      const placement = ref("bottom-start");
      const inner = ref(false);
      const container = ref("slotElement");
      const querySelector = ref("body");
      const padding = ref(0);
      const offsetTop = ref(0);
      const offsetLeft = ref(0);
      const selectData = ["top"
        , "top-start"
        , "top-end"
        , "right"
        , "right-start"
        , "right-end"
        , "bottom"
        , "bottom-start"
        , "bottom-end"
        , "left"
        , "left-start"
        , "left-end"];
      const conType = [
          "slotElement"
        , "box"];
      const queryType = [
          "body"
        , "#page-container"  
        , ".thisContainer"];
      return { placement,inner, selectData, container, conType, querySelector, queryType,padding,offsetTop,offsetLeft }
    </script>
'>
</hhl-live-editor>

<br/>

## Movable.

By adding the property `movable` it will be possible to move the Popup.<br>
The Popup will move back to the original position when you scroll og resize.<br>
By adding the property `moveable-drag` to one element in the Popup it will be here you can move the Popup .<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex items-center gap-4 flex-wrap">
        <H_popover movable>
          <template v-slot:referance>
              <H_btn>Drag</H_btn>
          </template>
          <div class="popUpBox">
          <div>Hello</div>
          </div>
        </H_popover>
          <H_popover movable>
          <template v-slot:referance>
              <H_btn>Drag by element"</H_btn>
          </template>
          <div class="popUpBox">
          <div moveable-drag style="background-color: lime; text-align: center; padding: 10px">dragme</div>
          <div>Hello</div>
          </div>
        </H_popover>
      </div>
    </template>
    <script>
      const popup = ref(false);
      return { popup }
    </script>
'>
</hhl-live-editor>

<br/>

## Adjust component (referance) to the full width og the parent.

By default the width of the popup will as minium be the same as the component (referance).<br>
This is the default to disable add `:width-as-ref="false"`

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4 flex-wrap">
        <H_popover :width-as-ref="false">
          <template v-slot:referance>
              <H_btn>width-as-ref="false" .......</H_btn>
          </template>
          <div class="popUpBox">
          <div>Hello</div>
          </div>
        </H_popover>         
      </div>
    </template>
    <script>
      const popup = ref(false);
      return { popup }
    </script>
'>
</hhl-live-editor>

<br/>

<br/>
<br/>
<br/>
<br/>
