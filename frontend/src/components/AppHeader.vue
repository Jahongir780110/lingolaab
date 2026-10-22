<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import fullLogo from '../assets/full_logo.png'
import { useLocale } from '../i18n'

const { t, localizedPath } = useLocale()

const route = useRoute()
const menuOpen = ref(false)
const links = [
  { label: 'Exercises', to: '/exercises' },
  { label: 'Practice', to: '/practice' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Writing', to: '/writing' },
  { label: 'Library', to: '/library' },
  { label: 'Podcasts', to: '/podcasts' },
  { label: 'Registration', to: '/register' }
]

watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <div class="container bar">
      <RouterLink :to="localizedPath('/')" class="brand-link" :aria-label="t('home')" @click="menuOpen = false">
        <img :src="fullLogo" alt="LingoLaab" class="brand-logo" />
      </RouterLink>
      <button
        class="menu-toggle"
        type="button"
        aria-controls="primary-navigation"
        :aria-expanded="menuOpen"
        :aria-label="t(menuOpen ? 'closeNav' : 'openNav')"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
      <nav id="primary-navigation" class="nav" :class="{ open: menuOpen }" :aria-label="t('primaryNav')">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="localizedPath(link.to)"
          :class="{ 'registration-link': link.to === '/register' }"
          @click="menuOpen = false"
        >{{ t(link.label.toLowerCase()) }}</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-base);
  border-bottom: 1px solid var(--color-border);
}
.bar {
  min-height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.brand-link { display: flex; flex-shrink: 0; padding: 12px 0; }
.brand-logo { display: block; width: 112px; height: auto; }
.nav { display: flex; align-items: center; gap: 24px; }
.nav a {
  padding: 12px 0;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
.nav a:hover, .nav a.router-link-active { color: var(--color-brand-cyan); border-bottom-color: var(--color-brand-cyan); }
.nav .registration-link {
  padding: 10px 18px;
  border: 1px solid var(--color-brand-cyan);
  border-radius: var(--radius-full);
  color: var(--color-brand-cyan);
}
.nav .registration-link:hover, .nav .registration-link.router-link-active { background: var(--color-brand-cyan-light); }
a:focus-visible, button:focus-visible { outline: 3px solid var(--color-brand-cyan); outline-offset: 5px; }
.menu-toggle { display: none; padding: 12px; background: transparent; border-radius: var(--radius-sm); }
.menu-toggle span { width: 24px; height: 2px; background: var(--color-text); border-radius: 2px; }
@media (max-width: 960px) {
  .bar { min-height: 96px; }
  .brand-logo { width: 100px; }
  .menu-toggle { display: flex; flex-direction: column; gap: 5px; }
  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 16px 24px 24px;
    background: var(--color-base);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .nav.open { display: flex; }
  .nav .registration-link { text-align: center; margin-top: 8px; }
}
</style>
