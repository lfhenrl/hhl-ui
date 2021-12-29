
# Pop base popup
The `hhl-pop` will give you a popUp as a dropdown or dropup box.<br>
If there not is place enough it will automatically change the position.<br>

## Trigger.
The default trigger is toggle meaning that it toggle the popup when you click the component.<br>
The other options are.<br>
`trigger="none"` Meaning no action when click the component.<br>
`trigger="click"` Meaning show the popUp when you click the component but will not close when you click the component<br>
`trigger="hover"` Meaning show the popUp when you hover the component but will not close when you click the component<br>

<br>

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row gap-5 p-10">
        <hhl-pop>
          <template v-slot:reference>
            <hhl-btn>default</hhl-btn>
          </template>
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-pop trigger="click">
          <template v-slot:reference>
            <hhl-btn>click</hhl-btn>
          </template>
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-pop trigger="hover">
          <template v-slot:reference>
              <hhl-btn>trigger="hover"</hhl-btn>
          </template>
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-pop trigger="none">
          <template v-slot:reference>
              <hhl-btn>trigger="none""</hhl-btn>
          </template>
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
      </div> 
    </template>
'>
</hhl-live-editor>

<br/>

## v-model.
You can also use the v-model to control the open/close of the popup.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row gap-5 p-10">
        <hhl-pop trigger="none" v-model="open">
         <template v-slot:reference>
              <hhl-btn>v-model</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-checkbox v-model="open" label="open">
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
      <div class="flx-row gap-5 p-10">
        <hhl-pop trigger="hover" delay-on-mouse-over="1000">
          <template v-slot:reference>
              <hhl-btn>trigger="hover" + delay-on-mouse-over="1000"</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
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
      <div class="flx-row gap-5 p-10">
        <hhl-pop trigger="hover" delay-on-mouse-out="1000">
          <template v-slot:reference>
              <hhl-btn>trigger="hover" + delay-on-mouse-out="1000"</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
      </div>        
    </template>
'>
</hhl-live-editor>


<br/>

## Prevent closing.
By adding the attribute `no-outside-click` you will prevent the popup to close when you click outside the popup.<br>
By adding the attribute `no-reference-click` you will prevent the popup to close when you click on the reference element.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop no-outside-click>
          <template v-slot:reference>
              <hhl-btn>trigger="no-outside-click</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
      <hhl-pop no-reference-click>
          <template v-slot:reference>
              <hhl-btn>trigger="no-reference-click</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
      </hhl-pop>
      <hhl-pop ref="popup" no-reference-click no-outside-click>
          <template v-slot:reference>
              <hhl-btn>trigger="no-outside-click + no-reference-click</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">
            <hhl-btn small @click="popup.Close()">Close</hhl-btn>
          </div>
      </hhl-pop>
      </div>        
    </template>
    <script>
    const popup = ref();
    return { popup }
    </script>
'>
</hhl-live-editor>

<br/>

## PopUp placement.
By adding the property `top` the default dropdown will change to dropup.<br>
The popUp will by default be placed at the start of the component.<br>
By adding the property `right` it will be placed to the end of the component.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop :top="top" :right="right">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-checkbox label="Top" v-model="top"></hhl-checkbox>
        <hhl-checkbox label="Right" v-model="right"></hhl-checkbox>
    </div>        
    </template>
    <script>
    const top = ref(false);
    const right = ref(false);
    return { top, right }
    </script>
'>
</hhl-live-editor>

<br/>

## Adjust component (reference) to the full width og the parent.
By adding the property `reference-full-width` the width of the referance component strech to the width of the parent ("flx-1").<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop full-width>
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br/>

## Adjust popUp to component (reference).
By adding the property `full-width` the width of the popup will as minium be the same as the component (referance).<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop full-width>
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br/>

## Adjust to the inner of the component (referance).
By adding the property `inner` it will adjust the position to the inner boundaries.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop inner :top="top" :right="right">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
        <hhl-checkbox label="Top" v-model="top"></hhl-checkbox>
        <hhl-checkbox label="Right" v-model="right"></hhl-checkbox>
    </div>        
    </template>
    <script>
    const top = ref(false);
    const right = ref(false);
    return { top, right }
    </script>
'>
</hhl-live-editor>

<br/>

## Max width.
By adding the property `max-width` it will set the popup maxWidth to the value.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop max-width="30px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br/>

## Min width.
By adding the property `min-width` it will set the popup minWidth to the value.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop min-width="300px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br/>

## Max height.
By adding the property `max-height` it will set the popup maxWidth to the value.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop max-height="30px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br/>

## Min height.
By adding the property `min-height` it will set the popup minWidth to the value.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop min-height="300px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br>

## Viewport padding.
By adding the property `viewport-padding` it will set the margin for the popup in relation to the viewport, here it is the scrolling container.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop viewport-padding="30px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br>

## Offset when down.
By adding the property `offset-when-down` it will adjust the top position with the value. It can be positive or negative.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop offset-when-down="30px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br>

## Offset when up.
By adding the property `offset-when-up` it will adjust the top position with the value. It can be positive or negative.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop offset-when-up="30px" top>
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>

<br>

## Offset left.
By adding the property `offset-left` it will adjust the left position with the value. It can be positive or negative.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row flx-wrap gap-5 p-10">
        <hhl-pop offset-left="30px">
          <template v-slot:reference>
              <hhl-btn>Open popup</hhl-btn>
          </template> 
          <div class="col-bg-warn p-20 w-100pr">Hello</div>
        </hhl-pop>
    </div>        
    </template>
'>
</hhl-live-editor>


