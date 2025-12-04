<template>
  <div>
    <div class="rubric-header">
      <div class="weight-badge" :class="{ valid: totalWeight === 100 }">
        Total Weight: {{ totalWeight }}%
      </div>
      <div v-if="totalWeight === 100" class="weight-valid">
        ✓ Weights are properly balanced
      </div>
    </div>

    <div class="table-section">
      <h2 class="section-title">Evaluation Criteria</h2>

      <table class="data-table">
        <thead>
          <tr>
            <th>Trait</th>
            <th>Weight (%)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="criterion in rubricCriteria" :key="criterion.id">
            <td><strong>{{ criterion.trait }}</strong></td>
            <td>{{ criterion.weight }}%</td>
            <td>{{ criterion.description }}</td>
            <td>
              <button class="edit-button">
                <i class="mdi mdi-pencil"></i> Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="rubric-buttons">
        <button class="secondary-button">
            Reset
        </button>
        <button class="primary-button">Save Changes</button>
      </div>
    </div>

    <div class="guidelines-card">
      <h3 class="guidelines-title">Rubric Guidelines</h3>
      <ul class="guidelines-list">
        <li>Total weight must equal 100% for the rubric to be valid</li>
        <li>Each trait should have a clear, measurable description</li>
        <li>Weights reflect the relative importance of each criterion</li>
        <li>Changes will apply to all future essay evaluations</li>
        <li>Existing evaluations will not be affected by rubric changes</li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  name: 'RubricSettings',
  props: {
    rubricCriteria: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalWeight() {
      return this.rubricCriteria.reduce((sum, c) => sum + c.weight, 0);
    }
  }
};
</script>

<style scoped>
.rubric-header {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.weight-badge {
  font-size: 18px;
  font-weight: 600;
  color: var(--error-color);
}

.weight-badge.valid {
  color: var(--success-color);
}

.weight-valid {
  color: var(--success-color);
  font-size: 14px;
}

.table-section {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead tr {
  background-color: var(--bg-tertiary);
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-color);
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border-color);
}

.data-table td {
  padding: 16px;
  font-size: 14px;
  color: var(--text-primary);
}

.edit-button {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
  color: var(--text-primary);
}

.edit-button:hover {
  background-color: var(--bg-tertiary);
}

.rubric-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.secondary-button {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

.secondary-button:hover {
  background-color: var(--border-color);
}

.primary-button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

.primary-button:hover {
  background-color: var(--accent-hover);
}

.guidelines-card {
  background-color: var(--accent-light);
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
  border: 2px solid var(--accent-color);
}

.guidelines-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.guidelines-list {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding-left: 20px;
}

.guidelines-list li {
  margin-bottom: 8px;
}
</style>