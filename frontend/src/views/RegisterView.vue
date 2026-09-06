<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import AppLogo from '../components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

// 4-step wizard
const step = ref(1)

const form = reactive({
  nativeLanguage: 'Uzbek',
  targetLanguage: 'German',
  level: 'A1.1',
  levelLabel: 'Complete beginner',
  name: '',
  email: '',
  password: ''
})

const searchQuery = ref('')
const showAllNative = ref(false)
const errors = ref({})
const submitting = ref(false)

// Native languages from image + complete requested set
const primaryNativeLanguages = [
  { code: 'Uzbek', name: "O'zbekcha", label: "Qaysi tilda sizga o'rgatishni istaysiz?", flag: '🇺🇿' },
  { code: 'Russian', name: 'Русский', label: 'На каком языке вам преподавать?', flag: '🇷🇺' },
  { code: 'Turkish', name: 'Türkçe', label: 'Size hangi dilde öğretelim?', flag: '🇹🇷' },
  { code: 'Arabic', name: 'العربية', label: 'بأي لغة تود أن نتعلمك؟', flag: '🇸🇦' },
  { code: 'English', name: 'English', label: 'Which language should we use to teach you?', flag: '🇬🇧' },
  { code: 'Deutsch', name: 'Deutsch', label: 'Welche Sprache sollen wir verwenden, um Ihnen beizubringen?', flag: '🇩🇪' },
  { code: 'Spanish', name: 'Español', label: '¿En qué idioma debemos enseñarte?', flag: '🇪🇸' },
  { code: 'French', name: 'Français', label: 'Dans quelle langue devons-nous vous enseigner ?', flag: '🇫🇷' },
  { code: 'Chinese', name: '中文', label: '我们应该用哪种语言教您？', flag: '🇨🇳' },
  { code: 'Urdu', name: 'اردو / Hindi', label: 'हम आपकी किस भाषा में सिखाएँ?', flag: '🇮🇳' }
]

const extendedNativeLanguages = [
  { code: 'Tajik', name: 'Тоҷикӣ', label: 'Бо кадом забон мехоҳед таълим гиред?', flag: '🇹🇯' },
  { code: 'Kazakh', name: 'Қазақша', label: 'Сізге қай тілде оқытқыңыз келеді?', flag: '🇰🇿' },
  { code: 'Kyrgiz', name: 'Кыргызча', label: 'Сизге кайсы тилде үйрөтүүнү каалайсыз?', flag: '🇰🇬' },
  { code: 'Turkmen', name: 'Türkmençe', label: 'Size haýsy dilde öwretmegimizi isleýärsiňiz?', flag: '🇹🇲' },
  { code: 'Farsi', name: 'فارسی', label: 'به چه زبانی مایلید به شما آموزش دهیم؟', flag: '🇮🇷' },
  { code: 'Azerbaijan', name: 'Azərbaycan', label: 'Sizə hansı dildə öyrətməyimizi istəyirsiniz?', flag: '🇦🇿' },
  { code: 'Romanian', name: 'Română', label: 'În ce limbă doriți să vă predăm?', flag: '🇷🇴' }
]

const allNativeList = computed(() => [...primaryNativeLanguages, ...extendedNativeLanguages])

// Target Languages with landmark cards (Image 3)
const targetLanguagesList = [
  {
    code: 'German',
    name: 'German',
    flag: '🇩🇪',
    landmark: '🏛️',
    badge: '🔥 Most popular',
    desc: 'Speak confidently for work, study and everyday life.'
  },
  {
    code: 'English',
    name: 'English',
    flag: '🇬🇧',
    landmark: '🕰️',
    badge: null,
    desc: "The world's most spoken language."
  },
  {
    code: 'French',
    name: 'French',
    flag: '🇫🇷',
    landmark: '🗼',
    badge: null,
    desc: 'For travel, culture, studies and more.'
  },
  {
    code: 'Spanish',
    name: 'Spanish',
    flag: '🇪🇸',
    landmark: '🏰',
    badge: null,
    desc: 'Communicate, connect and explore the world.'
  },
  {
    code: 'Chinese',
    name: 'Chinese',
    flag: '🇨🇳',
    landmark: '⛩️',
    badge: null,
    desc: 'Discover opportunities in business and culture.'
  },
  {
    code: 'Japanese',
    name: 'Japanese',
    flag: '🇯🇵',
    landmark: '🗻',
    badge: null,
    desc: 'Learn a fascinating language and rich culture.'
  },
  {
    code: 'Turkish',
    name: 'Turkish',
    flag: '🇹🇷',
    landmark: '🕌',
    badge: null,
    desc: 'Connect across history, travel and communities.'
  },
  {
    code: 'Arabic',
    name: 'Arabic',
    flag: '🇸🇦',
    landmark: '🏜️',
    badge: null,
    desc: 'Rich heritage and global business communication.'
  },
  {
    code: 'Russian',
    name: 'Russian',
    flag: '🇷🇺',
    landmark: '🏛️',
    badge: null,
    desc: 'Widely spoken across Eurasia with deep literature.'
  },
  {
    code: 'Italian',
    name: 'Italian',
    flag: '🇮🇹',
    landmark: '🍕',
    badge: null,
    desc: 'Art, music, culinary mastery and European history.'
  },
  {
    code: 'Portuguese',
    name: 'Portuguese',
    flag: '🇵🇹',
    landmark: '🌊',
    badge: null,
    desc: 'Vibrant culture across Portugal, Brazil and beyond.'
  },
  {
    code: 'Korean',
    name: 'Korean',
    flag: '🇰🇷',
    landmark: '🏯',
    badge: null,
    desc: 'Dynamic culture, tech, and entertainment wave.'
  },
  {
    code: 'Farsi',
    name: 'Farsi',
    flag: '🇮🇷',
    landmark: '🏺',
    badge: null,
    desc: 'Poetic history and cultural expression.'
  }
]

const filteredTargetLanguages = computed(() => {
  if (!searchQuery.value.trim()) return targetLanguagesList
  const q = searchQuery.value.toLowerCase()
  return targetLanguagesList.filter(l => l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q))
})

// Levels from Image 4
const levelsList = [
  {
    id: 'A1.1',
    name: 'Complete beginner',
    desc: "I've never studied German or only know a few words and phrases.",
    recBadge: 'A1.1 recommended',
    icon: '🌱'
  },
  {
    id: 'A1.2',
    name: 'A1 – Beginner',
    desc: 'I can understand and use simple expressions and introduce myself.',
    recBadge: 'A1.1 / A1.2',
    icon: '🌿'
  },
  {
    id: 'A2',
    name: 'A2 – Elementary',
    desc: 'I can communicate in simple, everyday situations and understand short texts.',
    recBadge: 'A2.1 recommended',
    icon: '🌳'
  },
  {
    id: 'B1',
    name: 'B1 – Intermediate',
    desc: 'I can handle most situations while traveling and understand the main points of texts.',
    recBadge: 'B1.1 / B1.2',
    icon: '🌲'
  },
  {
    id: 'B2',
    name: 'B2 – Upper intermediate',
    desc: 'I can understand complex texts and express myself fluently on many topics.',
    recBadge: 'B2.1 / B2.2',
    icon: '🌲'
  },
  {
    id: 'C1',
    name: 'C1 and above – Advanced',
    desc: 'I can express myself effectively and understand demanding, longer texts.',
    recBadge: 'C1+',
    icon: '🏔️'
  }
]

function selectNative(code) {
  form.nativeLanguage = code
}

function selectTarget(code) {
  form.targetLanguage = code
}

function selectLevel(lvl) {
  form.level = lvl.id
  form.levelLabel = lvl.name
}

function nextStep() {
  if (step.value < 4) {
    step.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function prevStep() {
  if (step.value > 1) {
    step.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/')
  }
}

function validateAccount() {
  const e = {}
  if (!form.name.trim()) e.name = 'Please enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.'
  if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
  errors.value = e
  return Object.keys(e).length === 0
}

function finishRegistration() {
  if (!validateAccount()) return
  submitting.value = true
  setTimeout(() => {
    userStore.register({
      name: form.name,
      email: form.email,
      nativeLanguage: form.nativeLanguage,
      targetLanguage: form.targetLanguage,
      level: form.level
    })
    submitting.value = false
    router.push('/dashboard')
  }, 400)
}
</script>

<template>
  <div class="onboarding-flow">
    <!-- TOP NAV BAR (MATCHING IMAGES 2, 3, 4) -->
    <header class="flow-header">
      <div class="container flow-header-inner">
        <button class="btn-back" @click="prevStep" title="Go back">
          <span class="arrow-back">←</span> Back
        </button>

        <!-- Stepper Indicators (Step 1-4) -->
        <div class="flow-stepper">
          <div class="step-item" :class="{ completed: step > 1, active: step === 1 }">
            <span class="step-circle">{{ step > 1 ? '✓' : '1' }}</span>
            <span class="step-title">Your language</span>
            <span class="step-val" v-if="step > 1">{{ form.nativeLanguage }}</span>
          </div>
          <div class="step-line" :class="{ active: step > 1 }"></div>

          <div class="step-item" :class="{ completed: step > 2, active: step === 2 }">
            <span class="step-circle">{{ step > 2 ? '✓' : '2' }}</span>
            <span class="step-title">Target language</span>
            <span class="step-val" v-if="step > 2">{{ form.targetLanguage }}</span>
          </div>
          <div class="step-line" :class="{ active: step > 2 }"></div>

          <div class="step-item" :class="{ completed: step > 3, active: step === 3 }">
            <span class="step-circle">{{ step > 3 ? '✓' : '3' }}</span>
            <span class="step-title">Your level</span>
            <span class="step-val" v-if="step > 3">{{ form.level }}</span>
          </div>
          <div class="step-line" :class="{ active: step > 3 }"></div>

          <div class="step-item" :class="{ active: step === 4 }">
            <span class="step-circle">4</span>
            <span class="step-title">Account</span>
          </div>
        </div>

        <div class="header-right-meta">
          <span class="step-counter-text">{{ step }} of 4</span>
          <RouterLink to="/login" class="link-login">Log in</RouterLink>
        </div>
      </div>
    </header>

    <!-- STEP 1: NATIVE LANGUAGE SELECTION (IMAGE 2) -->
    <main class="flow-body container" v-if="step === 1">
      <div class="step-content-card">
        <div class="step-heading-group">
          <h1>Which language should we use to teach you?</h1>
          <p class="subtitle">You can change this anytime later.</p>
        </div>

        <div class="native-grid">
          <button
            v-for="l in primaryNativeLanguages"
            :key="l.code"
            type="button"
            class="lang-select-card"
            :class="{ selected: form.nativeLanguage === l.code }"
            @click="selectNative(l.code)"
          >
            <div class="card-flag-wrap">
              <span class="flag-emoji">{{ l.flag }}</span>
            </div>
            <div class="card-text-wrap">
              <span class="lang-prompt">{{ l.label }}</span>
            </div>
            <div class="custom-radio">
              <span class="radio-dot" v-if="form.nativeLanguage === l.code"></span>
            </div>
          </button>
        </div>

        <!-- Accordion for extended native languages -->
        <div class="more-languages-section">
          <button class="btn-more-toggle" type="button" @click="showAllNative = !showAllNative">
            <span class="globe-icon">🌐</span>
            <span class="more-text">I don't see my language (view all 14)</span>
            <span class="more-chevron">{{ showAllNative ? '▲' : '›' }}</span>
          </button>

          <div class="native-grid extended" v-if="showAllNative">
            <button
              v-for="l in extendedNativeLanguages"
              :key="l.code"
              type="button"
              class="lang-select-card"
              :class="{ selected: form.nativeLanguage === l.code }"
              @click="selectNative(l.code)"
            >
              <div class="card-flag-wrap">
                <span class="flag-emoji">{{ l.flag }}</span>
              </div>
              <div class="card-text-wrap">
                <span class="lang-prompt">{{ l.label }}</span>
              </div>
              <div class="custom-radio">
                <span class="radio-dot" v-if="form.nativeLanguage === l.code"></span>
              </div>
            </button>
          </div>
        </div>

        <div class="flow-footer-btn-row">
          <button class="btn btn-primary btn-flow-continue" @click="nextStep">
            Continue
          </button>
        </div>
      </div>
    </main>

    <!-- STEP 2: TARGET LANGUAGE SELECTION (IMAGE 3) -->
    <main class="flow-body container" v-if="step === 2">
      <div class="step-content-card">
        <div class="step-heading-group">
          <h1>What language do you want to learn?</h1>
          <p class="subtitle">You can add more languages later.</p>

          <div class="notice-callout-pill">
            <span class="sparkle">✨</span>
            <span>You'll learn in <strong>{{ form.nativeLanguage }}</strong>. Lessons, explanations and instructions will be in your language.</span>
          </div>
        </div>

        <!-- Target languages grid with illustrations & cards -->
        <div class="target-grid">
          <div
            v-for="t in filteredTargetLanguages"
            :key="t.code"
            class="target-card"
            :class="{ selected: form.targetLanguage === t.code }"
            @click="selectTarget(t.code)"
          >
            <div class="target-top-bar">
              <span class="badge-popular" v-if="t.badge">{{ t.badge }}</span>
              <div class="custom-radio">
                <span class="radio-dot" v-if="form.targetLanguage === t.code"></span>
              </div>
            </div>

            <div class="landmark-illustration-box">
              <span class="landmark-symbol">{{ t.landmark }}</span>
              <span class="target-flag-badge">{{ t.flag }}</span>
            </div>

            <h3 class="target-name">{{ t.name }}</h3>
            <p class="target-desc">{{ t.desc }}</p>
          </div>
        </div>

        <!-- Search bar -->
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for a language..."
            class="search-input"
          />
        </div>

        <!-- Recap summary banner -->
        <div class="recap-summary-card">
          <div class="recap-flags-row">
            <div class="code-badge native-badge">{{ form.nativeLanguage.slice(0, 2).toUpperCase() }}</div>
            <span class="recap-arrow">→</span>
            <div class="code-badge target-badge">{{ form.targetLanguage.slice(0, 2).toUpperCase() }}</div>
            <div class="recap-text">
              <strong>You're going to learn {{ form.targetLanguage }}</strong>
              <p>Lessons and explanations will be in {{ form.nativeLanguage }}.</p>
            </div>
          </div>

          <div class="recap-features-trio">
            <div class="trio-item">
              <span class="trio-icon">📖</span>
              <div>
                <strong>Step-by-step courses</strong>
                <span>From A1 to C1</span>
              </div>
            </div>
            <div class="trio-item">
              <span class="trio-icon">🤖</span>
              <div>
                <strong>AI tutor in your language</strong>
                <span>Get help anytime</span>
              </div>
            </div>
            <div class="trio-item">
              <span class="trio-icon">👥</span>
              <div>
                <strong>Practice speaking</strong>
                <span>With real people</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flow-footer-btn-row">
          <button class="btn btn-primary btn-flow-continue" @click="nextStep">
            Continue →
          </button>
        </div>
      </div>
    </main>

    <!-- STEP 3: LEVEL SELECTION (IMAGE 4) -->
    <main class="flow-body container" v-if="step === 3">
      <div class="step-content-card">
        <div class="step-heading-group">
          <h1>What's your current level in {{ form.targetLanguage }}?</h1>
          <p class="subtitle">This helps us create the right learning path for you.</p>

          <div class="placement-hint-box">
            <span class="bulb">💡</span>
            <span>Not sure about your level? Take a quick
              <RouterLink to="/lesson" class="link-inline">placement test</RouterLink> (about 3 minutes).
            </span>
          </div>
        </div>

        <!-- Levels List (Image 4) -->
        <div class="levels-vertical-list">
          <div
            v-for="lvl in levelsList"
            :key="lvl.id"
            class="level-selection-card"
            :class="{ selected: form.level === lvl.id }"
            @click="selectLevel(lvl)"
          >
            <div class="level-icon-circle">
              <span>{{ lvl.icon }}</span>
            </div>

            <div class="level-info-wrap">
              <h3 class="level-title">{{ lvl.name }}</h3>
              <p class="level-description">{{ lvl.desc }}</p>
            </div>

            <div class="level-right-wrap">
              <span class="level-rec-badge">{{ lvl.recBadge }}</span>
              <div class="custom-radio">
                <span class="radio-dot" v-if="form.level === lvl.id"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Placement Test Card Banner (Image 4) -->
        <div class="placement-callout-card">
          <div class="placement-left-meta">
            <div class="stopwatch-badge">
              <span>⏱</span>
              <small>3 min</small>
            </div>
            <div>
              <h3>Not sure? Take a placement test</h3>
              <p>Answer a few questions and we'll estimate your level in just 3 minutes.</p>
            </div>
          </div>
          <RouterLink to="/lesson" class="btn btn-outline btn-placement">
            Start test →
          </RouterLink>
        </div>

        <!-- "What happens next?" Roadmap preview -->
        <div class="roadmap-preview-card">
          <div class="roadmap-star">⭐</div>
          <div class="roadmap-copy">
            <h4>What happens next?</h4>
            <p>We'll build your personalized learning path with the right lessons, exercises and review plan for your level.</p>
          </div>
          <div class="roadmap-graphic">
            <span class="step-pillar p-a1 active">A1</span>
            <span class="step-pillar p-a2">A2</span>
            <span class="step-pillar p-b1">B1</span>
            <span class="step-pillar p-b2">B2</span>
            <span class="step-pillar p-c1">C1</span>
          </div>
        </div>

        <!-- Bottom bar summary -->
        <div class="bottom-level-summary-bar">
          <div class="summary-meta-item">
            <span class="sum-label">You're learning</span>
            <div class="code-pair">
              <span>{{ form.nativeLanguage.slice(0, 2).toUpperCase() }}</span>
              <span class="arr">→</span>
              <span>{{ form.targetLanguage.slice(0, 2).toUpperCase() }}</span>
            </div>
          </div>

          <div class="summary-meta-item">
            <span class="sum-label">Level</span>
            <span class="sum-val">{{ form.levelLabel || 'A1.1' }}</span>
          </div>

          <button class="btn btn-primary btn-flow-continue" @click="nextStep">
            Continue →
          </button>
        </div>
      </div>
    </main>

    <!-- STEP 4: CREATE ACCOUNT (COMPLETION OF REGISTRATION) -->
    <main class="flow-body container" v-if="step === 4">
      <div class="step-content-card small-width">
        <div class="step-heading-group">
          <AppLogo :size="38" layout="vertical" />
          <h1>Create your account</h1>
          <p class="subtitle">Save your personalized learning path and start practicing</p>
        </div>

        <form class="account-form" @submit.prevent="finishRegistration">
          <div class="field">
            <label for="name">Full Name</label>
            <input id="name" v-model="form.name" type="text" placeholder="e.g. Anvar Karimov" />
            <span class="error" v-if="errors.name">{{ errors.name }}</span>
          </div>

          <div class="field">
            <label for="email">Email Address</label>
            <input id="email" v-model="form.email" type="email" placeholder="you@example.com" />
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <div class="field">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" placeholder="At least 6 characters" />
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div class="registration-summary-capsule">
            <div><strong>Native:</strong> {{ form.nativeLanguage }}</div>
            <div><strong>Target:</strong> {{ form.targetLanguage }}</div>
            <div><strong>Level:</strong> {{ form.level }}</div>
          </div>

          <button class="btn btn-primary submit-full-btn" type="submit" :disabled="submitting">
            {{ submitting ? 'Creating account…' : 'Start Learning Free →' }}
          </button>

          <p class="switch-link">
            Already have an account? <RouterLink to="/login">Log in</RouterLink>
          </p>
        </form>
      </div>
    </main>
  </div>
</template>

<style scoped>
.onboarding-flow {
  min-height: 100vh;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
}

/* TOP HEADER & STEPPER */
.flow-header {
  background: #FFFFFF;
  border-bottom: 1px solid var(--color-border);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 40;
}

.flow-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.btn-back {
  background: transparent;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-body);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: all 0.15s;
}

.btn-back:hover {
  background: var(--color-surface-hover);
  color: var(--color-brand-cyan);
}

.arrow-back {
  font-size: 1.2rem;
  line-height: 1;
}

.flow-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--color-text-light);
  font-weight: 600;
}

.step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-surface-hover);
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--color-text-muted);
}

.step-item.active .step-circle {
  background: var(--color-brand-cyan);
  border-color: var(--color-brand-cyan);
  color: #FFFFFF;
}

.step-item.completed .step-circle {
  background: var(--color-action-success);
  border-color: var(--color-action-success);
  color: #FFFFFF;
}

.step-item.active .step-title {
  color: var(--color-text);
  font-weight: 800;
}

.step-val {
  font-size: 0.72rem;
  padding: 2px 6px;
  background: var(--color-surface-hover);
  border-radius: 4px;
  color: var(--color-text-muted);
}

.step-line {
  width: 28px;
  height: 2px;
  background: var(--color-border);
}

.step-line.active {
  background: var(--color-brand-cyan);
}

.header-right-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-counter-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.link-login {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
}

/* FLOW BODY */
.flow-body {
  padding: 40px 24px 80px;
  display: flex;
  justify-content: center;
}

.step-content-card {
  width: 100%;
  max-width: 860px;
  background: #FFFFFF;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(46, 16, 101, 0.04);
  padding: 44px;
}

.step-content-card.small-width {
  max-width: 480px;
}

.step-heading-group {
  text-align: center;
  margin-bottom: 36px;
}

.step-heading-group h1 {
  font-size: clamp(1.8rem, 2.8vw, 2.2rem);
  color: var(--color-text);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin: 0;
}

.notice-callout-pill {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  background: rgba(0, 168, 204, 0.08);
  border: 1px solid rgba(0, 168, 204, 0.2);
  font-size: 0.9rem;
  color: var(--color-text-body);
}

/* NATIVE LANGUAGE SELECTION GRID (IMAGE 2) */
.native-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

.lang-select-card {
  padding: 16px 20px;
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lang-select-card:hover {
  border-color: var(--color-brand-cyan);
  background: var(--color-surface-hover);
}

.lang-select-card.selected {
  border-color: var(--color-brand-cyan);
  background: rgba(0, 168, 204, 0.05);
  box-shadow: 0 0 0 1px var(--color-brand-cyan);
}

.card-flag-wrap {
  width: 40px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-text-wrap {
  flex: 1;
}

.lang-prompt {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
  display: block;
}

/* Custom Radio */
.custom-radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
}

.selected .custom-radio {
  border-color: var(--color-brand-cyan);
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-brand-cyan);
}

/* More languages toggle */
.more-languages-section {
  margin-bottom: 32px;
}

.btn-more-toggle {
  width: 100%;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  background: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  transition: all 0.15s;
}

.btn-more-toggle:hover {
  background: var(--color-surface-hover);
}

.more-chevron {
  margin-left: auto;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.native-grid.extended {
  margin-top: 14px;
}

/* STEP 2: TARGET GRID (IMAGE 3) */
.target-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.target-card {
  padding: 16px;
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.target-card:hover {
  border-color: var(--color-brand-cyan);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.target-card.selected {
  border-color: var(--color-brand-cyan);
  background: rgba(0, 168, 204, 0.04);
  box-shadow: 0 0 0 1.5px var(--color-brand-cyan);
}

.target-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  min-height: 22px;
}

.badge-popular {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: rgba(245, 158, 11, 0.15);
  color: #D97706;
}

.landmark-illustration-box {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--color-surface-hover);
  border-radius: var(--radius-sm);
  margin-bottom: 12px;
}

.landmark-symbol {
  font-size: 2.2rem;
}

.target-flag-badge {
  position: absolute;
  bottom: 6px;
  left: 8px;
  font-size: 1.3rem;
}

.target-name {
  font-size: 1.1rem;
  margin: 0 0 4px;
}

.target-desc {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.4;
  margin: 0;
}

/* SEARCH INPUT */
.search-input-wrap {
  position: relative;
  margin-bottom: 24px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.search-input {
  width: 100%;
  padding: 13px 16px 13px 44px;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  font-size: 0.95rem;
  background: #FFFFFF;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-brand-cyan);
}

/* RECAP SUMMARY CARD */
.recap-summary-card {
  padding: 22px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  margin-bottom: 32px;
}

.recap-flags-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.code-badge {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
}

.native-badge { background: #D1FAE5; color: #065F46; }
.target-badge { background: #FEF3C7; color: #92400E; }
.recap-arrow { color: var(--color-text-muted); font-weight: 800; }

.recap-text strong {
  display: block;
  font-size: 1rem;
  color: var(--color-text);
}

.recap-text p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.recap-features-trio {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
}

.trio-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.trio-icon {
  font-size: 1.4rem;
}

.trio-item strong {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text);
}

.trio-item span {
  font-size: 0.74rem;
  color: var(--color-text-muted);
}

/* STEP 3: LEVELS (IMAGE 4) */
.placement-hint-box {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(0, 168, 204, 0.08);
  border: 1px solid rgba(0, 168, 204, 0.2);
  border-radius: var(--radius-full);
  font-size: 0.88rem;
}

.link-inline {
  color: var(--color-brand-cyan);
  font-weight: 700;
  text-decoration: underline;
}

.levels-vertical-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.level-selection-card {
  padding: 16px 20px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.level-selection-card:hover {
  border-color: var(--color-brand-cyan);
  background: var(--color-surface-hover);
}

.level-selection-card.selected {
  border-color: var(--color-brand-cyan);
  background: rgba(0, 168, 204, 0.04);
  box-shadow: 0 0 0 1px var(--color-brand-cyan);
}

.level-icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-surface-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.level-info-wrap {
  flex: 1;
}

.level-title {
  font-size: 1.05rem;
  margin: 0 0 4px;
}

.level-description {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
}

.level-right-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.level-rec-badge {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.level-selection-card.selected .level-rec-badge {
  background: var(--color-brand-cyan-light);
  color: var(--color-brand-cyan);
  border-color: rgba(0, 168, 204, 0.3);
}

/* PLACEMENT CALLOUT */
.placement-callout-card {
  padding: 20px 24px;
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1.5px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.placement-left-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stopwatch-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 168, 204, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-cyan);
  font-weight: 800;
  flex-shrink: 0;
}

.stopwatch-badge span { font-size: 1.1rem; line-height: 1; }
.stopwatch-badge small { font-size: 0.62rem; }

.placement-left-meta h3 {
  font-size: 1.05rem;
  margin: 0 0 4px;
}

.placement-left-meta p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.btn-placement {
  white-space: nowrap;
  padding: 10px 20px;
}

/* ROADMAP PREVIEW */
.roadmap-preview-card {
  padding: 20px 24px;
  border-radius: var(--radius-md);
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.roadmap-star {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.roadmap-copy h4 {
  font-size: 0.98rem;
  margin: 0 0 4px;
  color: #92400E;
}

.roadmap-copy p {
  margin: 0;
  font-size: 0.85rem;
  color: #B45309;
}

.roadmap-graphic {
  margin-left: auto;
  display: flex;
  gap: 6px;
  align-items: flex-end;
}

.step-pillar {
  width: 28px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.2);
  color: #B45309;
  font-size: 0.7rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-a1 { height: 32px; background: var(--color-brand-cyan); color: #FFF; }
.p-a2 { height: 42px; }
.p-b1 { height: 52px; }
.p-b2 { height: 62px; }
.p-c1 { height: 72px; }

/* BOTTOM SUMMARY BAR */
.bottom-level-summary-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.summary-meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sum-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 700;
  text-transform: uppercase;
}

.code-pair {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  font-weight: 800;
}

.sum-val {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-text);
}

/* STEP 4: ACCOUNT FORM */
.account-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.85rem;
  font-weight: 700;
}

.field input {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  font-size: 0.95rem;
}

.field input:focus {
  outline: none;
  border-color: var(--color-brand-cyan);
}

.registration-summary-capsule {
  display: flex;
  justify-content: space-between;
  background: var(--color-surface-hover);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
}

.submit-full-btn {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
}

.flow-footer-btn-row {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.btn-flow-continue {
  padding: 14px 44px;
  font-size: 1rem;
}

@media (max-width: 900px) {
  .target-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .native-grid {
    grid-template-columns: 1fr;
  }
  .recap-features-trio {
    grid-template-columns: 1fr;
  }
  .flow-stepper {
    display: none;
  }
  .placement-callout-card, .roadmap-preview-card, .bottom-level-summary-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
