

function Scramble(array) {

  const unScrambled = array.map(v => v)

  for (let i = 0; i < array.length; i++) {
    const k = Math.round(Math.random() * (array.length - 1))
    [array[i], array[k]] = [array[k], array[i]]

    if (Array.isArray(unScrambled[i]))
      Scramble(unScrambled[i])
  }

  return array
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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