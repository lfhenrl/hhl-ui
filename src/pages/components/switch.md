# Switch

The H_switch van be a checkbox, radio or a switch.<br>

## Variant = checkbox (Default)

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

## Variant = radio

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


## Variant = switch

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
        <H_switch size="xs" label="XS" v-model="check"></H_switch>
        <H_switch size="sm"  label="SM" v-model="check"></H_switch>    
        <H_switch size="md" label="MD default" v-model="check"></H_switch>
        <H_switch size="lg"  label="LG" v-model="check"></H_switch>  
        <H_switch size="xl"  label="XL" v-model="check"></H_switch>  
    </div>
    <div class="flex items-center gap-4 flex-wrap mt-9">
        <H_switch size="xs" label="XS" v-model="radio" value="n1" variant="radio"></H_switch>
        <H_switch size="sm"  label="SM" v-model="radio" value="n2" variant="radio"></H_switch>    
        <H_switch size="md" label="MD default" v-model="radio" value="n3" variant="radio"></H_switch>
        <H_switch size="lg"  label="LG" v-model="radio" value="n4" variant="radio"></H_switch>  
        <H_switch size="xl"  label="XL" v-model="radio" value="n5" variant="radio"></H_switch>  
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
You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "neutral" | "neutral-light"`. <br>
The default is `pri`.<br>
If you need a special color then just use `style="--color-currentBg: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
    <div class="flex items-center gap-4 flexWrap">
        <H_switch label="col-pri" v-model="check" color="pri"></H_switch>
        <H_switch label="col-sec" v-model="check" color="sec"></H_switch>    
        <H_switch label="col-ok" v-model="check" color="ok"></H_switch>
        <H_switch label="col-err" v-model="check" color="err"></H_switch>
        <H_switch label="col-warn" v-model="check" color="warn"></H_switch>
        <H_switch label="col-info" v-model="check" color="info"></H_switch>
        <H_switch label="neutral" v-model="check" color="neutral"></H_switch>
        <H_switch label="neutral-light" v-model="check" color="neutral-light"></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
    <div class="flex items-center gap-4 flexWrap mt-9">
        <H_switch label="col-pri" v-model="radio" color="pri" variant="radio"></H_switch>
        <H_switch label="col-sec" v-model="radio" color="sec" variant="radio"></H_switch>    
        <H_switch label="col-ok" v-model="radio" color="ok" variant="radio"></H_switch>
        <H_switch label="col-err" v-model="radio" color="err" variant="radio"></H_switch>
        <H_switch label="col-warn" v-model="radio" color="warn" variant="radio"></H_switch>
        <H_switch label="col-info" v-model="radio" color="info" variant="radio"></H_switch>
        <H_switch label="neutral" v-model="radio" color="neutral" variant="radio"></H_switch>
        <H_switch label="neutral-light" v-model="radio" color="neutral-light" variant="radio"></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="radio" variant="radio"></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap  mt-9">
        <H_switch label="col-pri" v-model="sw" color="pri" variant="switch"></H_switch>
        <H_switch label="col-sec" v-model="sw" color="sec" variant="switch"></H_switch>    
        <H_switch label="col-ok" v-model="sw" color="ok" variant="switch"></H_switch>
        <H_switch label="col-err" v-model="sw" color="err" variant="switch"></H_switch>
        <H_switch label="col-warn" v-model="sw" color="warn" variant="switch"></H_switch>
        <H_switch label="col-info" v-model="sw" color="info" variant="switch"></H_switch>
        <H_switch label="neutral" v-model="sw" color="neutral" variant="switch"></H_switch>
        <H_switch label="neutral-light" v-model="sw" color="neutral-light" variant="switch"></H_switch>
        <H_switch style="--color-currentBg: purple" label="purple" v-model="sw" variant="switch"></H_switch>
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
        <H_switch disabled label="col-pri" v-model="check" color="pri"></H_switch>
        <H_switch disabled label="col-sec" v-model="check" color="sec"></H_switch>    
        <H_switch disabled label="col-ok" v-model="check" color="ok"></H_switch>
        <H_switch disabled label="col-err" v-model="check" color="err"></H_switch>
        <H_switch disabled label="col-warn" v-model="check" color="warn"></H_switch>
        <H_switch disabled label="col-info" v-model="check" color="info"></H_switch>
        <H_switch disabled label="neutral" v-model="check" color="neutral"></H_switch>
        <H_switch disabled label="neutral-light" v-model="check" color="neutral-light"></H_switch>
        <H_switch disabled style="--color-currentBg: purple" label="purple" v-model="check"></H_switch>
    </div>
    <div class="flex items-center gap-4 flexWrap mt-9">
        <H_switch disabled label="col-pri" v-model="radio" color="pri" variant="radio"></H_switch>
        <H_switch disabled label="col-sec" v-model="radio" color="sec" variant="radio"></H_switch>    
        <H_switch disabled label="col-ok" v-model="radio" color="ok" variant="radio"></H_switch>
        <H_switch disabled label="col-err" v-model="radio" color="err" variant="radio"></H_switch>
        <H_switch disabled label="col-warn" v-model="radio" color="warn" variant="radio"></H_switch>
        <H_switch disabled label="col-info" v-model="radio" color="info" variant="radio"></H_switch>
        <H_switch disabled label="neutral" v-model="radio" color="neutral" variant="radio"></H_switch>
        <H_switch disabled label="neutral-light" v-model="radio" color="neutral-light" variant="radio"></H_switch>
        <H_switch disabled style="--color-currentBg: purple" label="purple" v-model="radio" variant="radio"></H_switch>
    </div>
        <div class="flex items-center gap-4 flexWrap  mt-9">
        <H_switch disabled label="col-pri" v-model="sw" color="pri" variant="switch"></H_switch>
        <H_switch disabled label="col-sec" v-model="sw" color="sec" variant="switch"></H_switch>    
        <H_switch disabled label="col-ok" v-model="sw" color="ok" variant="switch"></H_switch>
        <H_switch disabled label="col-err" v-model="sw" color="err" variant="switch"></H_switch>
        <H_switch disabled label="col-warn" v-model="sw" color="warn" variant="switch"></H_switch>
        <H_switch disabled label="col-info" v-model="sw" color="info" variant="switch"></H_switch>
        <H_switch disabled label="neutral" v-model="sw" color="neutral" variant="switch"></H_switch>
        <H_switch disabled label="neutral-light" v-model="sw" color="neutral-light" variant="switch"></H_switch>
        <H_switch disabled style="--color-currentBg: purple" label="purple" v-model="sw" variant="switch"></H_switch>
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
