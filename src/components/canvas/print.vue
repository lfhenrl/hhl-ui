<template>
  <div class="print-container">
    <iframe
      ref="iframe"
      class="print-container_iframe"
      frameborder="0"
      :srcdoc="srcdoc"
      @load="printOut"
    >
    </iframe>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, ref, watch } from "vue";
import { Ioptions } from "./types";
import { getSVGString, svgString2Image } from "./toPNG";
export default defineComponent({
  name: "print",
  setup({}, context) {
    const iframe = ref<HTMLIFrameElement>({});
    const srcdoc = ref("");
    let containerDiv: HTMLElement;
    let svg: SVGElement;
    let _title = "Chart";
    const parent: any = context.parent ?? {};
    const opt: Ioptions = parent.opt;

    function print(title = "Chart") {
      _title = title;
      containerDiv.style.width = "29.7cm";
      setTimeout(() => {
        const svgString = getSVGString(svg);
        const html = `<h1 style='text-align: center'>${_title}</h1>${svgString}`;
        srcdoc.value = html ?? "";
      }, 1000);
      return;
    }

    function printOut() {
      if (srcdoc.value.length > 10) {
        setTimeout(async () => {
          await iframe.value.contentWindow?.print();
          containerDiv.style.width = "";
        }, 10);
      }
    }

    function png(title = "Chart") {
      _title = title;
      const _svg = opt.containers.svg;
      const svgString = getSVGString(_svg?.node());
      console.log(svgString);
      svgString2Image(svgString, opt.size.width, opt.size.height, "png", save);
    }

 

    watch(
      () => opt.size.ready,
      () => {
        if (opt.size.ready) {
          containerDiv = opt.containers.content?.node()!;
          svg = containerDiv.querySelector(".chart-svg")! as SVGElement;
        }
      }
    );

    return {
      iframe,
      srcdoc,
      print,
      printOut,
      png
    };
  }
});
</script>

<style>
.print-container {
  display: flex;
  flex-direction: column;
}

.print-container_iframe {
  visibility: hidden;
  height: 0;
}
</style>
