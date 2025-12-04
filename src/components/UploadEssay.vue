<template>
  <div>
    <div
      class="upload-section"
      :class="{ 'drag-over': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div class="upload-icon">
        <i class="mdi mdi-upload"></i>
      </div>
      <div class="upload-title">Upload Essay Image</div>
      <div class="upload-subtitle">Drag and drop your file here, or click to browse</div>
      <div class="upload-formats">Supports: JPG, PNG, PDF (Max 10MB)</div>
      <button class="choose-file-btn" @click="triggerFileInput">
        Choose File
      </button>
      <input
        type="file"
        ref="fileInput"
        class="file-input"
        accept=".jpg,.jpeg,.png,.pdf"
        @change="handleFileSelect"
      >
      <div v-if="uploadedFile" class="uploaded-file">
        📄 {{ uploadedFile.name }}
      </div>
    </div>

    <div class="details-section">
      <h2 class="section-title">Essay Details</h2>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Student Name</label>
          <select class="form-select" v-model="formData.studentName">
            <option value="">Select student</option>
            <option v-for="student in allStudents" :key="student.id" :value="student.name">
              {{ student.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Subject</label>
          <input
            type="text"
            class="form-input"
            placeholder="e.g., English Literature"
            v-model="formData.subject"
          >
        </div>
      </div>

      <div class="form-group full-width">
        <label class="form-label">Essay Topic</label>
        <input
          type="text"
          class="form-input"
          placeholder="Enter essay topic or prompt"
          v-model="formData.topic"
        >
      </div>

      <button
        class="submit-btn"
        @click="submitForm"
        :disabled="!isFormValid"
      >
        Submit for Analysis
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadEssay',
  props: {
    allStudents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDragging: false,
      uploadedFile: null,
      formData: {
        studentName: '',
        subject: '',
        topic: ''
      }
    };
  },
  computed: {
    isFormValid() {
      return this.uploadedFile &&
             this.formData.studentName &&
             this.formData.subject &&
             this.formData.topic;
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.validateAndSetFile(file);
      }
    },
    handleDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file) {
        this.validateAndSetFile(file);
      }
    },
    validateAndSetFile(file) {
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a JPG, PNG, or PDF file.');
        return;
      }

      if (file.size > maxSize) {
        alert('File size must be less than 10MB.');
        return;
      }

      this.uploadedFile = file;
    },
    submitForm() {
      if (this.isFormValid) {
        console.log('Submitting form:', {
          file: this.uploadedFile.name,
          student: this.formData.studentName,
          subject: this.formData.subject,
          topic: this.formData.topic
        });
        alert('Essay submitted successfully!');
        this.resetForm();
      }
    },
    resetForm() {
      this.uploadedFile = null;
      this.formData = {
        studentName: '',
        subject: '',
        topic: ''
      };
      this.$refs.fileInput.value = '';
    }
  }
};
</script>

<style scoped>
.upload-section {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 60px;
  margin-bottom: 30px;
  border: 2px dashed var(--border-color);
  text-align: center;
  transition: all 0.2s;
}

.upload-section.drag-over {
  border-color: var(--accent-color);
  background-color: var(--bg-tertiary);
}

.upload-icon {
  width: 80px;
  height: 80px;
  background-color: var(--bg-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: var(--accent-color);
  font-size: 32px;
}

.upload-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.upload-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.upload-formats {
  color: var(--text-tertiary);
  font-size: 13px;
  margin-bottom: 24px;
}

.choose-file-btn {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}

.choose-file-btn:hover {
  background-color: var(--accent-hover);
}

.file-input {
  display: none;
}

.uploaded-file {
  margin-top: 20px;
  padding: 12px;
  background-color: var(--success-light);
  border-radius: 6px;
  display: inline-block;
  color: var(--text-primary);
}

.details-section {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.form-select {
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background-color: var(--success-color);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  font-family: inherit;
}

.submit-btn:hover {
  background-color: var(--success-hover);
}

.submit-btn:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}
</style>