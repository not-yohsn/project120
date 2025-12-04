<template>
  <button class="help-button" @click="$emit('show-help')">?</button>
</template>

<script>

export default {
  name: 'HelpButton',
  emits: ['show-help']
};
</script>

<style scoped>
.help-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  border: none;
  transition: transform 0.2s, background-color 0.3s ease;
}

.help-button:hover {
  transform: scale(1.1);
  background-color: var(--accent-hover);
}
</style>