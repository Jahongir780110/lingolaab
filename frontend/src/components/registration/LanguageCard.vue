<script setup>
defineProps({ flag: String, label: String, description: String, selected: Boolean, disabled: Boolean, badge: String, language: String })
</script>

<template>
  <button type="button" class="language-card" :class="{ selected }" :disabled="disabled" :aria-pressed="selected">
    <span class="flag" aria-hidden="true">{{ flag }}</span>
    <span class="card-copy"><strong :lang="language" dir="auto">{{ label }}</strong><span v-if="description" :lang="language" dir="auto">{{ description }}</span><small v-if="badge">{{ badge }}</small></span>
    <span v-if="selected" aria-hidden="true" class="selection">✓</span>
  </button>
</template>

<style scoped>
.language-card { display: flex; align-items: center; gap: 16px; width: 100%; min-height: 100px; padding: 20px; text-align: left; border: 1px solid var(--color-border); border-radius: var(--radius-md); color: var(--color-text); background: var(--color-surface); }
.language-card:hover:enabled, .language-card.selected { border-color: var(--color-brand-cyan); background: var(--color-brand-cyan-light); }
.language-card:disabled { opacity: 0.55; cursor: not-allowed; }
.flag { font-size: 2rem; }
.card-copy { display: flex; flex: 1; flex-direction: column; gap: 5px; }
.card-copy span { font-size: 0.9rem; }
small { color: var(--color-text-muted); }
.selection { color: var(--color-brand-cyan); font-size: 1.25rem; }
button:focus-visible { outline: 3px solid var(--color-brand-cyan); outline-offset: 3px; }
</style>
