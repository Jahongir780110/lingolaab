<script setup>
import { useLocale } from '../i18n'
const { t } = useLocale()
</script>

<template>
  <section class="container practice-view" aria-label="Practice">
    <p>{{ t('practicePlaceholder') }}</p>
  </section>
</template>

<style scoped>
.practice-view { padding-top: 32px; padding-bottom: 48px; }
</style>
