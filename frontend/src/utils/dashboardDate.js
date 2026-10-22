export const MIN_DATE = '2026-10-01'

export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function nextYearDate(today) {
  const year = today.getFullYear() + 1
  const month = today.getMonth()
  const day = Math.min(today.getDate(), new Date(year, month + 1, 0).getDate())
  return dateKey(new Date(year, month, day))
}

export function clampDate(value, maximum) {
  return value < MIN_DATE ? MIN_DATE : value > maximum ? maximum : value
}

export function shiftDate(value, unit, amount, maximum) {
  const [year, month, day] = value.split('-').map(Number)
  let next
  if (unit === 'day') {
    next = new Date(year, month - 1, day + amount)
  } else {
    next = new Date(year + (unit === 'year' ? amount : 0), month - 1 + (unit === 'month' ? amount : 0), 1)
    next.setDate(Math.min(day, new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()))
  }
  return clampDate(dateKey(next), maximum)
}
