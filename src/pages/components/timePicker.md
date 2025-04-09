# Timeime picker

## Data binding

<hhl-live-editor title="" style="overflow:none" htmlCode='
    <template>
    <div class="flex items-center flex-wrap"> 
          <H_time-picker label="Time" v-model="time"></H_time-picker>
          <H_input readonly :model-value="time" label="Value"></H_input>
    </div>
    </template>
    <script>
      const time = ref("00:00:00");
      return { time }
    </script>
'>
</hhl-live-editor>

<br>

## Data binding with undefined date

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
            <H_time-picker label="Time" v-model="time"></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
      const time = ref();
      return { time }
      </script>
'>
</hhl-live-editor>


<br>

## Show seconds

By adding the property `show-seconds`.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
      <H_time-picker label="Time" v-model="time" show-seconds></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
      const time = ref("00:00:00");
      return { time }
      </script>
'>
</hhl-live-editor>

<br>

## Hide Icon

By adding the property `hide-icon` you will remove the icon.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
            <H_time-picker label="Time" v-model="time" show-seconds hide-icon></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
            const time = ref("00:00:00");
            return { time }
      </script>
'>
</hhl-live-editor>

<br>

## Disabled

By adding the attribute `disabled` you will disable the dateTime-picker

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
            <H_time-picker label="Time" v-model="time" disabled show-seconds></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
            const time = ref("00:00:00");
            return { time }
      </script>
'>
</hhl-live-editor>

<br>

## Readonly

By adding the attribute `readonly` it will be in readonly mode.

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
            <H_time-picker label="Time" v-model="time" readonly show-seconds></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
            const time = ref("00:00:00");
            return { time }
      </script>
'>
</hhl-live-editor>

<br>

## Hint Text

You can show a hint text at the bottom of the datepicker by adding `hint-start=""` and `hint-end=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
            <H_time-picker label="Time" v-model="time" show-seconds hint-start="hint-start." hint-end="hint-end."></H_time-picker>
            <H_input readonly :model-value="time" label="Value"></H_input>
      </div>
      </template>
      <script>
            const time = ref("00:00:00");
            return { time }
      </script>
'>
</hhl-live-editor>

<br>

## Validation

Validation by adding `validator=""`

<hhl-live-editor title="" htmlCode='
      <template>
      <div class="flex items-center flex-wrap"> 
       <H_time-picker label="Time" v-model="time" :validator="[v.required]" show-seconds></H_time-picker>
            <H_input :model-value="time" label="Value" ></H_input>
      </div>
      </template>
      <script>
            // import { validator } from "components/utils/validator";
            const { validator } = fakeImport;      
            const v = validator;
            const time = ref();
            return { time,v }
      </script>
'>
</hhl-live-editor>

<br>
