# Textarea

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea v-model="txt" label="Text input"></H_textarea>
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
      <div class="flex flex-wrap gap-2 p-3 items-center">
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
      <div class="flex flex-wrap gap-2 p-3 items-center">
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
      <div class="flex flex-wrap gap-2 p-3 items-center">
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

## Placeholder

Placeholder by adding `placeholder="Type something."`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea placeholder="Type something." v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("");
      return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Input Click

Input Click by adding @input_click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
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

## Start Icon

Start Icon by adding `start-icon="iconName"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea start-icon="mail"  v-model="txt" label="Text input"></H_textarea>
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

## Start Icon Click

Start Icon by adding `@start_icon_click=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea @start_icon_click="click(txt)" start-icon="mail"  v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("Start icon click");
      function click(e) {
            alert(e);
      }
      return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## End Icon

Start Icon by adding `end-icon="iconName"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea end-icon="mail"  v-model="txt" label="Text input"></H_textarea>
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

## End Icon Click

Start Icon by adding `@end_icon_click=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center">
            <H_textarea @end_icon_click="click(txt)" end-icon="mail"  v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("End icon click");
      function click(e) {
            alert(e);
      }
      return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## Hint text

Hint text by adding `hint=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center mb-3">
            <H_textarea hint="Please type something."  v-model="txt" label="Text input"></H_textarea>
      </div>
      </template>
      <script>
      const txt = ref("Hint");
      function click(e) {
            alert(e);
      }
      return {txt, click}
      </script>
'>
</hhl-live-editor>

<br>

## Character counter

Character counter by adding `counter=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex flex-wrap gap-2 p-3 items-center mb-3">
            <H_textarea counter="10"  v-model="txt" label="Text input"></H_textarea>
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
      <div class="flex flex-col gap-10 p-3 mb-3">
            <H_textarea v-model="txt" label="required" :validator="[v.required]"></H_textarea>
            <H_textarea v-model="txt" label="email" :validator="[v.email]"></H_textarea>
            <H_textarea v-model="txt" label="strMin(5)" :validator="[v.strMin(5)]"></H_textarea>
            <H_textarea v-model="txt" label="strMax(8)" :validator="[v.strMax(8)]"></H_textarea>
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
