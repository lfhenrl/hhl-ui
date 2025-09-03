# Popover

<style>
  .popUpBox {
    display:flex;
    border-radius: 4px;
    padding: 29px;
    background-color: var(--col-warn); 
    
  }
</style>

The `H_popover` will give you a popUp as a dropdown or dropup box.<br>
The `H_popover` will display the popup relative to the `v-slot:referance`.<br>
If there not is place enough it will automatically change the position.<br>

## By click.

The default is that it toggle the popup when you click on the `v-slot:referance`.<br>
It will close on click outside and by the ESC key.

<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <div h-display="flex" h-align-items="center" h-gap="1rem">
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
     <div h-display="flex" h-align-items="center" h-gap="1rem">
        <H_popover v-model="open" offset-top="10px">
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
     <div h-display="flex" h-align-items="center" h-gap="1rem">
        <H_popover ref="pop" close-action="manual">
            <template v-slot:referance>
                <div  h-border="1px solid red" h-padding-block="0.25rem">referance</div>
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

If you need to disable the toggle click on `v-slot:referance` you can add the readonly property.<br>

You the have to possibillities to close the popup: by using the V-model or by making a ref to the popover and call `ref.close()`

<hhl-live-editor title="" htmlCode='
    <template>
       <div h-display="flex" h-align-items="center" h-gap="1rem">
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

### Offset Top.

By adding the property `offset-top` it will adjust the top position with the value. It can be positive or negative.<br>

### Offset left.

By adding the property `offset-left` it will adjust the left position with the value. It can be positive or negative.<br>
<br>
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <div h-display="flex" h-align-items="center" h-gap="1rem">
        <H_popover :placement="placement" 
                :offset-top="offsetTop"
                :offset-left="offsetLeft">      
            <template v-slot:referance>
              <H_btn>Open</H_btn>
            </template>
          <div class="popUpBox" >Hello</div>
        </H_popover>
         <H_select :list="selectData" v-model="placement" label="Placement" h-width="fit-content"></H_select>
         <H_input  v-model="offsetTop" label="offset-top" h-width="fit-content"></H_input>
         <H_input  v-model="offsetLeft" label="offset-left" h-width="fit-content"></H_input>
    </div>
    </template>
    <script>
      const placement = ref("bottom-start");
      const offsetTop = ref("0px");
      const offsetLeft = ref("0px");
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
      return { selectData, offsetTop,offsetLeft,placement }
    </script>
'>
</hhl-live-editor>

<br/>

## Adjust component (referance) to the full width og the parent.

By adding attribute `width-as-ref` the width of the popup will be the same as the component (referance).<br>

<hhl-live-editor title="" htmlCode='
    <template>
       <div h-display="flex" h-align-items="center" h-gap="1rem">
        <H_popover width-as-ref>
          <template v-slot:referance>
              <H_btn>width-as-ref .......</H_btn>
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

## Movable.

By adding the property `movable` it will be possible to move the Popup.<br/>
The Popup will move back to the original position when you scroll og resize.<br/>
By adding the property `moveable-drag` to one element in the Popup it will be here you can move the Popup.<br/>

<hhl-live-editor title="" htmlCode='
    <template>
       <div h-display="flex" h-align-items="center" h-gap="1rem">
        <H_popover movable>
          <template v-slot:referance>
              <H_btn>Drag by element</H_btn>
          </template>
          <div  h-display="flex" h-flex-direction="column" h-bgcolor="var(--bgcol-2)">
          <div moveable-drag h-bgcolor="var(--col-pri)" h-color="white" h-padding-block="0.25rem" h-text-align="center">dragme</div>
          <div  h-padding="100px">Hello</div>          
          </div>
        </H_popover>        
      </div>
    </template>
'>
</hhl-live-editor>

<br/>

<br/>
<br/>
<br/>
<br/>
