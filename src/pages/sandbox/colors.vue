<template>
  <div h-width="100%" h-height="100%" h-padding="1rem">
    <div h-display="flex" h-gap="1.0rem" h-height="100%" h-padding="10rem">
      <div
        h-display="flex"
        h-flex-direction="column"
        h-align-items="center"
        h-margin="1.5rem"
        h-padding="0.5rem"
        h-width="100%"
        h-height="100%"
        h-shadow="lg"
        h-bgcolor="var(--bgcol-0)"
      >
        <div h-display="flex" h-gap="0.5rem">
          BG0=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
          ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
          ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
          ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
          ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
        </div>
        <div h-display="flex" h-align-items="center" h-gap="0.5rem">
          <div h-bgcolor="var(--col-pri)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-sec)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-ok)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-warn)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-err)" h-width="3rem" h-height="1.5rem"></div>
          <div h-bgcolor="var(--col-info)" h-width="3rem" h-height="1.5rem"></div>
        </div>
        <div
          h-display="flex"
          h-flex-direction="column"
          h-align-items="center"
          h-shadow="lg"
          h-width="80%"
          h-height="80%"
          h-margin="auto"
          h-border-radius="4px"
          h-padding="0.5rem"
          h-padding-bottom="40px"
          h-bgcolor="var(--bgcol-1)"
        >
          <div h-display="flex" h-gap="0.5rem">
            BG1=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
            ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
            ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
            ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
            ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
          </div>
          <div h-display="flex" h-align-items="center" h-gap="0.5rem">
            <div h-bgcolor="var(--col-pri)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-sec)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-ok)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-warn)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-err)" h-width="3rem" h-height="1.5rem"></div>
            <div h-bgcolor="var(--col-info)" h-width="3rem" h-height="1.5rem"></div>
          </div>
          <div
            h-display="flex"
            h-flex-direction="column"
            h-align-items="center"
            h-shadow="lg"
            h-width="80%"
            h-height="80%"
            h-margin="auto"
            h-border-radius="4px"
            h-padding="0.5rem"
            h-padding-bottom="40px"
            h-bgcolor="var(--bgcol-2)"
          >
            <div h-display="flex" h-gap="0.5rem">
              BG2=<span h-color="var(--col-0)">txt0</span><span h-color="var(--col-1)">txt1</span
              ><span h-color="var(--col-2)">txt2</span><span h-color="var(--col-3)">txt3</span
              ><span h-color="var(--col-4)">txt4</span><span h-color="var(--col-5)">txt5</span
              ><span h-color="var(--col-6)">txt6</span><span h-color="var(--col-7)">txt7</span
              ><span h-color="var(--col-8)">txt8</span><span h-color="var(--col-9)">txt9</span>
            </div>
            <div h-display="flex" h-align-items="center" h-gap="0.5rem">
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
