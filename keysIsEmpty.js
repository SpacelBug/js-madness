/**
 * Проверяет являются ли все элементы объекта или списка пустыми
 *
 * @param object
 * @returns {boolean}
 */
function keysIsEmpty(object) {
  let flag = true

  if ((object instanceof Array) || (object instanceof Set)) {

    for (let elem of object) {
      if (elem !== null) {
        if (typeof elem === 'object') {
          flag = keysIsEmpty(elem)
        } else {
          return false
        }
      }
    }

  } else {

    for (let key in object) {
      if (object[key] !== null) {
        if (typeof object[key] === 'object') {
          flag = keysIsEmpty(object[key])
        } else {
          return false
        }
      }
    }

  }

  return flag
}