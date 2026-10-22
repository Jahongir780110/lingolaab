<script setup>
import fullLogo from '../assets/full_logo.png'
import { useLocale } from '../i18n'
const { t, localizedPath } = useLocale()
const socialPlatforms = ['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter', 'Hugging Face']
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <RouterLink :to="localizedPath('/')" :aria-label="t('home')">
        <img :src="fullLogo" alt="LingoLaab" class="footer-logo" />
      </RouterLink>
      <div class="contact-details">
        <a href="mailto:team@lingolaab.de">team@lingolaab.de</a>
        <ul class="social-platforms">
          <li v-for="platform in socialPlatforms" :key="platform">{{ platform }}</li>
        </ul>
      </div>
      <p>© {{ new Date().getFullYear() }} LingoLaab. {{ t('footerText') }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer { margin-top: auto; padding: 24px 0; background: var(--color-surface); border-top: 1px solid var(--color-border); }
.footer-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
.footer-logo { display: block; width: 80px; height: auto; }
.contact-details { display: flex; flex-direction: column; gap: 12px; }
.social-platforms { display: flex; flex-wrap: wrap; gap: 10px 18px; list-style: none; padding: 0; margin: 0; }
.social-platforms li { color: var(--color-text-muted); font-size: 0.85rem; }
a { color: var(--color-text-body); text-decoration: none; font-size: 0.85rem; }
a:hover { color: var(--color-brand-cyan); }
a:focus-visible { outline: 2px solid var(--color-brand-cyan); outline-offset: 4px; }
p { margin: 0; font-size: 0.8rem; }
</style>
