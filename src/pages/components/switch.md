# Switch

The H_switch van be a checkbox or a radio, the apperance can be standard or a switch.<br>

## Type = checkbox

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch label="Switch 1"  v-model="check"></H_switch>
        <H_switch label="Switch 2" v-model="check"></H_switch>    
        <H_switch label="Switch 3" v-model="check"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Type = checkbox and apperance as a switch by adding the property `switch`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch switch label="Switch 1"  v-model="check"></H_switch>
        <H_switch switch label="Switch 2" v-model="check"></H_switch>    
        <H_switch switch label="Switch 3" v-model="check"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>


## Type = radio

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch type="radio" label="Radio 1"  v-model="radioVal" value="val1"></H_switch>
        <H_switch type="radio" label="Radio 2" v-model="radioVal" value="val2"></H_switch>    
        <H_switch type="radio" label="Radio 3" v-model="radioVal" value="val3"></H_switch>
    </div>
    </template>
    <script>
               const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Type = radio and apperance as a switch by adding the property `switch`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch switch type="radio" label="Radio 1"  v-model="radioVal" value="val1"></H_switch>
        <H_switch switch type="radio" label="Radio 2" v-model="radioVal" value="val2"></H_switch>    
        <H_switch switch type="radio" label="Radio 3" v-model="radioVal" value="val3"></H_switch>
    </div>
    </template>
    <script>
               const radioVal = ref("val1");
        return {radioVal}
    </script>
'>
</hhl-live-editor>

<br>

## Label

You can change the label position to left by adding the prop `label-left`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch label="label standard" v-model="check"></H_switch>
        <H_switch label-left label="Label left" v-model="check"></H_switch>  
       <div class="flex-1" /> 
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Size

You can change the size by the font-size `text-xs sm,base,lg,2xl,3xl....`<br>
Default is `text-base`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch class="text-xs" label="XS" v-model="check"></H_switch>
        <H_switch class="text-sm"  label="SM" v-model="check"></H_switch>    
        <H_switch label="Base default" v-model="check"></H_switch>
        <H_switch class="text-lg"  label="LG)" v-model="check"></H_switch>  
         <H_switch class="text-xl"  label="XL" v-model="check"></H_switch>  
        <H_switch class="text-2xl"  label="2XL" v-model="check"></H_switch> 
        <H_switch class="text-3xl"  label="3XL" v-model="check"></H_switch> 
    </div>
        <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch switch class="text-xs" label="XS" v-model="check"></H_switch>
        <H_switch switch class="text-sm"  label="SM" v-model="check"></H_switch>    
        <H_switch switch label="Base default" v-model="check"></H_switch>
        <H_switch switch class="text-lg"  label="LG)" v-model="check"></H_switch>  
         <H_switch switch class="text-xl"  label="XL" v-model="check"></H_switch>  
        <H_switch switch class="text-2xl"  label="2XL" v-model="check"></H_switch> 
        <H_switch switch class="text-3xl"  label="3XL" v-model="check"></H_switch> 
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the class `"col-pri,sec,ok,err,warn,info"`<br>
The default is `pri`.<br>
If you need a special color then just use `style="--color-currentBg: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flexWrap">
        <H_switch label="col-pri" v-model="check"></H_switch>
        <H_switch class="col-sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch class="col-ok" label="col-ok" v-model="check"></H_switch>
        <H_switch class="col-err" label="col-err" v-model="check"></H_switch>
        <H_switch class="col-warn" label="col-warn" v-model="check"></H_switch>
        <H_switch class="col-info" label="col-info" v-model="check"></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap" style="margin-top:20px">
        <H_switch switch label="col-pri" v-model="check"></H_switch>
        <H_switch switch class="col-sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch switch class="col-ok" label="col-ok" v-model="check"></H_switch>
        <H_switch switch class="col-err" label="col-err" v-model="check"></H_switch>
        <H_switch switch class="col-warn" label="col-warn" v-model="check"></H_switch>
        <H_switch switch class="col-info" label="col-info" v-model="check"></H_switch>
        <H_switch switch style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
    <template>
            <div class="flex items-center gap-4 flexWrap">
        <H_switch disabled label="col-pri" v-model="check"></H_switch>
        <H_switch disabled class="col-sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch disabled class="col-ok" label="col-ok" v-model="check"></H_switch>
        <H_switch disabled class="col-err" label="col-err" v-model="check"></H_switch>
        <H_switch disabled class="col-warn" label="col-warn" v-model="check"></H_switch>
        <H_switch disabled class="col-info" label="col-info" v-model="check"></H_switch>
        <H_switch disabled style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap" style="margin-top:20px">
        <H_switch disabled switch label="col-pri" v-model="check"></H_switch>
        <H_switch disabled switch class="col-sec" label="col-sec" v-model="check"></H_switch>    
        <H_switch disabled switch class="col-ok" label="col-ok" v-model="check"></H_switch>
        <H_switch disabled switch class="col-err" label="col-err" v-model="check"></H_switch>
        <H_switch disabled switch class="col-warn" label="col-warn" v-model="check"></H_switch>
        <H_switch disabled switch class="col-info" label="col-info" v-model="check"></H_switch>
        <H_switch disabled switch style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>
