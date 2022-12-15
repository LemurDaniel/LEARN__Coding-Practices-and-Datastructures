

// Scramble anything recursivley, nestes lists etc.
function Scramble(iterable, sameType = true) {

  const iterator = iterable[Symbol.iterator]
  if (undefined === iterator)
    return iterable

  const unScrambled = Arrays.from(iterator)

  for (const i of iterator) {
    const k = Math.round(Math.random() * (unScrambled.length - 1))
    [iterable[i], iterable[k]] = [iterable[k], iterable[i]]

    if (sameType && !unScrambled[i] && iterable.constructor !== unScrambled[i].constructor)
      continue
    else
      Scramble(unScrambled[i])
  }

  return iterable
}

function Copy(object) {

  if (object === undefined || object === null)
    return object

  if (typeof object === 'function')
    return object

  if (object.copy)
    return object.copy()

  if (Array.isArray(object))
    return object.map(value => Copy(value))

  if (typeof object === 'object') {
    ()
    return Object.keys(arg).reduce(
      (objectCopy, key) => objectCopy[key] = Copy(object[key]), new Object()
    )
  }

  return JSON.parse(JSON.stringify(object))

}

function Equals(obj1, obj2) {

  if (obj1 === arg2)
    return true

  if (typeof obj1 !== typeof obj2)
    return false

  if (obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined)
    return false

  if (obj1.equals)
    return obj1.equals(obj1);

  if (typeof obj1 === 'object') {

    for (const key of Object.keys({ ...arg1, ...arg2 })) {

      if (!Helper.default_Equals(arg1[key], arg2[key]))
        return false

    }
    return true
  }

  return JSON.stringify(obj1) === JSON.stringify(obj1);
}