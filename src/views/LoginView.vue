<template>
  <v-app :theme="theme">
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh; backdrop-filter: blur(12px);">
      <transition name="fade-scale">
      <v-card
        class="pa-8"
        elevation="10"
        style="width: 380px; border-radius: 20px; backdrop-filter: blur(20px); background: rgba(255,255,255,0.12);"
      >
        <div class="text-center mb-6">
          <h2 class="font-weight-light">Welcome to HESS!</h2>
          <p class="text-grey">{{ quote }}</p>
        </div>

        <v-form @submit.prevent="loginUser">
          <v-text-field
            v-model="email"
            label="Username"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            density="comfortable"
            rounded
          />

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            density="comfortable"
            rounded
          />
          <p
          class="text-grey text-caption"
          >
            Username: user Password: user123
          </p>

          <v-btn
            type="submit"
            block
            rounded="lg"
            height="45"
            class="text-white"
          >
            LOGIN
          </v-btn>
          
          <div class="text-center mt-4 text-grey text-caption">Forgot Password?</div>
        </v-form>
            </v-card>
    </transition>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from "vue";

const email = ref("");
const password = ref("");
const remember = ref(false);
const quote = ref("");
const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    quote.value = data.content;
  } catch {
    quote.value = "Write with clarity and purpose.";
  }
}

function loginUser() {
  if (email.value === "user" && password.value === "user123") {
    alert("Login Successful!");
    router.replace("/dashboard");
  } else {
    alert("Invalid credentials");
  }
}

onMounted(() => {
  fetchQuote();
});
</script>

<style scoped>
v-card {
  backdrop-filter: blur(25px) !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
