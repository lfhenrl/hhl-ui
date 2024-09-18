<template>
  <div ref="hform" class="H_form"><slot /></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { debounce } from "../utils/debounce";

const props = defineProps({
  data: { type: Object, default: {} },
  dirty: { type: Boolean, default: false },
});
const emit = defineEmits(["update:dirty", "valid", "dirtyValid"]);

const hform = ref();
const isvalid = debounce(_isvalid, 300);

watch(
  () => props.data,
  () => {
    emit("update:dirty", true);
    isvalid();
  },
  { deep: true }
);

watch(
  () => props.dirty,
  () => {
    isvalid();
  }
);

function _isvalid() {
  const w = hform.value;
  const errors = w.querySelectorAll("*[data-error=true]");
  const isvalid = errors.length < 1 ? true : false;
  const isdirtyAndValid = props.dirty === true && isvalid === true ? true : false;
  emit("valid", isvalid);
  emit("dirtyValid", isdirtyAndValid);
}

onMounted(() => {
  isvalid();
});
</script>
<style>
@layer hhl-components {
  .H_form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
}
</style>
