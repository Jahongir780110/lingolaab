<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({ email: '', password: '' })

function handleSubmit() {
  userStore.register({
    name: userStore.name || 'Learner',
    email: form.email || 'learner@example.com',
    nativeLanguage: userStore.nativeLanguage || 'Uzbek',
    targetLanguage: userStore.targetLanguage || 'German',
    level: userStore.level || 'A2'
  })
  router.push('/dashboard')
}
</script>

<template>
  <section class="login-page">
    <form class="card login-card" @submit.prevent="handleSubmit">
      <span class="badge">Welcome back</span>
      <h1>Log in to LingoLaab</h1>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" placeholder="you@example.com" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" placeholder="••••••••" />
      </div>
      <button class="btn btn-primary submit-btn" type="submit">Log in</button>
      <p class="switch-link">New here? <RouterLink to="/register">Create a free account</RouterLink></p>
    </form>
  </section>
</template>

<style scoped>
.login-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background: linear-gradient(180deg, var(--champagne) 0%, var(--cream) 60%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px;
}

.login-card h1 {
  font-size: 1.6rem;
  margin: 12px 0 24px;
}

.field {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
}

input {
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-family: inherit;
  font-size: 0.95rem;
}

input:focus {
  outline: 2px solid var(--wintergreen);
  outline-offset: 1px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  margin-top: 8px;
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
</style>
