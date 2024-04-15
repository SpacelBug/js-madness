function keysIsEmpty(object) {
  let flag = true

  for (let key in object) {
    if (object[key] !== null) {
      if (typeof  object[key] === 'object') {
        flag = keysIsEmpty(object[key])
      } else {
        return false
      }
    }
  }

  return flag
}