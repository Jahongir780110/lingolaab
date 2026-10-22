<script setup>
import { useLocale } from '../../i18n'
const { t } = useLocale()
import { reactive, ref, watch } from 'vue'
import { evaluateReorder } from '../../utils/reorderExercise'

const props = defineProps({ exercise: { type: Object, required: true } })
const emit = defineEmits(['check'])
const selections = reactive({})
const result = ref(null)
watch(() => props.exercise, exercise => {
  Object.keys(selections).forEach(key => delete selections[key])
  exercise.sentences.forEach(sentence => { selections[sentence.id] = [] })
  result.value = null
}, { immediate: true })

function edit() {
  result.value = null
}
function addWord(sentence, index) {
  selections[sentence.id].push(index)
  edit()
}
function removeWord(sentence, index) {
  selections[sentence.id].splice(index, 1)
  edit()
}
function sentenceResult(id) { return result.value?.results.find(item => item.id === id) }
function check() {
  const answers = Object.fromEntries(props.exercise.sentences.map(sentence => [
    sentence.id, selections[sentence.id].map(index => sentence.words[index])
  ]))
  result.value = evaluateReorder(props.exercise.sentences, answers)
  emit('check', result.value)
}
</script>

<template>
  <section class="reorder-exercise card" aria-labelledby="reorder-title">
    <h1 id="reorder-title">{{ t('buildSentences') }}</h1>
    <p>{{ t('wordHelp') }}</p>
    <div v-for="(sentence, sentenceIndex) in exercise.sentences" :key="sentence.id" class="sentence">
      <h2>{{ sentenceIndex + 1 }}. {{ sentence.prompt }}</h2>
      <div class="answer" :class="{ correct: sentenceResult(sentence.id)?.correct, incorrect: sentenceResult(sentence.id) && !sentenceResult(sentence.id).correct }" :aria-label="`Your answer for sentence ${sentenceIndex + 1}`">
        <span v-if="!selections[sentence.id].length" class="answer-placeholder">{{ t('chooseWords') }}</span>
        <button
          v-for="(wordIndex, position) in selections[sentence.id]"
          :key="wordIndex"
          type="button"
          class="word"
          :class="{ matching: sentenceResult(sentence.id)?.matches[position] === true, mismatching: sentenceResult(sentence.id)?.matches[position] === false }"
          :aria-label="`${sentence.words[wordIndex]}${sentenceResult(sentence.id) ? (sentenceResult(sentence.id).matches[position] ? ', correct position' : ', incorrect position') : ''}. Return to word bank`"
          @click="removeWord(sentence, position)"
        >{{ sentence.words[wordIndex] }}</button>
      </div>
      <p v-if="sentenceResult(sentence.id)" class="result-label" role="status">{{ t(sentenceResult(sentence.id).correct ? 'correctSentence' : 'incorrectSentence') }}</p>
      <div class="word-bank" :aria-label="`Word bank for sentence ${sentenceIndex + 1}`">
        <button v-for="(word, index) in sentence.words" :key="index" class="word" type="button" :disabled="selections[sentence.id].includes(index)" @click="addWord(sentence, index)">{{ word }}</button>
      </div>
    </div>
    <button type="button" class="btn btn-success check-button" @click="check">{{ t('check') }}</button>
  </section>
</template>

<style scoped>
.reorder-exercise { padding: 28px; }
h1 { font-size: 1.6rem; }
h2 { font-size: 1rem; margin-bottom: 12px; }
.sentence { margin-top: 28px; }
.answer { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-height: 62px; padding: 10px; border: 2px dashed var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg); }
.answer.correct { border-style: solid; border-color: var(--color-action-success); }
.answer.incorrect { border-style: solid; border-color: var(--color-error-vermillion); }
.answer-placeholder { color: var(--color-text-muted); font-size: 0.85rem; }
.word-bank { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.word { padding: 9px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); font: inherit; font-size: 0.9rem; }
.word:hover:enabled { border-color: var(--color-brand-cyan); }
.word:disabled { opacity: 0.3; cursor: default; }
.word.matching { background: var(--color-action-success-light); border-color: var(--color-action-success); }
.word.mismatching { background: var(--color-error-vermillion-light); border-color: var(--color-error-vermillion); }
.result-label { margin: 8px 0 0; font-size: 0.85rem; color: var(--color-text-body); }
.check-button { margin-top: 28px; color: var(--color-text); }
button:focus-visible { outline: 3px solid var(--color-brand-cyan); outline-offset: 3px; }
@media (max-width: 600px) { .reorder-exercise { padding: 20px; } }
</style>
