# Textarea

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_textarea v-model="txt" label="Text input"></H_textarea>
            <H_inputText v-model="txt" label="Text input"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
            <H_textarea readonly v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
            const txt = ref("disabled");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Input Click

Input Click by adding @input_click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
            <H_textarea v-model="txt" label="Text input">
                <H_icon icon="mail" btn="standard" @click="click(txt)"></H_icon>
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

## End slot

You can add a Icon or other stoff with the end slot.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_textarea end-icon="mail"  v-model="txt" label="Text input">
                <H_icon set-end icon="mail" btn="standard" @click="click(txt)"></H_icon>
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexRow items-center gap-4 flexWrap">
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
      <div class="flexCol gap-12">
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
