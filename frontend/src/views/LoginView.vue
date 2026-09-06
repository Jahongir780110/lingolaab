<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import AppLogo from '../components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({ email: '', password: '' })

function handleSubmit() {
  userStore.register({
    name: userStore.name || 'Learner',
    email: form.email || 'learner@lingolaab.com',
    nativeLanguage: userStore.nativeLanguage || 'Uzbek',
    targetLanguage: userStore.targetLanguage || 'Deutsch',
    level: userStore.level || 'A1'
  })
  router.push('/dashboard')
}
</script>

<template>
  <section class="login-page">
    <div class="card login-card">
      <div class="logo-wrap">
        <AppLogo :size="42" layout="vertical" />
      </div>

      <div class="header-text">
        <span class="badge badge-cyan">Welcome back</span>
        <h1>Log in to LingoLaab</h1>
        <p>Continue your connected language journey</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="email">Email address</label>
          <input id="email" v-model="form.email" type="email" placeholder="you@example.com" required />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" placeholder="••••••••" required />
        </div>

        <button class="btn btn-primary submit-btn" type="submit">Log in to Dashboard →</button>
      </form>

      <p class="switch-link">
        New to LingoLaab? <RouterLink to="/register">Create a free account</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 50%, rgba(0, 168, 204, 0.08) 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: var(--radius-lg);
  box-shadow: 0 16px 40px rgba(46, 16, 101, 0.08);
}

.logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.header-text {
  text-align: center;
  margin-bottom: 28px;
}

.header-text h1 {
  font-size: 1.6rem;
  color: var(--color-accent-purple);
  margin: 10px 0 4px;
}

.header-text p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.field {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
}

input {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  font-family: inherit;
  font-size: 0.95rem;
  background: #FFFFFF;
  color: var(--color-text);
  transition: all 0.15s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-brand-cyan);
  box-shadow: 0 0 0 3px var(--color-brand-cyan-light);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  font-size: 1rem;
}

.switch-link {
  text-align: center;
  margin-top: 24px;
  margin-bottom: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.switch-link a {
  color: var(--color-brand-cyan);
  font-weight: 700;
  text-decoration: none;
}

.switch-link a:hover {
  text-decoration: underline;
}
</style>
