<script setup>
import { useLocale } from '../i18n'
const { t } = useLocale()
</script>

<template>
  <p>{{ t('audioPlaceholder') }}</p>
</template>
