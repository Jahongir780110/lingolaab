<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import AppLogo from '../components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

const currentStep = ref(0)
const hearts = ref(5)
const streak = ref(14)
const selectedOption = ref(null)
const selectedWords = ref([])
const availableWords = ref([])
const matchedPairs = ref([])
const selectedPairFirst = ref(null)
const isChecked = ref(false)
const isCorrect = ref(false)
const isCompleted = ref(false)
const shakeError = ref(false)

const exercises = [
  {
    type: 'word-bank-translation',
    title: 'Translate this sentence',
    prompt: 'Guten Morgen! Wie geht es dir?',
    hint: 'Guten Morgen = Good morning | Wie geht es dir? = How are you?',
    sourceFlag: '🇩🇪',
    correctAnswer: ['Good', 'morning!', 'How', 'are', 'you?'],
    initialWords: ['How', 'morning!', 'water', 'Good', 'are', 'you?', 'bread', 'apple']
  },
  {
    type: 'multiple-choice',
    title: 'Complete the sentence',
    prompt: 'Hallo, ich _____ Jonas. Und wie heißt du?',
    sourceFlag: '🇩🇪',
    options: [
      { id: 'a', text: 'bin', translation: 'am (1st person singular)', correct: true },
      { id: 'b', text: 'bist', translation: 'are (informal singular)', correct: false },
      { id: 'c', text: 'ist', translation: 'is (3rd person singular)', correct: false },
      { id: 'd', text: 'sind', translation: 'are (plural/formal)', correct: false }
    ],
    explanation: 'In German, the verb "sein" (to be) conjugates to "ich bin" for "I am".'
  },
  {
    type: 'matching-pairs',
    title: 'Tap the matching pairs',
    prompt: 'Connect German expressions with their English meanings',
    pairs: [
      { id: 1, de: 'Guten Tag', en: 'Good day' },
      { id: 2, de: 'Danke', en: 'Thank you' },
      { id: 3, de: 'Tschüss', en: 'Bye' },
      { id: 4, de: 'Bitte', en: 'Please' }
    ]
  },
  {
    type: 'sentence-builder',
    title: 'Write this in German',
    prompt: 'Thank you very much, see you tomorrow!',
    sourceFlag: '🇬🇧',
    correctAnswer: ['Vielen', 'Dank,', 'bis', 'morgen!'],
    initialWords: ['bis', 'Vielen', 'Hallo', 'morgen!', 'Dank,', 'Guten', 'Abend']
  }
]

// Current active exercise
const currentExercise = computed(() => exercises[currentStep.value])

// Progress percent through exercises (0 - 100%)
const progressPercent = computed(() => {
  return Math.round((currentStep.value / exercises.length) * 100)
})

// Initialize state for current exercise
function loadExerciseState() {
  isChecked.value = false
  isCorrect.value = false
  selectedOption.value = null
  selectedWords.value = []
  selectedPairFirst.value = null
  matchedPairs.value = []

  const ex = currentExercise.value
  if (ex.type === 'word-bank-translation' || ex.type === 'sentence-builder') {
    availableWords.value = [...ex.initialWords]
  }
}

onMounted(() => {
  loadExerciseState()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e) {
  if (e.key === 'Enter') {
    if (!isChecked.value && canCheck.value) {
      checkAnswer()
    } else if (isChecked.value) {
      nextExercise()
    }
  }
}

// Word bank handlers
function selectWord(word, index) {
  if (isChecked.value) return
  availableWords.value.splice(index, 1)
  selectedWords.value.push(word)
}

function deselectWord(word, index) {
  if (isChecked.value) return
  selectedWords.value.splice(index, 1)
  availableWords.value.push(word)
}

// Matching pairs handlers
const shuffledCards = computed(() => {
  if (currentExercise.value.type !== 'matching-pairs') return []
  const pairs = currentExercise.value.pairs
  const items = []
  pairs.forEach((p) => {
    items.push({ id: `de-${p.id}`, pairId: p.id, text: p.de, lang: 'de' })
    items.push({ id: `en-${p.id}`, pairId: p.id, text: p.en, lang: 'en' })
  })
  return items
})

function handleCardClick(card) {
  if (isChecked.value || matchedPairs.value.includes(card.pairId)) return

  if (!selectedPairFirst.value) {
    selectedPairFirst.value = card
    return
  }

  // If clicked same card again
  if (selectedPairFirst.value.id === card.id) {
    selectedPairFirst.value = null
    return
  }

  // Check if they match
  if (selectedPairFirst.value.pairId === card.pairId && selectedPairFirst.value.lang !== card.lang) {
    matchedPairs.value.push(card.pairId)
    selectedPairFirst.value = null
    if (matchedPairs.value.length === currentExercise.value.pairs.length) {
      // All matched!
      isCorrect.value = true
      isChecked.value = true
    }
  } else {
    // Incorrect match
    shakeError.value = true
    setTimeout(() => {
      shakeError.value = false
      selectedPairFirst.value = null
    }, 500)
  }
}

// Can check answer validator
const canCheck = computed(() => {
  const ex = currentExercise.value
  if (!ex) return false
  if (ex.type === 'word-bank-translation' || ex.type === 'sentence-builder') {
    return selectedWords.value.length > 0
  }
  if (ex.type === 'multiple-choice') {
    return selectedOption.value !== null
  }
  if (ex.type === 'matching-pairs') {
    return matchedPairs.value.length === ex.pairs.length
  }
  return false
})

function checkAnswer() {
  const ex = currentExercise.value
  let correct = false

  if (ex.type === 'word-bank-translation' || ex.type === 'sentence-builder') {
    const userSentence = selectedWords.value.join(' ')
    const targetSentence = ex.correctAnswer.join(' ')
    correct = userSentence.trim().toLowerCase() === targetSentence.trim().toLowerCase()
  } else if (ex.type === 'multiple-choice') {
    const opt = ex.options.find((o) => o.id === selectedOption.value)
    correct = opt ? opt.correct : false
  } else if (ex.type === 'matching-pairs') {
    correct = matchedPairs.value.length === ex.pairs.length
  }

  isCorrect.value = correct
  isChecked.value = true

  if (!correct) {
    shakeError.value = true
    setTimeout(() => (shakeError.value = false), 600)
    if (hearts.value > 1) {
      hearts.value--
    }
  }
}

function nextExercise() {
  if (currentStep.value < exercises.length - 1) {
    currentStep.value++
    loadExerciseState()
  } else {
    isCompleted.value = true
  }
}

function exitLesson() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="lesson-layout">
    <!-- TOP HEADER -->
    <header class="lesson-header">
      <div class="header-inner container">
        <button class="btn-close" @click="exitLesson" title="Exit Lesson">✕</button>

        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>

        <div class="lesson-stats">
          <span class="streak-pill" title="Daily Streak">🔥 {{ streak }}</span>
          <span class="hearts-pill" title="Remaining Lives">❤️ {{ hearts }}</span>
        </div>
      </div>
    </header>

    <!-- LESSON MAIN CONTENT -->
    <main class="lesson-main container" v-if="!isCompleted">
      <div class="exercise-card" :class="{ 'shake-anim': shakeError }">
        <span class="exercise-badge">{{ currentExercise.title }}</span>

        <!-- EXERCISE TYPE 1: WORD BANK TRANSLATION -->
        <div v-if="currentExercise.type === 'word-bank-translation'" class="exercise-content">
          <div class="speaker-prompt-box">
            <span class="source-flag">{{ currentExercise.sourceFlag }}</span>
            <div class="speech-bubble">
              <p class="source-text">{{ currentExercise.prompt }}</p>
              <span class="hint-text">💡 {{ currentExercise.hint }}</span>
            </div>
          </div>

          <!-- Answer Slot Area -->
          <div class="answer-slot-zone" :class="{ empty: selectedWords.length === 0 }">
            <span v-if="selectedWords.length === 0" class="placeholder-text">Tap words below to translate</span>
            <button
              v-for="(word, idx) in selectedWords"
              :key="'selected-' + idx"
              type="button"
              class="word-chip active-chip"
              @click="deselectWord(word, idx)"
            >
              {{ word }}
            </button>
          </div>

          <!-- Available Word Bank -->
          <div class="word-bank-tray">
            <button
              v-for="(word, idx) in availableWords"
              :key="'available-' + idx"
              type="button"
              class="word-chip"
              @click="selectWord(word, idx)"
            >
              {{ word }}
            </button>
          </div>
        </div>

        <!-- EXERCISE TYPE 2: MULTIPLE CHOICE -->
        <div v-if="currentExercise.type === 'multiple-choice'" class="exercise-content">
          <div class="speaker-prompt-box">
            <span class="source-flag">{{ currentExercise.sourceFlag }}</span>
            <div class="speech-bubble">
              <p class="source-text">{{ currentExercise.prompt }}</p>
            </div>
          </div>

          <div class="options-grid">
            <button
              v-for="opt in currentExercise.options"
              :key="opt.id"
              type="button"
              class="option-card"
              :class="{
                selected: selectedOption === opt.id,
                'correct-preview': isChecked && opt.correct,
                'incorrect-preview': isChecked && selectedOption === opt.id && !opt.correct
              }"
              @click="!isChecked && (selectedOption = opt.id)"
            >
              <span class="option-radio">
                <span class="radio-inner" v-if="selectedOption === opt.id"></span>
              </span>
              <div class="option-text-group">
                <strong class="opt-title">{{ opt.text }}</strong>
                <span class="opt-desc">{{ opt.translation }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- EXERCISE TYPE 3: MATCHING PAIRS -->
        <div v-if="currentExercise.type === 'matching-pairs'" class="exercise-content">
          <p class="matching-sub">{{ currentExercise.prompt }}</p>
          <div class="pairs-grid">
            <button
              v-for="card in shuffledCards"
              :key="card.id"
              type="button"
              class="pair-card"
              :class="{
                selected: selectedPairFirst && selectedPairFirst.id === card.id,
                matched: matchedPairs.includes(card.pairId)
              }"
              :disabled="matchedPairs.includes(card.pairId)"
              @click="handleCardClick(card)"
            >
              <span class="pair-text">{{ card.text }}</span>
              <span v-if="matchedPairs.includes(card.pairId)" class="matched-icon">✓</span>
            </button>
          </div>
        </div>

        <!-- EXERCISE TYPE 4: SENTENCE BUILDER -->
        <div v-if="currentExercise.type === 'sentence-builder'" class="exercise-content">
          <div class="speaker-prompt-box">
            <span class="source-flag">{{ currentExercise.sourceFlag }}</span>
            <div class="speech-bubble">
              <p class="source-text">{{ currentExercise.prompt }}</p>
            </div>
          </div>

          <div class="answer-slot-zone" :class="{ empty: selectedWords.length === 0 }">
            <span v-if="selectedWords.length === 0" class="placeholder-text">Arrange words to build the German sentence</span>
            <button
              v-for="(word, idx) in selectedWords"
              :key="'selected-b-' + idx"
              type="button"
              class="word-chip active-chip"
              @click="deselectWord(word, idx)"
            >
              {{ word }}
            </button>
          </div>

          <div class="word-bank-tray">
            <button
              v-for="(word, idx) in availableWords"
              :key="'available-b-' + idx"
              type="button"
              class="word-chip"
              @click="selectWord(word, idx)"
            >
              {{ word }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- LESSON COMPLETED CELEBRATION SCREEN -->
    <main class="lesson-main container" v-else>
      <div class="completion-card card">
        <div class="trophy-emoji">🏆</div>
        <AppLogo :size="36" layout="vertical" />
        <h2>Lesson Completed!</h2>
        <p class="celebrate-sub">You just mastered your first German conversational foundations!</p>

        <div class="reward-stats-grid">
          <div class="reward-box">
            <span class="r-label">TOTAL XP</span>
            <strong class="r-val xp">+50 XP</strong>
          </div>
          <div class="reward-box">
            <span class="r-label">ACCURACY</span>
            <strong class="r-val acc">100%</strong>
          </div>
          <div class="reward-box">
            <span class="r-label">STREAK</span>
            <strong class="r-val str">🔥 15 Days</strong>
          </div>
        </div>

        <button class="btn btn-primary finish-btn" @click="exitLesson">
          Claim Rewards & Return to Dashboard →
        </button>
      </div>
    </main>

    <!-- BOTTOM ACTION & FEEDBACK DRAWER -->
    <footer class="lesson-footer" :class="{ 'feedback-correct': isChecked && isCorrect, 'feedback-wrong': isChecked && !isCorrect }" v-if="!isCompleted">
      <div class="footer-inner container">
        <!-- Unchecked State: Hint or Skip -->
        <div class="feedback-msg" v-if="!isChecked">
          <span class="tip-msg">💡 Press <strong>Enter</strong> to check your answer</span>
        </div>

        <!-- Correct Feedback -->
        <div class="feedback-msg" v-else-if="isCorrect">
          <div class="feedback-icon correct-icon">✓</div>
          <div class="feedback-text">
            <strong>Nicely done!</strong>
            <p>Your answer is completely correct.</p>
          </div>
        </div>

        <!-- Incorrect Feedback -->
        <div class="feedback-msg" v-else>
          <div class="feedback-icon wrong-icon">✕</div>
          <div class="feedback-text">
            <strong>Correct solution:</strong>
            <p v-if="currentExercise.correctAnswer">{{ currentExercise.correctAnswer.join(' ') }}</p>
            <p v-else-if="currentExercise.explanation">{{ currentExercise.explanation }}</p>
            <p v-else>Try pairing matching expressions together.</p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="footer-action">
          <button
            v-if="!isChecked"
            class="btn btn-success action-btn"
            :disabled="!canCheck"
            @click="checkAnswer"
          >
            Check Answer
          </button>
          <button
            v-else
            class="btn action-btn"
            :class="isCorrect ? 'btn-success' : 'btn-primary'"
            @click="nextExercise"
          >
            Continue →
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.lesson-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}

/* TOP HEADER */
.lesson-header {
  height: 72px;
  background: #FFFFFF;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.btn-close {
  background: transparent;
  font-size: 1.3rem;
  color: var(--color-text-muted);
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.15s;
}

.btn-close:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}

.progress-track {
  flex: 1;
  height: 14px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-action-success);
  border-radius: var(--radius-full);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.lesson-stats {
  display: flex;
  gap: 12px;
  align-items: center;
}

.streak-pill, .hearts-pill {
  font-size: 0.9rem;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

/* LESSON MAIN */
.lesson-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px 120px;
}

.exercise-card {
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
}

.exercise-badge {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-brand-cyan);
  margin-bottom: 20px;
}

.speaker-prompt-box {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 32px;
}

.source-flag {
  font-size: 2.2rem;
  line-height: 1;
}

.speech-bubble {
  background: #FFFFFF;
  border: 2px solid var(--color-border);
  padding: 16px 22px;
  border-radius: 20px 20px 20px 4px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.source-text {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-accent-purple);
  margin: 0 0 4px;
}

.hint-text {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

/* ANSWER SLOT ZONE */
.answer-slot-zone {
  min-height: 80px;
  padding: 14px;
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-sm);
}

.answer-slot-zone.empty {
  justify-content: center;
}

.placeholder-text {
  font-size: 0.95rem;
  color: var(--color-text-light);
  font-weight: 600;
}

/* WORD BANK CHIPS */
.word-bank-tray {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.word-chip {
  padding: 12px 20px;
  background: #FFFFFF;
  border: 2px solid var(--color-border);
  border-bottom: 4px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.12s ease;
  user-select: none;
}

.word-chip:hover {
  border-color: var(--color-brand-cyan);
  background: var(--color-brand-cyan-light);
  transform: translateY(-2px);
}

.word-chip:active {
  transform: translateY(2px);
  border-bottom-width: 2px;
}

.word-chip.active-chip {
  border-color: var(--color-brand-cyan);
  background: #FFFFFF;
  color: var(--color-brand-cyan);
}

/* MULTIPLE CHOICE OPTIONS */
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.option-card {
  padding: 18px 20px;
  background: #FFFFFF;
  border: 2px solid var(--color-border);
  border-bottom: 4px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.option-card:hover {
  border-color: var(--color-brand-cyan);
  transform: translateY(-2px);
}

.option-card.selected {
  border-color: var(--color-brand-cyan);
  background: var(--color-brand-cyan-light);
  border-bottom-width: 4px;
}

.option-card.correct-preview {
  border-color: var(--color-action-success);
  background: var(--color-action-success-light);
}

.option-card.incorrect-preview {
  border-color: var(--color-error-vermillion);
  background: var(--color-error-vermillion-light);
}

.option-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-brand-cyan);
}

.opt-title {
  display: block;
  font-size: 1.1rem;
  color: var(--color-text);
}

.opt-desc {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

/* MATCHING PAIRS */
.matching-sub {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.pairs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.pair-card {
  padding: 18px;
  background: #FFFFFF;
  border: 2px solid var(--color-border);
  border-bottom: 4px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.15s ease;
}

.pair-card:hover:not(:disabled) {
  border-color: var(--color-brand-cyan);
  transform: translateY(-2px);
}

.pair-card.selected {
  border-color: var(--color-brand-cyan);
  background: var(--color-brand-cyan-light);
}

.pair-card.matched {
  border-color: var(--color-action-success);
  background: var(--color-action-success-light);
  color: var(--color-action-success);
  opacity: 0.9;
  cursor: default;
}

.matched-icon {
  font-weight: 800;
}

/* COMPLETION CARD */
.completion-card {
  width: 100%;
  max-width: 520px;
  padding: 48px 36px;
  text-align: center;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-lg);
}

.trophy-emoji {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.completion-card h2 {
  font-size: 2rem;
  color: var(--color-accent-purple);
  margin: 16px 0 6px;
}

.celebrate-sub {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.reward-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: 100%;
  margin-bottom: 32px;
}

.reward-box {
  padding: 16px 12px;
  background: var(--color-surface-hover);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.r-label {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.r-val {
  font-size: 1.25rem;
  font-weight: 800;
}

.r-val.xp { color: var(--level-intermediate); }
.r-val.acc { color: var(--color-action-success); }
.r-val.str { color: #E63946; }

.finish-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.05rem;
}

/* BOTTOM ACTION FOOTER */
.lesson-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96px;
  background: #FFFFFF;
  border-top: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  z-index: 100;
  transition: background 0.2s, border-color 0.2s;
}

.lesson-footer.feedback-correct {
  background: #ECFDF5;
  border-top-color: var(--color-action-success);
}

.lesson-footer.feedback-wrong {
  background: #FEF2F2;
  border-top-color: var(--color-error-vermillion);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 820px;
}

.tip-msg {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.feedback-msg {
  display: flex;
  align-items: center;
  gap: 16px;
}

.feedback-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.3rem;
  color: #FFFFFF;
  flex-shrink: 0;
}

.correct-icon {
  background: var(--color-action-success);
}

.wrong-icon {
  background: var(--color-error-vermillion);
}

.feedback-text strong {
  display: block;
  font-size: 1.05rem;
  color: var(--color-text);
}

.feedback-text p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.action-btn {
  min-width: 170px;
  padding: 14px 28px;
  font-size: 1rem;
}

/* SHAKE ANIMATION */
.shake-anim {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-2px, 0, 0); }
  20%, 80% { transform: translate3d(4px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
  40%, 60% { transform: translate3d(6px, 0, 0); }
}

@media (max-width: 640px) {
  .options-grid, .pairs-grid {
    grid-template-columns: 1fr;
  }
  .footer-inner {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  .lesson-footer {
    height: auto;
    padding: 16px 0;
  }
  .action-btn {
    width: 100%;
  }
}
</style>
