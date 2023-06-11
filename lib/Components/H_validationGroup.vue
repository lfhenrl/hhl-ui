<template>
  <div ref="_validator" class="h_validationGroup">
    <slot />
    <div>
      <div v-for="item in errorList">Label: {{ item.label }} Error: {{ item.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';

const E = defineEmits(["isValidChanged"]);
defineExpose({ isValid, getErrorList, Validate });
const _validator = ref<any>();
const errorList = ref<any>([]);
let _isValid = true;

function isValid() {
  return _isValid;
}

function getErrorList() {
  return toRaw(errorList.value);
}

function Validate() {
  const _errorList: any = [];
  const children = _validator.value.querySelectorAll("[error=true]");
  children.forEach((ele: any) => {
    const errText = ele.getAttribute("err_text");
    const errLabel = ele.getAttribute("err_label");
    const errorRecord = {
      label: errLabel,
      error: errText
    };
    _errorList.push(errorRecord);
  });
  _isValid = _errorList.length === 0 ? true : false;
  errorList.value = _errorList;
  E("isValidChanged", _isValid);
}

const observer = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === "attributes") {
      Validate();
    }
  });
});

onMounted(() => {
  observer.observe(_validator.value, {
    childList: true, // observe direct children
    subtree: true, // and lower descendants too
    attributes: true,
    attributeFilter: ["error"]
  });
  setTimeout(() => {
    Validate();
  }, 100);
});
</script>

<style>
.h_validationGroup {
  overflow: auto;
}
</style>
