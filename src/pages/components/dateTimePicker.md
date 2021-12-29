
# Date & time picker

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flx-row gap-5 p-20 flx-align-center"> 
          <hhl-dt-picker label="Date" v-model="dato"></hhl-dt-picker>
          <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
    </div>
    </template>
    <script>
    // import { * as dateFormat } from "components/utils/dateFormat";
    const { dateFormat } = fakeImport;
    const dato = ref(new Date());
    function formatDate(date) {
          if (date) {
                return dateFormat.D_01_dec_2021_HHMMSSms(date); 
          } else {
                return "undefined"
          }            
    }
    return { dato, formatDate }
    </script>
'>
</hhl-live-editor>

<br>

## Data binding with undefined date

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap gap-5 p-10 flx-align-start"> 
       <hhl-dt-picker v-model="dato"/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref();
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

<br>

## Long Date
By adding the property `long-date` you will get the week day name incluted

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap gap-5 p-10 flx-align-start"> 
       <hhl-dt-picker v-model="dato" long-date/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

## Show seconds
By adding the property `show-seconds`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row flx-wrap gap-5 p-10 "> 
       <hhl-dt-picker v-model="dato" show-seconds/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref();
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

<br>

## Date Picker
The property `type` control which type of picker to use.<br>
You can select "datetime" (default) "date" or "time"

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" type="date"/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

<br>

## Time Picker
The property `type` control which type of picker to use.<br>
You can select "datetime" (default) "date" or "time"

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" type="time"/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

<br>

## Hide Icon
By adding the property `hide-icon` you will remove the icon.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" hide-icon/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate }
      </script>
'>
</hhl-live-editor>

<br>

## Prevent closing.
By adding the attribute `no-outside-click` you will prevent the popup to close when you click outside the popup.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" no-outside-click/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
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

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" disabled/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
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

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" readonly/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
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
You can show a hint text at the bottom of the datepicker by the `hint="Hint text"` property

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
       <hhl-dt-picker label="Date" v-model="dato" hint="Select a start date and time"/>
      </hhl-dt-picker>
      <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      const { dateFormat } = fakeImport;
      const dato = ref(new Date());
            function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
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

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flx-row gap-5 p-20 flx-align-center"> 
            <hhl-dt-picker label="Date" v-model="dato" :validator="[v.required]"/>
            </hhl-dt-picker>
            <hhl-input readonly :model-value="formatDate(dato)" label="Value"></hhl-input>
      </div>
      </template>
      <script>
      // import { * as dateFormat } from "components/utils/dateFormat";
      // import { validator } from "components/utils/validator";
      const { dateFormat, validator } = fakeImport;      
      const v = validator;
      const dato = ref(new Date());
      function formatDate(date) {
            if (date) {
                  return dateFormat.D_01_dec_2021_HHMMSSms(date); 
            } else {
                  return "undefined"
            }            
      }
      return { dato, formatDate, v }
      </script>
'>
</hhl-live-editor>

<br>