export function evaluateReorder(sentences, answers) {
  const results = sentences.map(sentence => {
    const words = answers[sentence.id] || []
    const matches = words.map((word, index) => word === sentence.answer[index])
    return {
      id: sentence.id,
      matches,
      correct: words.length === sentence.answer.length && matches.every(Boolean)
    }
  })
  return { results, correctCount: results.filter(result => result.correct).length, total: results.length }
}
