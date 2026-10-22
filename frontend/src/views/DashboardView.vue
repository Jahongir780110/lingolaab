<script setup>
import { useLocale } from '../i18n'
const { t, locale, localizedPath } = useLocale()
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import LanguageToggle from '../components/dashboard/LanguageToggle.vue'
import ScrollDatePicker from '../components/dashboard/ScrollDatePicker.vue'
import TasksList from '../components/dashboard/TasksList.vue'

const router = useRouter()
const today = new Date()
function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
const selectedDate = ref(dateKey(today))
const previousDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
// Temporary fixtures only; completion and ratings will come from task results later.
const tasksByDate = {
  [dateKey(today)]: [
    { id: 'text', name: 'textExercise', stars: 3, completed: true, route: '/exercises/text' },
    { id: 'audio', name: 'audioExercise', stars: 0, completed: false, route: '/exercises/audio' },
    { id: 'video', name: 'videoExercise', stars: 0, completed: false, route: '/exercises/video' }
  ],
  [dateKey(previousDay)]: [
    { id: 'previous-text', name: 'Text exercise', stars: 2, completed: true, route: '/exercises/text' },
    { id: 'previous-audio', name: 'Audio exercise', stars: 1, completed: true, route: '/exercises/audio' }
  ]
}
const tasks = computed(() => tasksByDate[selectedDate.value] || [])
const dateLabel = computed(() => {
  const [year, month, day] = selectedDate.value.split('-').map(Number)
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(year, month - 1, day))
})
const sections = ['courses', 'vocabulary', 'library', 'writing', 'liveLessons', 'speakingClub']
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-toolbar">
      <div class="language-control"><LanguageToggle /></div>
      <div class="date-control"><ScrollDatePicker v-model="selectedDate" /></div>
    </div>
    <div class="dashboard-layout">
      <aside class="sidebar" aria-label="Learning sections">
        <button v-for="section in sections" :key="section" type="button">{{ t(section) }}</button>
      </aside>
      <section class="tasks-area" aria-labelledby="tasks-title">
        <div class="tasks-heading">
          <h1 id="tasks-title">{{ t('tasks') }}</h1>
          <p>{{ dateLabel }}</p>
        </div>
        <TasksList :tasks="tasks" @select="router.push(localizedPath($event.route))" />
        <button type="button" class="accomplished-button">{{ t('accomplished') }}</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard { flex: 1; width: 100%; max-width: 1440px; margin: 0 auto; padding: 28px 32px 64px; }
.dashboard-toolbar { display: grid; grid-template-columns: 200px minmax(0, 1fr) auto; align-items: start; gap: 24px; margin-bottom: 40px; }
.language-control { grid-column: 2; justify-self: center; padding-top: 22px; }
.date-control { grid-column: 3; }
.dashboard-layout { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 40px; }
.sidebar { display: flex; flex-direction: column; align-self: start; gap: 8px; padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); }
.sidebar button { padding: 12px; background: transparent; border-radius: var(--radius-sm); color: var(--color-text-body); text-align: left; font-size: 0.9rem; font-weight: 600; }
.sidebar button:hover { background: var(--color-surface-hover); }
.tasks-area { width: 100%; max-width: 880px; justify-self: center; }
.tasks-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
h1 { font-size: 1.7rem; margin: 0; }
.tasks-heading p { margin: 0; font-size: 0.9rem; }
.accomplished-button { display: block; margin: 24px auto 0; padding: 12px 24px; border: 1px solid var(--color-brand-cyan); border-radius: var(--radius-full); color: var(--color-brand-cyan); background: var(--color-surface); font-weight: 700; }
button:focus-visible { outline: 2px solid var(--color-brand-cyan); outline-offset: 3px; }
@media (max-width: 1100px) {
  .dashboard-toolbar { grid-template-columns: minmax(0, 1fr) auto; }
  .language-control { grid-column: 1; }
  .date-control { grid-column: 2; }
  .dashboard-layout { grid-template-columns: 160px minmax(0, 1fr); gap: 24px; }
}
@media (max-width: 700px) {
  .dashboard { padding: 24px 16px 48px; }
  .dashboard-toolbar { grid-template-columns: 1fr; gap: 24px; margin-bottom: 28px; }
  .language-control { padding-top: 0; }
  .date-control { grid-column: 1; justify-self: center; }
  .dashboard-layout { grid-template-columns: 1fr; }
  .sidebar { flex-direction: row; flex-wrap: wrap; }
  .tasks-heading { flex-wrap: wrap; gap: 8px; }
}
</style>
