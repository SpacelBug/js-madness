/**
 * Сравнение объектов без учета порядка его элементов
 *
 * firstObject - Первый объект
 * secondObject - Второй объект
 * ignoreList - Список ключей, которые не будут учитываться при сравнении
 */
function deepEqual(firstObject, secondObject, ignoreList=[]){
    // console.debug('Start: ', firstObject, secondObject)

    firstObject = structuredClone(firstObject)
    secondObject = structuredClone(secondObject)

    for (let firstObjectKey in firstObject){
        for (let secondObjectKey in secondObject){

            if (firstObjectKey === secondObjectKey) {

                if (Array.isArray(firstObject[firstObjectKey])) {

                    if (firstObject[firstObjectKey].length === secondObject[secondObjectKey].length) {

                        // console.debug('found Array: ', firstObject[firstObjectKey], secondObject[secondObjectKey])

                        for (let i = 0; i < firstObject[firstObjectKey].length; i++) {

                            // console.debug('try: ', firstObject[firstObjectKey][i], ' in ', secondObject[secondObjectKey])

                            let arrayChecker = false

                            for (let j = 0; j < secondObject[secondObjectKey].length; j++) {
                                if (deepEqual(firstObject[firstObjectKey][i], secondObject[secondObjectKey][j], ignoreList)) {
                                    arrayChecker = true
                                    // console.debug('array equal: ', firstObject[firstObjectKey][i], secondObject[secondObjectKey][j])
                                    firstObject[firstObjectKey].splice(i, 1)
                                    i--
                                    secondObject[secondObjectKey].splice(j, 1)
                                    j--
                                    // console.debug('arrays aftee splice: ', firstObject[firstObjectKey], secondObject[secondObjectKey])
                                    break
                                }
                            }

                            if (!arrayChecker) {
                                // console.debug('diff array')
                                // console.debug(firstObject[firstObjectKey], secondObject[secondObjectKey])
                                return false
                            }
                        }

                    } else {
                        // console.debug('array diff length')
                        return false
                    }

                } else if (!ignoreList.includes(firstObjectKey)) {
                    if (Object.prototype.toString.call(firstObject[firstObjectKey]) === '[object Date]') {
                        if (firstObject[firstObjectKey].getTime() !== secondObject[secondObjectKey].getTime()) {
                            // console.debug('False keys: ', firstObjectKey, secondObjectKey)
                            // console.debug(firstObject[firstObjectKey], secondObject[secondObjectKey])
                            return false
                        }
                    }
                    else if (firstObject[firstObjectKey] !== secondObject[secondObjectKey]) {
                        // console.debug('False keys: ', firstObjectKey, secondObjectKey)
                        // console.debug(firstObject[firstObjectKey], secondObject[secondObjectKey])
                        return false
                    } else {
                        // console.debug('Keys is equal: ', firstObjectKey, secondObjectKey)
                        // console.debug(firstObject[firstObjectKey], secondObject[secondObjectKey])
                    }

                }

            } else {
                if (!firstObject.hasOwnProperty(secondObjectKey) || !secondObject.hasOwnProperty(firstObjectKey)) {
                    // console.debug('One of objects have no: ', secondObjectKey)
                    return false
                }
            }
        }
    }
    // console.debug('global equal')
    return true
}

export {deepEqual}