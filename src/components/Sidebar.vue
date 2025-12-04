<template>
  <aside class="sidebar">
    <div class="logo">
        <img src="../../public/logo.png" alt="HESS Logo" class="logo-circle" />
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
        @click.prevent="$emit('update-nav', item.name)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        {{ item.name }}
      </a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    activeNav: {
      type: String,
      required: true
    },
    navItems: {
      type: Array,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update-nav', 'toggle-theme']
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 24px 20px;
  border-bottom: 1px solid var(--border-color);
}

.logo-circle {
  width: 40px;
  height: 40px;
  background-color: var(--accent-color);
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
  color: var(--text-primary);
}

.logo-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
}

.nav {
  padding: 20px 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: var(--bg-tertiary);
}

.nav-item.active {
  background-color: var(--accent-color);
  color: white;
  margin: 0 10px;
  border-radius: 8px;
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
}

.theme-toggle {
  padding: 12px 16px;
  margin: 0 12px 12px 12px;
  border-top: 1px solid var(--border-color);
}

.theme-toggle-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.theme-toggle-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.theme-toggle-button:hover {
  background-color: var(--border-color);
}

.theme-icon {
  font-size: 18px;
  display: flex;
  align-items: center;
}

.theme-text {
  flex: 1;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.toggle-switch {
  width: 40px;
  height: 22px;
  background-color: var(--border-color);
  border-radius: 11px;
  position: relative;
  transition: background-color 0.3s;
}

.toggle-switch.active {
  background-color: var(--accent-color);
}

.toggle-slider {
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(18px);
}

</style>