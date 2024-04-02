function cursorRelativeElement(cursorClientX, cursorClientY, target) {
  let position = {right: false, left: false, top: false, bottom: false}
  let positionArr = []

  position.top = cursorClientY < target.getBoundingClientRect().top
  position.right = cursorClientX > target.getBoundingClientRect().right
  position.bottom = cursorClientY > target.getBoundingClientRect().bottom
  position.left = cursorClientX < target.getBoundingClientRect().left

  for (let key in position) {
    if (position[key]) {
      positionArr.push(key)
    }
  }

  return positionArr.length !== 0 ? positionArr : ['inside']
}

export {cursorRelativeElement}