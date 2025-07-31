# ProgressBar

## Data binding

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex items-center gap-4 flex-wrap">
      <H_switch v-model="show" label="Show"></H_switch>
      <H_progress-bar :show="show" ></H_progress-bar>
      </div>
    </template>
    <script>
    const show = ref(false);
    return {show}
    </script>
'>
</hhl-live-editor>

<br>

## Size

You can change the size by the size property `"xs" | "sm" | "md" | "lg" | "xl"`<br>
Default is `md`
If you need a special size then just use `style="--pogress-size: 33px"`
<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-col gap-4 flex-wrap">
      <div class="flex flex-1 items-center">XS:<H_progress-bar show size="xs" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">SM:<H_progress-bar show size="sm" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">MD:<H_progress-bar show size="md" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">LG:<H_progress-bar show size="lg" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">XL:<H_progress-bar show size="xl" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">33px:<H_progress-bar show speed="2s" style="--progress-size: 33px" ></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Speed

You can change the speed of the animation by the speed property `speed="1.5s"`<br>
Default is `1s`

<hhl-live-editor title="" htmlCode='
<template>
        <div class="flex flex-col gap-4 flex-wrap">
            <div class="flex flex-1 items-center">0.5s:<H_progress-bar show speed="0.5s"></H_progress-bar></div>
            <div class="flex flex-1 items-center">default:<H_progress-bar show ></H_progress-bar></div>
            <div class="flex flex-1 items-center">2s:<H_progress-bar show speed="2s"></H_progress-bar></div>
            <div class="flex flex-1 items-center">3s:<H_progress-bar show speed="3s"></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>

<br>

## Colors

You can change the color by the variant property `"pri" | "ok" | "sec" | "warn" | "err" | "info" | "white" |  "black" |  "txt0" | "txt1" | "txt2" | "txt3" | "txt4" | "txt5" | "txt6" | "txt7" | "txt8" | "txt9"`. <br>
The default is `pri`.<br>
If you need a special color then just use `style="--progress-color: purple"`

<hhl-live-editor title="" htmlCode='
    <template>
      <div class="flex flex-col  gap-4 flex-wrap">
      <div class="flex flex-1 items-center">PRI:<H_progress-bar show color="pri" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">OK:<H_progress-bar show color="ok" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">SEC:<H_progress-bar show color="sec" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">WARN:<H_progress-bar show color="warn" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">ERR:<H_progress-bar show color="err" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">INFO:<H_progress-bar show color="info" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">White:<H_progress-bar show color="white" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">BLACK:<H_progress-bar show color="black" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT0:<H_progress-bar show color="txt0" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT1:<H_progress-bar show color="txt1" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT2:<H_progress-bar show color="txt2" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT3:<H_progress-bar show color="txt3" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT4:<H_progress-bar show color="txt4" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT5:<H_progress-bar show color="txt5" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT6:<H_progress-bar show color="txt6" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT7:<H_progress-bar show color="txt7" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT8:<H_progress-bar show color="txt8" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">TXT9:<H_progress-bar show color="txt9" speed="2s"></H_progress-bar></div>
      <div class="flex flex-1 items-center">Purple:<H_progress-bar show style="--progress-color: purple" speed="2s"></H_progress-bar></div>
      </div>
    </template>
'>
</hhl-live-editor>
