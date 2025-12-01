<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer" app temporary :clipped="$vuetify.display.smAndUp" class="glass-drawer">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Dashboard</v-list-item-title>
            <v-list-item-subtitle class="text-grey">Handwritten Scoring</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item v-for="item in navItems" :key="item.title" @click="active=item.key">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-spacer />

        <v-list-item>
          <v-btn text @click="toggleTheme">Toggle Theme</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
        <v-btn icon @click.stop="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
      <v-spacer />

      <div class="d-flex align-right position-relative">
        <div class="mr-4 text-right">
          <div class="small text-grey">Good {{ timeOfDay }},</div>
          <div class="headline font-weight-light">{{ userName }}</div>
        </div>

        <v-avatar size="44">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </div>
    </div>

    <v-main class="pa-6" style="min-height: calc(100vh - 64px);">
      <transition name="fade-slide">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="8">
              <!-- Drag & Drop / Preview -->
              <div
                class="upload-zone d-flex flex-column align-center justify-center"
                @dragover.prevent="dragOver = true"
                @dragleave.prevent="dragOver = false"
                @drop.prevent="onDrop"
                :class="{ 'dragging': dragOver }"
              >
                <v-icon size="56">mdi-cloud-upload</v-icon>
                <div class="mt-2">Drop essay image here or click to upload</div>
                <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="onFileChange" />

                <v-btn class="mt-4" rounded small @click="$refs.fileInput.click()">Choose File</v-btn>

                <transition name="pop">
                  <div v-if="preview" class="preview mt-4">
                    <img :src="preview" alt="preview" />
                  </div>
                </transition>
              </div>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="pa-4 glass-card">
                <div>
                  <div class="text-caption text-grey">Quick Stats</div>
                  <div class="display-1 font-weight-medium">{{ latestScore }}%</div>
                  <div class="text-caption text-grey">Average of last 4 essays</div>
                </div>

                <v-divider class="my-4" />

                <div class="text-caption text-grey">Quote</div>
                <div class="text-body-2 mt-2">"{{ quote }}"</div>
              </v-card>
            </v-col>
          </v-row>

          <!-- History - reveal on swipe or button -->
          <v-row class="mt-6">
            <v-col cols="12">
              <v-card class="pa-6 glass-card">
                <div class="d-flex justify-space-between align-center mb-4">
                  <div>
                    <h3 class="font-weight-light mb-0">History & Analytics</h3>
                    <div class="text-caption text-grey">Swipe down or click 'Show History' to reveal details</div>
                  </div>
                  <div>
                    <v-btn text @click="showHistory = !showHistory">{{ showHistory ? 'Hide' : 'Show' }} History</v-btn>
                  </div>
                </div>

                <transition name="slide-up">
                  <div v-if="showHistory">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="chart-wrap">
                          <canvas ref="lineChart"></canvas>
                        </div>
                      </v-col>

                      <v-col cols="12" md="6">
                        <div class="chart-wrap">
                          <canvas ref="barChart"></canvas>
                        </div>
                      </v-col>

                      <v-col cols="12" md="6" class="mt-6">
                        <div class="chart-wrap small">
                          <canvas ref="radarChart"></canvas>
                        </div>
                      </v-col>

                      <v-col cols="12" md="6" class="mt-6">
                        <v-list dense>
                          <v-list-item v-for="(h, i) in history" :key="i">
                            <v-list-item-content>
                              <v-list-item-title>Essay {{ i + 1 }} — {{ h.title }}</v-list-item-title>
                              <v-list-item-subtitle class="text-grey">Score: {{ h.score }}%</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-icon>
                              <v-chip small>{{ h.score }}</v-chip>
                            </v-list-item-icon>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                  </div>
                </transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </transition>
    </v-main>
  </v-app>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const drawer = ref(false);
const theme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const userName = ref('User');
const avatar = ref('https://i.pravatar.cc/150?img=12');
const timeOfDay = ref('Day');
const navItems = ref([
  { title: 'Upload', key: 'upload', icon: 'mdi-upload' },
  { title: 'History', key: 'history', icon: 'mdi-history' },
  { title: 'Settings', key: 'settings', icon: 'mdi-cog' },
]);
const dragOver = ref(false);
const preview = ref(null);
const quote = ref('');
const showHistory = ref(false);
const latestScore = ref(88);
const history = ref([
  { title: 'Argumentative essay', score: 85 },
  { title: 'Descriptive piece', score: 90 },
  { title: 'Comparative analysis', score: 78 },
  { title: 'Reflective essay', score: 92 },
]);

const lineChart = ref(null);
const barChart = ref(null);
const radarChart = ref(null);

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => { preview.value = ev.target.result; };
  reader.readAsDataURL(file);
}

function onDrop(e) {
  dragOver.value = false;
  const f = e.dataTransfer.files[0];
  if (f) {
    const reader = new FileReader();
    reader.onload = (ev) => { preview.value = ev.target.result; };
    reader.readAsDataURL(f);
  }
}

async function fetchQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    const d = await res.json();
    quote.value = d.content;
  } catch {
    quote.value = 'Practice with intention.';
  }
}

function initCharts() {
  if (lineChart.value) lineChart.value.destroy();
  if (barChart.value) barChart.value.destroy();
  if (radarChart.value) radarChart.value.destroy();

  const labels = history.value.map((_, i) => `Essay ${i + 1}`);
  const scores = history.value.map(h => h.score);

  lineChart.value = new Chart(document.querySelector('canvas[ref="lineChart"]') || document.getElementById('lineCanvas'), {
    type: 'line',
    data: { labels, datasets: [{ label: 'Scores', data: scores, borderWidth: 2, tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  barChart.value = new Chart(document.querySelector('canvas[ref="barChart"]') || document.getElementById('barCanvas'), {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Scores', data: scores, borderWidth: 1 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  radarChart.value = new Chart(document.querySelector('canvas[ref="radarChart"]') || document.getElementById('radarCanvas'), {
    type: 'radar',
    data: { labels: ['Content', 'Structure', 'Mechanics', 'Creativity', 'Clarity'], datasets: [{ label: 'Latest', data: [80, 85, 88, 90, 86] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

onMounted(() => {
  fetchQuote();
  const hour = new Date().getHours();
  timeOfDay.value = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';

  // Listen for a downward swipe (mouse wheel or touch)
  window.addEventListener('wheel', (e) => { if (e.deltaY > 120) { showHistory.value = true; setTimeout(initCharts, 350); } });

  let touchStartY = null;
  window.addEventListener('touchstart', e => { touchStartY = e.changedTouches[0].clientY; });
  window.addEventListener('touchend', e => { const dy = e.changedTouches[0].clientY - touchStartY; if (dy > 80) { showHistory.value = true; setTimeout(initCharts, 350); } });
});
</script>

<style scoped>
.glass-appbar {
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.glass-drawer {
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.04);
}
.glass-card {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border-radius: 16px;
}
.upload-zone {
  height: 52vh;
  border-radius: 16px;
  border: 2px dashed rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.03);
  display: flex;
  transition: transform 0.22s ease, background 0.22s ease;
}
.upload-zone.dragging { transform: translateY(-6px); background: rgba(255,255,255,0.06); }
.upload-zone .preview img { max-width: 320px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); }

.chart-wrap { height: 220px; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.35s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
.slide-up-enter-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
.pop-enter-active { transition: all 0.25s ease; }
.pop-enter-from { opacity: 0; transform: scale(0.96); }

.title { font-weight: 600; }
.text-grey { color: rgba(255,255,255,0.65); }

@media (max-width: 960px) {
  .upload-zone { height: 40vh; }
}
</style>