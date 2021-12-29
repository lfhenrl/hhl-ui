<template>
  <transition name="alert" @after-leave="$emit('close')">
    <div v-show="modelValue" class="hhl-snack shadow-5 flx-row" @click="$emit('update:modelValue',false)">
      <hhl-icon :icon="icon" class="hhl-snack__icon" :color="color" />
      <div class="flx-col flx-1 flx-align-center">
        <span class="hhl-snack__title">{{ title }}</span>
        <span class="hhl-snack__text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent} from "vue";

const HhlSnack = defineComponent({
  name: "hhl-snack",
  props: {
    modelValue: { type: Boolean, default: false, required: true },
    type: { default: "warn", type: String },
    title: { default: "Title", type: String },
    text: { default: "Title", type: String }
  },
  setup(props, { emit }) {
    const color = computed(() => {
      if (props.type === "info") {
        return "var(--col-ok)";
      }
      if (props.type === "warn") {
        return "var(--col-warn)";
      }
      if (props.type === "err") {
        return "var(--col-err)";
      }
      return "var(--col-ok)";
    });

    const icon = computed(() => {
      if (props.type === "info") {
        return "check";
      }
      return "info";
    });

    function close() {
      emit("show", false);
    }

    return { color, icon, close };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-snack": typeof HhlSnack;
  }
}
export type iHhlSnack = InstanceType<typeof HhlSnack>;
export default HhlSnack;
</script>

<style>
.hhl-snack {
  position: fixed;
  padding: 5px 5px 10px 5px;
  border-radius: 4px;
  top: 10px;
  right: 10px;
  min-width: 330px;
  max-width: 330px;
  z-index: 999;
  background-color: var(--col-bg-0);
  color: var(--col-txt-0);
}

.hhl-snack__icon {
  zoom: 1.3;
}

.hhl-snack__title {
  font-weight: bolder;
  font-size: 110%;
}

.alert-leave-active {
  animation: slide-out 0.5s reverse;
}
.alert-enter-active /* .fade-leave-active below version 2.1.8 */ {
  animation: slide-up 0.5s;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }
  60% {
    opacity: 1;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  60% {
    opacity: 1;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
