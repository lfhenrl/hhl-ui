# Form

## Data binding

The H_form have 1 v-model, 1 property and 2 events.<br>
The v-model: `v-model:dirty=""` will notify if something have changed.<br>
The property: `:data=""` that should have the data object for the form.<br>
The event: `@valid=""` is true when all child component that have validations enabled are valid.<br>
The event: `@dirty-valid=""` is true when all is valid and the data have changes.<br>

<hhl-live-editor title="" htmlCode=' 
    <template>
    <H_form :data="data" v-model:dirty="isDirty" @valid="isValid = $event"  @dirty-valid="isDirtyAndValid = $event" >
      <H_input label="Navn" v-model="data.navn" :validator="[validator.required]"></H_input>
      <H_input label="City" v-model="data.city" :validator="[validator.required]" class="mt-4"></H_input>
      <H_checkbox label="Valid" v-model="isValid"></H_checkbox>
      <H_checkbox label="Dirty" v-model="isDirty" ></H_checkbox>
      <H_checkbox label="DirtyAndValid" v-model="isDirtyAndValid" ></H_checkbox>
      <H_range v-model="data.duration" :min="0" :max="100" ></H_range>
      <H_btn class="self-start" type="submit">SAVE</H_btn>
    </H_form>
    </template>
    <script>
        // import { validator } from "lib/utils/validator";
        const {validator} = fakeImport;
        const isValid = ref(true);
        const isDirty = ref(false);
        const isDirtyAndValid = ref(false);
        const data = reactive({
        navn: "",
        city: "",
        duration: 10
        });
        return {isValid, isDirty, isDirtyAndValid, data, validator}
    </script>
'>
</hhl-live-editor>

<br>

<br>

<br>


