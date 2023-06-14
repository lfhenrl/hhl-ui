# Modal window

## Introduction

The `H_modal` will give you a popup box placedin the center of the screen.<br>
The standard popup will not close when you click outside the popup but will shake the popup to indicate you need to do something in the popup.

<br>

## Trigger

You control open and close by the v-model as boolean.

<hhl-live-editor title="" htmlCode='
    <template>
      <H_row>
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal">
          <H_col class="col-bg-1 shadow-2">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" @click="modal = false">
            CLOSE
            </H_btn>
          </H_col>
        </H_modal>
      </H_row>
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
      <H_row>
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" no-shake>
         <H_col  class="col-bg-1 shadow-2">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </H_col>
        </H_modal>
      </H_row>
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
      <H_row>
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" show-overlay>
          <H_col class="col-bg-1 shadow-2">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </H_col>
        </H_modal>
      </H_row>
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
      <H_row>
        <H_btn @click="modal = true">Modal</H_btn>
        <H_modal v-model="modal" no-persistent>
          <H_col class="col-bg-1 shadow-2">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </H_col>
        </H_modal>
      </H_row>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>

<br>

## Offset top

You can control the top placement by the property `offset="px em rem %"`<br>
The default is 50%.

<hhl-live-editor title="" htmlCode='
    <template>
      <H_row>
        <H_btn @click="open(`start`)">offSet ({{offset}})</H_btn>
        <H_modal v-model="modal" :offset="offset">
          <H_col class="col-bg-1 shadow-2">
            <div>----- This is the content. -----</div>
            <H_btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </H_btn>
          </H_col>
        </H_modal>
        <H_inputText label="OffSet." v-model="offset"/>
      </H_row>
    </template>
    <script>
      const modal = ref(false);
      const offset = ref("10%");
      function open(val) {
        modal.value = true;
      }
      return { modal, offset, open }
    </script>
'>
</hhl-live-editor>

<br>
<br>
<br>
<br>
