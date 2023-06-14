# Dialog

The `H_dialog` is a styled version of hhl-modal all the properties from modal can be used.

## Using

The dialog have a "Header", "Body" and a "Footer"

<hhl-live-editor title="" htmlCode='
    <template>
      <H_row>
        <H_btn @click="modal = true">Open</H_btn>
        <H_dialog v-model="modal">
          <template #header>
            Here is the TITLE
          </template>
          Here is the BODY
          <template #footer>
            Here is the FOOTER
            <H_btn @click="modal=false" size="sm" class="ml-3 bg-ok">Ok</H_btn>
            <H_btn @click="modal=false" size="sm" class="ml-3">Cancel</H_btn>
          </template>
        H_row>
    </template>
    <script>
      const modal = ref(false)
      return { modal }
    </script>
'>
</hhl-live-editor>
