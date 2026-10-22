<script setup>
import { useLocale } from '../../i18n'
const { t, locale } = useLocale()
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { MIN_DATE, clampDate, nextYearDate, shiftDate } from '../../utils/dashboardDate'

const props = defineProps({ modelValue: { type: String, required: true } })
const emit = defineEmits(['update:modelValue'])
const today = ref(new Date())
const maximum = computed(() => nextYearDate(today.value))
const selected = computed(() => clampDate(props.modelValue, maximum.value))
const fields = computed(() => {
  const [year, month, day] = selected.value.split('-').map(Number)
  return [
    { unit: 'year', label: 'year', value: year },
    { unit: 'month', label: 'month', value: new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(new Date(year, month - 1, 1)) },
    { unit: 'day', label: 'day', value: String(day).padStart(2, '0') }
  ]
})
function candidate(unit, amount) { return shiftDate(selected.value, unit, amount, maximum.value) }
function change(unit, amount) { emit('update:modelValue', candidate(unit, amount)) }
watch([() => props.modelValue, maximum], () => {
  if (selected.value !== props.modelValue) emit('update:modelValue', selected.value)
}, { immediate: true })
let clock
onMounted(() => { clock = window.setInterval(() => { today.value = new Date() }, 60000) })
onUnmounted(() => window.clearInterval(clock))
</script>

<template>
  <fieldset class="date-picker" :aria-description="`Available dates: ${MIN_DATE} through ${maximum}`">
    <legend>{{ t('chooseDate') }}</legend>
    <div v-for="field in fields" :key="field.unit" class="date-field">
      <span class="field-label">{{ t(field.label) }}</span>
      <button type="button" :aria-label="`Increase ${field.unit}`" :disabled="candidate(field.unit, 1) === selected" @click="change(field.unit, 1)">▲</button>
      <output :aria-label="t(field.label)">{{ field.value }}</output>
      <button type="button" :aria-label="`Decrease ${field.unit}`" :disabled="candidate(field.unit, -1) === selected" @click="change(field.unit, -1)">▼</button>
    </div>
  </fieldset>
</template>

<style scoped>
.date-picker { display: flex; gap: 10px; border: 0; margin: 0; padding: 0; min-width: 0; }
legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.date-field { display: flex; flex-direction: column; align-items: stretch; gap: 5px; text-align: center; }
.field-label { font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); }
output { display: block; min-width: 58px; padding: 8px; color: var(--color-text); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600; }
button { min-height: 32px; border-radius: var(--radius-sm); background: var(--color-brand-cyan-light); color: var(--color-brand-cyan); }
button:hover:enabled { background: var(--color-surface-hover); }
button:disabled { opacity: 0.35; cursor: not-allowed; }
button:focus-visible { outline: 2px solid var(--color-brand-cyan); outline-offset: 2px; }
</style>
