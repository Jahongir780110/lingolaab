<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  nativeLanguage: '',
  targetLanguage: 'German',
  level: 'A1'
})

const errors = ref({})
const submitting = ref(false)

const languages = ['German', 'English', 'Spanish', 'French', 'Russian', 'Turkish']
const levels = ['A1', 'A2', 'B1', 'B2', 'C1']

function validate() {
  const e = {}
  if (!form.name.trim()) e.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address.'
  if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
  if (!form.nativeLanguage.trim()) e.nativeLanguage = 'Tell us your native language.'
  errors.value = e
  return Object.keys(e).length === 0
}

function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  setTimeout(() => {
    userStore.register(form)
    submitting.value = false
    router.push('/dashboard')
  }, 500)
}
</script>

<template>
  <section class="register-page">
    <div class="container register-grid">
      <div class="promo">
        <span class="badge">Join LingoLaab</span>
        <h1>Start your language journey today.</h1>
        <p>A1 courses are free forever. Create an account to get your personalized vocabulary and grammar tracker.</p>
        <ul class="promo-list">
          <li>✅ Free A1 course, no card required</li>
          <li>✅ AI tutor that knows what you know</li>
          <li>✅ Free peer speaking clubs</li>
        </ul>
      </div>

      <form class="card register-card" @submit.prevent="handleSubmit">
        <h2>Create your account</h2>

        <div class="field">
          <label for="name">Full name</label>
          <input id="name" v-model="form.name" type="text" placeholder="Aziz Karimov" />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" placeholder="At least 6 characters" />
          <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="native">Native language</label>
            <input id="native" v-model="form.nativeLanguage" type="text" placeholder="Uzbek" />
            <span class="error" v-if="errors.nativeLanguage">{{ errors.nativeLanguage }}</span>
          </div>

          <div class="field">
            <label for="target">Learning</label>
            <select id="target" v-model="form.targetLanguage">
              <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>Current level</label>
          <div class="level-pills">
            <button
              type="button"
              v-for="l in levels"
              :key="l"
              class="level-pill"
              :class="{ active: form.level === l }"
              @click="form.level = l"
            >{{ l }}</button>
          </div>
        </div>

        <button class="btn btn-primary submit-btn" type="submit" :disabled="submitting">
          {{ submitting ? 'Creating account…' : 'Create free account' }}
        </button>

        <p class="switch-link">Already have an account? <RouterLink to="/login">Log in</RouterLink></p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.register-page {
  padding: 64px 0;
  background: linear-gradient(180deg, var(--champagne) 0%, var(--cream) 60%);
  flex: 1;
}

.register-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.promo h1 {
  font-size: 2.2rem;
  margin-top: 14px;
}

.promo-list {
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--color-text-muted);
}

.register-card {
  padding: 36px;
}

.register-card h2 {
  margin-bottom: 24px;
}

.field {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
}

input, select {
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-size: 0.95rem;
  font-family: inherit;
  background: #fff;
}

input:focus, select:focus {
  outline: 2px solid var(--wintergreen);
  outline-offset: 1px;
}

.error {
  color: var(--retro-red);
  font-size: 0.78rem;
}

.level-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.level-pill {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.level-pill.active {
  background: var(--wintergreen);
  border-color: var(--wintergreen);
  color: #fff;
}

.submit-btn {
  width: 100%;
  margin-top: 8px;
  padding: 14px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: default;
}

.switch-link {
  text-align: center;
  margin-top: 18px;
  font-size: 0.9rem;
}

.switch-link a {
  color: var(--wintergreen);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 860px) {
  .register-grid {
    grid-template-columns: 1fr;
  }
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
