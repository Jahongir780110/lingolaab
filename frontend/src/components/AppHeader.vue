<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark">🌐</span>
        <span class="brand-name">Lingo<em>Laab</em></span>
      </RouterLink>

      <nav class="nav" :class="{ open: menuOpen }">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it works</a>
        <a href="#pricing">Pricing</a>
        <RouterLink to="/login">Log in</RouterLink>
        <RouterLink to="/register" class="btn btn-primary nav-cta">Get started</RouterLink>
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
  background: rgba(248, 239, 213, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 1.35rem;
  text-decoration: none;
  color: var(--color-text);
}

.brand-name em {
  font-style: normal;
  color: var(--color-accent);
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav a {
  text-decoration: none;
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.nav a:hover {
  color: var(--color-primary);
}

.nav-cta {
  padding: 10px 22px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  padding: 8px;
}

.burger span {
  width: 22px;
  height: 2px;
  background: var(--color-text);
}

@media (max-width: 860px) {
  .nav {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    background: var(--color-bg);
    flex-direction: column;
    align-items: stretch;
    padding: 16px 24px 24px;
    border-bottom: 1px solid var(--color-border);
    display: none;
  }
  .nav.open {
    display: flex;
  }
  .nav a {
    padding: 10px 0;
  }
  .burger {
    display: flex;
  }
}
</style>
