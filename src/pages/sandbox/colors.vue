<template>
  <div class="w-full h-full">
    <div class="flex gap-4 h-full" h-padding="10rem">
      <div
        class="t_body-light m-6 p-2 w-full h-full flex flex-col items-center gap-1 font-normal text-base"
        h-shadow="md"
      >
        <div>
          BG0=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
          ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
          ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
          ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
          ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
        </div>
        <div class="flex items-center gap-2">
          <div h-bgcolor="var(--col-pri)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-sec)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-ok)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-warn)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-err)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-info)" h-width="3rem" h-height="1.5rem"></div>
        </div>
        <div class="t_box1 flex flex-col items-center" h-shadow="md">
          <div>
            BG1=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
            ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
            ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
            ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
            ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
          </div>
          <div class="flex items-center gap-2">
            <div h-bgcolor="var(--col-pri)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-sec)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-ok)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-warn)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-err)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-info)" h-width="3rem" h-height="1.5rem"></div>
          </div>
          <div class="t_box2 flex flex-col items-center" h-shadow="md">
            <div>
              BG2=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
              ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
              ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
              ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
              ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
            </div>
            <div class="flex items-center gap-2">
              <div h-bgcolor="var(--col-pri)" h-width="3rem" h-height="1.5rem"></div>
              <div h-bgcolor="var(--col-sec)" h-width="3rem" h-height="1.5rem"></div>
              <div h-bgcolor="var(--col-ok)" h-width="3rem" h-height="1.5rem"></div>
              <div h-bgcolor="var(--col-warn)" h-width="3rem" h-height="1.5rem"></div>
              <div h-bgcolor="var(--col-err)" h-width="3rem" h-height="1.5rem"></div>
              <div h-bgcolor="var(--col-info)" h-width="3rem" h-height="1.5rem"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//"x: attr(x type(*))"
function ddd() {
  if (CSS.supports("position-anchor")) {
    return true;
  }
  return "NO";
}

console.log("tjek ", ddd()); // outputs: `Chrome 62`
</script>
<style>
.t_body span,
.t_body-light span {
  margin-left: 10px;
}

/* .theme-shadow-md {
  box-shadow: var(--theme-shadow-md);
  border: var(--theme-shadow-border);
  border-bottom: var(--theme-shadow-border-bottom);
} */

.shadow-xx {
  box-shadow: 0 4px 14px -8px rgba(0, 0, 0, 0.7);
}

.t_box1 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--bgcol-1);
  border-radius: 4px;
  padding-bottom: 40px;
}
.t_box2 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--bgcol-2);
  padding-bottom: 40px;
  border-radius: 4px;
}
.t_box3 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--color-bg3);
  padding-bottom: 40px;
  border-radius: 4px;
}
.t_box4 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--color-bg4);
  padding-bottom: 40px;
  margin-top: 40px;
  border-radius: 4px;
}
.t_box5 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--color-bg5);
  padding-bottom: 40px;
  margin-top: 40px;
  border-radius: 4px;
}
.t_box6 {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: var(--color-bg6);
  padding-bottom: 40px;
  margin-top: 40px;
  border-radius: 4px;
}
</style>
