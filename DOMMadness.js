/**
 * Return list of string, which get u information about cursor pos relative to element
 *
 * @param cursorClientX - cursor client posX (get it by event.clientX)
 * @param cursorClientY - cursor client posY (get it by event.clientY)
 * @param target - target DOM element
 * @returns {*[]|string['inside']}
 */
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
/**
 * Return object which tell u where is empty space from an event
 *
 * @return {{verticalDirection: string, horizontalDirection: string}}
 */
function freeSpaceRelativeEvent() {
  let verticalDirection = event.clientY > (window.innerHeight / 2) ? 'toBottom' : 'toTop'
  let horizontalDirection = event.clientX < (window.innerWidth / 2) ? 'toLeft' : 'toRight'

  return ({'verticalDirection': verticalDirection, 'horizontalDirection': horizontalDirection})
}

export {cursorRelativeElement, freeSpaceRelativeEvent}