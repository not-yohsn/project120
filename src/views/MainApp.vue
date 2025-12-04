<template>
  <div class="container" :class="{ 'dark-mode': isDarkMode }">
    <Sidebar 
      :active-nav="activeNav"
      :nav-items="navItems"
      :is-dark-mode="isDarkMode"
      @update-nav="activeNav = $event"
      @toggle-theme="toggleTheme"
    />

    <main class="main-content">
      <Header 
        :page-title="pageTitle"
        :user="user"
        :has-notifications="hasNotifications"
        @show-notifications="showNotifications"
      />

      <div class="content">
        <Dashboard 
          v-if="activeNav === 'Dashboard'"
          :recent-submissions="recentSubmissions"
          :format-date="formatDate"
          @navigate="activeNav = $event"
        />

        <UploadEssay
          v-if="activeNav === 'Upload Essay'"
          :all-students="allStudents"
        />

        <Students
          v-if="activeNav === 'Students'"
          :all-students="allStudents"
        />

        <Reports
          v-if="activeNav === 'Reports'"
        />

        <RubricSettings
          v-if="activeNav === 'Rubric Settings'"
          :rubric-criteria="rubricCriteria"
        />

        <AccountSettings
          v-if="activeNav === 'Account Settings'"
          :user="user"
        />
      </div>
    </main>

    <HelpButton @show-help="showHelp" />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Dashboard from '../components/Dashboard.vue';
import UploadEssay from '../components/UploadEssay.vue';
import Students from '../components/Students.vue';
import Reports from '../components/Reports.vue';
import RubricSettings from '../components/RubricSettings.vue';
import AccountSettings from '../components/AccountSettings.vue';
import HelpButton from '../components/HelpButton.vue';
import { formatDate } from '../utils/dateFormatter.js';

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    Dashboard,
    UploadEssay,
    Students,
    Reports,
    RubricSettings,
    AccountSettings,
    HelpButton
  },
  data() {
    return {
      activeNav: 'Dashboard',
      hasNotifications: true,
      isDarkMode: false,
      user: {
        name: 'Dr. Sarah Johnson',
        role: 'Evaluator',
        initials: 'DS'
      },
      navItems: [
        { name: 'Dashboard'},
        { name: 'Upload Essay'},
        { name: 'Students'},
        { name: 'Reports'},
        { name: 'Rubric Settings'},
        { name: 'Account Settings'}
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
        { student: 'Emily Chen', date: new Date().toISOString().split('T')[0], score: 85, status: 'completed' },
        { student: 'Michael Rodriguez', date: new Date().toISOString().split('T')[0], score: 78, status: 'completed' },
        { student: 'Aisha Patel', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], score: 92, status: 'completed' },
        { student: 'James Wilson', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], score: 88, status: 'completed' },
        { student: 'Sophia Kim', date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], score: null, status: 'pending' },
        { student: 'David Thompson', date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], score: 76, status: 'completed' }
      ],
      rubricCriteria: [
        { id: 1, trait: 'Grammar & Mechanics', weight: 25, description: 'Proper use of grammar, punctuation, spelling, and sentence structure' },
        { id: 2, trait: 'Essay Structure', weight: 25, description: 'Clear introduction, body paragraphs, and conclusion with logical flow' },
        { id: 3, trait: 'Content Quality', weight: 30, description: 'Depth of analysis, relevance of examples, and critical thinking' },
        { id: 4, trait: 'Writing Style', weight: 20, description: 'Clarity, tone, word choice, and overall writing effectiveness' }
      ]
    };
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
    }
  },
  mounted() {
    this.detectSystemTheme();
    
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', this.handleThemeChange);
      } 
      else if (darkModeQuery.addListener) {
        darkModeQuery.addListener(this.handleThemeChange);
      }
    }
  },
  beforeUnmount() {
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (darkModeQuery.removeEventListener) {
        darkModeQuery.removeEventListener('change', this.handleThemeChange);
      } 
      else if (darkModeQuery.removeListener) {
        darkModeQuery.removeListener(this.handleThemeChange);
      }
    }
  },
  methods: {
    detectSystemTheme() {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark-mode');
      } else {
        this.isDarkMode = false;
        document.documentElement.classList.remove('dark-mode');
      }
    },
    handleThemeChange(e) {
      this.isDarkMode = e.matches;
      if (e.matches) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
      // Store preference in localStorage
      localStorage.setItem('theme-preference', this.isDarkMode ? 'dark' : 'light');
    },
    formatDate,
    showNotifications() {
      alert('You have 3 new notifications!');
    },
    showHelp() {
      alert('Help & Support\n\nFor assistance, please contact support@hess.edu');
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Light mode colors */
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --bg-tertiary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --border-color: #e5e7eb;
  --border-color-secondary: #d1d5db;
  --accent-color: #4285f4;
  --accent-hover: #3367d6;
  --success-color: #34a853;
  --success-hover: #2d8e47;
  --warning-color: #f57c00;
  --error-color: #d32f2f;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
}

/* Dark mode colors */
:global(.dark-mode) {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-color: #334155;
  --border-color-secondary: #475569;
  --accent-color: #60a5fa;
  --accent-hover: #3b82f6;
  --success-color: #4ade80;
  --success-hover: #22c55e;
  --warning-color: #fb923c;
  --error-color: #ef4444;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
}

.container {
  display: flex;
  height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-primary);
}

.content {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}
</style>