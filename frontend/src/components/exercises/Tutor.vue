<script setup>
import { useLocale } from '../../i18n'
const { t } = useLocale()
defineProps({ messages: { type: Array, required: true } })
</script>

<template>
  <aside class="tutor" aria-labelledby="tutor-title">
    <h2 id="tutor-title">{{ t('tutor') }}</h2>
    <div class="message-history" role="log" aria-label="Tutor messages" aria-live="polite" aria-relevant="additions">
      <div v-for="(message, index) in messages" :key="index" class="speech-cloud">
        <p>{{ t(message) }}</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.tutor { padding: 28px 12px; }
h2 { font-size: 1.2rem; margin-bottom: 20px; }
.message-history { display: flex; flex-direction: column; gap: 16px; }
.speech-cloud { position: relative; padding: 24px; border: 1px solid var(--color-brand-cyan); border-radius: 24px 24px 24px 4px; background: var(--color-brand-cyan-light); }
p { margin: 0; color: var(--color-text-body); }
</style>
