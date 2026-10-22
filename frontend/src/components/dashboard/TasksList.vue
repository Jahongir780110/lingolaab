<script setup>
import { useLocale } from '../../i18n'
const { t } = useLocale()
defineProps({ tasks: { type: Array, default: () => [] } })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="task-list">
    <div class="task-head" aria-hidden="true">
      <span>{{ t('taskName') }}</span><span>{{ t('stars') }}</span><span>{{ t('done') }}</span>
    </div>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <button type="button" class="task-row" @click="emit('select', task)">
          <span class="task-name">{{ t(task.name) }}</span>
          <span class="stars" :aria-label="task.stars ? `${task.stars} out of 3 stars` : 'Not rated'">
            <span v-for="star in 3" :key="star" :class="{ earned: star <= task.stars }" aria-hidden="true">{{ star <= task.stars ? '★' : '☆' }}</span>
          </span>
          <span class="checkbox" :class="{ checked: task.completed }" :aria-label="task.completed ? 'Completed' : 'Not completed'">
            <span aria-hidden="true">{{ task.completed ? '✓' : '' }}</span>
          </span>
        </button>
      </li>
    </ul>
    <p v-else class="empty-state" role="status">{{ t('noTasks') }}</p>
  </div>
</template>

<style scoped>
.task-list { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface); }
.task-head, .task-row { display: grid; grid-template-columns: minmax(0, 1fr) 100px 48px; align-items: center; gap: 16px; padding: 18px 24px; }
.task-head { background: var(--color-surface-hover); color: var(--color-text-muted); font-size: 0.8rem; font-weight: 700; }
ul { list-style: none; padding: 0; margin: 0; }
li + li { border-top: 1px solid var(--color-border); }
.task-row { width: 100%; background: transparent; text-align: left; color: var(--color-text); font-size: 0.95rem; }
.task-row:hover { background: var(--color-brand-cyan-light); }
.task-row:focus-visible { outline: 2px solid var(--color-brand-cyan); outline-offset: -3px; }
.task-name { overflow-wrap: anywhere; }
.stars { display: flex; color: var(--color-text-light); font-size: 1.25rem; gap: 2px; }
.earned { color: var(--level-intermediate); }
.checkbox { display: inline-flex; align-items: center; justify-content: center; width: 21px; height: 21px; border: 2px solid var(--color-border); border-radius: 5px; }
.checkbox.checked { background: var(--color-action-success); border-color: var(--color-action-success); color: var(--color-text); }
.empty-state { margin: 0; padding: 48px 24px; text-align: center; }
@media (max-width: 600px) {
  .task-head, .task-row { grid-template-columns: minmax(0, 1fr) 72px 32px; gap: 8px; padding: 16px 12px; }
  .stars { font-size: 1.1rem; }
}
</style>
