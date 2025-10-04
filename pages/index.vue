<template>
  <div class="md:w-1/2 mx-auto p-4">
    <div class="flex w-fit gap-5 border-gray-300 border rounded-md">
      <field-palette
        class="border-gray-300 border-r-1 p-4"
        :types="availableTypes"
      />
      <form-builder class="p-4" />
    </div>
  </div>
</template>

<script setup>
const availableTypes = ref(["Long text", "Short text", "Email", "Checkbox"]);
</script>
