<template>
  <div>
    <div class="text-2xl font-bold py-5">Field palette</div>
    <field-card
      v-for="(type, i) in types"
      :key="i"
      class="mb-2"
      :type="type"
      draggable="true"
      @dragstart="onDragStart($event, { type })"
    />
  </div>
</template>
<script setup>
import { onDragStart } from "@/utils/dragUtils";

const props = defineProps({
  types: {
    type: Array,
    required: true,
  },
});
</script>
