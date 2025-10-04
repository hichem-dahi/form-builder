<template>
  <div class="p-2">
    <h2 class="font-bold mb-4">Form preview</h2>
    <UForm
      :state="form"
      :schema="schema"
      class="space-y-4"
      @submit="submitForm"
    >
      <template v-for="(field, i) in fields" :key="i">
        <!-- Label -->
        <UFormField
          v-if="field.type == 'Short text' || field.type == 'Email'"
          :name="field.label"
          :label="field.label"
          :required="field.required"
        >
          <UInput
            v-model="form[field.label]"
            :placeholder="field.placeholder"
          />
        </UFormField>
        <UFormField
          v-else-if="field.type == 'Long text'"
          :name="field.label"
          :label="field.label"
          :required="field.required"
        >
          <UTextarea
            v-model="form[field.label]"
            :placeholder="field.placeholder"
          />
        </UFormField>
        <UFormField
          v-else-if="field.type == 'Checkbox'"
          :name="field.label"
          :label="field.label"
          :required="field.required"
        >
          <UCheckboxGroup
            v-if="field.choices.length > 0"
            v-model="form[field.label]"
            :label="field.label"
            :items="field.choices"
          />
          <UCheckbox v-else />
        </UFormField>
      </template>
      <!-- Actions -->
      <div>
        <UButton type="submit"> Submit </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { string, object, array } from "yup";

defineEmits(["cancel"]);

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
});

// Reactive form object where keys = field keys
const form = ref({});

// Initialize form keys with empty values
const schemaShape = {};
props.fields.forEach((field) => {
  let validator;
  let initialValue = null;

  if (field.type === "Short text" || field.type === "Long text") {
    validator = string();
    initialValue = "";
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }
  }

  if (field.type === "Email") {
    validator = string()
      .email("Invalid email format")
      .required(`${field.label} is required`);
    initialValue = "";
  }

  if (field.type === "Checkbox") {
    validator = array();
    initialValue = [];
    if (field.required) {
      validator = validator.min(1, `${field.label} is required`);
    }
  }

  schemaShape[field.label] = validator;

  form.value[field.label] = initialValue;
});

const schema = object(schemaShape);

const submitForm = () => {
  alert("Check console");
  console.log("Form submitted:", form.value);
};
</script>
