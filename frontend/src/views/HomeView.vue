<script setup>
import { ref } from 'vue'
import AppLogo from '../components/AppLogo.vue'
import FeatureIcon from '../components/FeatureIcon.vue'

// 6 Core Features with Custom Icons
const featuresRow = [
  {
    icon: 'courses',
    title: 'Structured Courses',
    desc: 'From A1 to C1, with clear lessons and smart exercises.'
  },
  {
    icon: 'library',
    title: 'Smart Library',
    desc: 'Read books and articles with help in one click.'
  },
  {
    icon: 'tutor',
    title: 'AI Tutor',
    desc: 'Get explanations, feedback, stories and exercises made for you.'
  },
  {
    icon: 'speaking',
    title: 'Speaking Practice',
    desc: 'Join free speaking clubs or book affordable live lessons.'
  },
  {
    icon: 'progress',
    title: 'Tracks Your Progress',
    desc: 'Intelligent review and analytics to reinforce what you learn.'
  },
  {
    icon: 'personalized',
    title: 'Starts With You',
    desc: 'We adapt to your language, goals, and learning style.'
  }
]

// 4 Course Pricing Tiers
const pricingCards = [
  {
    id: 'a1',
    title: 'A1.1 – A1.2 Courses',
    subtitle: '12 lessons each',
    isSubtitleHighlight: true,
    price: '€0',
    period: '/ free forever',
    features: [
      { bold: '100% Free', text: 'across all supported languages' },
      { text: "Try & test our platform's full capabilities" },
      { text: 'Full access to interactive starter exercises' },
      { text: 'No subscriptions or recurring fees, ever' }
    ],
    buttonText: 'Try Platform Free',
    buttonLink: '/register',
    isPrimary: true
  },
  {
    id: 'a2',
    title: 'A2.1 – A2.2 Courses',
    subtitle: '12 lessons each',
    isSubtitleHighlight: false,
    price: '€5',
    period: '/ one-time course purchase',
    features: [
      { bold: 'One-time payment', text: '— zero subscriptions' },
      { text: 'Foundational complexity' },
      { text: 'Targeted volume of exercises & reading materials' },
      { text: 'Full personal dictionary & library sync' }
    ],
    buttonText: 'Select Course',
    buttonLink: '/register',
    isPrimary: false
  },
  {
    id: 'b1',
    title: 'B1.1 – B1.2 Courses',
    subtitle: '14 lessons each',
    isSubtitleHighlight: false,
    price: '€6',
    period: '/ one-time course purchase',
    features: [
      { bold: 'One-time payment', text: '— zero subscriptions' },
      { text: 'Moderate complexity & exercise volume' },
      { text: 'Increased volume of exercises & reading materials' },
      { text: 'Full personal dictionary & library sync' }
    ],
    buttonText: 'Select Course',
    buttonLink: '/register',
    isPrimary: false
  },
  {
    id: 'b2-c1',
    title: 'B2.1 – C1.3 Courses',
    subtitle: '14–16 lessons each',
    isSubtitleHighlight: false,
    price: '€7',
    period: '/ one-time course purchase',
    features: [
      { bold: 'One-time payment', text: '— zero subscriptions' },
      { text: 'Contains significantly more materials & exercises' },
      { text: 'Designed for higher linguistic complexity' },
      { text: 'Requires deeper time investment from students' }
    ],
    buttonText: 'Select Course',
    buttonLink: '/register',
    isPrimary: false
  }
]
</script>

<template>
  <div class="landing-page">
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="container hero-layout">
        <div class="hero-left-copy">
          <h1>Language learning made <span class="text-highlight">personal.</span></h1>
          <p class="hero-lead">
            Courses, AI tutor, real books and speaking practice — all in one place, personalized for you.
          </p>

          <div class="hero-btn-row">
            <RouterLink to="/register" class="btn btn-primary btn-hero-cta">
              Start learning for free &rarr;
            </RouterLink>
            <RouterLink to="/lesson" class="btn btn-ghost btn-see-works">
              <span class="play-circle">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
              </span>
              See how it works
            </RouterLink>
          </div>

          <div class="hero-trust-row">
            <div class="trust-item">
              <span class="t-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </span>
              <span>Starts in your language</span>
            </div>
            <div class="trust-item">
              <span class="t-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </span>
              <span>Personalized learning path</span>
            </div>
            <div class="trust-item">
              <span class="t-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </span>
              <span>Learn with real people</span>
            </div>
          </div>
        </div>

        <!-- HERO RIGHT VISUAL -->
        <div class="hero-right-visual">
          <div class="hero-image-stage">
            <!-- Learner Graphic Presentation -->
            <div class="learner-canvas">
              <div class="canvas-back-glow"></div>
              <div class="avatar-illustration-circle">
                <div class="brand-mascot-visual">
                  <AppLogo :size="100" :show-text="false" />
                </div>
              </div>
            </div>

            <!-- Floating UI Card 1: Speech Bubble -->
            <div class="floating-chip chip-speech">
              <div class="bubble-text">
                <strong>Guten Morgen!</strong>
                <small>(Good morning!)</small>
              </div>
              <span class="speaker-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </span>
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
                <strong>A1.1 – Lesson 3</strong>
                <span class="fp-pct">60%</span>
              </div>
              <div class="fp-bar">
                <div class="fp-bar-fill" style="width: 60%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: EVERYTHING YOU NEED (6 CARDS ROW WITH CUSTOM ICONS) -->
    <section class="section features-row-section">
      <div class="container">
        <div class="section-title-center">
          <h2>Everything you need to learn and improve</h2>
        </div>

        <div class="six-features-grid">
          <div class="six-feature-card" v-for="f in featuresRow" :key="f.title">
            <div class="feature-icon-square">
              <FeatureIcon :name="f.icon" />
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: START WHERE YOU ARE -->
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
            See how it works &rarr;
          </RouterLink>
        </div>

        <!-- Dual Device Mockup Stage -->
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
                <span class="t-task-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#531D5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </span>
                <span class="t-name">Practice vocabulary</span>
                <span class="t-day">Monday</span>
                <span class="t-badge done">Done</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-task-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </span>
                <span class="t-name">Write an essay</span>
                <span class="t-day">Today</span>
                <span class="t-link">Start &rsaquo;</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-task-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
                <span class="t-name">Lesson 4: Exercises 4–8</span>
                <span class="t-day">Today</span>
                <span class="t-link">Start &rsaquo;</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-task-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#531D5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </span>
                <span class="t-name">Read "Der kleine Prinz"</span>
                <span class="t-day">Wednesday</span>
                <span class="t-link">Start &rsaquo;</span>
              </div>
              <div class="tablet-task-row">
                <span class="t-task-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </span>
                <span class="t-name">Speaking club: Hobbies</span>
                <span class="t-day">Thursday</span>
                <span class="t-link">Join &rsaquo;</span>
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
              <span class="p-audio">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              </span>

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

    <!-- SECTION 4: COURSE PRICING CARDS -->
    <section class="section pricing-cards-section" id="pricing">
      <div class="container">
        <div class="section-title-center pricing-title-center">
          <div class="sprout-badge">
            <span class="sprout-icon">🌱</span>
            <span>A1 is free. Keep growing.</span>
          </div>
          <h2>Start for free, then unlock more as you advance.</h2>
          <p class="pricing-lead-text">
            No subscriptions — just fair, one-time course pricing.
          </p>
        </div>

        <div class="pricing-cards-grid">
          <div
            v-for="card in pricingCards"
            :key="card.id"
            class="pricing-course-card card"
            :class="{ 'featured-tier': card.isPrimary }"
          >
            <div class="card-body-top">
              <div class="card-header-block">
                <div class="title-row">
                  <h3 class="course-tier-title">{{ card.title }}</h3>
                  <span v-if="card.isPrimary" class="tier-pill-badge">Free Forever</span>
                </div>
                <span
                  class="course-lessons-badge"
                  :class="{ 'highlight-badge': card.isSubtitleHighlight }"
                >
                  {{ card.subtitle }}
                </span>
              </div>

              <div class="card-price-row">
                <span class="price-val" :class="{ 'price-free': card.isPrimary }">{{ card.price }}</span>
                <span class="price-period">{{ card.period }}</span>
              </div>

              <ul class="course-features-list">
                <li v-for="(feat, idx) in card.features" :key="idx" class="feature-bullet-item">
                  <span class="check-icon">✓</span>
                  <div class="feature-content">
                    <strong v-if="feat.bold" class="feature-bold">{{ feat.bold }} </strong>
                    <span class="feature-regular">{{ feat.text }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <RouterLink
              :to="card.buttonLink"
              class="btn card-cta-btn"
              :class="card.isPrimary ? 'btn-primary' : 'btn-tier-select'"
            >
              {{ card.buttonText }} {{ card.isPrimary ? '&rarr;' : '' }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: BOTTOM EXPLORE BANNER -->
    <section class="section bottom-banner-section">
      <div class="container bottom-cta-bar card">
        <div class="cta-bar-left">
          <div class="globe-big">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00A8CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <div>
            <h3>Many languages. One personal experience.</h3>
            <p>LingoLaab is growing together with learners around the world.</p>
          </div>
        </div>

        <RouterLink to="/register" class="btn btn-primary btn-explore-cta">
          Explore courses &rarr;
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

/* HERO SECTION */
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
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-brand-cyan-light);
  color: var(--color-brand-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* HERO RIGHT VISUAL STAGE */
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

.brand-mascot-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1.1);
}

/* FLOATING UI CHIPS */
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

/* SECTION 2: 6 FEATURES ROW */
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
  transition: transform 0.2s ease;
}

.six-feature-card:hover {
  transform: translateY(-3px);
}

.six-feature-card:hover .feature-icon-square {
  border-color: var(--color-brand-cyan);
  box-shadow: 0 6px 16px rgba(0, 168, 204, 0.16);
  transform: scale(1.05);
}

.feature-icon-square {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  transition: all 0.2s ease;
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

/* SECTION 3: ADAPT SECTION */
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
  margin-bottom: 24px;
  line-height: 1.5;
}

.checklist-items {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checklist-items li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 600;
}

.check-green {
  color: #10B981;
  font-weight: 800;
}

.link-arrow-text {
  color: var(--color-brand-cyan);
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
}

.link-arrow-text:hover {
  text-decoration: underline;
}

/* DUAL DEVICE MOCKUP */
.adapt-devices-stage {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.mock-tablet-window {
  width: 100%;
  max-width: 440px;
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: 0 20px 40px rgba(46, 16, 101, 0.08);
}

.tablet-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 14px;
}

.dot-red, .dot-yellow, .dot-green {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-red { background: #EF4444; }
.dot-yellow { background: #F59E0B; }
.dot-green { background: #10B981; }

.window-title {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  font-weight: 600;
  margin-left: 6px;
}

.tablet-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tablet-task-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-hover);
  font-size: 0.8rem;
}

.t-task-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.t-name {
  font-weight: 600;
  flex: 1;
}

.t-day {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.t-badge.done {
  background: var(--color-action-success-light);
  color: var(--color-action-success);
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
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
.p-audio { 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
  color: var(--color-brand-cyan);
}

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

/* SECTION 4: COURSE PRICING CARDS */
.pricing-cards-section {
  padding: 50px 0 70px;
}

.pricing-title-center {
  margin-bottom: 40px;
  text-align: center;
}

.sprout-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--color-action-success-light);
  color: var(--color-action-success);
  border-radius: var(--radius-full);
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.sprout-icon {
  font-size: 1.15rem;
}

.pricing-title-center h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: var(--color-text);
  margin: 0 0 10px;
  font-weight: 800;
}

.pricing-lead-text {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin: 0;
}

.pricing-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: stretch;
}

.pricing-course-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 24px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--shadow-card);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.pricing-course-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-brand-cyan);
  box-shadow: 0 18px 36px -8px rgba(46, 16, 101, 0.12);
}

.pricing-course-card.featured-tier {
  border-color: var(--color-brand-cyan);
  box-shadow: 0 14px 32px -6px rgba(0, 168, 204, 0.16);
}

.card-body-top {
  display: flex;
  flex-direction: column;
}

.card-header-block {
  margin-bottom: 22px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.course-tier-title {
  font-size: 1.22rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.01em;
}

.tier-pill-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: var(--radius-full);
  background: var(--color-brand-cyan-light);
  color: var(--color-brand-cyan);
}

.course-lessons-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  display: block;
}

.course-lessons-badge.highlight-badge {
  color: var(--color-action-success);
  font-weight: 700;
}

.card-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 26px;
}

.price-val {
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1;
  font-family: var(--font-heading);
}

.price-val.price-free {
  color: var(--color-action-success);
}

.price-period {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.course-features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-bullet-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.86rem;
  line-height: 1.45;
}

.check-icon {
  color: var(--color-action-success);
  font-weight: 800;
  font-size: 0.95rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.feature-content {
  display: flex;
  flex-direction: column;
}

.feature-bold {
  color: var(--color-text);
  font-weight: 700;
}

.feature-regular {
  color: var(--color-text-muted);
}

.card-cta-btn {
  width: 100%;
  text-align: center;
  justify-content: center;
  margin-top: auto;
  padding: 12px 18px;
  font-size: 0.92rem;
  font-weight: 700;
  border-radius: var(--radius-full);
}

.btn-tier-select {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.btn-tier-select:hover {
  background: var(--color-brand-cyan);
  color: #FFFFFF;
  border-color: var(--color-brand-cyan);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px var(--color-brand-cyan-glow);
}

/* SECTION 5: BOTTOM BANNER */
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  .hero-layout, .adapt-layout {
    grid-template-columns: 1fr;
  }
  .six-features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .pricing-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
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
  .pricing-cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
