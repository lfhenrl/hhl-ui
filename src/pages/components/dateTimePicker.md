# Date and time picker

## Data binding

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flexRow items-center gap-4 flexWrap"> 
          <H_date-picker label="Date" v-model="dato"></H_date-picker>
          <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker v-model="dato"/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker v-model="dato" long-date/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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

## Show seconds

By adding the property `show-seconds`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker v-model="dato" show-seconds/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" type="date"/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" type="time"/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" hide-icon/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" no-outside-click/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" disabled/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" readonly/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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

You can show a hint text at the bottom of the datepicker by adding `hint-start=""` and `hint-end=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" hint-start="hint-start." hint-end="hint-end."/>
            </H_date-picker>
            <H_inputText readonly :model-value="formatDate(dato)" label="Value"></H_inputText>
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
      <div class="flexRow items-center gap-4 flexWrap"> 
            <H_date-picker label="Date" v-model="dato" :validator="[v.dateRequired]"/>
            </H_date-picker>
            <H_inputText :model-value="formatDate(dato)" label="Value" ></H_inputText>
      </div>
      </template>
      <script>
            // import { * as dateFormat } from "components/utils/dateFormat";
            // import { validator } from "components/utils/validator";
            const { dateFormat, validator } = fakeImport;      
            const v = validator;
            const dato = ref();
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
