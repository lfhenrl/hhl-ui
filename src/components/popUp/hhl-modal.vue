<template>
  <div
    v-if="overLayShow"
    @click="overlayClick"
    class="hhl-modal flx-row flx-justify-center flx-align-center fixed pos-all-0 z-50"
    :class="{ 'hhl-modal__showOverlay': showOverlay}"
  >
    <div
      class="hhl-modal-pop absolute"
      @click.stop
      :class="{ 'hhl-modal-pop__open': popShow, 'hhl-modal-pop__shake': shake }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

const HhlModal = defineComponent({
  name: "hhl-modal",
  props: {
    modelValue: { type: Boolean, default: false, required: true },
    showOverlay: { default: false, type: Boolean },
    noPersistent: { default: false, type: Boolean },
    noShake: { default: false, type: Boolean },
    offsetTop: { default: "20%", type: String }
  },
  setup(props, { emit }) {
    const popShow = ref(false);
    const overLayShow = ref(false);
    const shake = ref(false);

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          overLayShow.value = true;
          setTimeout(() => {
            popShow.value = true;
          });
        } else {
          popShow.value = false;
          setTimeout(() => {
            overLayShow.value = false;
          }, 500);
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

    return {
      overlayClick,
      popShow,
      overLayShow,
      shake
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-modal": typeof HhlModal;
  }
}
export type iHhlModal = InstanceType<typeof HhlModal>;
export default HhlModal;
</script>

<style>
.hhl-modal {
  --hhl-modal-offset: v-bind(offsetTop);
}
.hhl-modal__showOverlay {
  background-color: rgba(0, 0, 0, 0.37);
}

.hhl-modal-pop {
  top: -80%;
  transition: all 400ms ease-in;
  transform: translateY(calc(-1 * var(--hhl-modal-offset)));
}

.hhl-modal-pop__open {
  top: var(--hhl-modal-offset);
}

.hhl-modal-pop__shake {
  animation: shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%,
  90% {
    transform: rotate(-1deg) translateY(calc(-1 * var(--hhl-modal-offset)));
  }

  20%,
  80% {
    transform: rotate(1deg) translateY(calc(-1 * var(--hhl-modal-offset)));
  }

  30%,
  50%,
  70% {
    transform: rotate(-1deg) translateY(calc(-1 * var(--hhl-modal-offset)));
  }

  40%,
  60% {
    transform: rotate(1deg) translateY(calc(-1 * var(--hhl-modal-offset)));
  }
}
</style>
