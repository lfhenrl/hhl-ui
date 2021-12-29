<template>
  <div
    class="hhl-input-base flx-inline-row flx-1"
    :disabled="disabled ? true : null"
    :no-label="$attrs.label == undefined"
    :title="validate"
  >
    <fieldset
      :focused="$attrs.focus"
      :have-label="$attrs.label !== undefined"
      :error="haveError"
      class="flx-col relative m-0 p-0 border borderRadius-4 flx-auto"
    >
      <legend v-if="$attrs.label !== undefined" class="relative z-1">{{ $attrs.label }}</legend>

      <div class="flx-inline-row px-5 flx-align-center">
        <hhl-icon
          v-if="startIcon !== ''"
          :icon="startIcon"
          :btn="haveEvent('onStart_icon_click')"
          class="z-1 startIcon mr-1"
          @click="$emit('start_icon_click')"
        />
        <div class="flx-1 w-100pr">
          <slot />
        </div>
        <hhl-icon v-if="clearable && value !== ''" btn icon="close" class="z1 clearIcon" @click="$emit('clear')" />
        <hhl-icon
          v-if="endIcon !== ''"
          :icon="endIcon"
          :btn="haveEvent('onEnd_icon_click')"
          class="z-1 endIcon"
          @click="$emit('end_icon_click')"
        />
      </div>

      <div v-if="!$attrs['hide-info']" class="hhl-input-base__infoBox absolute flx-inline-row w-100pr pl-5">
        <div v-if="$attrs.hint !== '' && !haveError" class="hhl-input-base__infoBox_hint">
          {{ $attrs.hint }}
        </div>
        <div v-if="haveError" class="hhl-input-base__infoBox_error txt-truncate">
          {{ validate }}
        </div>
        <div class="flx1" />
        <div v-if="$attrs.counter" class="hhl-input-base__infoBox_counter flx-1 txt-right">{{ count }}/{{ $attrs.counter }}</div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, getCurrentInstance, ref } from "vue";
const hhlInputBase = defineComponent({
  name: "hhl-input-base",
  emits: ["start_icon_click", "end_icon_click", "clear"],
  props: {
    value: [String, Number, Array, Date, Boolean],
    startIcon: { type: String, default: "" },
    endIcon: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    sofus: { type: Boolean, default: false },
    clearable: Boolean,
    validator: Array
  },
  setup(props) {
    const count = computed(() => (props.value ? props.value.toString().length : 0));
    const slotAttrs = ref({});
    const haveError = computed(() => validate.value !== "" && !props.disabled);
    const haveEvent = (e: string) => (slotAttrs.value[e] === undefined ? null : "");

    onMounted(() => {
      const instance = getCurrentInstance();
      slotAttrs.value = { ...instance?.parent?.vnode.props };
    });

    const validate = computed(() => {
      if (!props.validator) {
        return "";
      }
      let returnValue = "";
      props.validator.some((v) => {
        const valid = typeof v === "function" ? v(props.value) : v;

        if (typeof valid === "string") {
          returnValue = valid;
          return true;
        } else if (typeof valid !== "boolean") {
          // eslint-disable-next-line
          console.log(`VALIDATION: Rules should return a string or boolean, received '${typeof valid}' instead`, this);
          return true;
        }
        return false;
      });
      return returnValue;
    });

    return {
      count,
      validate,
      haveError,
      haveEvent
    };
  }
});

declare global {
  interface __VLS_GlobalComponents {
    "hhl-input-base": typeof hhlInputBase;
  }
}
export type ihhlInputBase = InstanceType<typeof hhlInputBase>;
export default hhlInputBase;
</script>

<style>
.hhl-input-base {
  color: var(--col-txt-1);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  line-height: 1rem;
}

.hhl-input-base fieldset {
  min-width: 100px;
}

.hhl-input-base .hhl-icon {
  --hhl-icon-size: 1.3em;
  opacity: 0.7;
}

.hhl-input-base fieldset[error="true"] {
  border-color: var(--col-err);
}

.hhl-input-base fieldset[focused="true"] {
  border-color: var(--comp-border-color-focus);
}

.hhl-input-base fieldset[focused="true"] legend {
  color: var(--comp-border-color-focus);
}

.hhl-input-base fieldset[error="true"] legend {
  color: var(--col-err);
}

.hhl-input-base legend {
  top: -0.66em;
  margin-left: 6px;
  height: 0;
  padding: 0 2px 0 0;
  font-size: 0.9em;
  color: var(--comp-label-color);
}

.hhl-input-base__infoBox {
  top: 3em;
  line-height: 1em;
  font-size: 0.8em;
}

.hhl-input-base__infoBox_hint,
.hhl-input-base__infoBox_counter {
  color: var(--col-info);
}

.hhl-input-base__infoBox_error {
  color: var(--col-err);
}
</style>
