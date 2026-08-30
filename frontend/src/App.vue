<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isDashboard = computed(() => route.meta.layout === 'dashboard')
</script>

<template>
  <AppHeader v-if="!isDashboard" />
  <main style="flex: 1;">
    <RouterView />
  </main>
  <AppFooter v-if="!isDashboard" />
</template>
