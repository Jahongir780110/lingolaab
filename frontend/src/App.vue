<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ToastNotification from './components/ToastNotification.vue'
import { computed } from 'vue'

const route = useRoute()
const isCustomLayout = computed(() => route.meta.layout === 'dashboard')
</script>

<template>
  <AppHeader />
  <main style="flex: 1; display: flex; flex-direction: column;">
    <RouterView />
  </main>
  <AppFooter v-if="!isCustomLayout" />
  <ToastNotification />
</template>
