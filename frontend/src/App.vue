<script setup>
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { computed } from 'vue'

const route = useRoute()
const isCustomLayout = computed(() => route.meta.layout === 'dashboard' || route.meta.layout === 'lesson')
</script>

<template>
  <AppHeader v-if="!isCustomLayout" />
  <main style="flex: 1; display: flex; flex-direction: column;">
    <RouterView />
  </main>
  <AppFooter v-if="!isCustomLayout" />
</template>
