<template>
  <div>
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
      <button class="primary-button"> Save Changes</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountSettings',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
      }
    };
  }
};
</script>

<style scoped>
.account-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
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
  background-color: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 32px;
  transition: transform 0.2s;
}

.large-avatar:hover {
  transform: scale(1.05);
}

.photo-hint {
  font-size: 13px;
  color: var(--text-tertiary);
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
  min-width: 0;
  width: 100%;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-secondary);
  word-break: break-word;
  overflow-wrap: break-word;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.form-input::placeholder {
  color: var(--text-tertiary);
}

.security-card {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
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
  background-color: var(--success-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.update-button {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  font-family: inherit;
  transition: background-color 0.2s, transform 0.2s;
}

.update-button:hover {
  background-color: var(--accent-hover);
}

.update-button:active {
  transform: scale(0.98);
}

.account-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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
  transition: background-color 0.2s, transform 0.2s;
}

.secondary-button:hover {
  background-color: var(--border-color);
}

.secondary-button:active {
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
  .account-card {
    padding: 20px;
    margin-bottom: 16px;
  }

  .avatar-section {
    margin-bottom: 20px;
  }

  .large-avatar {
    width: 64px;
    height: 64px;
    font-size: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .form-group {
    min-width: 0;
    width: 100%;
  }

  .form-label {
    font-size: 13px;
    margin-bottom: 6px;
    word-break: break-word;
  }

  .form-input {
    padding: 10px 12px;
    font-size: 13px;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
  }

  .security-card {
    padding: 20px;
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .update-button {
    padding: 10px 16px;
    font-size: 13px;
    margin-top: 12px;
  }

  .account-buttons {
    gap: 8px;
  }

  .secondary-button,
  .primary-button {
    padding: 10px 16px;
    font-size: 13px;
  }
}

/* Mobile Screens (480px and below) */
@media (max-width: 480px) {
  .account-card {
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .avatar-section {
    margin-bottom: 16px;
    gap: 8px;
  }

  .large-avatar {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }

  .photo-hint {
    font-size: 11px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }

  .form-group {
    margin-bottom: 0;
    min-width: 0;
    width: 100%;
  }

  .form-label {
    font-size: 12px;
    margin-bottom: 6px;
    white-space: normal;
    word-break: break-word;
  }

  .form-input {
    padding: 10px 12px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
  }

  .form-input:focus {
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  }

  .security-card {
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .security-header {
    gap: 8px;
    margin-bottom: 16px;
  }

  .security-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
    flex-shrink: 0;
  }

  .section-title {
    font-size: 14px;
    white-space: normal;
    word-break: break-word;
  }

  .update-button {
    width: 100%;
    padding: 12px;
    font-size: 13px;
    margin-top: 12px;
  }

  .account-buttons {
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }

  .secondary-button,
  .primary-button {
    width: 100%;
    padding: 12px;
    font-size: 13px;
  }
}

/* Extra small screens (320px and below) */
@media (max-width: 320px) {
  .account-card {
    padding: 12px;
    margin-bottom: 8px;
  }

  .large-avatar {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }

  .form-group {
    min-width: 0;
    width: 100%;
  }

  .form-label {
    font-size: 11px;
    word-break: break-word;
  }

  .form-input {
    padding: 8px 10px;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
  }

  .security-card {
    padding: 12px;
    margin-bottom: 8px;
  }

  .section-title {
    font-size: 13px;
    word-break: break-word;
  }

  .update-button {
    padding: 8px 10px;
    font-size: 11px;
    width: 100%;
  }

  .secondary-button,
  .primary-button {
    padding: 8px 10px;
    font-size: 11px;
    width: 100%;
  }
}
</style>