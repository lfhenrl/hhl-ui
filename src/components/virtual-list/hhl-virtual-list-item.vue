<template>
  <transition appear name="fade" >
    <div ref="el" role="listitem" :class="itemClass">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";

export default defineComponent({
  name: "hhl-virtual-list-item",
  props: {
    setSize: {
      type: Function,
      default: {}
    },
    horizontal: {
      type: Boolean
    },
    data: {
      type: Object
    },
    uniqueKey: {
      type: [String, Number]
    },
    itemClass: {
      type: String,
      default: "hhl-virtual-list-item"
    }
  },
  setup(props, {}) {
    const el = ref(<HTMLElement | null>null);
    const shapeKey = props.horizontal ? "offsetWidth" : "offsetHeight";
    let resizeObserver: any;

    onMounted(() => {
      resizeObserver = new ResizeObserver(() => {
        dispatchSizeChange();
      });
      resizeObserver.observe(el.value);
    });

    onUpdated(() => {
      dispatchSizeChange();
    });

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    });

    function getCurrentSize() {
      return el.value ? el.value[shapeKey] : 0;
    }

    // tell parent current size identify by unqiue key
    function dispatchSizeChange() {
      // this.$parent!.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
      props.setSize(props.uniqueKey, getCurrentSize());
    }

    return {
      el
    };
  }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
