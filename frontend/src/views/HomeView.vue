<script setup>
import { useLocale } from '../i18n'
const { t } = useLocale()
</script>

<template>
  <section class="home-view container" aria-labelledby="welcome-title">
    <div class="welcome-content">
      <div class="progress-label" id="platform-progress">
        <span>{{ t('progress') }}</span>
        <strong>25%</strong>
      </div>
      <div
        class="progress-track"
        role="progressbar"
        aria-labelledby="platform-progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="25"
        aria-valuetext="25% complete"
      >
        <div class="progress-fill"></div>
      </div>

      <h1 id="welcome-title">{{ t('welcome') }}</h1>
      <p>
        {{ t('welcomeText') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.home-view {
  flex: 1;
  display: grid;
  place-items: center;
  padding-top: 88px;
  padding-bottom: 104px;
}

.welcome-content {
  width: 100%;
  max-width: 640px;
  text-align: center;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  color: var(--color-text-body);
  font-size: 0.9rem;
  text-align: left;
}

.progress-label strong { color: var(--color-brand-cyan); }

.progress-track {
  height: 14px;
  margin-bottom: 48px;
  overflow: hidden;
  background: var(--color-border);
  border-radius: var(--radius-full);
}

.progress-fill {
  width: 25%;
  height: 100%;
  background: var(--color-brand-cyan);
  border-radius: inherit;
}

h1 { font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 20px; }
p { font-size: 1.1rem; color: var(--color-text-body); }

@media (max-width: 640px) {
  .home-view { padding-top: 56px; padding-bottom: 64px; }
  .progress-track { margin-bottom: 36px; }
}
</style>
