# Input

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex w-full items-center gap-4">
            <H_input autofocus v-model="txt" label="Text input"></H_input>
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

## Type

The H_input can handle 4 different types by setting the property `type="string(default) | number | password | color"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
       <H_input  v-model="txt"  label="string"></H_input>
       <H_input  v-model="txt" type="password"  label="password"></H_input>
       <H_input  v-model="num" type="number"  label="number"></H_input>
       <H_input  v-model="col" type="color"  label="color"></H_input>
      </div>
      </template>
      <script>
            const txt = ref("Hello");
            const num = ref(99);
            const col = ref("#ff0000");
            return {txt,num,col}
      </script>
'>
</hhl-live-editor>

<br>

## Placeholder

Add Placeholder text by adding `placeholder="placeholder!!!"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
            <H_input  v-model="txt" placeholder="placeholder!!!" label="Text input"></H_input>
      </div>
      </template>
      <script>
            const txt = ref("");
            return {txt}
      </script>
'>
</hhl-live-editor>

<br>

## Clearable

Add input clear functionality by adding `clearable`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
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
      <div class="flex items-center gap-4">
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
      <div class="flex items-center gap-4">
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

Input Click by adding @input_click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
            <H_input @input_click="click(`Input Click`)" v-model="txt" label="Text input">
            </H_input>
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

## Icons

You can add a Icon or other stof to the input all will be added to the front.<br>
If you want it behind the input just add the attribute `set-end`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center gap-4">
            <H_input clearable  v-model="txt" label="Start Icon"> 
                <H_icon name="mail" btn  @click="click(txt)"></H_icon>
            </H_input>
            <H_input clearable  v-model="txt" label="End Icon"> 
                <H_icon set-end name="clock" btn  @click="click(`end icon`)"></H_icon>
            </H_input>
            <H_input clearable  v-model="txt" label="Start and End Icon"> 
                <H_icon name="mail" btn  @click="click(txt)"></H_icon>
                <H_icon set-end name="clock" btn  @click="click(`end icon`)"></H_icon>
            </H_input>
      </div>
      </template>
      <script>
            const txt = ref("Icon");
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
      <div class="flex items-center gap-4">
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
      <div class="flex items-center gap-4">
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
      <div class="flex flex-col gap-12">
      <H_input v-model="txt" label="required" :validator="[v.required]"></H_input>
      <H_input v-model="txt" label="email" :validator="[v.email]"></H_input>
      <H_input v-model="txt" label="strMin(5)" :validator="[v.strMin(5)]"></H_input>
      <H_input v-model="num" type="number" label="Min value 2" :validator="[v.numMin(2)]"></H_input>
       <H_input v-model="num" type="number" label="Max value 11" :validator="[v.numMax(11)]"></H_input>
      </div>
      </template>
      <script>
      // import { validator } from "components/utils/validator";
      const {validator} = fakeImport;
      const txt = ref("");
      const num = ref(5);
      const v = validator;
      function click(e) {
      alert(e);
      }
      return {txt, num, click, v}
      </script>
'>
</hhl-live-editor>

<br>
