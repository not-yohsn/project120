<template>
  <div>
    <div class="filters-row">
      <div class="form-group">
        <label class="form-label">Date Range</label>
        <select class="form-select" v-model="reportFilters.dateRange">
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Subject</label>
        <select class="form-select" v-model="reportFilters.subject">
          <option value="all">All Subjects</option>
          <option value="eng101">English 101</option>
          <option value="eng102">English 102</option>
        </select>
      </div>
    </div>

    <div class="stats-grid">
      <div class="report-card">
        <div class="report-card-label">Total Essays</div>
        <div class="report-card-value">142</div>
        <div class="report-card-meta">This period</div>
      </div>
      <div class="report-card">
        <div class="report-card-label">Average Score</div>
        <div class="report-card-value">83.5</div>
        <div class="report-card-meta positive">+2.3% increase</div>
      </div>
      <div class="report-card">
        <div class="report-card-label">Highest Score</div>
        <div class="report-card-value">98</div>
        <div class="report-card-meta">Sarah Thompson</div>
      </div>
      <div class="report-card">
        <div class="report-card-label">Lowest Score</div>
        <div class="report-card-value">42</div>
        <div class="report-card-meta">Needs attention</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <h3 class="chart-title">Performance Trend</h3>
        <div class="chart-placeholder">
          <svg width="100%" height="200" viewBox="0 0 600 200">
            <polyline
              points="0,150 100,140 200,135 300,130 400,125 500,115 600,110"
              fill="none"
              :stroke="accentColor"
              stroke-width="3"
            />
            <circle v-for="(point, i) in trendPoints" :key="i" 
              :cx="point.x" :cy="point.y" r="5" :fill="accentColor" />
          </svg>
        </div>
      </div>

      <div class="chart-card">
        <h3 class="chart-title">Score Distribution</h3>
        <div class="chart-placeholder">
          <svg width="100%" height="200" viewBox="0 0 400 200">
            <rect x="20" y="150" width="60" height="20" :fill="successColor" />
            <rect x="100" y="120" width="60" height="50" :fill="successColor" />
            <rect x="180" y="80" width="60" height="90" :fill="successColor" />
            <rect x="260" y="50" width="60" height="120" :fill="successColor" />
            <rect x="340" y="90" width="60" height="80" :fill="successColor" />
            <text x="50" y="190" font-size="12" text-anchor="middle" :fill="textSecondary">0-20</text>
            <text x="130" y="190" font-size="12" text-anchor="middle" :fill="textSecondary">21-40</text>
            <text x="210" y="190" font-size="12" text-anchor="middle" :fill="textSecondary">41-60</text>
            <text x="290" y="190" font-size="12" text-anchor="middle" :fill="textSecondary">61-80</text>
            <text x="370" y="190" font-size="12" text-anchor="middle" :fill="textSecondary">81-100</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reports',
  data() {
    return {
      reportFilters: {
        dateRange: '30',
        subject: 'all'
      },
      trendPoints: [
        { x: 0, y: 150 },
        { x: 100, y: 140 },
        { x: 200, y: 135 },
        { x: 300, y: 130 },
        { x: 400, y: 125 },
        { x: 500, y: 115 },
        { x: 600, y: 110 }
      ]
    };
  },
  computed: {
    accentColor() {
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      return isDarkMode ? '#60a5fa' : '#4285f4';
    },
    successColor() {
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      return isDarkMode ? '#4ade80' : '#34a853';
    },
    textSecondary() {
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      return isDarkMode ? '#cbd5e1' : '#6b7280';
    }
  }
};
</script>

<style scoped>
.filters-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.form-select {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-family: inherit;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.report-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.report-card-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.report-card-value {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.report-card-meta {
  font-size: 13px;
  color: var(--text-secondary);
}

.report-card-meta.positive {
  color: var(--success-color);
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 30px;
}

.chart-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.chart-placeholder {
  width: 100%;
  height: 200px;
}
</style>