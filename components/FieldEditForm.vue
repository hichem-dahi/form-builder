<template>
  <div class="p-2">
    <h2 class="font-bold mb-4">Edit Field: {{ field.type }}</h2>
    <UForm :state="field" class="space-y-4">
      <!-- Label -->
      <UFormField label="Label">
        <UInput v-model="field.label" placeholder="Enter label" />
      </UFormField>

      <!-- Placeholder -->
      <UFormField v-if="field.type !== 'Checkbox'" label="Placeholder">
        <UInput v-model="field.placeholder" placeholder="Enter placeholder" />
      </UFormField>

      <UFormField v-if="field.type === 'Checkbox'" label="Choices">
        <UInputTags v-model="field.choices" add-on-blur />
      </UFormField>

      <!-- Required -->
      <UFormField>
        <UCheckbox v-model="field.required" label="Required" />
      </UFormField>
      <!-- Actions -->
      <div class="flex gap-2 p-4">
        <UButton color="secondary" variant="soft" @click="$emit('cancel')">
          Cancel
        </UButton>
        <UButton color="info" @click="$emit('save', field)"> Save </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
defineEmits(["cancel", "save"]);

const field = defineModel({
  default: { label: "", placeholder: "", required: false, type: "" },
});
</script>
