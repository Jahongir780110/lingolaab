<script setup>
import AppLogo from './AppLogo.vue'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="brand-col">
        <RouterLink to="/" class="footer-logo">
          <AppLogo :size="34" textColor="light" />
        </RouterLink>
        <p class="brand-desc">
          One connected language platform combining structured courses, live lessons, living library, vocabulary tracking, grammar mastery, and speaking & writing practice.
        </p>
        <div class="palette-indicator">
          <span class="dot dot-cyan" title="Brand Cyan"></span>
          <span class="dot dot-green" title="Success Lime"></span>
          <span class="dot dot-purple" title="Mastery Purple"></span>
          <span class="dot dot-yellow" title="Mustard Yellow"></span>
        </div>
      </div>
      
      <div>
        <h4>Platform Features</h4>
        <ul>
          <li><RouterLink to="/dashboard">Courses</RouterLink></li>
          <li><RouterLink to="/dashboard">Live lessons</RouterLink></li>
          <li><RouterLink to="/dashboard">Library</RouterLink></li>
          <li><RouterLink to="/dashboard">Vocabulary</RouterLink></li>
          <li><RouterLink to="/dashboard">Grammar</RouterLink></li>
          <li><RouterLink to="/dashboard">Speaking</RouterLink></li>
          <li><RouterLink to="/dashboard">Writing</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4>Proficiency Levels</h4>
        <ul class="level-list">
          <li><span class="level-dot a-dot"></span> Beginner (A1 – A2)</li>
          <li><span class="level-dot b-dot"></span> Intermediate (B1 – B2)</li>
          <li><span class="level-dot c-dot"></span> Advanced (C1 – C2)</li>
          <li><RouterLink to="/register" class="test-link">Take placement test →</RouterLink></li>
        </ul>
      </div>

      <div>
        <h4>Get Started</h4>
        <ul>
          <li><RouterLink to="/register">Create free account</RouterLink></li>
          <li><RouterLink to="/login">Sign in</RouterLink></li>
          <li><RouterLink :to="{ path: '/', hash: '#pricing' }">Pricing & Plans</RouterLink></li>
          <li><a href="#">Support & FAQ</a></li>
        </ul>
      </div>
    </div>
    
    <div class="container bottom">
      <span>© 2026 LingoLaab. Learn languages, connected. All rights reserved.</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #2E1065;
  color: #F8FAFC;
  padding: 64px 0 28px;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2.2fr 1.2fr 1.3fr 1.2fr;
  gap: 40px;
}

.brand-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: inline-flex;
  text-decoration: none;
}

.brand-desc {
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.92rem;
  line-height: 1.6;
  max-width: 340px;
  margin: 0;
}

.palette-indicator {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-cyan { background: var(--color-brand-cyan); }
.dot-green { background: var(--color-action-success); }
.dot-purple { background: var(--color-accent-purple); }
.dot-yellow { background: var(--level-intermediate); }

h4 {
  color: #FFFFFF;
  margin-bottom: 16px;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

ul a {
  color: rgba(248, 250, 252, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease, transform 0.15s ease;
  display: inline-block;
}

ul a:hover {
  color: var(--color-brand-cyan);
  transform: translateX(2px);
}

.level-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: rgba(248, 250, 252, 0.8);
}

.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.a-dot { background: var(--level-beginner); }
.b-dot { background: var(--level-intermediate); }
.c-dot { background: #A855F7; }

.test-link {
  color: var(--color-brand-cyan) !important;
  font-weight: 700 !important;
  margin-top: 6px;
}

.bottom {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: rgba(248, 250, 252, 0.6);
  text-align: center;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 580px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
