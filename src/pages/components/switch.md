# Switch

The H_switch van be a checkbox, radio or a switch.<br>

## Variant checkbox (Default)

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch label="Switch 1"  v-model="check" variant="checkbox"></H_switch>
        <H_switch label="Switch 2" v-model="check" variant="checkbox"></H_switch>    
        <H_switch label="Switch 3" v-model="check" variant="checkbox"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Variant radio

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch switch label="Switch 1"  v-model="check" variant="radio" value="n1"></H_switch>
        <H_switch switch label="Switch 2" v-model="check" variant="radio" value="n2"></H_switch>    
        <H_switch switch label="Switch 3" v-model="check" variant="radio" value="n3"></H_switch>
    </div>
    </template>
    <script>
        const check = ref("");
        return {check}
    </script>
'>
</hhl-live-editor>

<br>

## Variant switch

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch label="Radio 1"  v-model="radioVal" variant="switch" value="n1"></H_switch>
        <H_switch label="Radio 2" v-model="radioVal" variant="switch" value="n2"></H_switch>    
        <H_switch label="Radio 3" v-model="radioVal" variant="switch" value="n3"></H_switch>
    </div>
    </template>
    <script>
               const radioVal = ref([]);
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

## Label gap

You can change the label position to left by adding the prop `label-gap`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch label="label standard" v-model="check" label-gap="33px"></H_switch>
        <H_switch label-left label="Label left" v-model="check" label-gap="1px"></H_switch>  
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

You can change the size by the size property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch size="xs" label="XS" v-model="radio" value="n1" variant="radio"></H_switch>
        <H_switch size="sm"  label="SM" v-model="radio" value="n2" variant="radio"></H_switch>    
        <H_switch size="md" label="MD default" v-model="radio" value="n3" variant="radio"></H_switch>
        <H_switch size="lg"  label="LG" v-model="radio" value="n4" variant="radio"></H_switch>  
        <H_switch size="xl"  label="XL" v-model="radio" value="n6" variant="radio"></H_switch>  
    </div>
    <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch size="xs" label="XS" v-model="check"></H_switch>
        <H_switch size="sm"  label="SM" v-model="check"></H_switch>    
        <H_switch size="md" label="MD default" v-model="check"></H_switch>
        <H_switch size="lg"  label="LG" v-model="check"></H_switch>  
        <H_switch size="xl"  label="XL" v-model="check"></H_switch>  
    </div>
     <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch size="xs" label="XS" v-model="sw" variant="switch"></H_switch>
        <H_switch size="sm"  label="SM" v-model="sw" variant="switch"></H_switch>    
        <H_switch size="md" label="MD default" v-model="sw" variant="switch"></H_switch>
        <H_switch size="lg"  label="LG" v-model="sw" variant="switch"></H_switch>  
        <H_switch size="xl"  label="XL" v-model="sw" variant="switch"></H_switch>   
    </div>
    </template>
    <script>
        const check = ref(true);
        const radio = ref("n5");
        const sw = ref(true);
        return {check,radio,sw}
    </script>
'>
</hhl-live-editor>

<br>

## Color

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6"`. <br>
The default is `pri`.<br>
If you need a special color then just use `style="--color-pri: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flexWrap">
        <H_switch label="pri" v-model="check" variant="radio" color="pri" size="xs"></H_switch>
        <H_switch label="sec" v-model="check" variant="radio" color="sec" size="xs"></H_switch>    
        <H_switch label="ok" v-model="check" variant="radio" color="ok" size="xs"></H_switch>
        <H_switch label="err" v-model="check" variant="radio" color="err" size="xs"></H_switch>
        <H_switch label="warn" v-model="check" variant="radio" color="warn" size="xs"></H_switch>
        <H_switch label="info" v-model="check" variant="radio" color="info" size="xs"></H_switch>
        <H_switch label="txt0" v-model="check" variant="radio" color="txt0" size="xs"></H_switch>
        <H_switch label="txt1" v-model="check" variant="radio" color="txt1" size="xs"></H_switch>
        <H_switch label="txt2" v-model="check" variant="radio" color="txt2" size="xs"></H_switch>
        <H_switch label="txt3" v-model="check" variant="radio" color="txt3" size="xs"></H_switch>
        <H_switch label="txt4" v-model="check" variant="radio" color="txt4" size="xs"></H_switch>
        <H_switch label="txt5" v-model="check" variant="radio" color="txt5" size="xs"></H_switch>
        <H_switch label="txt6" v-model="check" variant="radio" color="txt6" size="xs"></H_switch>
        <H_switch style="--color-pri: purple" variant="radio" label="purple" v-model="check" size="xs"></H_switch>
    </div>
    <div class="flex items-center gap-4 flexWrap mt-9">
        <H_switch label="pri" v-model="radio" color="pri" size="xs"></H_switch>
        <H_switch label="sec" v-model="radio" color="sec" size="xs"></H_switch>    
        <H_switch label="ok" v-model="radio" color="ok" size="xs"></H_switch>
        <H_switch label="err" v-model="radio" color="err" size="xs"></H_switch>
        <H_switch label="warn" v-model="radio" color="warn" size="xs"></H_switch>
        <H_switch label="info" v-model="radio" color="info" size="xs"></H_switch>
        <H_switch label="txt0" v-model="radio" color="txt0" size="xs"></H_switch>
        <H_switch label="txt1" v-model="radio" color="txt1" size="xs"></H_switch>
        <H_switch label="txt2" v-model="radio" color="txt2" size="xs"></H_switch>
        <H_switch label="txt3" v-model="radio" color="txt3" size="xs"></H_switch>
        <H_switch label="txt4" v-model="radio" color="txt4" size="xs"></H_switch>
        <H_switch label="txt5" v-model="radio" color="txt5" size="xs"></H_switch>
        <H_switch label="txt6" v-model="radio" color="txt6" size="xs"></H_switch>
        <H_switch style="--color-pri: purple" label="purple" v-model="radio"  size="xs"></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap  mt-9">
        <H_switch label="pri" v-model="sw" color="pri" variant="switch" size="xs"></H_switch>
        <H_switch label="sec" v-model="sw" color="sec" variant="switch" size="xs"></H_switch>    
        <H_switch label="ok" v-model="sw" color="ok" variant="switch" size="xs"></H_switch>
        <H_switch label="err" v-model="sw" color="err" variant="switch" size="xs"></H_switch>
        <H_switch label="warn" v-model="sw" color="warn" variant="switch" size="xs"></H_switch>
        <H_switch label="info" v-model="sw" color="info" variant="switch" size="xs"></H_switch>
        <H_switch label="txt0" v-model="sw" color="txt0" variant="switch" size="xs"></H_switch>
        <H_switch label="txt1" v-model="sw" color="txt1" variant="switch" size="xs"></H_switch>
        <H_switch label="txt2" v-model="sw" color="txt2" variant="switch" size="xs"></H_switch>
        <H_switch label="txt3" v-model="sw" color="txt3" variant="switch" size="xs"></H_switch>
        <H_switch label="txt4" v-model="sw" color="txt4" variant="switch" size="xs"></H_switch>
        <H_switch label="txt5" v-model="sw" color="txt5" variant="switch" size="xs"></H_switch>
        <H_switch label="txt6" v-model="sw" color="txt6" variant="switch" size="xs"></H_switch>
        <H_switch style="--color-pri: purple" label="purple" v-model="sw" variant="switch" size="xs"></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        const radio = ref("c");
        const sw = ref(true);
        return {check,radio,sw}
    </script>
'>
</hhl-live-editor>

<br>

## Disabled

You disable by adding the props `disabled`

<hhl-live-editor title="" htmlCode='
<template>
    <div class="flex items-center gap-4 flexWrap">
        <H_switch label="pri" v-model="check" variant="radio" color="pri" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="check" variant="radio" color="sec" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="check" variant="radio" color="ok" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="check" variant="radio" color="err" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="check" variant="radio" color="warn" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="check" variant="radio" color="info" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="check" variant="radio" color="txt0" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="check" variant="radio" color="txt1" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="check" variant="radio" color="txt2" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="check" variant="radio" color="txt3" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="check" variant="radio" color="txt4" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="check" variant="radio" color="txt5" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="check" variant="radio" color="txt6" size="xs" disabled></H_switch>
        <H_switch style="--color-currentBg: purple" variant="radio" label="purple" v-model="check" size="xs" disabled></H_switch>
    </div>
    <div class="flex items-center gap-4 flexWrap mt-9">
        <H_switch label="pri" v-model="radio" color="pri" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="radio" color="sec" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="radio" color="ok" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="radio" color="err" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="radio" color="warn" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="radio" color="info" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="radio" color="txt0" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="radio" color="txt1" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="radio" color="txt2" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="radio" color="txt3" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="radio" color="txt4" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="radio" color="txt5" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="radio" color="txt6" size="xs" disabled></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="radio" variant="radio" size="xs" disabled></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap  mt-9">
        <H_switch label="pri" v-model="sw" color="pri" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="sw" color="sec" variant="switch" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="sw" color="ok" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="sw" color="err" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="sw" color="warn" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="sw" color="info" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="sw" color="txt0" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="sw" color="txt1" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="sw" color="txt2" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="sw" color="txt3" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="sw" color="txt4" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="sw" color="txt5" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="sw" color="txt6" variant="switch" size="xs" disabled></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="sw" variant="switch" size="xs" disabled></H_switch>
    </div>
    </template>
    <script>
        const check = ref(true);
        const radio = ref("");
        const sw = ref(true);
        return {check,radio,sw}
    </script>
'>
</hhl-live-editor>

<br>
