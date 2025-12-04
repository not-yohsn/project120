<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo-section">
          <img src="../../public/logo.png" class="logo">
          <p class="logo-subtitle">Handwritten Essay Scoring System</p>
        </div>
      </div>

      <div class="login-content">
        <h2 class="welcome-title">Welcome</h2>
        <p class="welcome-subtitle">Sign in to continue to your dashboard</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              class="form-input"
              v-model="formData.email"
              placeholder="Enter your email"
              required
              autocomplete="email"
            >
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-input-wrapper">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                v-model="formData.password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              >
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                {{ showPassword ? '' : '' }}
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="formData.rememberMe"
                class="checkbox-input"
              >
              <span class="checkbox-text">Remember me</span>
            </label>
            <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">
              Forgot password?
            </a>
          </div>

          <button type="submit" class="login-button" :disabled="isLoading">
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="loading-text">
              <span class="spinner"></span>
              Signing in...
            </span>
          </button>

          <div v-if="errorMessage" class="error-message">
            <span class="error-icon"></span>
            {{ errorMessage }}
          </div>
        </form>

        <div class="divider">
          <span class="divider-text">or continue with</span>
        </div>

        <div class="social-login">
        <button class="btn-social" @click="handleSocialLogin('google')">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          
        </button>
      </div>

        <div class="signup-prompt">
          Don't have an account?
          <a href="#" class="signup-link" @click.prevent="handleSignup">
            Sign up
          </a>
        </div>
      </div>

      <div class="login-footer">
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <span class="footer-divider">•</span>
          <a href="#" class="footer-link">Terms of Service</a>
          <span class="footer-divider">•</span>
          <a href="#" class="footer-link">Help</a>
        </div>
        <p class="footer-copyright">© 2025 HESS. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['login-success', 'toggle-theme'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
        rememberMe: false
      },
      showPassword: false,
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Simulate API call
        await this.simulateLogin();
        
        // On success, emit event to parent
        this.$emit('login-success', {
          email: this.formData.email,
          rememberMe: this.formData.rememberMe
        });
      } catch (error) {
        this.errorMessage = error.message || 'Login failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    async simulateLogin() {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate credentials (demo only)
      if (this.formData.email && this.formData.password) {
        // In production, this would be an actual API call
        if (this.formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        return true;
      } else {
        throw new Error('Please enter both email and password');
      }
    },
    handleSocialLogin(provider) {
      console.log(`Social login with ${provider}`);
      alert(`${provider} login would be initiated here`);
    },
    handleForgotPassword() {
      alert('Password reset would be initiated here');
    },
    handleSignup() {
      alert('Sign up page would be shown here');
    }
  }
};
</script>

<style scoped>
.logo{
  width: 128px;
}
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(181deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 74%, rgba(207, 203, 97, 1) 100%);
  padding: 20px;
  position: relative;
}

.login-card {
  width: 100%;
  max-width: 440px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, var(--accent-color) 0%, #667eea 100%);
  padding: 40px 40px 30px;
  text-align: center;
}

.logo-section {
  color: white;
}

.logo-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px;
  color: white;
}

.logo-subtitle {
  font-size: 15px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.login-content {
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
}

.welcome-title {
  font-size: 24px;
  font-weight: 600;
  color: #334155;
  margin: 0 0 8px;
  text-align: center;
}

.welcome-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 32px;
  text-align: center;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 14px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.form-input::placeholder {
  color: var(--text-tertiary);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  color: var(--text-tertiary);
  transition: color 0.2s;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-secondary);
}

.checkbox-input {
  margin-right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.checkbox-text {
  user-select: none;
}

.forgot-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.forgot-link:hover {
  opacity: 0.8;
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #334155;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #1b2430;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--error-light);
  color: var(--error-color);
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  font-size: 16px;
}

.divider {
  position: relative;
  text-align: center;
  margin: 32px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--border-color);
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 16px;
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  font-size: 13px;
}

.social-login {
  display: flex;
  margin-bottom: 24px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
}

.social-button:hover {
  background-color: var(--border-color);
  transform: translateY(-1px);
}

.social-icon {
  font-size: 18px;
}

.signup-prompt {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.signup-link {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.signup-link:hover {
  text-decoration: underline;
}

.login-footer {
  padding: 24px 40px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--text-primary);
}

.footer-divider {
  color: var(--text-tertiary);
  font-size: 13px;
}

.footer-copyright {
  margin: 0;
  font-size: 13px;
  color: var(--text-tertiary);
}

.login-theme-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-theme-toggle:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.3);
}

.login-theme-toggle:active {
  transform: scale(0.95);
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-container {
    padding: 12px;
  }

  .login-card {
    border-radius: 12px;
  }

  .login-header {
    padding: 32px 24px 24px;
  }

  .login-content {
    padding: 32px 24px;
  }

  .login-footer {
    padding: 20px 24px;
  }

  .welcome-title {
    font-size: 20px;
  }

  .social-login {
    grid-template-columns: 1fr;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>