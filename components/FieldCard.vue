<template>
  <div class="px-5 py-2 border-gray-300 border rounded-md min-w-30">
    <div class="text-xl">
      {{ type }}
    </div>
    <div v-if="label" class="text-[8px]">label: {{ label }}</div>
    <div v-if="placeholder" class="text-[8px]">
      placeholder: {{ placeholder }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
});
</script>
