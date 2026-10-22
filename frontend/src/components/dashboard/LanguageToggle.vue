<script setup>
import { useLocale } from '../../i18n'
const { t } = useLocale()
</script>

<template>
  <label class="language-choice">
    <span>{{ t('learningLanguage') }}</span>
    <select aria-label="Learning language" value="de">
      <option value="de">{{ t('german') }}</option>
      <option value="en" disabled>{{ t('english') }}</option>
    </select>
  </label>
</template>

<style scoped>
.language-choice { display: flex; flex-direction: column; gap: 8px; color: var(--color-text-muted); font-size: 0.75rem; font-weight: 700; }
select { min-width: 180px; padding: 12px 18px; border: 1px solid var(--color-brand-cyan); border-radius: var(--radius-md); background: var(--color-surface); color: var(--color-text); font: inherit; font-size: 0.95rem; }
select:focus-visible { outline: 2px solid var(--color-brand-cyan); outline-offset: 3px; }
</style>
