# Input Text

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_input v-model="txt" label="Text input"></H_input>
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


## Clearable

Add input clear functionality by adding `clearable`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_input clearable v-model="txt" label="Text input"></H_input>
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
            <H_input disabled v-model="txt" label="Text input"></H_input>
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
            <H_input readonly v-model="txt" label="Text input"></H_input>
      </div>
      </template>
      <script>
            const txt = ref("Readonly");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Input Click

Input Click by adding @input-click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_input @click="click(txt)" v-model="txt" label="Text input"></H_input>
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
            <H_input  v-model="txt" label="Text input"> 
                        <H_icon icon="mail" btn="standard" @click="click(txt)"></H_icon>
                         <H_icon icon="mail" btn="standard" @click="click(`end icon`)"></H_icon>
            </H_input>
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
            <H_input v-model="txt" label="Text input">
                        <H_icon set-end icon="mail" btn="standard" @click="click(txt)"></H_icon>
            </H_input>
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
            <H_input hint-start="hint-start." hint-end="hint-end."  v-model="txt" label="Text input"></H_input>
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
            <H_input counter="10"  v-model="txt" label="Text input"></H_input>
      </div>
      </template>
      <script>
            const txt = ref("Counter.");
            function click(e) {
                  alert(e);
            }
            return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## Validation

Validation by adding `validator=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexCol gap-12">
      <H_input v-model="txt" label="required" :validator="[v.required]"></H_input>
      <H_input v-model="txt" label="email" :validator="[v.email]"></H_input>
      <H_input v-model="txt" label="strMin(5)" :validator="[v.strMin(5)]"></H_input>
      <H_input v-model="txt" label="strMax(8)" :validator="[v.strMax(8)]"></H_input>
      </div>
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
