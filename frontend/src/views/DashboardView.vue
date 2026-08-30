<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const displayName = computed(() => userStore.name || 'Learner')
const initials = computed(() =>
  displayName.value
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)

const vocabStats = [
  { label: 'Words mastered', value: 312, color: 'var(--wintergreen)' },
  { label: 'Words weakening', value: 24, color: 'var(--tangerine)' },
  { label: 'New this week', value: 41, color: 'var(--retro-red)' }
]

const grammarTopics = [
  { name: 'Present tense', score: 92 },
  { name: 'Modal verbs', score: 81 },
  { name: 'Subordinate clauses', score: 46 },
  { name: 'Passive voice', score: 33 }
]

const courses = [
  { title: 'German A2 — Everyday conversations', progress: 68, level: 'A2' },
  { title: 'German A2 — Travel & directions', progress: 35, level: 'A2' },
  { title: 'German B1 — Opinions & discussions', progress: 0, level: 'B1', locked: true }
]

const clubs = [
  { topic: 'Weekend plans', time: 'Thu · 18:00', level: 'A2', seats: '3/6' },
  { topic: 'Talking about food', time: 'Sat · 10:00', level: 'A2', seats: '5/6' }
]

const activity = [
  { text: 'Finished "Café Small Talk" lesson', time: '2h ago' },
  { text: 'Read Chapter 3 of "Der Kleine Prinz"', time: 'Yesterday' },
  { text: 'AI tutor explained subordinate clauses', time: 'Yesterday' },
  { text: 'Completed vocabulary review (18 words)', time: '2 days ago' }
]

function logout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <RouterLink to="/" class="brand">
        <span>🌐</span> Lingo<em>Laab</em>
      </RouterLink>

      <nav class="side-nav">
        <a class="side-link active">📊 Dashboard</a>
        <a class="side-link">📚 Courses</a>
        <a class="side-link">🧠 Vocabulary</a>
        <a class="side-link">📖 Library</a>
        <a class="side-link">🗣️ Speaking clubs</a>
        <a class="side-link">🤖 AI tutor</a>
        <a class="side-link">⚙️ Settings</a>
      </nav>

      <button class="btn btn-ghost logout-btn" @click="logout">↩ Log out</button>
    </aside>

    <main class="dash-main">
      <header class="dash-header">
        <div>
          <p class="eyebrow">Welcome back</p>
          <h1>Hi {{ displayName }}, ready to practice {{ userStore.targetLanguage || 'German' }}?</h1>
        </div>
        <div class="header-right">
          <span class="streak">🔥 12-day streak</span>
          <div class="avatar">{{ initials || 'LL' }}</div>
        </div>
      </header>

      <section class="stat-row">
        <div class="stat-card card" v-for="s in vocabStats" :key="s.label">
          <div class="stat-value" :style="{ color: s.color }">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
        <div class="stat-card card level-card">
          <div class="stat-value">{{ userStore.level || 'A2' }}</div>
          <div class="stat-label">Current level</div>
        </div>
      </section>

      <section class="dash-grid">
        <div class="card panel">
          <div class="panel-head">
            <h3>Grammar knowledge</h3>
            <span class="badge">Auto-updated</span>
          </div>
          <div class="grammar-list">
            <div class="grammar-item" v-for="g in grammarTopics" :key="g.name">
              <div class="grammar-top">
                <span>{{ g.name }}</span>
                <strong>{{ g.score }}%</strong>
              </div>
              <div class="mock-bar">
                <div
                  class="mock-bar-fill"
                  :style="{ width: g.score + '%', background: g.score < 50 ? 'var(--retro-red)' : g.score < 80 ? 'var(--tangerine)' : 'var(--wintergreen)' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head">
            <h3>Recent activity</h3>
          </div>
          <ul class="activity-list">
            <li v-for="a in activity" :key="a.text">
              <span class="dot"></span>
              <div>
                <p class="activity-text">{{ a.text }}</p>
                <span class="activity-time">{{ a.time }}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="dash-grid two-thirds">
        <div class="card panel">
          <div class="panel-head">
            <h3>Your courses</h3>
            <a href="#" class="link">View all</a>
          </div>
          <div class="course-item" v-for="c in courses" :key="c.title" :class="{ locked: c.locked }">
            <div class="course-info">
              <span class="course-level">{{ c.level }}</span>
              <p>{{ c.title }}</p>
            </div>
            <div class="course-progress">
              <div class="mock-bar small">
                <div class="mock-bar-fill" :style="{ width: c.progress + '%', background: 'var(--wintergreen)' }"></div>
              </div>
              <span>{{ c.locked ? 'Locked' : c.progress + '%' }}</span>
            </div>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-head">
            <h3>Speaking clubs</h3>
          </div>
          <div class="club-item" v-for="c in clubs" :key="c.topic">
            <p class="club-topic">{{ c.topic }}</p>
            <div class="club-meta">
              <span>{{ c.time }}</span>
              <span class="badge">{{ c.level }}</span>
              <span>{{ c.seats }}</span>
            </div>
          </div>
          <button class="btn btn-secondary join-btn">Join a club — free</button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: var(--color-bg);
}

.sidebar {
  background: var(--wintergreen);
  color: var(--cream);
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
}

.sidebar .brand {
  color: var(--cream);
  text-decoration: none;
  font-weight: 800;
  font-size: 1.2rem;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 36px;
}

.sidebar .brand em {
  font-style: normal;
  color: var(--champagne);
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.side-link {
  padding: 11px 14px;
  border-radius: 10px;
  color: rgba(248, 239, 213, 0.85);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
}

.side-link:hover {
  background: rgba(248, 239, 213, 0.1);
}

.side-link.active {
  background: rgba(248, 239, 213, 0.18);
  color: #fff;
}

.logout-btn {
  color: var(--cream);
  justify-content: flex-start;
  padding-left: 14px;
}

.dash-main {
  padding: 36px 40px;
  overflow-x: hidden;
}

.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.eyebrow {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0 0 4px;
}

.dash-header h1 {
  font-size: 1.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.streak {
  background: rgba(255, 141, 48, 0.15);
  color: #b35a10;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--retro-red);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 22px;
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text);
}

.stat-label {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.level-card .stat-value {
  color: var(--retro-red);
}

.dash-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.dash-grid.two-thirds {
  grid-template-columns: 1.4fr 1fr;
}

.panel {
  padding: 24px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.panel-head h3 {
  font-size: 1.05rem;
}

.panel-head .badge {
  background: rgba(71, 139, 133, 0.15);
  color: var(--wintergreen);
}

.link {
  font-size: 0.85rem;
  color: var(--wintergreen);
  font-weight: 600;
  text-decoration: none;
}

.grammar-item {
  margin-bottom: 16px;
}

.grammar-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  margin-bottom: 6px;
}

.mock-bar {
  height: 9px;
  border-radius: 999px;
  background: var(--color-border);
  overflow: hidden;
}

.mock-bar.small {
  width: 120px;
}

.mock-bar-fill {
  height: 100%;
  border-radius: 999px;
}

.activity-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-list li {
  display: flex;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tangerine);
  margin-top: 6px;
  flex-shrink: 0;
}

.activity-text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text);
}

.activity-time {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.course-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
  gap: 16px;
}

.course-item:last-child {
  border-bottom: none;
}

.course-item.locked {
  opacity: 0.55;
}

.course-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.course-level {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--wintergreen);
  text-transform: uppercase;
}

.course-info p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-text);
}

.course-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.club-item {
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
}

.club-topic {
  margin: 0 0 6px;
  font-weight: 600;
  font-size: 0.92rem;
}

.club-meta {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  align-items: center;
}

.club-meta .badge {
  background: rgba(255, 141, 48, 0.15);
  color: #b35a10;
}

.join-btn {
  width: 100%;
  margin-top: 16px;
}

@media (max-width: 1080px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  .sidebar {
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
  }
  .side-nav {
    flex-direction: row;
  }
  .logout-btn {
    display: none;
  }
  .stat-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .dash-grid, .dash-grid.two-thirds {
    grid-template-columns: 1fr;
  }
}
</style>
