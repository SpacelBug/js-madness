function keysIsEmpty(object) {
  let flag = true

  if (!Array.isArray(object)) {

    for (let key in object) {
      if (object[key] !== null) {
        if (typeof object[key] === 'object') {
          flag = keysIsEmpty(object[key])
        } else {
          return false
        }
      }
    }

  } else {

    for (let elem of object) {
      if (elem !== null) {
        if (typeof elem === 'object') {
          flag = keysIsEmpty(elem)
        } else {
          return false
        }
      }
    }

  }

  return flag
}