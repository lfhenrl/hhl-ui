
# Modal window

## Introduction
The `hhl-modal` will give you a popup box placedin the center of the screen.<br>
The standard popup will not close when you click outside the popup but will shake the popup to indicate you need to do something in the popup.

<br>

## Trigger 
You control open and close by the v-model as boolean.

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="p-25">
        <hhl-btn @click="modal = true">Modal</hhl-btn>
        <hhl-modal v-model="modal">
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <hhl-btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </hhl-btn>
          </div>
        </hhl-modal>
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
      <div class="p-25">
        <hhl-btn @click="modal = true">Modal</hhl-btn>
        <hhl-modal v-model="modal" no-shake>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <hhl-btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </hhl-btn>
          </div>
        </hhl-modal>
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
      <div class="p-25">
        <hhl-btn @click="modal = true">Modal</hhl-btn>
        <hhl-modal v-model="modal" show-overlay>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <hhl-btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </hhl-btn>
          </div>
        </hhl-modal>
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
      <div class="p-25">
        <hhl-btn @click="modal = true">Modal</hhl-btn>
        <hhl-modal v-model="modal" no-persistent>
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <hhl-btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </hhl-btn>
          </div>
        </hhl-modal>
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
You can control the top offset by the property `offset-top="value"`<br>
The range is 0% to 100%. Or any other value (px em rem ??)<br>
0% = top, 50% = center, 100% = bottom.<br>
The default is 20%

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flx-row p-25 gap-12">
        <hhl-btn @click="open(`0`)">Modal 0</hhl-btn>
        <hhl-btn @click="open(`50%`)">Modal 50%</hhl-btn>
        <hhl-btn @click="open(`100%`)">Modal 100%</hhl-btn>
        <hhl-modal v-model="modal" :offset-top="offset">
          <div class="col-white shadow-5 border borderColor-comp borderRadius-4 p-25 flx-col">
            <div>----- This is the content. -----</div>
            <hhl-btn size="sm" 
              @click="modal = false" 
              class="flx-self-align-end mt-25 col-ok" >
            CLOSE
            </hhl-btn>
          </div>
        </hhl-modal>
      </div>
    </template>
    <script>
      const modal = ref(false);
      const offset = ref("20%");
      function open(val) {
        console.log(val);
        offset.value = val;
        modal.value = true;
      }
      return { modal, offset, open }
    </script>
'>
</hhl-live-editor>