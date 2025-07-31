# Dialog

The `H_modal` will give you a modal dialog that can be open and closed in different ways..<br>
The dialog have a "Header", "Body" and a "Footer"
<br>

## v-model `any`

It can be controlled by v-model and the closing depent on the property `closedby="any | closerequest | none"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
    <H_dialog closedby="any" v-model="dialogOpen">
    <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        return { dialogOpen }
        </script>
'>
</hhl-live-editor>
<br>

<br>

## v-model `closerequest`

It can be controlled by v-model and the closing depent on the property `closedby="any | closerequest | none"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
    <H_dialog closedby="closerequest" v-model="dialogOpen">
     <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        return { dialogOpen }
        </script>
'>
</hhl-live-editor>
<br>

<br>

## v-model `none`

It can be controlled by v-model and the closing depent on the property `closedby="any | closerequest | none"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
    <H_dialog closedby="none" v-model="dialogOpen">
    <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        return { dialogOpen }
        </script>
'>
</hhl-live-editor>
<br>

<br>

## by function `none`

It can be controlled by v-model and the closing depent on the property `closedby="any | closerequest | none"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen">PopUp</H_btn>
    <H_dialog closedby="none" ref="dialog">
    <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogClose">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialog = ref("")
        function dialogOpen() {
        dialog.value.open();
        }
        function dialogClose() {
        dialog.value.close();
        }
        return { dialog,dialogOpen,dialogClose }
        </script>
'>
</hhl-live-editor>
<br>

## `no-shake`

By adding the property `no-shake` it will remove the shaking when you try to close.

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
    <H_dialog closedby="none" no-shake v-model="dialogOpen">
    <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        return { dialogOpen }
        </script>
'>
</hhl-live-editor>
<br>

## Movable.

By adding the property `movable` it will be possible to move the Popup.<br/>
By adding the property `moveable-drag` to one element in the Popup it will be here you can move the Popup.<br/>

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
    <H_btn @click="dialogOpen = !dialogOpen">Drag</H_btn>
    <H_dialog closedby="none" movable v-model="dialogOpen">
     <div moveable-drag class="col-pri py-1 text-center">Drag me!</div>
    <div class="p-33">hej</div>
    <div class="H_dialogService-footer flex gap-4 justify-end px-3 pb-3">
    <H_btn @click="dialogOpen = !dialogOpen">Close</H_btn>
    </div>
    </H_dialog>
    </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        return { dialogOpen }
        </script>
'>
</hhl-live-editor>
<br>
<br>

## Placement

It can be controlled by `inset-left` and/or `inset-top`

<hhl-live-editor title="" htmlCode='
    <template>
        <div class="flex items-center gap-4">
            <H_select variant="radio"
                  :list 
                  v-model="left" label="inset-left">
            </H_select>
            <H_select variant="radio"
                  :list 
                  v-model="top" label="inset-top">
            </H_select>
            <H_btn @click="dialogOpen = !dialogOpen">PopUp</H_btn>
            <H_dialog closedby="any" :inset-left="left" :inset-top="top" inset-top="0 0" v-model="dialogOpen"><div class="p-33">Hej</div></H_dialog>
        </div>
    </template>
    <script>
        const dialogOpen = ref(false)
        const list = ref([`0 0`,`10% auto`, `10px auto`, `auto 10%`, `auto 10px`])
        const left = ref("0 0")
        const top = ref("0 0")
        return { dialogOpen,list, left,top }
    </script>
'>
</hhl-live-editor>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
