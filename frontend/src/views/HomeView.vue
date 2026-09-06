<script setup>
import { ref } from 'vue'
import AppLogo from '../components/AppLogo.vue'

// 6 Core Features from Image 5
const featuresRow = [
  {
    icon: '📖',
    title: 'Structured Courses',
    desc: 'From A1 to C1, with clear lessons and smart exercises.'
  },
  {
    icon: '📚',
    title: 'Smart Library',
    desc: 'Read books and articles with help in one click.'
  },
  {
    icon: '🤖',
    title: 'AI Tutor',
    desc: 'Get explanations, feedback, stories and exercises made for you.'
  },
  {
    icon: '🎙️',
    title: 'Speaking Practice',
    desc: 'Join free speaking clubs or book affordable live lessons.'
  },
  {
    icon: '📈',
    title: 'Tracks Your Progress',
    desc: "We track what you know — and what you're forgetting."
  },
  {
    icon: '💙',
    title: 'Starts With You',
    desc: 'We adapt to your language, goals, and learning style.'
  }
]

// Pricing ladder from Image 5
const pricingTiers = [
  { level: 'A1', price: 'Free', isFree: true },
  { level: 'A2', price: '€5', isFree: false },
  { level: 'B1', price: '€5', isFree: false },
  { level: 'B2', price: '€5–€7', isFree: false },
  { level: 'C1', price: '€5–€7', isFree: false }
]
</script>

<template>
  <div class="landing-page">
    <!-- HERO SECTION (IMAGE 5) -->
    <section class="hero-section">
      <div class="container hero-layout">
        <div class="hero-left-copy">
          <h1>Language learning made <span class="text-highlight">personal.</span></h1>
          <p class="hero-lead">
            Courses, AI tutor, real books and speaking practice — all in one place, personalized for you.
          </p>

          <div class="hero-btn-row">
            <RouterLink to="/register" class="btn btn-primary btn-hero-cta">
              Start learning for free →
            </RouterLink>
            <RouterLink to="/lesson" class="btn btn-ghost btn-see-works">
              <span class="play-circle">▷</span> See how it works
            </RouterLink>
          </div>

          <div class="hero-trust-row">
            <div class="trust-item">
              <span class="t-icon">🛡️</span>
              <span>Starts in your language</span>
            </div>
            <div class="trust-item">
              <span class="t-icon">🤖</span>
              <span>AI that knows what you know</span>
            </div>
            <div class="trust-item">
              <span class="t-icon">👥</span>
              <span>Learn with real people</span>
            </div>
          </div>
        </div>

        <!-- HERO RIGHT VISUAL (IMAGE 5) -->
        <div class="hero-right-visual">
          <div class="hero-image-stage">
            <!-- Learner Graphic Presentation -->
            <div class="learner-canvas">
              <div class="canvas-back-glow"></div>
              <div class="avatar-illustration-circle">
                <span class="learner-art-emoji">👩‍💻</span>
              </div>
            </div>

            <!-- Floating UI Card 1: Speech Bubble -->
            <div class="floating-chip chip-speech">
              <div class="bubble-text">
                <strong>Guten Morgen!</strong>
                <small>(Good morning!)</small>
              </div>
              <span class="speaker-icon">🔊</span>
            </div>

            <!-- Floating UI Card 2: Vocabulary Circular Score -->
            <div class="floating-card card-vocab">
              <span class="fc-label">Vocabulary</span>
              <div class="fc-score-ring">
                <strong>72</strong>
                <small>/100</small>
              </div>
              <span class="fc-status status-vocab">Needs practice</span>
            </div>

            <!-- Floating UI Card 3: Course Progress -->
            <div class="floating-card card-progress">
              <div class="fp-head">
                <strong>A1.1 — Lesson 3</strong>
                <span class="fp-pct">60%</span>
              </div>
              <div class="fp-bar">
                <div class="fp-bar-fill" style="width: 60%;"></div>
              </div>
            </div>

            <!-- Floating UI Card 4: Streak -->
            <div class="floating-chip chip-streak">
              <span>🔥</span>
              <strong>7 day streak</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: EVERYTHING YOU NEED (6 CARDS ROW, IMAGE 5) -->
    <section class="section features-row-section">
      <div class="container">
        <div class="section-title-center">
          <h2>Everything you need to learn and improve</h2>
        </div>

        <div class="six-features-grid">
          <div class="six-feature-card" v-for="f in featuresRow" :key="f.title">
            <div class="feature-icon-square">
              <span>{{ f.icon }}</span>
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: START WHERE YOU ARE (IMAGE 5) -->
    <section class="section adapt-section">
      <div class="container adapt-layout">
        <div class="adapt-copy">
          <h2>Start where you are.<br />We adapt to you.</h2>
          <p class="adapt-sub">
            LingoLaab starts from your language and knowledge, and builds your path step by step.
          </p>

          <ul class="checklist-items">
            <li>
              <span class="check-green">✓</span>
              <span>Explanations in your language</span>
            </li>
            <li>
              <span class="check-green">✓</span>
              <span>Personalized tasks every day</span>
            </li>
            <li>
              <span class="check-green">✓</span>
              <span>Focus on what you need most</span>
            </li>
            <li>
              <span class="check-green">✓</span>
              <span>Learn anytime, anywhere</span>
            </li>
          </ul>

          <RouterLink to="/register" class="link-arrow-text">
            See how it works →
          </RouterLink>
        </div>

        <!-- Dual Device Mockup Stage (Image 5) -->
        <div class="adapt-devices-stage">
          <!-- Tablet / Web UI Mockup -->
          <div class="mock-tablet-window card">
            <div class="tablet-header">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
              <span class="window-title">Your learning plan</span>
            </div>

            <div class="tablet-tasks-list">
              <div class="tablet-task-row">
                <span class="t-icon">📖</span>
                <span class="t-name">Practice vocabulary</span>
                <span class="t-day">Monday</span>
                <span class="t-badge done">Done</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-icon">✍️</span>
                <span class="t-name">Write an essay</span>
                <span class="t-day">Today</span>
                <span class="t-link">Start ›</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-icon">📋</span>
                <span class="t-name">Lesson 4. Exercises 4–8</span>
                <span class="t-day">Today</span>
                <span class="t-link">Start ›</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-icon">📖</span>
                <span class="t-name">Read "Der kleine Prinz"</span>
                <span class="t-day">Wednesday</span>
                <span class="t-link">Start ›</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-icon">💬</span>
                <span class="t-name">Speaking club: Hobbies</span>
                <span class="t-day">Thursday</span>
                <span class="t-link">Join ›</span>
              </div>
            </div>
            <div class="tablet-footer-link">View full plan</div>
          </div>

          <!-- Smartphone Mockup -->
          <div class="mock-phone-window card">
            <div class="phone-speaker-notch"></div>
            <div class="phone-vocab-card">
              <span class="p-sub">Vocabulary</span>
              <h3>Haus</h3>
              <span class="p-trans">house</span>
              <span class="p-audio">🔊</span>

              <div class="phone-score-box">
                <span class="score-label">Your score</span>
                <div class="score-circle">
                  <strong>82</strong>
                  <small>/100</small>
                </div>
                <span class="score-status">Needs practice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: A1 IS FREE. KEEP GROWING. (IMAGE 5) -->
    <section class="section pricing-ladder-section" id="pricing">
      <div class="container pricing-ladder-card card">
        <div class="ladder-left">
          <div class="sprout-icon-circle">🌱</div>
          <div>
            <h3>A1 is free.<br />Keep growing.</h3>
            <p>Start for free, then unlock more as you advance. No subscriptions — just fair, one-time course pricing.</p>
          </div>
        </div>

        <div class="ladder-tiers-row">
          <div class="tier-col" v-for="t in pricingTiers" :key="t.level">
            <span class="tier-level-name">{{ t.level }}</span>
            <strong class="tier-price-val" :class="{ 'text-free': t.isFree }">{{ t.price }}</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: TESTIMONIAL & SOCIAL PROOF (IMAGE 5) -->
    <section class="section proof-section">
      <div class="container proof-grid">
        <div class="quote-card card">
          <div class="quote-symbol">“</div>
          <p class="quote-text">
            Finally, a platform that teaches me in my language and understands what I need.
          </p>
          <div class="quote-author">
            <span class="author-avatar">👨</span>
            <div>
              <strong>Dilshod</strong>
              <span>Uzbekistan</span>
            </div>
          </div>
        </div>

        <div class="partners-card card">
          <span class="partners-label">Trusted by learners and schools</span>
          <div class="partners-logos-row">
            <div class="partner-badge goethe">GOETHE INSTITUT</div>
            <div class="partner-badge klett">Klett</div>
            <div class="partner-badge hueber">Hueber</div>
            <div class="partner-badge cornelsen">Cornelsen</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: BOTTOM EXPLORE BANNER (IMAGE 5) -->
    <section class="section bottom-banner-section">
      <div class="container bottom-cta-bar card">
        <div class="cta-bar-left">
          <span class="globe-big">🌐</span>
          <div>
            <h3>Many languages. One personal experience.</h3>
            <p>LingoLaab is growing together with learners around the world.</p>
          </div>
        </div>

        <RouterLink to="/register" class="btn btn-primary btn-explore-cta">
          Explore courses →
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  background: #FFFFFF;
  color: var(--color-text-body);
}

/* HERO SECTION (MATCHING IMAGE 5) */
.hero-section {
  padding: 64px 0 52px;
  background: #FFFFFF;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}

.hero-left-copy h1 {
  font-size: clamp(2.4rem, 4.2vw, 3.4rem);
  color: var(--color-text);
  line-height: 1.15;
  margin-bottom: 20px;
  font-weight: 800;
}

.text-highlight {
  color: var(--color-brand-cyan);
}

.hero-lead {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 520px;
  margin-bottom: 32px;
}

.hero-btn-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.btn-hero-cta {
  padding: 15px 32px;
  font-size: 1.05rem;
}

.btn-see-works {
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
}

.play-circle {
  font-size: 1.1rem;
}

.hero-trust-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  border-top: 1px solid var(--color-border);
  padding-top: 24px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.t-icon {
  font-size: 1.2rem;
}

/* HERO RIGHT VISUAL STAGE (IMAGE 5) */
.hero-right-visual {
  display: flex;
  justify-content: center;
  position: relative;
}

.hero-image-stage {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 420px;
}

.learner-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.canvas-back-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 168, 204, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
}

.avatar-illustration-circle {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: linear-gradient(135deg, #EEF2FF 0%, #E0F2FE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #FFFFFF;
  box-shadow: 0 16px 36px rgba(46, 16, 101, 0.08);
}

.learner-art-emoji {
  font-size: 7rem;
  line-height: 1;
}

/* FLOATING UI CHIPS (IMAGE 5) */
.floating-chip {
  position: absolute;
  background: #FFFFFF;
  border-radius: var(--radius-full);
  padding: 8px 16px;
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 20px rgba(46, 16, 101, 0.08);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

.chip-speech {
  top: 10px;
  left: 20px;
}

.bubble-text strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text);
}

.bubble-text small {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.speaker-icon {
  font-size: 0.95rem;
}

.chip-streak {
  bottom: 20px;
  right: 10px;
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.3);
  color: #D97706;
  font-size: 0.85rem;
}

.floating-card {
  position: absolute;
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  box-shadow: 0 10px 24px rgba(46, 16, 101, 0.08);
  z-index: 10;
}

.card-vocab {
  bottom: 30px;
  left: 10px;
  text-align: center;
}

.fc-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.fc-score-ring strong {
  font-size: 1.6rem;
  color: var(--color-text);
  font-weight: 800;
}

.fc-score-ring small {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.fc-status {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  margin-top: 4px;
}
.status-vocab { color: #2563EB; }

.card-progress {
  top: 50px;
  right: -10px;
  width: 170px;
}

.fp-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  margin-bottom: 6px;
}

.fp-head strong { color: var(--color-text); }
.fp-pct { color: #10B981; font-weight: 800; }

.fp-bar {
  height: 6px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.fp-bar-fill {
  height: 100%;
  background: #10B981;
  border-radius: var(--radius-full);
}

/* SECTION 2: 6 FEATURES ROW (IMAGE 5) */
.features-row-section {
  padding: 60px 0;
  background: #FAFAFA;
}

.section-title-center {
  text-align: center;
  margin-bottom: 44px;
}

.section-title-center h2 {
  font-size: 2rem;
  color: var(--color-text);
}

.six-features-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.six-feature-card {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feature-icon-square {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 14px;
}

.six-feature-card h3 {
  font-size: 0.95rem;
  margin: 0 0 6px;
  font-weight: 800;
  color: var(--color-text);
}

.six-feature-card p {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.45;
  margin: 0;
}

/* SECTION 3: ADAPT SECTION (IMAGE 5) */
.adapt-section {
  padding: 80px 0;
}

.adapt-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 56px;
  align-items: center;
}

.adapt-copy h2 {
  font-size: clamp(2rem, 3.2vw, 2.7rem);
  line-height: 1.2;
  margin-bottom: 14px;
}

.adapt-sub {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.checklist-items {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checklist-items li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.check-green {
  color: var(--color-action-success);
  font-weight: 800;
}

.link-arrow-text {
  font-weight: 700;
  color: var(--color-brand-cyan);
  text-decoration: none;
  font-size: 0.95rem;
}

/* DUAL DEVICE MOCKUP */
.adapt-devices-stage {
  position: relative;
  display: flex;
  justify-content: center;
}

.mock-tablet-window {
  width: 100%;
  max-width: 440px;
  background: #FFFFFF;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  box-shadow: 0 20px 40px rgba(46, 16, 101, 0.08);
  padding: 18px;
}

.tablet-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 12px;
}

.dot-red { width: 8px; height: 8px; border-radius: 50%; background: #EF4444; }
.dot-yellow { width: 8px; height: 8px; border-radius: 50%; background: #F59E0B; }
.dot-green { width: 8px; height: 8px; border-radius: 50%; background: #10B981; }

.window-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-left: 8px;
}

.tablet-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tablet-task-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-hover);
  font-size: 0.8rem;
}

.t-name { flex: 1; font-weight: 600; }
.t-day { color: var(--color-text-muted); font-size: 0.72rem; }

.t-badge.done {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: #D1FAE5;
  color: #065F46;
  font-weight: 700;
  font-size: 0.7rem;
}

.t-link {
  color: var(--color-brand-cyan);
  font-weight: 700;
  font-size: 0.75rem;
}

.tablet-footer-link {
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-brand-cyan);
  font-weight: 700;
  margin-top: 10px;
}

.mock-phone-window {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 170px;
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 16px 36px rgba(46, 16, 101, 0.12);
}

.phone-speaker-notch {
  width: 40px;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  margin: 0 auto 10px;
}

.phone-vocab-card {
  text-align: center;
}

.p-sub {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-weight: 700;
  text-transform: uppercase;
}

.phone-vocab-card h3 {
  font-size: 1.25rem;
  margin: 4px 0 2px;
}

.p-trans { font-size: 0.75rem; color: var(--color-text-muted); display: block; }
.p-audio { font-size: 0.85rem; margin: 4px 0; display: inline-block; }

.phone-score-box {
  background: var(--color-surface-hover);
  padding: 8px;
  border-radius: var(--radius-sm);
  margin-top: 8px;
}

.score-label { font-size: 0.62rem; color: var(--color-text-muted); display: block; }
.score-circle strong { font-size: 1.1rem; color: var(--color-text); }
.score-circle small { font-size: 0.65rem; color: var(--color-text-muted); }
.score-status { font-size: 0.62rem; color: #2563EB; font-weight: 700; display: block; }

/* SECTION 4: A1 IS FREE. KEEP GROWING. (IMAGE 5) */
.pricing-ladder-section {
  padding: 40px 0 60px;
}

.pricing-ladder-card {
  padding: 36px 44px;
  background: #FAFAFA;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.ladder-left {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 460px;
}

.sprout-icon-circle {
  font-size: 2.5rem;
}

.ladder-left h3 {
  font-size: 1.4rem;
  margin: 0 0 6px;
}

.ladder-left p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.ladder-tiers-row {
  display: flex;
  gap: 32px;
}

.tier-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.tier-level-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--color-text);
}

.tier-price-val {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text);
  font-family: var(--font-heading);
}

.text-free {
  color: var(--color-action-success);
}

/* SECTION 5: PROOF & TESTIMONIAL (IMAGE 5) */
.proof-section {
  padding: 40px 0 60px;
}

.proof-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 24px;
}

.quote-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.quote-symbol {
  font-size: 2.2rem;
  color: var(--color-brand-cyan);
  line-height: 1;
  margin-bottom: 8px;
}

.quote-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 18px;
  line-height: 1.5;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.author-avatar {
  font-size: 1.5rem;
}

.quote-author strong {
  display: block;
  font-size: 0.88rem;
}

.quote-author span {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.partners-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.partners-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.partners-logos-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.partner-badge {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.partner-badge.goethe { background: #84CC16; color: #FFFFFF; }
.partner-badge.klett { background: #0284C7; color: #FFFFFF; }
.partner-badge.hueber { background: #DC2626; color: #FFFFFF; }
.partner-badge.cornelsen { background: #EF4444; color: #FFFFFF; }

/* SECTION 6: BOTTOM BANNER (IMAGE 5) */
.bottom-banner-section {
  padding: 0 0 80px;
}

.bottom-cta-bar {
  padding: 28px 40px;
  border-radius: var(--radius-lg);
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.cta-bar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.globe-big {
  font-size: 2.4rem;
}

.cta-bar-left h3 {
  font-size: 1.2rem;
  margin: 0 0 4px;
}

.cta-bar-left p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.btn-explore-cta {
  padding: 13px 28px;
  font-size: 0.95rem;
  white-space: nowrap;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-layout, .adapt-layout, .pricing-ladder-card, .proof-grid {
    grid-template-columns: 1fr;
  }
  .six-features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .bottom-cta-bar {
    flex-direction: column;
    text-align: center;
  }
  .cta-bar-left {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .six-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .ladder-tiers-row {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
