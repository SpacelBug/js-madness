/**
 * Проверка наличия элементов одного массива в другом.
 * Возвращает значения true, false или строку "partly",
 * если совпадение частичное
 *
 * @param array - Массив в котором ведется поиск
 * @param subArray - Значения которые ищем
 */
function findArrayInArray(array, subArray) {
  if (subArray.length > array.length) {
    throw 'Sub array cant be bigger then array'
  }

  let countOfEquals = 0

  for (let subArrayElement of subArray) {
    if (array.includes(subArrayElement)) {
      countOfEquals++
    }
  }

  let result

  if (countOfEquals === subArray.length) {
    result = true
  } else if ((countOfEquals > 0) && (countOfEquals < subArray.length)) {
    result = 'partly'
  } else {
    result = false
  }

  return result
}

export {findArrayInArray}