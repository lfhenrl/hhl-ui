# Switch

The H_switch van be a checkbox, radio or a switch.<br>

## Variant checkbox (Default)

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch autofocus label="Switch 1"  v-model="check" variant="checkbox"></H_switch>
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

You can change the size by the `h-font-size` property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`
If you need a special size then just use `h-font-size="33px"` or `class="text-4xl"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flex-wrap">
        <H_switch h-font-size="xs" label="XS" v-model="radio" value="n1" variant="radio"></H_switch>
        <H_switch h-font-size="sm"  label="SM" v-model="radio" value="n2" variant="radio"></H_switch>    
        <H_switch h-font-size="md" label="MD default" v-model="radio" value="n3" variant="radio"></H_switch>
        <H_switch h-font-size="lg"  label="LG" v-model="radio" value="n4" variant="radio"></H_switch>  
        <H_switch h-font-size="xl"  label="XL" v-model="radio" value="n5" variant="radio"></H_switch>  
        <H_switch h-font-size="33px" label="raw value" v-model="radio" value="n6" variant="radio"></H_switch>
        <H_switch class="text-4xl" label="class" v-model="radio" value="n6" variant="radio"></H_switch>
    </div>
    <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch h-font-size="xs" label="XS" v-model="check"></H_switch>
        <H_switch h-font-size="sm"  label="SM" v-model="check"></H_switch>    
        <H_switch h-font-size="md" label="MD default" v-model="check"></H_switch>
        <H_switch h-font-size="lg"  label="LG" v-model="check"></H_switch>  
        <H_switch h-font-size="xl"  label="XL" v-model="check"></H_switch>  
    </div>
     <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch h-font-size="xs" label="XS" v-model="sw" variant="switch"></H_switch>
        <H_switch h-font-size="sm"  label="SM" v-model="sw" variant="switch"></H_switch>    
        <H_switch h-font-size="md" label="MD default" v-model="sw" variant="switch"></H_switch>
        <H_switch h-font-size="lg"  label="LG" v-model="sw" variant="switch"></H_switch>  
        <H_switch h-font-size="xl"  label="XL" v-model="sw" variant="switch"></H_switch>   
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

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>
The default is `pri`.<br>
If you need a special color then just use `style="--col-pri: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flexWrap">
        <H_switch label="pri" v-model="check" variant="radio" h-color="var(--col-pri)" size="xs"></H_switch>
        <H_switch label="sec" v-model="check" variant="radio" h-color="var(--col-sec)" size="xs"></H_switch>    
        <H_switch label="ok" v-model="check" variant="radio"  h-color="var(--col-ok)" size="xs"></H_switch>
        <H_switch label="err" v-model="check" variant="radio" h-color="var(--col-err)" size="xs"></H_switch>
        <H_switch label="warn" v-model="check" variant="radio" h-color="var(--col-warn)" size="xs"></H_switch>
        <H_switch label="info" v-model="check" variant="radio" h-color="var(--col-info)" size="xs"></H_switch>
        <H_switch label="txt0" v-model="check" variant="radio" h-color="var(--col-0)" size="xs"></H_switch>
        <H_switch label="txt1" v-model="check" variant="radio" h-color="var(--col-1)" size="xs"></H_switch>
        <H_switch label="txt2" v-model="check" variant="radio" h-color="var(--col-2)" size="xs"></H_switch>
        <H_switch label="txt3" v-model="check" variant="radio" h-color="var(--col-3)" size="xs"></H_switch>
        <H_switch label="txt4" v-model="check" variant="radio" h-color="var(--col-4)" size="xs"></H_switch>
        <H_switch label="txt5" v-model="check" variant="radio" h-color="var(--col-5)" size="xs"></H_switch>
        <H_switch label="txt6" v-model="check" variant="radio" h-color="var(--col-6)" size="xs"></H_switch>
        <H_switch label="txt7" v-model="check" variant="radio" h-color="var(--col-7)" size="xs"></H_switch>
        <H_switch label="txt8" v-model="check" variant="radio" h-color="var(--col-8)" size="xs"></H_switch>
        <H_switch label="txt9" v-model="check" variant="radio" h-color="var(--col-9)" size="xs"></H_switch>
        <H_switch label="purple" v-model="check" variant="radio" h-color="purple"  size="xs"></H_switch>
    </div>
    <div class="flex items-center gap-4 wrap mt-9">
        <H_switch label="pri" v-model="radio" h-color="var(--col-pri)" size="xs"></H_switch>
        <H_switch label="sec" v-model="radio" h-color="var(--col-sec)" size="xs"></H_switch>    
        <H_switch label="ok" v-model="radio" h-color="var(--col-ok)" size="xs"></H_switch>
        <H_switch label="err" v-model="radio" h-color="var(--col-err)" size="xs"></H_switch>
        <H_switch label="warn" v-model="radio" h-color="var(--col-warn)" size="xs"></H_switch>
        <H_switch label="info" v-model="radio" h-color="var(--col-info)" size="xs"></H_switch>
        <H_switch label="txt0" v-model="radio" h-color="var(--col-0)" size="xs"></H_switch>
        <H_switch label="txt1" v-model="radio" h-color="var(--col-1)" size="xs"></H_switch>
        <H_switch label="txt2" v-model="radio" h-color="var(--col-2)" size="xs"></H_switch>
        <H_switch label="txt3" v-model="radio" h-color="var(--col-3)" size="xs"></H_switch>
        <H_switch label="txt4" v-model="radio" h-color="var(--col-4)" size="xs"></H_switch>
        <H_switch label="txt5" v-model="radio" h-color="var(--col-5)" size="xs"></H_switch>
        <H_switch label="txt6" v-model="radio" h-color="var(--col-6)" size="xs"></H_switch>
        <H_switch label="txt7" v-model="radio" h-color="var(--col-7)" size="xs"></H_switch>
        <H_switch label="txt8" v-model="radio" h-color="var(--col-8)" size="xs"></H_switch>
        <H_switch label="txt9" v-model="radio" h-color="var(--col-9)" size="xs"></H_switch>
        <H_switch h-color="purple" label="purple" v-model="radio"  size="xs"></H_switch>
    </div>
    <div class="flex items-center gap-4 flex-wrap  mt-9">
        <H_switch label="pri" v-model="sw" h-color="var(--col-pri)" variant="switch" size="xs"></H_switch>
        <H_switch label="sec" v-model="sw" h-color="var(--col-sec)" variant="switch" size="xs"></H_switch>    
        <H_switch label="ok" v-model="sw" h-color="var(--col-ok)" variant="switch" size="xs"></H_switch>
        <H_switch label="err" v-model="sw" h-color="var(--col-err)" variant="switch" size="xs"></H_switch>
        <H_switch label="warn" v-model="sw" h-color="var(--col-warn)" variant="switch" size="xs"></H_switch>
        <H_switch label="info" v-model="sw" h-color="var(--col-info)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt0" v-model="sw" h-color="var(--col-0)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt1" v-model="sw" h-color="var(--col-1)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt2" v-model="sw" h-color="var(--col-2)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt3" v-model="sw" h-color="var(--col-3)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt4" v-model="sw" h-color="var(--col-4)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt5" v-model="sw" h-color="var(--col-5)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt6" v-model="sw" h-color="var(--col-6)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt7" v-model="sw" h-color="var(--col-7)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt8" v-model="sw" h-color="var(--col-8)" variant="switch" size="xs"></H_switch>
        <H_switch label="txt9" v-model="sw" h-color="var(--col-9)" variant="switch" size="xs"></H_switch>
        <H_switch h-color="purple" label="purple" v-model="sw" variant="switch" size="xs"></H_switch>
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
        <H_switch label="pri" v-model="check" variant="radio" h-color="var(--col-pri)" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="check" variant="radio" h-color="var(--col-sec)" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="check" variant="radio" h-color="var(--col-ok)" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="check" variant="radio" h-color="var(--col-err)" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="check" variant="radio" h-color="var(--col-warn)" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="check" variant="radio" h-color="var(--col-info)" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="check" variant="radio" h-color="var(--col-0)" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="check" variant="radio" h-color="var(--col-1)" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="check" variant="radio" h-color="var(--col-2)" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="check" variant="radio" h-color="var(--col-3)" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="check" variant="radio" h-color="var(--col-4)" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="check" variant="radio" h-color="var(--col-5)" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="check" variant="radio" h-color="var(--col-6)" size="xs" disabled></H_switch>
        <H_switch h-color="purple" variant="radio" label="purple" v-model="check" size="xs" disabled></H_switch>
    </div>
    <div class="flex items-center gap-4 flexWrap mt-9">
        <H_switch label="pri" v-model="radio" h-color="var(--col-pri)" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="radio" h-color="var(--col-sec)" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="radio" h-color="var(--col-ok)" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="radio" h-color="var(--col-err)" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="radio" h-color="var(--col-warn)" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="radio" h-color="var(--col-info)" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="radio" h-color="var(--col-0)" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="radio" h-color="var(--col-1)" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="radio" h-color="var(--col-2)" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="radio" h-color="var(--col-3)" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="radio" h-color="var(--col-4)" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="radio" h-color="var(--col-5)" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="radio" h-color="var(--col-6)" size="xs" disabled></H_switch>
        <H_switch h-color="purple" label="purple" v-model="radio" variant="radio" size="xs" disabled></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap  mt-9">
        <H_switch label="pri" v-model="sw" h-color="var(--col-pri)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="sec" v-model="sw" h-color="var(--col-sec)" variant="switch" size="xs" disabled></H_switch>    
        <H_switch label="ok" v-model="sw" h-color="var(--col-ok)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="err" v-model="sw" h-color="var(--col-err)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="warn" v-model="sw" h-color="var(--col-warn)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="info" v-model="sw" h-color="var(--col-info)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt0" v-model="sw" h-color="var(--col-0)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt1" v-model="sw" h-color="var(--col-1)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt2" v-model="sw" h-color="var(--col-2)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt3" v-model="sw" h-color="var(--col-3)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt4" v-model="sw" h-color="var(--col-4)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt5" v-model="sw" h-color="var(--col-5)" variant="switch" size="xs" disabled></H_switch>
        <H_switch label="txt6" v-model="sw" h-color="var(--col-6)" variant="switch" size="xs" disabled></H_switch>
        <H_switch h-color="purple" label="purple" v-model="sw" variant="switch" size="xs" disabled></H_switch>
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
