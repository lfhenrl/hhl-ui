<template>
  <div v-if="overLayShow" @click="overlayClick" class="H_modal" :class="{ H_modal__showOverlay: showOverlay }">
    <div
      class="H_modal-pop"
      ref="pop"
      v-movable="movable"
      @click.stop
      :class="{ 'H_modal-pop__open': popShow, 'H_modal-pop__shake': shake }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// @ts-ignore:next-line
import { vMovable } from "../../Directives/v-movable";

const props = defineProps({
  modelValue: { type: Boolean, default: false, required: true },
  showOverlay: { default: false, type: Boolean },
  noPersistent: { default: false, type: Boolean },
  noShake: { default: false, type: Boolean },
  movable: { default: false, type: Boolean },
  offset: { default: "50%", type: String }
});

const emit = defineEmits(["update:modelValue"]);


const popShow = ref(false);
const overLayShow = ref(false);
const shake = ref(false);
const pop = ref();
const popHalfHeight = ref("100px");

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      overLayShow.value = true;
      setTimeout(() => {
        popShow.value = true;
        const p = pop.value;
        popHalfHeight.value = p.clientHeight / 2 + "px";
      }, 10);
    } else {
      popShow.value = false;
      setTimeout(() => {
        overLayShow.value = false;
      }, 200);
    }
  }
);

function overlayClick() {
  if (props.noPersistent) {
    emit("update:modelValue", false);
  } else {
    if (!props.noShake && !props.noPersistent) {
      shake.value = true;
      console.log("shake");
      setTimeout(() => {
        shake.value = false;
      }, 800);
    }
  }
}
onMounted(() => {});
</script>

<style>
.H_modal {
  display: flex;
  justify-content: center;
  z-index: 50;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  --H_modal-offset: v-bind(offset);
}
.H_modal__showOverlay {
  background-color: rgba(0, 0, 0, 0.37);
}

.H_modal-pop {
  position: absolute;
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  transform: translateY(-100%);
  transition: transform 200ms ease-in;
  top: calc(var(--H_modal-offset) - v-bind(popHalfHeight));
}

.H_modal-pop__open {
  transform: translateY(0%);
}

.H_modal-pop__shake {
  animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: rotate(-1deg) translateY(10%);
  }

  20%,
  80% {
    transform: rotate(1deg) translateY(10%);
  }

  30%,
  50%,
  70% {
    transform: rotate(-1deg) translateY(10%);
  }

  40%,
  60% {
    transform: rotate(1deg) translateY(10%);
  }
}
</style>
