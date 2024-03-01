/**
 /* Отображение длительности в секундах в формате час-минуты-секунды.
 /* Например, 7520 сек. -> 2 ч. 5 мин. 20 сек.
 */
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
/**
 * Приводит время к строке указанного формата
 * формат указывается с помощью ключевых слов
 * (year, month, date, hour, minutes, seconds...)
 * пример указания формата "year-month-date hour:minutes:seconds"
 */
function dateTimeToStr(dateTime, format) {
  let dateTimeObject = {
    year: dateTime.getFullYear(),
    month: dateTime.getMonth()+1,
    date: dateTime.getDate(),
    hours: dateTime.getHours(),
    minutes: dateTime.getMinutes(),
    seconds: dateTime.getSeconds(),
    milliseconds: dateTime.getMilliseconds()
  }

  let dateTimeStr = format

  for (let key in dateTimeObject) {
    if (Number(dateTimeObject[key]) < 10) {
      dateTimeObject[key] = '0' + dateTimeObject[key]
    }
    dateTimeStr = dateTimeStr.replace(key, dateTimeObject[key])
  }

  return dateTimeStr
}

export {secondsToHMS, dateTimeToStr}