<script setup>
import { ref } from 'vue'
import ReorderExercise from '../components/exercises/ReorderExercise.vue'
import Tutor from '../components/exercises/Tutor.vue'
import { reorderExercise } from '../data/reorderExercise'

const messages = ref(['instruction'])
function onCheck(result) { messages.value.push(result.correctCount === result.total ? 'wellDone' : result.correctCount > 0 ? 'closeFeedback' : 'repeatFeedback') }
</script>

<template>
  <div class="text-exercise-layout">
    <ReorderExercise :exercise="reorderExercise" @check="onCheck" />
    <Tutor :messages="messages" />
  </div>
</template>

<style scoped>
.text-exercise-layout { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 28px; align-items: start; }
@media (max-width: 760px) {
  .text-exercise-layout { grid-template-columns: minmax(0, 1fr); gap: 12px; }
}
</style>
