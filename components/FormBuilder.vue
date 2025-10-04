<template>
  <div>
    <div class="text-2xl font-bold py-5">Form builder</div>
    <div class="flex justify-end mb-2 w-96">
      <div class="text-xs">
        <USwitch
          v-if="addedFields.length > 0"
          v-model="isEdit"
          :label="isEdit ? 'Edit' : 'Preview'"
        />
      </div>
    </div>

    <div
      ref="canvasRef"
      class="border p-4 rounded-md border-gray-300 border-dashed flex flex-col items-center justify-center aspect-[12/8] w-96"
      @dragover.prevent
      @drop="addField"
    >
      <!-- Empty state -->
      <div v-if="!addedFields.length" class="text-xl text-gray-500">
        Drag fields here
      </div>

      <!-- Preview mode -->
      <div v-else-if="!isEdit" class="p-2">
        <form-preview :fields="addedFields" />
      </div>

      <div v-else-if="isEdit">
        <!-- Edit mode: field form -->
        <div v-if="selectedFieldIndex !== null" class="p-2">
          <field-edit-form
            v-model="fieldForm"
            @cancel="selectedFieldIndex = null"
            @save="saveField"
          />
        </div>

        <!-- Edit mode: field list -->
        <div v-else class="p-2">
          <field-card
            v-for="(field, i) in addedFields"
            :key="i"
            v-bind="field"
            class="mb-2"
            draggable="true"
            @click="selectedFieldIndex = i"
            @dragstart="handleDragStart($event, field, 'canvas')"
            @dragend="handleDragEnd($event, i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onDragEnd, onDragStart, onDrop } from "@/utils/dragUtils";

const addedFields = ref([]);
const selectedFieldIndex = ref(null);
const isEdit = ref(true);
const canvasRef = ref(null);

const defaultFieldForm = () => ({
  label: "",
  placeholder: "",
  required: false,
  type: "",
  choices: [],
});

const fieldForm = ref(defaultFieldForm());

function saveField() {
  if (selectedFieldIndex.value !== null) {
    addedFields.value[selectedFieldIndex.value] = { ...fieldForm.value };
  }
  selectedFieldIndex.value = null;
}

function resetFieldForm() {
  fieldForm.value = defaultFieldForm();
}

watch(selectedFieldIndex, (index) => {
  if (index !== null) fieldForm.value = { ...addedFields.value[index] };
  else resetFieldForm();
});

function addField(event) {
  onDrop(event, (data, source) => {
    if (source === "canvas") return;
    const { type } = data;
    addedFields.value.push({ ...defaultFieldForm(), type });
  });
}

function handleDragStart(event, field, source) {
  onDragStart(event, field, source);
}

function handleDragEnd(event, index) {
  onDragEnd(event, canvasRef.value, ({ insideCanvas }) => {
    if (!insideCanvas) {
      addedFields.value.splice(index, 1);
    }
  });
}
</script>
