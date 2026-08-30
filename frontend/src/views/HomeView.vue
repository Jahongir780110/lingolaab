<script setup>
const features = [
  {
    icon: '📚',
    title: 'Structured courses',
    text: 'A1 is free. Progress level by level with courses that build on what you already know.'
  },
  {
    icon: '🤖',
    title: 'AI tutor, in context',
    text: 'Grammar explanations, essay feedback and personalized stories — generated from your real vocabulary and mistakes, not a random chatbot.'
  },
  {
    icon: '📖',
    title: 'Living library',
    text: 'Click any word while reading for an instant translation. New words join your personal vocabulary automatically.'
  },
  {
    icon: '🧠',
    title: 'Knowledge that decays & recovers',
    text: 'Every word and grammar point has a 0–100 score that weakens over time and strengthens with practice — so you always know what to review next.'
  },
  {
    icon: '🗣️',
    title: 'Free speaking clubs',
    text: 'Join peer-hosted speaking clubs for free, or book affordable small-group lessons with real teachers.'
  },
  {
    icon: '💶',
    title: 'Pay per course, not per month',
    text: 'One-time course purchases from A2–C1, roughly €5–7 each. No subscriptions eating your wallet.'
  }
]

const steps = [
  { n: '01', title: 'Tell us where you\'re starting', text: 'Pick your native language, your target language and your current level.' },
  { n: '02', title: 'Learn with everything connected', text: 'Courses, AI tutor, reading and speaking practice all update the same knowledge model.' },
  { n: '03', title: 'Practice exactly what you\'re forgetting', text: 'LingoLaab surfaces the vocabulary and grammar your scores say are weakening.' }
]

const plans = [
  { name: 'A1', price: 'Free', tag: 'Start free', highlight: false },
  { name: 'A2 – C1 course', price: '€5 – €7', tag: 'One-time purchase', highlight: true },
  { name: 'Schools', price: '€3 – €4.50 / course', tag: 'Bulk, 50+ courses', highlight: false }
]
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="badge hero-badge">Language learning, finally connected</span>
          <h1>Learn a language with one platform that actually knows what you know.</h1>
          <p class="lead">
            Courses, an AI tutor, a smart library and speaking practice — connected through
            a single, always-updating model of your vocabulary and grammar knowledge.
          </p>
          <div class="hero-actions">
            <RouterLink to="/register" class="btn btn-primary">Start learning free</RouterLink>
            <RouterLink to="/dashboard" class="btn btn-outline">See a demo dashboard</RouterLink>
          </div>
          <div class="hero-stats">
            <div><strong>A1</strong><span>completely free</span></div>
            <div><strong>€50–60</strong><span>zero to C1, total</span></div>
            <div><strong>0</strong><span>subscription fees</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="mock-card card">
            <div class="mock-row">
              <span>Vocabulary knowledge</span>
              <strong>78%</strong>
            </div>
            <div class="mock-bar"><div class="mock-bar-fill" style="width: 78%; background: var(--wintergreen);"></div></div>
            <div class="mock-row">
              <span>Subordinate clauses</span>
              <strong>42%</strong>
            </div>
            <div class="mock-bar"><div class="mock-bar-fill" style="width: 42%; background: var(--tangerine);"></div></div>
            <div class="mock-chip">🔥 12-day streak</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROBLEM -->
    <section class="section problem">
      <div class="container problem-grid">
        <div>
          <span class="badge badge-muted">The problem</span>
          <h2>Learners juggle five different apps just to study one language.</h2>
          <p>
            One app for exercises. Another for translation. A separate platform for books.
            A different tool for speaking practice. And none of them know what the others taught you.
          </p>
        </div>
        <div class="problem-tools">
          <span>Exercises app</span>
          <span>Translation tool</span>
          <span>Book platform</span>
          <span>Speaking app</span>
          <span>ChatGPT</span>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="section features">
      <div class="container">
        <div class="section-heading">
          <span class="badge">What's inside</span>
          <h2>One connected learning environment</h2>
          <p>Every feature feeds the same knowledge model, so the platform always knows what to teach you next.</p>
        </div>
        <div class="feature-grid">
          <div class="feature-card card" v-for="f in features" :key="f.title">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="section how">
      <div class="container">
        <div class="section-heading">
          <span class="badge">How it works</span>
          <h2>Three steps to a personalized path</h2>
        </div>
        <div class="steps">
          <div class="step" v-for="s in steps" :key="s.n">
            <div class="step-n">{{ s.n }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="section pricing">
      <div class="container">
        <div class="section-heading">
          <span class="badge">Pricing</span>
          <h2>Pay for progress, not for months</h2>
          <p>One-time course purchases instead of subscriptions. Speaking clubs are always free.</p>
        </div>
        <div class="plans">
          <div class="plan card" :class="{ highlight: p.highlight }" v-for="p in plans" :key="p.name">
            <span class="plan-tag">{{ p.tag }}</span>
            <h3>{{ p.name }}</h3>
            <div class="plan-price">{{ p.price }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta">
      <div class="container cta-box card">
        <div>
          <h2>Ready to learn a language that adapts to you?</h2>
          <p>Create your free account and start your A1 course today — no card required.</p>
        </div>
        <RouterLink to="/register" class="btn btn-primary">Create free account</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 72px 0 56px;
  background: linear-gradient(180deg, var(--champagne) 0%, var(--cream) 70%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}

.hero-badge {
  background: rgba(71, 139, 133, 0.15);
  color: var(--wintergreen);
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-text);
}

.lead {
  font-size: 1.1rem;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin: 28px 0 36px;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.hero-stats div {
  display: flex;
  flex-direction: column;
}

.hero-stats strong {
  font-size: 1.4rem;
  color: var(--color-accent);
}

.hero-stats span {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.mock-card {
  padding: 28px;
  width: 100%;
  max-width: 340px;
}

.mock-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.mock-bar {
  height: 10px;
  border-radius: 999px;
  background: var(--color-border);
  overflow: hidden;
  margin-bottom: 20px;
}

.mock-bar-fill {
  height: 100%;
  border-radius: 999px;
}

.mock-chip {
  display: inline-block;
  background: rgba(255, 141, 48, 0.15);
  color: #b35a10;
  padding: 6px 14px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
}

.problem {
  background: var(--color-surface);
}

.problem-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: center;
}

.badge-muted {
  background: rgba(252, 46, 21, 0.1);
  color: var(--retro-red);
  margin-bottom: 14px;
}

.problem-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.problem-tools span {
  padding: 10px 16px;
  border-radius: 10px;
  background: var(--cream);
  border: 1px dashed var(--color-border);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

.section-heading {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}

.section-heading .badge {
  background: rgba(255, 141, 48, 0.15);
  color: #b35a10;
  margin-bottom: 14px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  padding: 28px;
}

.feature-icon {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.how {
  background: var(--color-surface);
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.step {
  padding: 8px;
}

.step-n {
  font-size: 2rem;
  font-weight: 800;
  color: var(--champagne);
  -webkit-text-stroke: 2px var(--tangerine);
  margin-bottom: 8px;
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.plan {
  padding: 32px 24px;
  text-align: center;
}

.plan.highlight {
  border-color: var(--wintergreen);
  box-shadow: 0 12px 30px rgba(71, 139, 133, 0.25);
  transform: scale(1.03);
}

.plan-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.plan-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent);
  margin-top: 8px;
}

.cta-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 48px;
  background: var(--wintergreen);
  color: var(--cream);
}

.cta-box h2 {
  color: var(--cream);
}

.cta-box p {
  color: rgba(248, 239, 213, 0.85);
}

@media (max-width: 900px) {
  .hero-grid, .problem-grid {
    grid-template-columns: 1fr;
  }
  .feature-grid, .steps, .plans {
    grid-template-columns: 1fr;
  }
  .cta-box {
    flex-direction: column;
    text-align: center;
  }
}
</style>
