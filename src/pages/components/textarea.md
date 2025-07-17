# Textarea

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-8 flex-wrap">
            <H_textarea autofocus v-model="txt" label="Text input"></H_textarea>
            <H_input v-model="txt" label="Text input"></H_input>
      </div>
      </template>
      <script>
            const txt = ref("Data binding");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## No Autoresize

By adding `no-grow="true"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea v-model="txt" label="Text input" :no-grow="true"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("Data binding");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## No Autoresize and setting amounts of rows

By adding `no-grow="true"` and `rows="5"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea v-model="txt" label="Text input" :no-grow="true" rows="5"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("Data binding");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Clearable

Add input clear functionality by adding `clearable`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea clearable v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("clearable");
      return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Disabled

Disabled by adding `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea disabled v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("disabled");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Readonly

Readonly by adding `readonly`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea readonly v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("readonly");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Input Click

Input Click by adding @input_click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea @input_click="click(txt)" v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("Input Click");
            function click(e) {
                  alert(e);
            }
            return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## Start slot

You can add a Icon or other stoff with the start slot.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea v-model="txt" label="Text input">
                <H_icon name="mail" size="1.6em" @click="click(txt)"></H_icon>                
            </H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("Start icon");
            function click(e) {
                  alert(e);
            }
            return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## End Icon

If you have on child you can force it to the end by adding `set-end` attribute.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea   v-model="txt" label="Text input" clearable>
                <H_icon name="mail" set-end size="1.6em" @click="click(`end icon`)"></H_icon>
            </H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("End icon");
             function click(e) {
                  alert(e);
            }
            return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## Hint text

Hint text by adding `hint-start=""` and `hint-end=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea  hint-start="hint-start." hint-end="hint-end."  v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("Hint");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Character counter

Character counter by adding `counter=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4 flex-wrap">
            <H_textarea counter="10" v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("Counter.");
      return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Validation

Validation by adding `validator=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-col gap-12">
            <H_textarea v-model="txt" label="required" :validator="[v.required]"></H_textarea>
            <H_textarea v-model="txt" label="email" :validator="[v.email]"></H_textarea>
            <H_textarea v-model="txt" label="strMin(5)" :validator="[v.strMin(5)]"></H_textarea>
            <H_textarea v-model="txt" label="strMax(8)" :validator="[v.strMax(8)]"></H_textarea>
      </divl>
      </template>
      <script>
            // import { validator } from "components/utils/validator";
            const {validator} = fakeImport;
            const txt = ref("");
            const v = validator;
            function click(e) {
                  alert(e);
            }
            return {txt, click, v}
      </script>
'>
</hhl-live-editor>

<br>
