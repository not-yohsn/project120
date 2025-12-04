<template>
  <header class="header">
    <h1 class="header-title">{{ pageTitle }}</h1>
    <div class="user-info">
      <div class="notification" @click="$emit('show-notifications')">
        <i class="mdi mdi-bell-outline"></i>
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
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';

export default {
  name: 'Header',
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    hasNotifications: {
      type: Boolean,
      default: false
    }
  },
  emits: ['show-notifications']
};
</script>

<style scoped>
.header {
  background-color: var(--bg-secondary);
  padding: 20px 40px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-primary);
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
  background-color: var(--warning-color);
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
  background-color: var(--accent-color);
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
  color: var(--text-primary);
}

.user-role {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>