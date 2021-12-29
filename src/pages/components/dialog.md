
# Dialog

The `hhl-dialog` is a styled version of hhl-modal all the properties from modal can be used.

## Using
The dialog have a "Header", "Body" and a "Footer"

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="p-25">
        <hhl-btn @click="modal = true">Open</hhl-btn>
        <hhl-dialog v-model="modal">
          <template #header>
            Here is the TITLE
          </template>
          Here is the BODY
          <template #footer>
            Here is the FOOTER
            <hhl-btn @click="modal=false" class="ml-3 bg-ok">Ok</hhl-btn>
            <hhl-btn @click="modal=false" class="ml-3">Cancel</hhl-btn>
          </template>
        </hhl-dialog>
      </div>
    </template>
    <script>
      const modal = ref(true)
      return { modal }
    </script>
'>
</hhl-live-editor>