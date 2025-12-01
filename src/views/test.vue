<template>
  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-circle">H</div>
        <div class="logo-title">HESS</div>
        <div class="logo-subtitle">Essay Scoring</div>
      </div>

      <nav class="nav">
        <a
          v-for="item in navItems"
          :key="item.name"
          href="#"
          class="nav-item"
          :class="{ active: activeNav === item.name }"
          @click.prevent="activeNav = item.name"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          {{ item.name }}
        </a>
      </nav>

      <div class="privacy-notice">
        Do not sell or share my personal info
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="header">
        <h1 class="header-title">{{ pageTitle }}</h1>
        <div class="user-info">
          <div class="notification" @click="showNotifications">
            🔔
            <span v-if="hasNotifications" class="notification-badge"></span>
          </div>
          <div class="user-profile">
            <div class="user-details">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-role">{{ user.role }}</div>
            </div>
            <div class="user-avatar">{{ user.initials }}</div>
          </div>
        </div>
      </header>

      <div class="content">
        <!-- Dashboard Content -->
        <div v-if="activeNav === 'Dashboard'">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #e3f2fd;">📄</div>
              <div class="stat-content">
                <div class="stat-label">Total Essays Checked</div>
                <div class="stat-value">142</div>
                <div class="stat-change">+12 this week</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #e8f5e9;">📈</div>
              <div class="stat-content">
                <div class="stat-label">Average Score</div>
                <div class="stat-value">83.5</div>
                <div class="stat-change">+2.3 from last month</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #fff3e0;">⏰</div>
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
              <button class="primary-button" @click="activeNav = 'Upload Essay'">Upload New Essay</button>
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
                  <td>{{ sub.date }}</td>
                  <td>{{ sub.score ? sub.score + '/100' : '—' }}</td>
                  <td>
                    <span class="status-badge" :class="sub.status">{{ sub.status }}</span>
                  </td>
                  <td>
                    <button class="view-button">👁️ View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Upload Essay Content -->
        <div v-if="activeNav === 'Upload Essay'">
          <div
            class="upload-section"
            :class="{ 'drag-over': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <div class="upload-icon">⬆️</div>
            <div class="upload-title">Upload Essay Image</div>
            <div class="upload-subtitle">Drag and drop your file here, or click to browse</div>
            <div class="upload-formats">Supports: JPG, PNG, PDF (Max 10MB)</div>
            <button class="choose-file-btn" @click="triggerFileInput">
              <span>🖼️</span>
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

        <!-- Students Content -->
        <div v-if="activeNav === 'Students'">
          <div class="students-header">
            <div>
              <h2 class="section-title">Manage Students</h2>
              <p class="section-subtitle">Add, edit, or view student information and performance</p>
            </div>
            <button class="primary-button">👥 Add New Student</button>
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

        <!-- Reports Content -->
        <div v-if="activeNav === 'Reports'">
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
                    stroke="#4285f4"
                    stroke-width="3"
                  />
                  <circle v-for="(point, i) in trendPoints" :key="i" 
                    :cx="point.x" :cy="point.y" r="5" fill="#4285f4" />
                </svg>
              </div>
            </div>

            <div class="chart-card">
              <h3 class="chart-title">Score Distribution</h3>
              <div class="chart-placeholder">
                <svg width="100%" height="200" viewBox="0 0 400 200">
                  <rect x="20" y="150" width="60" height="20" fill="#34a853" />
                  <rect x="100" y="120" width="60" height="50" fill="#34a853" />
                  <rect x="180" y="80" width="60" height="90" fill="#34a853" />
                  <rect x="260" y="50" width="60" height="120" fill="#34a853" />
                  <rect x="340" y="90" width="60" height="80" fill="#34a853" />
                  <text x="50" y="190" font-size="12" text-anchor="middle">0-20</text>
                  <text x="130" y="190" font-size="12" text-anchor="middle">21-40</text>
                  <text x="210" y="190" font-size="12" text-anchor="middle">41-60</text>
                  <text x="290" y="190" font-size="12" text-anchor="middle">61-80</text>
                  <text x="370" y="190" font-size="12" text-anchor="middle">81-100</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Rubric Settings Content -->
        <div v-if="activeNav === 'Rubric Settings'">
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
                    <button class="edit-button">✏️</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="rubric-buttons">
              <button class="secondary-button">🔄 Reset to Default</button>
              <button class="primary-button">💾 Save Changes</button>
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

        <!-- Account Settings Content -->
        <div v-if="activeNav === 'Account Settings'">
          <div class="account-card">
            <div class="avatar-section">
              <div class="large-avatar">{{ user.initials }}</div>
              <button class="secondary-button">Change Photo</button>
              <div class="photo-hint">JPG, PNG or GIF (max 2MB)</div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-input"
                  v-model="accountData.fullName"
                >
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input
                  type="email"
                  class="form-input"
                  v-model="accountData.email"
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Institution</label>
                <input
                  type="text"
                  class="form-input"
                  v-model="accountData.institution"
                >
              </div>
              <div class="form-group">
                <label class="form-label">Department</label>
                <input
                  type="text"
                  class="form-input"
                  v-model="accountData.department"
                >
              </div>
            </div>
          </div>

          <div class="security-card">
            <div class="security-header">
              <div class="security-icon">🔒</div>
              <h3 class="section-title">Security Settings</h3>
            </div>

            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input
                type="password"
                class="form-input"
                placeholder="••••••••"
                v-model="passwordData.current"
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">New Password</label>
                <input
                  type="password"
                  class="form-input"
                  placeholder="••••••••"
                  v-model="passwordData.new"
                >
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-input"
                  placeholder="••••••••"
                  v-model="passwordData.confirm"
                >
              </div>
            </div>

            <button class="update-button">Update Password</button>
          </div>

          <div class="account-buttons">
            <button class="secondary-button">Cancel</button>
            <button class="primary-button">💾 Save Changes</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Help Button -->
    <button class="help-button" @click="showHelp">?</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNav: 'Dashboard',
      isDragging: false,
      uploadedFile: null,
      hasNotifications: true,
      studentSearch: '',
      user: {
        name: 'Dr. Sarah Johnson',
        role: 'Evaluator',
        initials: 'DS'
      },
      navItems: [
        { name: 'Dashboard', icon: '📊' },
        { name: 'Upload Essay', icon: '⬆️' },
        { name: 'Students', icon: '👥' },
        { name: 'Reports', icon: '📄' },
        { name: 'Rubric Settings', icon: '📋' },
        { name: 'Account Settings', icon: '⚙️' }
      ],
      allStudents: [
        { id: 1, name: 'Emily Chen', initials: 'EC', email: 'emily.chen@student.edu', class: 'English 101', essays: 12, avgScore: 85, color: '#4285f4' },
        { id: 2, name: 'Michael Rodriguez', initials: 'MR', email: 'michael.r@student.edu', class: 'English 101', essays: 10, avgScore: 78, color: '#4285f4' },
        { id: 3, name: 'Aisha Patel', initials: 'AP', email: 'aisha.p@student.edu', class: 'English 102', essays: 15, avgScore: 92, color: '#4285f4' },
        { id: 4, name: 'James Wilson', initials: 'JW', email: 'james.w@student.edu', class: 'English 101', essays: 11, avgScore: 88, color: '#4285f4' },
        { id: 5, name: 'Sophia Kim', initials: 'SK', email: 'sophia.k@student.edu', class: 'English 102', essays: 8, avgScore: 81, color: '#4285f4' },
        { id: 6, name: 'David Thompson', initials: 'DT', email: 'david.t@student.edu', class: 'English 101', essays: 9, avgScore: 76, color: '#4285f4' }
      ],
      recentSubmissions: [
        { student: 'Emily Chen', date: '2025-10-15', score: 85, status: 'completed' },
        { student: 'Michael Rodriguez', date: '2025-10-15', score: 78, status: 'completed' },
        { student: 'Aisha Patel', date: '2025-10-14', score: 92, status: 'completed' },
        { student: 'James Wilson', date: '2025-10-14', score: 88, status: 'completed' },
        { student: 'Sophia Kim', date: '2025-10-13', score: null, status: 'pending' },
        { student: 'David Thompson', date: '2025-10-13', score: 76, status: 'completed' }
      ],
      rubricCriteria: [
        { id: 1, trait: 'Grammar & Mechanics', weight: 25, description: 'Proper use of grammar, punctuation, spelling, and sentence structure' },
        { id: 2, trait: 'Essay Structure', weight: 25, description: 'Clear introduction, body paragraphs, and conclusion with logical flow' },
        { id: 3, trait: 'Content Quality', weight: 30, description: 'Depth of analysis, relevance of examples, and critical thinking' },
        { id: 4, trait: 'Writing Style', weight: 20, description: 'Clarity, tone, word choice, and overall writing effectiveness' }
      ],
      formData: {
        studentName: '',
        subject: '',
        topic: ''
      },
      reportFilters: {
        dateRange: '30',
        subject: 'all'
      },
      accountData: {
        fullName: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        institution: 'Harvard University',
        department: 'English Literature'
      },
      passwordData: {
        current: '',
        new: '',
        confirm: ''
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
    }
  },
  computed: {
    pageTitle() {
      const titles = {
        'Dashboard': 'Dashboard',
        'Upload Essay': 'Upload Essay',
        'Students': 'Student Management',
        'Reports': 'Reports & Analytics',
        'Rubric Settings': 'Rubric Settings',
        'Account Settings': 'Account Settings'
      };
      return titles[this.activeNav] || this.activeNav;
    },
    isFormValid() {
      return this.uploadedFile &&
             this.formData.studentName &&
             this.formData.subject &&
             this.formData.topic;
    },
    filteredStudents() {
      if (!this.studentSearch) return this.allStudents;
      const search = this.studentSearch.toLowerCase();
      return this.allStudents.filter(student => 
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search)
      );
    },
    totalWeight() {
      return this.rubricCriteria.reduce((sum, c) => sum + c.weight, 0);
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
    },
    showNotifications() {
      alert('You have 3 new notifications!');
    },
    showHelp() {
      alert('Help & Support\n\nFor assistance, please contact support@hess.edu');
    },
    getScoreColor(score) {
      if (score >= 90) return '#2e7d32';
      if (score >= 80) return '#f57c00';
      return '#d32f2f';
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #f8f9fa;
  color: #1f2937;
}

.container {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 24px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background-color: #4285f4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
}

.logo-title {
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
}

.logo-subtitle {
  font-size: 13px;
  color: #6b7280;
}

.nav {
  padding: 20px 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f9fafb;
}

.nav-item.active {
  background-color: #4285f4;
  color: white;
  margin: 0 10px;
  border-radius: 8px;
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
}

.privacy-notice {
  padding: 16px;
  margin: 16px;
  background-color: #1f2937;
  color: white;
  font-size: 12px;
  border-radius: 6px;
  text-align: center;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f8f9fa;
}

.header {
  background-color: white;
  padding: 20px 40px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 20px;
  font-weight: 500;
  color: #1f2937;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification {
  position: relative;
  cursor: pointer;
  font-size: 20px;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 8px;
  height: 8px;
  background-color: #ff9800;
  border-radius: 50%;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #4285f4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.user-details {
  text-align: right;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
}

.content {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 13px;
  color: #2e7d32;
}

.stat-change.attention {
  color: #f57c00;
}

/* Table Section */
.table-section {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 24px;
}

.table-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.section-subtitle {
  font-size: 14px;
  color: #6b7280;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead tr {
  background-color: #f9fafb;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
}

.data-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 16px;
  font-size: 14px;
  color: #1f2937;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.completed {
  background-color: #d1f4e0;
  color: #2e7d32;
}

.status-badge.pending {
  background-color: #fff3e0;
  color: #f57c00;
}

.view-button {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #4b5563;
  font-family: inherit;
}

.view-button:hover {
  background-color: #f9fafb;
}

.primary-button {
  background-color: #4285f4;
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
  background-color: #3367d6;
}

/* Upload Section */
.upload-section {
  background-color: white;
  border-radius: 12px;
  padding: 60px;
  margin-bottom: 30px;
  border: 2px dashed #e5e7eb;
  text-align: center;
  transition: all 0.2s;
}

.upload-section.drag-over {
  border-color: #4285f4;
  background-color: #f0f7ff;
}

.upload-icon {
  width: 80px;
  height: 80px;
  background-color: #e3f2fd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #4285f4;
  font-size: 32px;
}

.upload-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #1f2937;
}

.upload-subtitle {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
}

.upload-formats {
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 24px;
}

.choose-file-btn {
  background-color: #4285f4;
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
  background-color: #3367d6;
}

.file-input {
  display: none;
}

.uploaded-file {
  margin-top: 20px;
  padding: 12px;
  background-color: #f0f7ff;
  border-radius: 6px;
  display: inline-block;
}

/* Details Section */
.details-section {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  color: #374151;
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #4285f4;
}

.form-select {
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background-color: #34a853;
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
  background-color: #2d8e47;
}

.submit-btn:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

/* Students */
.students-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-bar {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: #4285f4;
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.mini-stat-card {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.mini-stat-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.mini-stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
}

.student-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.class-badge {
  padding: 4px 12px;
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.action-button {
  padding: 6px 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* Reports */
.filters-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.report-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.report-card-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.report-card-value {
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.report-card-meta {
  font-size: 13px;
  color: #6b7280;
}

.report-card-meta.positive {
  color: #2e7d32;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 30px;
}

.chart-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.chart-placeholder {
  width: 100%;
  height: 200px;
}

/* Rubric Settings */
.rubric-header {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.weight-badge {
  font-size: 18px;
  font-weight: 600;
  color: #d32f2f;
}

.weight-badge.valid {
  color: #2e7d32;
}

.weight-valid {
  color: #2e7d32;
  font-size: 14px;
}

.edit-button {
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;
}

.edit-button:hover {
  background-color: #f9fafb;
}

.rubric-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.secondary-button {
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

.secondary-button:hover {
  background-color: #e5e7eb;
}

.guidelines-card {
  background-color: #f0f7ff;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
  border: 2px solid #4285f4;
}

.guidelines-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.guidelines-list {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.8;
  padding-left: 20px;
}

/* Account Settings */
.account-card {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  gap: 12px;
}

.large-avatar {
  width: 80px;
  height: 80px;
  background-color: #4285f4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 32px;
}

.photo-hint {
  font-size: 13px;
  color: #6b7280;
}

.security-card {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.security-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.security-icon {
  width: 40px;
  height: 40px;
  background-color: #e8f5e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.update-button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  font-family: inherit;
}

.update-button:hover {
  background-color: #3367d6;
}

.account-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Help Button */
.help-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: #1f2937;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border: none;
}

.help-button:hover {
  transform: scale(1.1);
  background-color: #374151;
}
</style>