# Input Number

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber v-model="num" label="Number input"></H_numberText>
      </div>
      </template>
      <script>
            const num = ref(27);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Debounce Data binding

The default for updating the v-model is 200Ms.
You can change this by the proberty `debounce`
<br>
Here the debounce is set to `debounce="1000"`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber v-model="num" label="Number input" :debounce="1000"></H_inputNumber>
            <H_inputNumber v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(27);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Clearable

Add input clear functionality by adding `clearable`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber clearable v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Disabled

Disabled by adding `disabled`

<hhl-live-editor title="" htmlCode='
      <template>
     <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber disabled v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Readonly

Readonly by adding `readonly`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber readonly v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Input Click

Input Click by adding @input-click=""

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber @input-click="click(num)" v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(55);
            function click(e) {
                  alert(e);
            }
            return {num, click}
      </script>
'>
</hhl-live-editor>

<br>

## Start slot

You can add a Icon or other stoff with the start slot.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber v-model="num" label="Number input">
                  <template v-slot:start>
                  <H_icon icon="mail" btn="standard" @click="click(num)"></H_icon>
                  </template>
            </H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            function click(e) {
                  alert(e);
            }
            return {num, click}
      </script>
'>
</hhl-live-editor>

<br>

## End slot

You can add a Icon or other stoff with the end slot.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber v-model="num" label="Number input">
                  <template v-slot:end>
                        <H_icon icon="mail" btn="standard" @click="click(num)"></H_icon>
                  </template>
            </H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            function click(e) {
                  alert(e);
            }
            return {num, click}
      </script>
'>
</hhl-live-editor>

<br>

## Hint text

Hint text by adding `hint-start=""` and `hint-end=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
            <H_inputNumber hint-start="hint-start." hint-end="hint-end."  v-model="num" label="Number input"></H_inputNumber>
      </div>
      </template>
      <script>
            const num = ref(22);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## Validation

Validation by adding `validator=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap">
      <H_inputNumber v-model="num" label="Min value 2" :validator="[v.numMin(2)]"></H_inputNumber>
      <H_inputNumber v-model="num2" label="Max value 23" :validator="[v.numMax(23)]"></H_inputNumber>
       </div>
      </template>
      <script>
      // import { validator } from "components/utils/validator";
      const {validator} = fakeImport;
      const num = ref(1);
      const num2 = ref(24);
      const v = validator;
      return {num,num2, v}
      </script>
'>
</hhl-live-editor>

<br>
