# Dialog

The `H_dialog` is a styled version of hhl-modal all the properties from modal can be used.

## Using

The dialog have a "Header", "Body" and a "Footer"

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flexRow items-center gap-4 flexWrap">
        <H_btn @click="modal = !modal">Open</H_btn>
        <H_dialog v-model="modal" margin="10% 10% auto auto">
          <template #header>
            Here is the TITLE
          </template>
          Here is the BODY
          <template #footer>
          <div class="flexRow items-center gap-4">
            Here is the FOOTER
            <H_btn @click="modal=false" size="sm" class="col-bg-ok">Ok</H_btn>
            <H_btn @click="modal=false" size="sm" >Cancel</H_btn>
            </div>
          </template>
          <H_dialog/>
        </div>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>
