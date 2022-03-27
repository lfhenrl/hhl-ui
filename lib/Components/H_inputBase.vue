<template>
  <div class="H_inputBase" :disabled="disabled ? true : null" :no-label="$attrs.label == undefined" :title="validate">
    <fieldset class="H_inputBase__fieldset" :focused="$attrs.focus" :have-label="$attrs.label !== undefined" :error="haveError">
      <legend class="H_inputBase__legend" v-if="$attrs.label !== ''">{{ $attrs.label }}</legend>

      <div class="H_inputBase__body">
        <H_icon
          v-if="startIcon !== ''"
          :icon="startIcon"
          :btn="haveEvent('onStart_icon_click')"
          class="H_inputBase__startIcon"
          @click="$emit('start_icon_click')"
        />
        <slot />
        <H_icon v-if="clearable && value !== ''" btn icon="close" class="H_inputBase__clearIcon" @click="$emit('clear')" />
        <H_icon
          v-if="endIcon !== ''"
          :icon="endIcon"
          :btn="haveEvent('onEnd_icon_click')"
          class="H_inputBase__endIcon"
          @click="$emit('end_icon_click')"
        />
      </div>

      <div v-if="!$attrs['hide-info']" class="H_inputBase__infoBox">
        <div v-if="$attrs.hint !== '' && !haveError" class="H_inputBase__infoBox_hint">
          {{ $attrs.hint }}
        </div>
        <div v-if="haveError" class="H_inputBase__infoBox_error">
          {{ validate }}
        </div>
        <div class="H_inputBase__spacer" />
        <div v-if="$attrs.counter" class="H_inputBase__infoBox_counter">{{ count }}/{{ $attrs.counter }}</div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, getCurrentInstance, ref } from "vue";
import H_icon from "./H_icon.vue";

const props = defineProps({
  value: [String, Number, Array, Date, Boolean],
  startIcon: { type: String, default: "" },
  endIcon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  clearable: Boolean,
  validator: Array
});

const emit = defineEmits(["start_icon_click", "end_icon_click", "clear", "isValid"]);
const count = computed(() => (props.value ? props.value.toString().length : 0));
const slotAttrs = ref({});
const haveError = computed(() => {
  const valid = validate.value !== "" && !props.disabled;
  emit("isValid", !valid);
  return valid;
});
const haveEvent = (e: string) => ((slotAttrs.value as any)[e] === undefined ? null : "");

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
      console.log(`VALIDATION: Rules should return a string or boolean, received '${typeof valid}' instead`, this);
      return true;
    }
    return false;
  });
  return returnValue;
});
</script>

<style>
.H_inputBase {
  box-sizing: border-box;
  display: inline-flex;
  flex: 1;
  color: var(--col-txt-1);
  font-size: var(--comp-font-size);
  font-family: var(--comp-font-family);
  line-height: 1em;
  align-items: flex-start;
}

.H_inputBase__spacer {
  flex: 1;
}

.H_inputBase .H_inputBase__fieldset {
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  min-width: 100px;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  border: solid 1px var(--comp-border-color);
  text-align: left;
}

.H_inputBase__body {
  font-size: var(--comp-font-size);
  box-sizing: border-box;
  display: inline-flex;
  flex: 1;
  align-items: center;
  padding: 0 5px;
}

.H_inputBase__startIcon {
  margin-right: 1px;
}

.H_inputBase__startIcon,
.H_inputBase__clearIcon,
.H_inputBase__endIcon {
  --H_icon-size: 1.6em;
  opacity: 0.7;
}

.H_inputBase .H_inputBase__fieldset[error="true"] {
  border-color: var(--col-err);
}

.H_inputBase .H_inputBase__fieldset[focused="true"] {
  border-color: var(--comp-border-color-focus);
}

.H_inputBase .H_inputBase__fieldset[focused="true"] .H_inputBase__legend {
  color: var(--comp-border-color-focus);
}

.H_inputBase .H_inputBase__fieldset[error="true"] .H_inputBase__legend {
  color: var(--col-err);
}

.H_inputBase .H_inputBase__legend {
  position: relative;
  top: -0.66em;
  margin-left: 6px;
  height: 0;
  padding: 0 2px 0 0;
  font-size: 0.8em;
  font-weight: normal;
  color: var(--comp-label-color, rgba(0, 0, 0, 0.6));
  width: auto;
}

.H_inputBase__infoBox {
  position: absolute;
  font-size: 0.6em;
  display: inline-flex;
  width: 100%;
  top: 3em;
  padding-left: 5px;
  line-height: 1em;
  font-size: 0.8em;
}

.H_inputBase__infoBox_hint,
.H_inputBase__infoBox_counter {
  font-family: var(--comp-font-family);
  color: var(--col-info);
}

.H_inputBase__infoBox_counter {
  flex: 1;
  text-align: right;
  padding-right: 4px;
}

.H_inputBase__infoBox_error {
  color: var(--col-err);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
