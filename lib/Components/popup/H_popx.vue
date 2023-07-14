<template>
  <div class="H_pop">
    <div class="H_pop-referance" ref="referance" @click="refClick">
      <slot name="referance" />
    </div>
    <dialog popover class="H_pop-dialog" ref="dialogRef" @toggle="toggle"><slot /></dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref, watch } from "vue";
import { PopPos } from "./PopPos";

const P = defineProps({
  container: {
    type: String as PropType<"screen" | "parent" | "refElement">,
    default: "refElement"
  },
  placement: {
    type: String as PropType<
      | "top"
      | "top-start"
      | "top-end"
      | "right"
      | "right-start"
      | "right-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "left"
      | "left-start"
      | "left-end"
      | "center"
    >,
    default: "top"
  },
  offsetTop: { type: Number, default: 0 },
  offsetLeft: { type: Number, default: 0 },
  inner: { type: Boolean, default: false }
});
const E = defineEmits(["open", "close"]);

const referance = ref();
const dialogRef = ref();
const isOpen = ref(false);

const dialogPos = new PopPos();

watch(isOpen, () => {
  if (isOpen.value) {
    dialogRef.value.showPopover();
    // dialogRef.value.showModal();
    dialogPos.getPos();
    E("open");
  } else {
    dialogRef.value.close();
    E("close");
  }
});
function toggle(e: any) {
  console.log("ggg ", e);
  isOpen.value = e.newValue;
}
function refClick() {
  isOpen.value = !isOpen.value;
}
let ticking = false;
function resize() {
 
  console.log("resize")
  if (!ticking) {
    window.requestAnimationFrame(() => {
      dialogPos.getPos();
      ticking = false;
      console.log("requestAnimationFrame")
    });

    ticking = true;
}
}

function scroll() {
  dialogPos.getPos();
  console.log("scroll")
}

onMounted(() => {
  dialogPos.init(referance.value, dialogRef.value, P);
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("scroll", scroll, { passive: true });
});

onUnmounted(()=> {
  window.removeEventListener("resize", resize);
  document.removeEventListener("scroll", scroll);
})
</script>

<style>
.H_pop {
}
.H_pop-referance {
  background-color: bisque;
}
.H_pop-dialog {
  padding: 0;
  border: none;
  /* inset: auto; */
}
</style>
