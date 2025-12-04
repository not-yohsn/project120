<template>
  <div>
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon stat-icon-blue">
          <i class="mdi mdi-file-document"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Essays Checked</div>
          <div class="stat-value">142</div>
          <div class="stat-change">+12 this week</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon-green">
          <i class="mdi mdi-chart-line"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Average Score</div>
          <div class="stat-value">83.5</div>
          <div class="stat-change">+2.3 from last month</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon-orange">
          <i class="mdi mdi-timer-sand"></i>
        </div>
        <div class="stat-content">
          <div class="stat-label">Pending Reviews</div>
          <div class="stat-value">3</div>
          <div class="stat-change attention">Requires attention</div>
        </div>
      </div>
    </div>

    <!-- Recent Submissions -->
    <div class="table-section">
      <div class="table-section-header">
        <div>
          <h2 class="section-title">Recent Submissions</h2>
          <p class="section-subtitle">Latest essay evaluations</p>
        </div>
        <button class="primary-button" @click="$emit('navigate', 'Upload Essay')">
          Upload New Essay
        </button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sub, idx) in recentSubmissions" :key="idx">
            <td>{{ sub.student }}</td>
            <td>{{ formatDate(sub.date) }}</td>
            <td>{{ sub.score ? sub.score + '/100' : '—' }}</td>
            <td>
              <span class="status-badge" :class="sub.status">{{ sub.status }}</span>
            </td>
            <td>
              <button class="view-button">
                <i class="mdi mdi-eye"></i> View
              </button>
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
  name: 'Dashboard',
  props: {
    recentSubmissions: {
      type: Array,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    }
  },
  emits: ['navigate']
};
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #1e293b;
  transition: background-color 0.3s ease;
}

.stat-icon-blue {
  background-color: #e3f2fd;
}

.stat-icon-green {
  background-color: #e8f5e9;
}

.stat-icon-orange {
  background-color: #fff3e0;
}

html.dark-mode .stat-icon-blue {
  background-color: #1e3a8a;
}

html.dark-mode .stat-icon-green {
  background-color: #064e3b;
}

html.dark-mode .stat-icon-orange {
  background-color: #7c2d12;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  word-break: break-word;
}

.stat-change {
  font-size: 13px;
  color: var(--success-color);
  word-break: break-word;
}

.stat-change.attention {
  color: var(--warning-color);
}

.table-section {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
  overflow-x: auto;
}

.table-section-header {
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

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.status-badge.completed {
  background-color: var(--success-light);
  color: var(--success-color);
}

.status-badge.pending {
  background-color: var(--warning-light);
  color: var(--warning-color);
}

.view-button {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-secondary);
  font-family: inherit;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.view-button:hover {
  background-color: var(--bg-tertiary);
}

.view-button:active {
  transform: scale(0.98);
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
  white-space: nowrap;
  transition: background-color 0.2s, transform 0.2s;
}

.primary-button:hover {
  background-color: var(--accent-hover);
}

.primary-button:active {
  transform: scale(0.98);
}

/* Tablet & Small Screens (768px and below) */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  .stat-card {
    padding: 16px;
    gap: 12px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 24px;
  }

  .stat-change {
    font-size: 12px;
  }

  .table-section {
    padding: 16px;
    margin-bottom: 16px;
  }

  .table-section-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .data-table th {
    padding: 10px 12px;
    font-size: 12px;
  }

  .data-table td {
    padding: 12px;
    font-size: 13px;
  }

  .view-button {
    padding: 5px 10px;
    font-size: 12px;
  }

  .primary-button {
    width: 100%;
    padding: 10px 16px;
    font-size: 13px;
  }
}

/* Mobile Screens (480px and below) */
@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .stat-card {
    padding: 12px;
    gap: 10px;
    flex-direction: row;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 20px;
  }

  .stat-change {
    font-size: 11px;
  }

  .table-section {
    padding: 12px;
    border-radius: 8px;
  }

  .table-section-header {
    gap: 8px;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
  }

  .section-subtitle {
    font-size: 12px;
  }

  .data-table th {
    padding: 8px;
    font-size: 11px;
  }

  .data-table td {
    padding: 8px;
    font-size: 12px;
  }

  .status-badge {
    padding: 3px 8px;
    font-size: 11px;
  }

  .view-button {
    padding: 4px 8px;
    font-size: 11px;
  }

  .primary-button {
    width: 100%;
    padding: 8px 12px;
    font-size: 12px;
  }

  /* Stack table on very small screens */
  .data-table {
    font-size: 12px;
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
    display: block;
    padding: 8px;
    text-align: right;
    position: relative;
    padding-left: 50%;
  }

  .data-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 8px;
    font-weight: 600;
    text-align: left;
  }

  .data-table td:last-child {
    text-align: center;
  }
}

/* Extra small screens (320px and below) */
@media (max-width: 320px) {
  .stats-grid {
    gap: 8px;
    margin-bottom: 12px;
  }

  .stat-card {
    padding: 8px;
    gap: 8px;
  }

  .stat-icon {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .stat-label {
    font-size: 10px;
  }

  .stat-value {
    font-size: 18px;
  }

  .section-title {
    font-size: 13px;
  }

  .table-section {
    padding: 8px;
    margin-bottom: 12px;
  }

  .data-table td {
    padding: 6px;
    font-size: 11px;
  }

  .view-button {
    padding: 3px 6px;
    font-size: 10px;
  }
}
</style>