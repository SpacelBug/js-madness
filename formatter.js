// Отображение длительности в секундах в формате час-минуты-секунды.
// Например, 7520 сек. -> 2 ч. 5 мин. 20 сек.
function secondsToHMS(seconds) {
  let timeStr = ''

  const h = Math.floor(seconds / 3600)
  const m = Math.floor(seconds % 3600 / 60)
  const s = Math.floor(seconds % 3600 % 60)

  if (h > 0) { timeStr += h + ' ч. ' }
  if (m > 0) { timeStr += m + ' мин. ' }
  if (s > 0) { timeStr += s + ' сек.' }

  return timeStr;
}

export {secondsToHMS}