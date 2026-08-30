<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <div class="brand">🌐 Lingo<em>Laab</em></div>
        <p>One connected environment for courses, AI tutoring, reading and speaking practice.</p>
      </div>
      <div>
        <h4>Product</h4>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><RouterLink to="/register">Get started</RouterLink></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="container bottom">
      <span>© 2026 LingoLaab. All rights reserved.</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--wintergreen);
  color: var(--cream);
  padding: 56px 0 24px;
  margin-top: auto;
}

.brand {
  font-weight: 800;
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.brand em {
  font-style: normal;
  color: var(--champagne);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 32px;
}

.footer-grid p {
  color: rgba(248, 239, 213, 0.8);
  max-width: 320px;
}

h4 {
  color: var(--cream);
  margin-bottom: 14px;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  color: rgba(248, 239, 213, 0.85);
  text-decoration: none;
  font-size: 0.92rem;
}

ul a:hover {
  color: var(--champagne);
}

.bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(248, 239, 213, 0.2);
  font-size: 0.85rem;
  color: rgba(248, 239, 213, 0.7);
}

@media (max-width: 720px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
