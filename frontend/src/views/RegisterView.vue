<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import LanguageCard from '../components/registration/LanguageCard.vue'
import { useLocale } from '../i18n'
import { nativeLanguages, targetLanguages, courseGroups, validateRegistration } from '../data/registration'
import { useToastStore } from '../stores/toast'

const router = useRouter()
const { locale, t, localizedPath } = useLocale()
const toast = useToastStore()
const step = ref(1)
const heading = ref(null)
const errors = ref({})
const form = reactive({ nativeLanguage: ['uz', 'ru'].includes(locale.value) ? locale.value : '', targetLanguage: '', course: '', email: '', name: '', password: '', sex: '', age: '' })
const stepKeys = ['nativeStep', 'targetStep', 'courseStep', 'accountStep']
const titleKeys = ['nativeTitle', 'targetTitle', 'courseTitle', 'accountTitle']
const canContinue = computed(() => step.value === 1 ? !!form.nativeLanguage : step.value === 2 ? !!form.targetLanguage : !!form.course)
async function chooseNative(language) {
  form.nativeLanguage = language.code
  await router.replace({ name: 'register', params: { locale: language.code } })
}
async function move(next) {
  step.value = next
  await nextTick()
  heading.value?.focus()
}
async function finish() {
  errors.value = validateRegistration(form)
  if (Object.keys(errors.value).length) {
    await nextTick()
    document.getElementById(`registration-${Object.keys(errors.value)[0]}`)?.focus()
    return
  }
  Object.keys(form).forEach(key => { form[key] = '' })
  await router.push(localizedPath('/dashboard'))
  toast.show(t('completeTitle'), t('completeText'))
}
</script>

<template>
  <section class="registration container">
      <ol class="steps" aria-label="Registration progress">
        <li v-for="(key, index) in stepKeys" :key="key" :class="{ current: step === index + 1, done: step > index + 1 }" :aria-current="step === index + 1 ? 'step' : undefined">
          <span>{{ index + 1 }}</span>{{ t(key) }}
        </li>
      </ol>
      <p class="step-count">{{ t('step') }} {{ step }} {{ t('of') }} 4</p>
      <h1 ref="heading" tabindex="-1">{{ t(titleKeys[step - 1]) }}</h1>

      <div v-if="step === 1" class="language-grid">
        <LanguageCard v-for="language in nativeLanguages" :key="language.code" :flag="language.flag" :label="language.name" :description="language.sentence" :language="language.code" :disabled="language.soon" :selected="form.nativeLanguage === language.code" :badge="language.soon ? t('comingSoon') : ''" @click="chooseNative(language)" />
      </div>
      <div v-if="step === 2" class="language-grid">
        <LanguageCard v-for="language in targetLanguages" :key="language.code" :flag="language.flag" :label="t(language.name)" :disabled="language.soon" :selected="form.targetLanguage === language.code" :badge="language.soon ? t('comingSoon') : ''" @click="form.targetLanguage = language.code" />
      </div>
      <div v-if="step === 3">
        <fieldset v-for="group in courseGroups" :key="group.level" class="course-group" :class="group.tone">
          <legend>{{ group.level }}</legend>
          <div class="course-options">
            <label v-for="number in group.count" :key="number" class="course-option" :class="{ selected: form.course === `${group.level}.${number}` }">
              <input v-model="form.course" type="radio" name="course" :value="`${group.level}.${number}`" />
              {{ group.level }}.{{ number }}
            </label>
          </div>
        </fieldset>
        <aside class="course-hints">
          <h2>{{ t('courseHints') }}</h2>
          <ul><li v-for="key in ['hintA1', 'hintA2', 'hintB1', 'hintB2', 'hintC1']" :key="key">{{ t(key) }}</li></ul>
          <p>{{ t('courseNote') }}</p>
        </aside>
      </div>
      <form v-if="step === 4" class="account-form" novalidate @submit.prevent="finish">
        <div v-for="field in ['email', 'name', 'password']" :key="field" class="field">
          <label :for="`registration-${field}`">{{ t(field) }}</label>
          <input :id="`registration-${field}`" v-model="form[field]" :type="field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'" :autocomplete="field === 'password' ? 'new-password' : field" required :aria-invalid="!!errors[field]" :aria-describedby="errors[field] ? `${field}-error` : field === 'password' ? 'password-hint' : undefined" />
          <small v-if="field === 'password'" id="password-hint">{{ t('passwordHint') }}</small>
          <p v-if="errors[field]" :id="`${field}-error`" class="error" role="alert">{{ t(errors[field]) }}</p>
        </div>
        <div class="field">
          <label for="registration-sex">{{ t('sex') }}</label>
          <select id="registration-sex" v-model="form.sex" required :aria-invalid="!!errors.sex" :aria-describedby="errors.sex ? 'sex-error' : undefined">
            <option value="" disabled>{{ t('choose') }}</option>
            <option v-for="option in ['female', 'male', 'other', 'preferNot']" :key="option" :value="option">{{ t(option) }}</option>
          </select>
          <p v-if="errors.sex" id="sex-error" class="error" role="alert">{{ t(errors.sex) }}</p>
        </div>
        <div class="field">
          <label for="registration-age">{{ t('age') }}</label>
          <input id="registration-age" v-model="form.age" type="number" min="1" max="120" step="1" inputmode="numeric" required :aria-invalid="!!errors.age" :aria-describedby="errors.age ? 'age-error' : undefined" />
          <p v-if="errors.age" id="age-error" class="error" role="alert">{{ t(errors.age) }}</p>
        </div>
        <div class="actions"><button type="button" class="btn btn-outline" @click="move(3)">{{ t('back') }}</button><button type="submit" class="btn btn-success">{{ t('finish') }}</button></div>
      </form>
      <div v-if="step < 4" class="actions">
        <button v-if="step > 1" type="button" class="btn btn-outline" @click="move(step - 1)">{{ t('back') }}</button>
        <button type="button" class="btn btn-primary" :disabled="!canContinue" @click="move(step + 1)">{{ t('continue') }}</button>
      </div>
  </section>
</template>

<style scoped>
.registration { max-width: 1020px; padding-top: 40px; padding-bottom: 64px; }
.steps { display: flex; justify-content: space-between; gap: 12px; padding: 0; margin: 0 0 40px; list-style: none; }
.steps li { display: flex; align-items: center; gap: 8px; color: var(--color-text-muted); font-size: 0.85rem; }
.steps li span { display: grid; place-items: center; width: 30px; height: 30px; flex-shrink: 0; border: 1px solid var(--color-border); border-radius: 50%; }
.steps .current { color: var(--color-brand-cyan); font-weight: 700; }
.steps .current span { border-color: var(--color-brand-cyan); background: var(--color-brand-cyan-light); }
.steps .done span { background: var(--color-action-success-light); border-color: var(--color-action-success); }
.step-count { font-size: 0.85rem; margin-bottom: 8px; }
h1 { font-size: clamp(1.6rem, 4vw, 2.2rem); margin-bottom: 28px; }
.language-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; }
button:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.course-group { padding: 16px; margin: 0 0 20px; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
legend { padding: 0 8px; color: var(--color-text); font-weight: 700; }
.course-options { display: flex; gap: 12px; flex-wrap: wrap; }
.course-option { display: flex; align-items: center; gap: 12px; padding: 18px 24px; border: 2px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); font-weight: 700; cursor: pointer; }
.beginner .selected { border-color: var(--level-beginner); background: var(--level-beginner-bg); }
.intermediate .selected { border-color: var(--level-intermediate); background: var(--level-intermediate-bg); }
.advanced .selected { border-color: var(--level-advanced); background: var(--level-advanced-bg); }
input[type=radio] { accent-color: var(--color-brand-cyan); }
.course-hints { padding: 24px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
h2 { font-size: 1.15rem; }
.course-hints ul { padding-left: 20px; color: var(--color-text-body); }
.course-hints li { margin-bottom: 12px; }
.course-hints p { margin-bottom: 0; font-size: 0.9rem; }
.account-form { max-width: 580px; margin: 0 auto; }
.field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.field label { font-weight: 600; color: var(--color-text); }
.field input, .field select { padding: 12px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font: inherit; background: var(--color-surface); color: var(--color-text); }
.field [aria-invalid=true] { border-color: var(--color-error-vermillion); }
small { color: var(--color-text-muted); }
.error { margin: 0; color: var(--color-text); border-left: 3px solid var(--color-error-vermillion); padding-left: 8px; font-size: 0.9rem; }
.btn-success { color: var(--color-text); }
input:focus-visible, select:focus-visible, button:focus-visible { outline: 3px solid var(--color-brand-cyan); outline-offset: 3px; }
@media (max-width: 650px) { .language-grid { grid-template-columns: 1fr; } .steps { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; } .course-option { padding: 14px 18px; } }
</style>
