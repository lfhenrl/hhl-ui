# Native Date and time picker

## Data binding

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Show only Date by setting the property `type="date"`

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime type="date" label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Show Date & Time by setting the property `type="datetime"` Default

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime type="datetime" label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Show Date & Time with secunds by setting the property `type="datetimesec"`

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime type="datetimesec" label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

By adding the attribute `disabled` you will disable the dateTime-picker

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime disabled label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Readonly

By adding the attribute `readonly` it will be in readonly mode.

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime readonly label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>



## Hint Text

You can show a hint text at the bottom of the datepicker by adding `hint-start=""` and `hint-end=""`

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex-wrap"> 
          <H_datetime  hint-start="hint-start." hint-end="hint-end." label="Date" v-model="dato"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>


## Validation

Validation by adding `validator=""`

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center gap-8 flex"> 
          <H_datetime  label="Date" v-model="dato" :validator="[v.dateRequired]"></H_datetime>
          <H_input readonly :model-value="formatDate(dato)" label="Value"></H_input>
    </div>
    </template>
    <script>
        // import { validator } from "components/utils/validator";
        const { dateFormat, validator } = fakeImport;      
        const v = validator;
      const dato = ref(null);
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSS(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate, v }
    </script>
'>
</hhl-live-editor>

<br>