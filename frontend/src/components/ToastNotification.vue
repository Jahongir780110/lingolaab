<script setup>
import { useToastStore } from '../stores/toast'
const toast = useToastStore()
</script>

<template>
  <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
    <div v-if="toast.notification" :key="toast.notification.id" class="toast">
      <strong>{{ toast.notification.title }}</strong>
      <p>{{ toast.notification.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.toast-region { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 100; width: min(560px, calc(100% - 32px)); pointer-events: none; }
.toast { padding: 20px 24px; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-left: 5px solid var(--color-action-success); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); }
strong { display: block; margin-bottom: 6px; }
p { margin: 0; color: var(--color-text-body); font-size: 0.9rem; }
</style>
