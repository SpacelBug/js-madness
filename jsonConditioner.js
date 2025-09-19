class Condition {
  constructor(variable, operator, value) {
    this.variable = variable
    this.operator = operator
    this.value = value
  }
}

class Conditions {
  /**
   *
   * @param {[Condition]} listOfConditions
   */
  constructor(listOfConditions) {
    this.listOfConditions = this.validateListOfConditions(listOfConditions)
  }

  /**
   * Validate list of conditions
   * @param {[Condition]} listOfConditions
   * @returns list
   */
  validateListOfConditions(listOfConditions) {
    for (let condition in listOfConditions) {
      if (!condition instanceof Condition) {
        throw new Error(
          `Element of conditions list must be an Condition class object"`
        )
      }
    }

    return listOfConditions
  }

  foundListInListOfObject(objectsList) {
    let foundedListsInList = []

    for (let object of objectsList) {
      for (let key in object) {
        if (Array.isArray(object[key])) {
          foundedListsInList.push(key)
        }
      }
    }

    return foundedListsInList
  }

  addPrefixToObjectKeys(object, prefix) {
    let updatingObject = structuredClone(object)

    for (let key in object) {
      let newKey = `${prefix}.${key}`
      let oldKeyValue = updatingObject[key]
      delete updatingObject[key]
      updatingObject[newKey] = oldKeyValue
    }

    return updatingObject
  }

  parseNestedRows(objectsList) {
    let parsedObjectsList = []

    let index = -1
    for (let object of objectsList) {
      parsedObjectsList.push(object)
      index++

      for (let key in object) {
        if (Array.isArray(object[key])) {
          let objectWithoutList = structuredClone(object)
          let list = object[key]

          delete objectWithoutList[key]

          for (let nestedIndex in list) {
            let parsedNestedObject = this.addPrefixToObjectKeys(
              list[nestedIndex],
              key
            )

            let newObject = {}

            if (Number(nestedIndex) === 0) {
              parsedObjectsList[index] = Object.assign(
                newObject,
                parsedNestedObject,
                objectWithoutList
              )
            } else {
              parsedObjectsList.push(
                Object.assign(newObject, parsedNestedObject, objectWithoutList)
              )
              index++
            }
          }
        }
      }
    }

    return parsedObjectsList
  }

  /**
   *
   * @param {*} list
   * @param {{key: string, values: Array}} filter
   * @returns
   */
  parseList(list, filter = null) {
    let result = {}
    let filteredList =
      filter !== null
        ? list.filter((row) => filter.values.includes(row[filter.key]))
        : list

    for (const condition of this.listOfConditions) {
      const label = `${condition.variable} ${condition.operator} ${condition.value}`

      result[label] = { count: 0, max: null, min: null, avg: null, sum: null }

      for (const row of this.parseNestedRows(filteredList)) {
        let variable = this.checkCondition(condition, row)
        if (variable) {
          result[label].count++
          result[label].min =
            variable < result[label].min || result[label].min === null
              ? variable
              : result[label].min
          result[label].max =
            variable > result[label].max || result[label].max === null
              ? variable
              : result[label].max
          result[label].sum += variable
        }
      }

      result[label].avg =
        result[label].count > 0 ? result[label].sum / result[label].count : null
    }

    return result
  }

  checkCondition(condition, object) {
    if (condition.operator == "<") {
      return object[condition.variable] < condition.value
        ? object[condition.variable]
        : null
    } else if (condition.operator == "<=") {
      return object[condition.variable] <= condition.value
        ? object[condition.variable]
        : null
    } else if (condition.operator == ">") {
      return object[condition.variable] > condition.value
        ? object[condition.variable]
        : null
    } else if (condition.operator == ">=") {
      return object[condition.variable] >= condition.value
        ? object[condition.variable]
        : null
    } else if (condition.operator == "==") {
      return object[condition.variable] == condition.value
        ? object[condition.variable]
        : null
    } else {
      return null
    }
  }
}

export { Condition, Conditions }
