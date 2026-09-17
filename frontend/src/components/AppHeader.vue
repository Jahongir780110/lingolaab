<script setup>
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand-link">
        <AppLogo :size="38" layout="horizontal" />
      </RouterLink>

      <nav class="nav" :class="{ open: menuOpen }">
        <RouterLink :to="{ path: '/', hash: '#how-it-works' }" @click="menuOpen = false">How it works</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#courses' }" @click="menuOpen = false">Courses</RouterLink>
        <RouterLink to="/dashboard" @click="menuOpen = false">Library</RouterLink>
        <RouterLink to="/dashboard" @click="menuOpen = false">Speaking</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#pricing' }" @click="menuOpen = false">Pricing</RouterLink>
        <RouterLink to="/login" @click="menuOpen = false" class="login-link">Log in</RouterLink>
        <RouterLink to="/register" @click="menuOpen = false" class="btn btn-primary nav-cta">Start learning for free</RouterLink>
      </nav>

      <button class="burger" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 2px 12px rgba(46, 16, 101, 0.03);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
}

.brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.15s ease;
}

.brand-link:hover {
  transform: scale(1.02);
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav a {
  text-decoration: none;
  font-weight: 600;
  color: var(--color-text-body);
  font-size: 0.95rem;
  transition: color 0.15s;
}

.nav a:hover {
  color: var(--color-brand-cyan);
}

.login-link {
  color: var(--color-accent-purple) !important;
  font-weight: 700 !important;
}

.nav-cta {
  padding: 10px 22px;
  font-size: 0.9rem;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  padding: 8px;
  border-radius: 6px;
}

.burger span {
  width: 24px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
}

@media (max-width: 860px) {
  .nav {
    position: absolute;
    top: 74px;
    left: 0;
    right: 0;
    background: #ffffff;
    flex-direction: column;
    align-items: stretch;
    padding: 20px 24px 28px;
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    display: none;
    gap: 16px;
  }
  .nav.open {
    display: flex;
  }
  .nav a {
    padding: 8px 0;
  }
  .burger {
    display: flex;
  }
}
</style>
