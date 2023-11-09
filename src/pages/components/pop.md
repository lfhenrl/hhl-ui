# Pop base popup

The `H_pop` will give you a popUp as a dropdown or dropup box.<br>
If there not is place enough it will automatically change the position.<br>

## Trigger.

The default trigger is toggle meaning that it toggle the popup when you click the component.<br>
The other options are.<br>
`trigger="none "` Meaning no action when click the component.<br>
`trigger="toggle"` Meaning show or hide the popUp when you click the component. DEFAULT<br>
`trigger="click "` Meaning show the popUp when you click the component but will not close when you click the component<br>
`trigger="hover "` Meaning show the popUp when you hover the component but will not close when you click the component<br>

<br>

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex items-center gap-4">
          <H_pop>
            <template v-slot:referance>
              <H_btn>default (trigger)</H_btn>
            </template>
            <div class="bg-warn p-5 rounded">Hello</div>
          </H_pop>
          <H_pop trigger="click">
            <template v-slot:referance>
              <H_btn>click</H_btn>
            </template>
            <div class="bg-warn p-5 rounded">Hello</div>
          </H_pop>
          <H_pop trigger="hover">
            <template v-slot:referance>
                <H_btn>trigger="hover"</H_btn>
            </template>
            <div class="bg-warn p-5 rounded">Hello</div>
          </H_pop>
          <H_pop trigger="none">
            <template v-slot:referance>
                <H_btn>trigger="none""</H_btn>
            </template>
            <div class="bg-warn p-5 rounded">Hello</div>
          </H_pop>
        </div> 
    </template>
'>
</hhl-live-editor>

<br/>

## v-model.

You can also use the v-model to control the open/close of the popup.

<hhl-live-editor title="" htmlCode='
    <template>
     <div class="flex items-center gap-4">
        <H_pop v-model="open">
         <template v-slot:referance>
              <H_btn>v-model</H_btn>
          </template>
          <div class="bg-warn p-5">Hello</div>
        </H_pop>
        <H_checkbox v-model="open" label="open">
      </div>
    </template>
    <script>
    const open = ref(false)
    return {open}
    </script>
'>
</hhl-live-editor>

<br/>

## Delay on hover.

By adding the property `delay-on-mouse-over` it will adjust delay when you hover the component (referance).<br>
The default is 100.

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop trigger="hover" delay-on-mouse-over="1000">
          <template v-slot:referance>
              <H_btn>trigger="hover" + delay-on-mouse-over="1000"</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">Hello</div>
        </H_pop>
      </div>
    </template>
'>
</hhl-live-editor>

<br/>

## Delay on end hover.

By adding the property `delay-on-mouse-out` it will adjust delay when you end hover the component (referance) and popup.<br>
The default is 300.

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop trigger="hover" delay-on-mouse-out="1000">
          <template v-slot:referance>
              <H_btn>trigger="hover" + delay-on-mouse-out="1000"</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">Hello</div>
        </H_pop>
      </div>
    </template>
'>
</hhl-live-editor>

<br/>

## Read only.

By adding the property `readonly` the Popup will not open.<br>

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop readonly>
          <template v-slot:referance>
              <H_btn>readonly</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">Hello</div>
        </H_pop>
      </div>
    </template>
'>
</hhl-live-editor>

<br/>

## Close on popup click.

By adding the property `close-popup-click` the popup will close when you click inside the popup.<br>

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop close-popup-click>
          <template v-slot:referance>
              <H_btn>close-popup-click"</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">Hello</div>
        </H_pop>
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

## Close on special attribute on HTML element i the PopUp dialog.

By adding the property `pop-close` to an element in the PopUp dialog a click on it will close the dialog.<br>

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop>
          <template v-slot:referance>
              <H_btn>close-popup-click"</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">
          <div>Hello</div>
          <div pop-close style="border: 1px red solid; margin: 10px 0">close</div>
          </div>
        </H_pop>
      </div>
    </template>
    <script>
      const popup = ref(false);
      return { popup }
    </script>
'>
</hhl-live-editor>

<br/>

## Modal Prevent closing.

By adding the property `modal` you will prevent the popup to close when you click outside the popup.<br>

::: warning
It is important that you implement a way to close the Popup.
:::
<br/>

### noShake.

By default when property is `modal` the Popup will shake when you clik outside the Popup<br>
You can disable this by adding the property `no-shake`

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop modal :no-shake="shake">
          <template v-slot:referance>
              <H_btn>modal"</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">
            <div>Hello</div>
            <div pop-close style="border: 1px red solid; margin: 10px 0">close</div>
          </div>
        </H_pop>
      <H_pop modal trigger="click" v-model="popup" :no-shake="shake" >
        <template v-slot:referance>
            <H_btn>modal + trigger="click"</H_btn>
        </template>
        <div class="bg-warn p-5 rounded"><H_btn @click="popup=false">Close"</H_btn></div>
      </H_pop>
      <H_switch label="no-shake" v-model="shake"></H_switch>
      </div>
    </template>
    <script>
      const popup = ref(false);
      const shake = ref(false);
      return { popup, shake }
    </script>
'>
</hhl-live-editor>

<br/>

## PopUp placement.

### Placement.

By adding the property `placement` you can change the position of the popup.<br>
The values are `top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end, center` .<br>
The default is `bottom-start`.<br>

### Inner.

By adding the property `inner` the position is calculated from the inner of the ref element.<br>

### Container.

By adding the property `container` you can define the container that the Popup calc the position from.<br>
The values are `slotElement` or `box` the default is `slotElement` <br>
When `slotElement` is chosed the positions will be from element in slot (referance).
When `box` is chosed the positions will be from element in the property `query-selector`.

### querySelector.

By adding the property `query-selector` you can define the element that the Popup calc the position from.<br>
The default is `body` it is only active when `container` property is `box`

### Padding.

By adding the property `padding` you can define the padding as a number of pixcel for the outer border of the Popup container.<br>
The default is `20` that will adjust the placement 20px from the body when the property `container = "slotElement"` (default)
<br>
When `container = "box"` the padding wil be from the element you have specified in `query-selector.
<br>

### Offset Top.

By adding the property `offset-top` it will adjust the top position with the value. It can be positive or negative.<br>

### Offset left.

By adding the property `offset-left` it will adjust the left position with the value. It can be positive or negative.<br>
<br>
<br>
<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-col gap-4">
       <div class="flex gap-12">
        <H_pop  :placement="placement" 
                :inner="inner" 
                :container="container" 
                :query-selector="querySelector" 
                :padding="padding"
                :offset-top="offsetTop"
                :offset-left="offsetLeft">      
            <template v-slot:referance>
              <H_btn>Open</H_btn>
            </template>
          <div class="bg-warn p-5 rounded">Hello</div>
        </H_pop>
      </div>
     <div class="flex items-center gap-4 mt-5">
        <H_select hide-filter :list="selectData" v-model="placement" label="Placement" style="max-width:150px"></H_select>
        <H_switch label="Inner" v-model="inner"></H_switch>
        <H_select hide-filter :list="conType" v-model="container" label="container" style="max-width:150px"></H_select>
         <H_select hide-filter :list="queryType" v-model="querySelector" label="querySelector" style="max-width:150px"></H_select>
      </div>
     <div class="flex items-center gap-4 mt-5">
         <H_inputNumber v-model="padding" label="padding" style="max-width:150px"></H_inputNumber>
         <H_inputNumber v-model="offsetTop" label="offset-top" style="max-width:150px"></H_inputNumber>
         <H_inputNumber v-model="offsetLeft" label="offset-left" style="max-width:150px"></H_inputNumber>
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
        , "left-end"
        , "center"];
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
      <div class="flex items-center gap-4">
        <H_pop movable>
          <template v-slot:referance>
              <H_btn>Drag</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">
          <div>Hello</div>
          </div>
        </H_pop>
          <H_pop movable>
          <template v-slot:referance>
              <H_btn>Drag by element"</H_btn>
          </template>
          <div class="flex flex-col bg-warn items-center gap-4 rounded">
          <div moveable-drag style="background-color: lime; text-align: center; padding: 10px">dragme</div>
          <div>Hello</div>
          </div>
        </H_pop>
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

By adding the property `widthAsRef` the width of the popup will as minium be the same as the component (referance), only when `container="slotElement"`<br>
This is the default to disable add `:width-as-ref="false"`

<hhl-live-editor title="" htmlCode='
    <template>
       <div class="flex items-center gap-4">
        <H_pop :width-as-ref="false">
          <template v-slot:referance>
              <H_btn>width-as-ref="false" .......</H_btn>
          </template>
          <div class="bg-warn p-5 rounded">
          <div>Hello</div>
          </div>
        </H_pop>         
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
