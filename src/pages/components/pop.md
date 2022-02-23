# Pop base popup

The `H_pop` will give you a popUp as a dropdown or dropup box.<br>
If there not is place enough it will automatically change the position.<br>

## Trigger.

The default trigger is toggle meaning that it toggle the popup when you click the component.<br>
The other options are.<br>
`trigger="none "` Meaning no action when click the component.<br>
`trigger="toggle"` Meaning show or hide the popUp when you click the component.<br>
`trigger="click "` Meaning show the popUp when you click the component but will not close when you click the component<br>
`trigger="hover "` Meaning show the popUp when you hover the component but will not close when you click the component<br>

<br>

<hhl-live-editor title="" htmlCode='
  <template>
    <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop>
          <template v-slot:referance>
            <H_btn>default</H_btn>
          </template>
          <div class="col-bg-warn p-5 w-100pr">Hello</div>
        </H_pop>
        <H_pop trigger="click">
          <template v-slot:referance>
            <H_btn>click</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
        <H_pop trigger="hover">
          <template v-slot:referance>
              <H_btn>trigger="hover"</H_btn>
          </template>
          <div class="col-bg-warn p-5" style="width: 300px">Hello</div>
        </H_pop>
        <H_pop trigger="none">
          <template v-slot:referance>
              <H_btn>trigger="none""</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
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
      <div style="height: 500px" class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop trigger="none" v-model="open">
         <template v-slot:referance>
              <H_btn>v-model</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
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
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop trigger="hover" delay-on-mouse-over="1000">
          <template v-slot:referance>
              <H_btn>trigger="hover" + delay-on-mouse-over="1000"</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
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
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop trigger="hover" delay-on-mouse-out="1000">
          <template v-slot:referance>
              <H_btn>trigger="hover" + delay-on-mouse-out="1000"</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
      </div>
    </template>
'>
</hhl-live-editor>

<br/>

## Prevent closing.

By adding the attribute `no-outside-click` you will prevent the popup to close when you click outside the popup.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop no-outside-click>
          <template v-slot:referance>
              <H_btn>no-outside-click"</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
      <H_pop no-outside-click trigger="click" v-model="popup">
          <template v-slot:referance>
              <H_btn>no-outside-click + trigger="click"</H_btn>
          </template>
          <div class="col-bg-warn p-5"><H_btn @click="popup=false">Close"</H_btn></div>
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

## PopUp placement.

By adding the property `placement` you can change the position of the popup.<br>
The values are `top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end` .<br>
The default is `bottom-start`.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center ml-10">
        <H_pop :placement="placement">
          <template v-slot:referance>
              <H_btn>Open</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
      <H_select :select-data="selectData" v-model="placement" label="Placement">
      </H_select>
    </div>
    </template>
    <script>
    const placement = ref("bottom-start");
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
      , "left-end"]
    return { placement, selectData }
    </script>
'>
</hhl-live-editor>

<br/>

## Adjust component (referance) to the full width og the parent.

By adding the property full-width the width of the popup will as minium be the same as the component (referance).

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop full-width>
          <template v-slot:referance>
              <H_btn>Open popup</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
    </div>
    </template>
'>
</hhl-live-editor>

<br/>

## Adjust to the inner of the component (referance).

By adding the property `inner` it will adjust the position to the inner boundaries.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop inner :placement="top===true ? `top-start` : `bottom-start`">
          <template v-slot:referance>
              <H_btn>Open popup</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
        <H_checkbox label="Top" v-model="top"></hhl-checkbox>
    </div>
    </template>
    <script>
      const top = ref(false);
      return { top }
    </script>
'>
</hhl-live-editor>

<br/>

## Offset Top.

By adding the property `offset-top` it will adjust the top position with the value. It can be positive or negative.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
      <H_pop :offset-top="20" :placement="top===true ? `top-start` : `bottom-start`">
      <template v-slot:referance >
      <H_btn>Open popup</H_btn>
      </template>
      <div class="col-bg-warn p-5">Hello</div>
      </H_pop>
      <H_checkbox label="Top" v-model="top"></hhl-checkbox>
      </div>
    </template>
    <script>
        const top = ref(false);
        return { top }
    </script>
'>
</hhl-live-editor>

<br>

## Offset left.

By adding the property `offset-left` it will adjust the left position with the value. It can be positive or negative.<br>

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_pop :offset-left="30">
          <template v-slot:referance>
              <H_btn>Open popup</H_btn>
          </template>
          <div class="col-bg-warn p-5">Hello</div>
        </H_pop>
    </div>
    </template>
'>
</hhl-live-editor>
