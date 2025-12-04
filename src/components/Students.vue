<template>
  <div>
    <div class="students-header">
      <div>
        <h2 class="section-title">Manage Students</h2>
        <p class="section-subtitle">Add, edit, or view student information and performance</p>
      </div>
      <button class="primary-button"> Add New Student</button>
    </div>

    <div class="search-bar">
      <input
        type="text"
        placeholder="Search students by name or email..."
        class="search-input"
        v-model="studentSearch"
      >
    </div>

    <div class="stats-row">
      <div class="mini-stat-card">
        <div class="mini-stat-label">Total Students</div>
        <div class="mini-stat-value">{{ allStudents.length }}</div>
      </div>
      <div class="mini-stat-card">
        <div class="mini-stat-label">Class Average</div>
        <div class="mini-stat-value">83.5</div>
      </div>
    </div>

    <div class="table-section">
      <h3 class="section-title">All Students</h3>

      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Essays Submitted</th>
            <th>Average Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.id">
            <td>
              <div class="student-name-cell">
                <div class="student-avatar" :style="{ backgroundColor: student.color }">
                  {{ student.initials }}
                </div>
                <span>{{ student.name }}</span>
              </div>
            </td>
            <td>{{ student.email }}</td>
            <td>
              <span class="class-badge">{{ student.class }}</span>
            </td>
            <td>{{ student.essays }}</td>
            <td>
              <span :style="{ color: getScoreColor(student.avgScore) }">
                {{ student.avgScore }}
              </span>
            </td>
            <td>
              <button class="action-button">⋮</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  name: 'Students',
  props: {
    allStudents: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      studentSearch: ''
    };
  },
  computed: {
    filteredStudents() {
      if (!this.studentSearch) return this.allStudents;
      const search = this.studentSearch.toLowerCase();
      return this.allStudents.filter(student => 
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search)
      );
    }
  },
  methods: {
    getScoreColor(score) {
      if (score >= 90) return '#2e7d32';
      if (score >= 80) return '#f57c00';
      return '#d32f2f';
    }
  }
};
</script>

<style scoped>
.students-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.section-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
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
  transition: background-color 0.2s, transform 0.2s;
  white-space: nowrap;
}

.primary-button:hover {
  background-color: var(--accent-hover);
}

.primary-button:active {
  transform: scale(0.98);
}

.search-bar {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-family: inherit;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.mini-stat-card {
  background-color: var(--bg-secondary);
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.mini-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.mini-stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.mini-stat-value {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
}

.table-section {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  white-space: nowrap;
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.data-table tbody tr:hover {
  background-color: var(--bg-tertiary);
}

.data-table td {
  padding: 16px;
  font-size: 14px;
  color: var(--text-primary);
}

.student-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.student-avatar {
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.class-badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--accent-light);
  color: var(--accent-color);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.action-button {
  padding: 6px 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.action-button:hover {
  color: var(--text-primary);
}

/* Tablet & Small Screens (768px and below) */
@media (max-width: 768px) {
  .students-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .primary-button {
    width: 100%;
    padding: 10px 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .stats-row {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .mini-stat-card {
    padding: 16px;
  }

  .mini-stat-label {
    font-size: 12px;
  }

  .mini-stat-value {
    font-size: 24px;
  }

  .table-section {
    padding: 16px;
    margin-bottom: 16px;
  }

  .data-table th {
    padding: 10px 12px;
    font-size: 12px;
  }

  .data-table td {
    padding: 12px;
    font-size: 13px;
  }

  .student-avatar {
    width: 28px;
    height: 28px;
    min-width: 28px;
    font-size: 11px;
  }
}

/* Mobile Screens (480px and below) */
@media (max-width: 480px) {
  .students-header {
    flex-direction: column;
    align-items: stretch;
  }

  .section-title {
    font-size: 14px;
  }

  .section-subtitle {
    font-size: 12px;
  }

  .primary-button {
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
  }

  .search-input {
    padding: 10px 12px;
    font-size: 13px;
  }

  .stats-row {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .mini-stat-card {
    padding: 12px;
    border-radius: 8px;
  }

  .mini-stat-label {
    font-size: 11px;
  }

  .mini-stat-value {
    font-size: 20px;
  }

  .table-section {
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .section-title {
    font-size: 13px;
    margin-bottom: 12px;
  }

  /* Stack table on very small screens */
  .data-table {
    font-size: 12px;
    margin-top: 12px;
  }

  .data-table thead {
    display: none;
  }

  .data-table tbody tr {
    display: block;
    margin-bottom: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .data-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    text-align: right;
  }

  .data-table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-align: left;
    flex-shrink: 0;
  }

  .student-name-cell {
    display: flex;
    gap: 8px;
  }

  .student-avatar {
    width: 24px;
    height: 24px;
    min-width: 24px;
    font-size: 10px;
  }

  .action-button {
    padding: 4px 8px;
    font-size: 14px;
  }

  .class-badge {
    padding: 3px 8px;
    font-size: 11px;
  }
}

/* Extra small screens (320px and below) */
@media (max-width: 320px) {
  .students-header {
    gap: 8px;
  }

  .section-title {
    font-size: 13px;
  }

  .stats-row {
    gap: 8px;
  }

  .mini-stat-card {
    padding: 10px;
  }

  .mini-stat-label {
    font-size: 10px;
  }

  .mini-stat-value {
    font-size: 18px;
  }

  .table-section {
    padding: 8px;
  }

  .data-table td {
    padding: 6px;
    font-size: 11px;
  }
}
</style>