<script setup>
import { useLocale } from '../i18n'
const { t, localizedPath } = useLocale()
import { RouterLink, RouterView } from 'vue-router'

const exerciseTypes = [
  { label: 'textExercise', to: '/exercises/text' },
  { label: 'audioExercise', to: '/exercises/audio' },
  { label: 'videoExercise', to: '/exercises/video' }
]
</script>

<template>
  <section class="exercise-section container" aria-label="Exercises">
    <nav class="exercise-types" aria-label="Exercise types">
      <RouterLink
        v-for="type in exerciseTypes"
        :key="type.to"
        :to="localizedPath(type.to)"
        class="exercise-type"
      >{{ t(type.label) }}</RouterLink>
    </nav>
    <div class="exercise-content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.exercise-section { flex: 1; padding-top: 24px; padding-bottom: 48px; }
.exercise-types { display: flex; gap: 12px; overflow-x: auto; padding: 6px; }
.exercise-type {
  flex-shrink: 0;
  padding: 12px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
}
.exercise-type:hover { border-color: var(--color-brand-cyan); }
.exercise-type.router-link-exact-active {
  background: var(--color-brand-cyan-light);
  border-color: var(--color-brand-cyan);
  color: var(--color-brand-cyan);
}
.exercise-type:focus-visible { outline: 3px solid var(--color-brand-cyan); outline-offset: 2px; }
.exercise-content { padding: 32px 6px 0; }
</style>
