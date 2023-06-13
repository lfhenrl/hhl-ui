# Input Number

## Data binding

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
            <H_inputNumber v-model="num" label="Number input"></H_numberText>
      </H_row>
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
      <H_row>
            <H_inputNumber clearable v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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
      <H_row>
            <H_inputNumber disabled v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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
      <H_row>
            <H_inputNumber readonly v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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
      <H_row>
            <H_inputNumber @input-click="click(num)" v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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

## Start Icon

Start Icon by adding `start-icon="iconName"`

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
            <H_inputNumber start-icon="mail"  v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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

## Start Icon Click

Start Icon by adding `@start-icon-click=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
            <H_inputNumber @start-icon-click="click(num)" start-icon="mail"  v-model="num" label="Number input"></H_inputNumber>
      </H_row>
      </template>
      <script>
            const num = ref(22);
            function click(e) {
                  alert(e.toString());
            }
            return {num, click}
      </script>
'>
</hhl-live-editor>

<br>

## End Icon

Start Icon by adding `end-icon="iconName"`

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
            <H_inputNumber end-icon="mail"  v-model="num" label="Number input"></H_inputNumber>
      </H_row>
      </template>
      <script>
            const num = ref(22);
            return {num}
      </script>
'>
</hhl-live-editor>

<br>

## End Icon Click

Start Icon by adding `@end-icon-click=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <H_row>
            <H_inputNumber @end-icon-click="click(num)" end-icon="mail"  v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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
      <H_row>
            <H_inputNumber hint-start="hint-start." hint-end="hint-end."  v-model="num" label="Number input"></H_inputNumber>
      </H_row>
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
      <H_col align="strech" gap="30px">
      <H_inputNumber v-model="num" label="Min value 2" :validator="[v.numMin(2)]"></H_inputNumber>
      <H_inputNumber v-model="num2" label="Max value 23" :validator="[v.numMax(23)]"></H_inputNumber>
       </H_col>
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
