<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import AppLogo from '../components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

const isDarkMode = ref(false)
const activeNav = ref('Home')
const showFullPlan = ref(false)

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

const displayName = computed(() => userStore.name || 'Anvar')
const initials = computed(() => {
  const parts = displayName.value.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return displayName.value.slice(0, 2).toUpperCase()
})

// Navigation items matching Image 1
const navItems = [
  { name: 'Home', icon: '🏠' },
  { name: 'Courses', icon: '📖' },
  { name: 'Library', icon: '📚' },
  { name: 'AI Tutor', icon: '🤖' },
  { name: 'Vocabulary', icon: '🧠' },
  { name: 'Grammar', icon: '✍️' },
  { name: 'Speaking', icon: '🎙️' },
  { name: 'Progress', icon: '📈' },
  { name: 'Settings', icon: '⚙️' }
]

// Schedule tasks matching Image 1
const focusTasks = [
  {
    id: 1,
    icon: '📖',
    title: 'Practice vocabulary.',
    subtitle: 'AI generates short stories with well known words, weaker words, and new words.',
    day: 'Monday',
    status: 'done',
    isToday: false,
    route: '/lesson'
  },
  {
    id: 2,
    icon: '✍️',
    title: 'Write an essay.',
    subtitle: 'Topic: Mein Lieblingsort und warum.',
    day: 'Tuesday',
    status: 'open',
    isToday: true,
    route: '/lesson'
  },
  {
    id: 3,
    icon: '📋',
    title: 'Lesson 4. Exercises: 4–8.',
    subtitle: 'Focus: Personal pronouns, verb forms.',
    day: 'Tuesday',
    status: 'open',
    isToday: true,
    route: '/lesson'
  },
  {
    id: 4,
    icon: '📖',
    title: 'Read the next chapter of "Der kleine Prinz".',
    subtitle: 'Chapter 4',
    day: 'Wednesday',
    status: 'open',
    isToday: false,
    route: '/lesson'
  },
  {
    id: 5,
    icon: '💬',
    title: 'Join a speaking club.',
    subtitle: 'Topic: Hobbys und Freizeit',
    day: 'Thursday 18:00',
    status: 'open',
    isToday: false,
    route: '/lesson'
  },
  {
    id: 6,
    icon: '🤖',
    title: 'Review grammar: Akkusativ.',
    subtitle: 'Short explanation + exercises.',
    day: 'Friday',
    status: 'open',
    isToday: false,
    route: '/lesson'
  }
]

// Words needing practice (Image 1)
const wordsPractice = [
  { word: 'Voraussetzung', score: 42, color: 'var(--color-error-vermillion)' },
  { word: 'benutzen', score: 48, color: '#F97316' },
  { word: 'verstehen', score: 63, color: 'var(--level-intermediate)' },
  { word: 'während', score: 74, color: 'var(--color-action-success)' },
  { word: 'beschreiben', score: 82, color: 'var(--color-action-success)' }
]

function logout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="dash-container">
    <!-- SIDEBAR (IMAGE 1) -->
    <aside class="dash-sidebar">
      <div class="sidebar-brand-box">
        <RouterLink to="/" class="sidebar-logo">
          <AppLogo :size="30" layout="horizontal" />
        </RouterLink>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.name"
          type="button"
          class="sidebar-nav-btn"
          :class="{ active: activeNav === item.name }"
          @click="activeNav = item.name"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.name }}</span>
        </button>
      </nav>

      <!-- Language Pair Card (Image 1) -->
      <div class="sidebar-lang-card">
        <div class="lang-flags-header">
          <span class="flag-icon">🇺🇿</span>
          <span class="flag-icon">🇩🇪</span>
          <span class="lang-name-text">{{ userStore.nativeLanguage || 'Uzbek' }} → {{ userStore.targetLanguage || 'German' }}</span>
        </div>

        <div class="level-progress-section">
          <span class="level-sub-label">Current level</span>
          <div class="level-badge-large">{{ userStore.level || 'A1.1' }}</div>
          <div class="sidebar-progress-bar">
            <div class="sidebar-progress-fill" style="width: 60%;"></div>
          </div>
          <span class="progress-num-text">60%</span>
        </div>

        <RouterLink to="/lesson" class="sidebar-link-btn">
          View details →
        </RouterLink>
      </div>

      <!-- AI Tutor Box (Image 1) -->
      <div class="sidebar-ai-box">
        <h4>AI Tutor</h4>
        <p>Ask anything about grammar, words, or your homework.</p>
        <button class="btn btn-outline ai-tutor-btn" @click="activeNav = 'AI Tutor'">
          <span>🤖</span> Open AI Tutor
        </button>
      </div>

      <div class="sidebar-footer-controls">
        <button class="btn-theme-toggle" @click="toggleTheme">
          {{ isDarkMode ? '☀️ Light Mode' : '🌙 Focus Mode' }}
        </button>
        <button class="btn-logout" @click="logout">↩ Log out</button>
      </div>
    </aside>

    <!-- MAIN DASHBOARD CONTENT AREA -->
    <div class="dash-content-area">
      <!-- TOP NAVIGATION BAR (IMAGE 1) -->
      <header class="dash-top-bar">
        <div class="top-bar-left">
          <!-- Optional breadcrumb or search -->
        </div>

        <div class="top-bar-right">
          <div class="streak-pill-header">
            <span>🔥</span>
            <strong>7 day streak</strong>
          </div>

          <button class="bell-notify-btn" title="Notifications">
            <span>🔔</span>
            <span class="notify-red-dot"></span>
          </button>

          <div class="user-profile-menu">
            <div class="user-avatar-circle">{{ initials }}</div>
            <span class="chevron-down">▾</span>
          </div>
        </div>
      </header>

      <!-- SCROLLABLE DASHBOARD BODY -->
      <main class="dash-body">
        <!-- WELCOME SECTION (IMAGE 1) -->
        <section class="welcome-section">
          <div class="welcome-text-box">
            <h1>Welcome back, {{ displayName }}! 👋</h1>
            <p class="welcome-sub">
              You're learning {{ userStore.targetLanguage || 'German' }} in
              <strong>{{ userStore.nativeLanguage || 'Uzbek' }}</strong>.
            </p>
          </div>

          <div class="focus-alert-pill">
            <span class="bulb-icon">💡</span>
            <div class="focus-alert-text">
              <strong>Today's focus</strong>
              <p>Let's strengthen what's weak and keep your streak going!</p>
            </div>
          </div>
        </section>

        <!-- 4 CIRCULAR METRIC CARDS ROW (IMAGE 1) -->
        <section class="metrics-row">
          <!-- Metric 1: Vocabulary -->
          <div class="metric-card card">
            <div class="metric-card-head">
              <span class="m-icon">📖</span>
              <span class="m-title">Vocabulary</span>
            </div>
            <div class="circular-progress-wrap">
              <svg viewBox="0 0 100 100" class="circle-svg">
                <circle cx="50" cy="50" r="40" class="circle-bg" />
                <circle cx="50" cy="50" r="40" class="circle-bar bar-vocab" style="stroke-dasharray: 251; stroke-dashoffset: 70;" />
              </svg>
              <div class="circle-center-text">
                <strong>72</strong>
                <small>/100</small>
              </div>
            </div>
            <span class="metric-status-label status-blue">Needs practice</span>
          </div>

          <!-- Metric 2: Grammar -->
          <div class="metric-card card">
            <div class="metric-card-head">
              <span class="m-icon">✍️</span>
              <span class="m-title">Grammar</span>
            </div>
            <div class="circular-progress-wrap">
              <svg viewBox="0 0 100 100" class="circle-svg">
                <circle cx="50" cy="50" r="40" class="circle-bg" />
                <circle cx="50" cy="50" r="40" class="circle-bar bar-grammar" style="stroke-dasharray: 251; stroke-dashoffset: 80;" />
              </svg>
              <div class="circle-center-text">
                <strong>68</strong>
                <small>/100</small>
              </div>
            </div>
            <span class="metric-status-label status-green">Needs practice</span>
          </div>

          <!-- Metric 3: Lessons -->
          <div class="metric-card card">
            <div class="metric-card-head">
              <span class="m-icon">📋</span>
              <span class="m-title">Lessons</span>
            </div>
            <div class="circular-progress-wrap">
              <svg viewBox="0 0 100 100" class="circle-svg">
                <circle cx="50" cy="50" r="40" class="circle-bg" />
                <circle cx="50" cy="50" r="40" class="circle-bar bar-lessons" style="stroke-dasharray: 251; stroke-dashoffset: 100;" />
              </svg>
              <div class="circle-center-text">
                <strong class="text-level-badge">A1.1</strong>
                <span class="level-sub-pct">60%</span>
              </div>
            </div>
            <span class="metric-status-label status-purple">Course progress</span>
          </div>

          <!-- Metric 4: Streak -->
          <div class="metric-card card">
            <div class="metric-card-head">
              <span class="m-icon">🔥</span>
              <span class="m-title">Streak</span>
            </div>
            <div class="streak-center-wrap">
              <strong class="streak-big-val">7</strong>
              <span class="streak-unit">days</span>
            </div>
            <span class="metric-status-label status-orange">Great job!</span>
          </div>
        </section>

        <!-- YOUR FOCUS TODAY TABLE (IMAGE 1) -->
        <section class="focus-schedule-card card">
          <div class="schedule-head">
            <div class="schedule-title-block">
              <span class="target-icon">🎯</span>
              <div>
                <h2>Your focus today</h2>
                <p>Personalized tasks based on what needs more practice.</p>
              </div>
            </div>

            <button class="btn-why-tasks">
              <span>ℹ️</span> Why these tasks?
            </button>
          </div>

          <div class="task-rows-list">
            <div
              v-for="task in (showFullPlan ? focusTasks : focusTasks.slice(0, 5))"
              :key="task.id"
              class="task-row"
              :class="{ 'is-today': task.isToday }"
            >
              <div class="task-icon-circle">
                <span>{{ task.icon }}</span>
              </div>

              <div class="task-content">
                <h4>{{ task.title }}</h4>
                <p>{{ task.subtitle }}</p>
              </div>

              <div class="task-day-meta">
                <span class="day-text">{{ task.day }}</span>
                <span v-if="task.isToday" class="today-chip">Today</span>
              </div>

              <div class="task-action-wrap">
                <span v-if="task.status === 'done'" class="status-done-pill">
                  ✓ Done
                </span>
                <RouterLink
                  v-else
                  :to="task.route"
                  class="btn-open-task"
                >
                  Open ›
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="schedule-footer">
            <button class="btn-toggle-plan" @click="showFullPlan = !showFullPlan">
              {{ showFullPlan ? 'View less ∧' : 'View full plan ∨' }}
            </button>
          </div>
        </section>

        <!-- BOTTOM SPLIT: WORDS PRACTICE & RECOMMENDED (IMAGE 1) -->
        <section class="bottom-split-grid">
          <!-- Words Needing Practice -->
          <div class="words-card card">
            <div class="card-title-row">
              <h3>Words needing practice</h3>
              <RouterLink to="/lesson" class="link-view-all">View all</RouterLink>
            </div>

            <div class="words-bars-list">
              <div class="word-bar-row" v-for="w in wordsPractice" :key="w.word">
                <span class="vocab-word">{{ w.word }}</span>
                <div class="vocab-bar-track">
                  <div
                    class="vocab-bar-fill"
                    :style="{ width: w.score + '%', background: w.color }"
                  ></div>
                </div>
                <span class="vocab-score">{{ w.score }}/100</span>
              </div>
            </div>
          </div>

          <!-- Recommended For You (Image 1) -->
          <div class="recommended-card card">
            <div class="card-title-row">
              <h3>💡 Recommended for you</h3>
            </div>

            <div class="recommended-content">
              <div class="rec-book-illustration">
                📖✨
              </div>

              <div class="rec-copy">
                <h4>3 new stories are ready!</h4>
                <p>Balanced mix of known, weak, and new words.</p>
                <RouterLink to="/lesson" class="btn btn-outline btn-start-reading">
                  Start reading
                </RouterLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dash-container {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background: #F8FAFC;
}

/* SIDEBAR (MATCHING IMAGE 1) */
.dash-sidebar {
  background: #FFFFFF;
  border-right: 1px solid var(--color-border);
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-brand-box {
  margin-bottom: 24px;
}

.sidebar-logo {
  text-decoration: none;
  display: inline-block;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
}

.sidebar-nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-body);
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.sidebar-nav-btn:hover {
  background: var(--color-surface-hover);
  color: var(--color-brand-cyan);
}

.sidebar-nav-btn.active {
  background: #EEF2FF;
  color: #4F46E5;
  font-weight: 700;
}

.nav-icon {
  font-size: 1.1rem;
}

/* LANGUAGE PAIR CARD IN SIDEBAR (IMAGE 1) */
.sidebar-lang-card {
  padding: 16px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  margin-bottom: 20px;
}

.lang-flags-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.flag-icon {
  font-size: 1.2rem;
}

.lang-name-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
}

.level-progress-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.level-sub-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.level-badge-large {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
}

.sidebar-progress-bar {
  height: 6px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-top: 4px;
}

.sidebar-progress-fill {
  height: 100%;
  background: #4F46E5;
  border-radius: var(--radius-full);
}

.progress-num-text {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-align: right;
}

.sidebar-link-btn {
  display: block;
  font-size: 0.82rem;
  font-weight: 700;
  color: #4F46E5;
  text-decoration: none;
}

/* AI TUTOR BOX IN SIDEBAR (IMAGE 1) */
.sidebar-ai-box {
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-top: auto;
  margin-bottom: 16px;
}

.sidebar-ai-box h4 {
  font-size: 0.95rem;
  margin: 0 0 4px;
}

.sidebar-ai-box p {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0 0 10px;
  line-height: 1.35;
}

.ai-tutor-btn {
  width: 100%;
  padding: 8px 12px;
  font-size: 0.8rem;
  border-color: #E2E8F0;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.sidebar-footer-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.btn-theme-toggle, .btn-logout {
  background: transparent;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 4px 6px;
}

.btn-logout:hover { color: #EF4444; }

/* MAIN CONTENT AREA */
.dash-content-area {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.dash-top-bar {
  height: 70px;
  background: #FFFFFF;
  border-bottom: 1px solid var(--color-border);
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-left: auto;
}

.streak-pill-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  font-size: 0.85rem;
  color: #D97706;
}

.bell-notify-btn {
  background: transparent;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 1.1rem;
  cursor: pointer;
}

.notify-red-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #EF4444;
  position: absolute;
  top: 6px;
  right: 6px;
}

.user-profile-menu {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.user-avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #EEF2FF;
  color: #4F46E5;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.chevron-down {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* DASHBOARD BODY */
.dash-body {
  padding: 32px 36px 60px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* WELCOME SECTION */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.welcome-text-box h1 {
  font-size: 1.85rem;
  color: var(--color-text);
  margin-bottom: 4px;
}

.welcome-sub {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin: 0;
}

.focus-alert-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.bulb-icon {
  font-size: 1.4rem;
}

.focus-alert-text strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text);
}

.focus-alert-text p {
  margin: 0;
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* METRICS ROW (4 CIRCLES MATCHING IMAGE 1) */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.metric-card {
  padding: 20px;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #FFFFFF;
}

.metric-card-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  align-self: flex-start;
}

.m-icon { font-size: 1.1rem; }
.m-title { font-size: 0.85rem; font-weight: 700; color: var(--color-text); }

.circular-progress-wrap {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 8;
}

.circle-bar {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.bar-vocab { stroke: #3B82F6; }
.bar-grammar { stroke: #10B981; }
.bar-lessons { stroke: #8B5CF6; }

.circle-center-text {
  position: absolute;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.circle-center-text strong {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
}

.circle-center-text small {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.circle-center-text .text-level-badge {
  font-size: 1.25rem;
}

.level-sub-pct {
  display: block;
  font-size: 0.72rem;
  color: var(--color-text-muted);
  margin-left: 2px;
}

.streak-center-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  height: 96px;
  align-items: center;
  margin-bottom: 12px;
}

.streak-big-val {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
}

.streak-unit {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.metric-status-label {
  font-size: 0.75rem;
  font-weight: 700;
}
.status-blue { color: #2563EB; }
.status-green { color: #059669; }
.status-purple { color: #7C3AED; }
.status-orange { color: #D97706; }

/* FOCUS SCHEDULE (IMAGE 1) */
.focus-schedule-card {
  padding: 24px;
  background: #FFFFFF;
  border-radius: var(--radius-md);
}

.schedule-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.schedule-title-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.target-icon {
  font-size: 1.6rem;
}

.schedule-title-block h2 {
  font-size: 1.25rem;
  margin: 0 0 2px;
}

.schedule-title-block p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.btn-why-tasks {
  background: transparent;
  border: 1px solid var(--color-border);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-body);
  display: flex;
  align-items: center;
  gap: 6px;
}

.task-rows-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-row {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: #FFFFFF;
  gap: 18px;
  transition: all 0.15s ease;
}

.task-row.is-today {
  border-color: #93C5FD;
  background: #EFF6FF;
}

.task-icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.is-today .task-icon-circle {
  background: #DBEAFE;
}

.task-content {
  flex: 1;
}

.task-content h4 {
  font-size: 0.95rem;
  margin: 0 0 2px;
  font-weight: 700;
}

.task-content p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.task-day-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
}

.day-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-body);
}

.today-chip {
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: #DBEAFE;
  color: #1D4ED8;
  margin-top: 2px;
}

.task-action-wrap {
  min-width: 80px;
  display: flex;
  justify-content: flex-end;
}

.status-done-pill {
  font-size: 0.78rem;
  font-weight: 700;
  color: #059669;
  background: #D1FAE5;
  padding: 6px 14px;
  border-radius: var(--radius-full);
}

.btn-open-task {
  padding: 6px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid #93C5FD;
  background: #FFFFFF;
  color: #2563EB;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-open-task:hover {
  background: #2563EB;
  color: #FFFFFF;
}

.schedule-footer {
  text-align: center;
  padding-top: 16px;
  margin-top: 8px;
}

.btn-toggle-plan {
  background: transparent;
  font-size: 0.85rem;
  font-weight: 700;
  color: #4F46E5;
  cursor: pointer;
}

/* BOTTOM SPLIT GRID (IMAGE 1) */
.bottom-split-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 20px;
}

.words-card, .recommended-card {
  padding: 22px;
  background: #FFFFFF;
  border-radius: var(--radius-md);
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.card-title-row h3 {
  font-size: 1.05rem;
  margin: 0;
}

.link-view-all {
  font-size: 0.82rem;
  font-weight: 700;
  color: #4F46E5;
  text-decoration: none;
}

.words-bars-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.word-bar-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.vocab-word {
  min-width: 110px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text);
}

.vocab-bar-track {
  flex: 1;
  height: 7px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.vocab-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
}

.vocab-score {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text-muted);
  min-width: 48px;
  text-align: right;
}

/* RECOMMENDED CARD (IMAGE 1) */
.recommended-content {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
}

.rec-book-illustration {
  font-size: 3rem;
  line-height: 1;
}

.rec-copy h4 {
  font-size: 1rem;
  margin: 0 0 4px;
}

.rec-copy p {
  margin: 0 0 14px;
  font-size: 0.82rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.btn-start-reading {
  padding: 8px 18px;
  font-size: 0.85rem;
  border-color: #93C5FD;
  color: #2563EB;
}

.btn-start-reading:hover {
  background: #2563EB;
  color: #FFFFFF;
}

/* RESPONSIVE */
@media (max-width: 1080px) {
  .dash-container {
    grid-template-columns: 1fr;
  }
  .dash-sidebar {
    height: auto;
    position: static;
  }
  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .bottom-split-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .metrics-row {
    grid-template-columns: 1fr;
  }
  .dash-body {
    padding: 20px 16px;
  }
  .dash-top-bar {
    padding: 0 16px;
  }
  .task-row {
    flex-wrap: wrap;
  }
}
</style>
