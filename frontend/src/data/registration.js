export const nativeLanguages = [
  { code: 'uz', flag: '🇺🇿', name: 'O‘zbekcha', sentence: 'Mening ona tilim o‘zbek tili.' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский', sentence: 'Мой родной язык — русский.' },
  { code: 'tg', flag: '🇹🇯', name: 'Тоҷикӣ', sentence: 'Забони модарии ман тоҷикӣ аст.', soon: true },
  { code: 'ky', flag: '🇰🇬', name: 'Кыргызча', sentence: 'Менин эне тилим — кыргыз тили.', soon: true },
  { code: 'kk', flag: '🇰🇿', name: 'Қазақша', sentence: 'Менің ана тілім — қазақ тілі.', soon: true },
  { code: 'tk', flag: '🇹🇲', name: 'Türkmençe', sentence: 'Meniň ene dilim türkmen dili.', soon: true },
  { code: 'fa', flag: '🇮🇷', name: 'فارسی', sentence: 'زبان مادری من فارسی است.', soon: true },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe', sentence: 'Ana dilim Türkçe.', soon: true },
  { code: 'ar', flag: '🇸🇦', name: 'العربية', sentence: 'لغتي الأم هي العربية.', soon: true },
  { code: 'uk', flag: '🇺🇦', name: 'Українська', sentence: 'Моя рідна мова — українська.', soon: true },
  { code: 'tw', flag: '🇬🇭', name: 'Twi', sentence: 'Me kurom kasa yɛ Twi.', soon: true },
  { code: 'sw', flag: '🇹🇿', name: 'Kiswahili', sentence: 'Lugha yangu ya kwanza ni Kiswahili.', soon: true },
  { code: 'yo', flag: '🇳🇬', name: 'Yorùbá', sentence: 'Èdè abínibí mi ni Yorùbá.', soon: true },
  { code: 'ro', flag: '🇷🇴', name: 'Română', sentence: 'Limba mea maternă este româna.', soon: true }
]
export const targetLanguages = [
  ['de', 'german', '🇩🇪'], ['en', 'english', '🇬🇧'], ['zh', 'chinese', '🇨🇳'], ['ar', 'arabic', '🇸🇦'],
  ['es', 'spanish', '🇪🇸'], ['ja', 'japanese', '🇯🇵'], ['tr', 'turkish', '🇹🇷'], ['fr', 'french', '🇫🇷'],
  ['ko', 'korean', '🇰🇷'], ['fa', 'persian', '🇮🇷'], ['ru', 'russian', '🇷🇺'], ['pt', 'portuguese', '🇵🇹'],
  ['it', 'italian', '🇮🇹'], ['ms', 'malay', '🇲🇾']
].map(([code, name, flag]) => ({ code, name, flag, soon: code !== 'de' }))
export const courseGroups = [
  { level: 'A1', count: 2, tone: 'beginner' }, { level: 'A2', count: 2, tone: 'beginner' },
  { level: 'B1', count: 2, tone: 'intermediate' }, { level: 'B2', count: 3, tone: 'intermediate' },
  { level: 'C1', count: 3, tone: 'advanced' }
]
export function validateRegistration(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'nameError'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'emailError'
  if (form.password.length < 8) errors.password = 'passwordError'
  if (!['female', 'male', 'other', 'preferNot'].includes(form.sex)) errors.sex = 'sexError'
  if (!/^\d+$/.test(String(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) errors.age = 'ageError'
  return errors
}
