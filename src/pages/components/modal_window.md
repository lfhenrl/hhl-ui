# Modal window

## Introduction

The `H_modal` will give you a popup box placedin the center of the screen.<br>
The standard popup will not close when you click outside the popup but will shake the popup to indicate you need to do something in the popup.

<br>

## Trigger

You control open and close by the v-model as boolean.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal">
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </div>
        </H_modal>
      </div>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>

<br>

## No shake

By adding the property `no-shake` You can remove the shaking.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" no-shake>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </div>
        </H_modal>
      </div>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>

<br>

## Show overlay

By adding the property `show-overlay` the background will be dimmed to indicate it is a modal.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" show-overlay>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </div>
        </H_modal>
      </div>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>

<br>

## No persistent

By adding the property `no-persistent` clicking outside will close the popup.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" no-persistent>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </div>
        </H_modal>
      </div>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>

<br>

## Offset top

You can control the vertical placement by the property `placement="start/center/end"`<br>
You can control the margin if the placement is end or start by the property `offset="px em rem %"`<br>
The default is 10px.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
        <H_btn @click="open(`start`)">Top (start)</H_btn>
        <H_btn @click="open(`center`)">Center (center)</H_btn>
        <H_btn @click="open(`end`)">Botton (end)</H_btn>
        <H_modal v-model="modal" :placement="placement" :offset="offset + `px`">
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </div>
        </H_modal>
        <H_input type="number" label="OffSet PX." v-model="offset"/>
      </div>
    </template>
    <script>
      const modal = ref(false);
      const offset = ref(10);
      const placement = ref("center");
      function open(val) {
        console.log(val);
        placement.value = val;
        modal.value = true;
      }
      return { modal, offset, open, placement }
    </script>
'>
</hhl-live-editor>
