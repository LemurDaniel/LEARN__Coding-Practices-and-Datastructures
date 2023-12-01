




function binarySearch(sortedNums, target, lower, upper) {

  upper = upper ?? sortedNums.length - 1
  lower = lower ?? 0

  while (upper > lower) {

    const mid = Math.floor((upper + lower) / 2)

    if (sortedNums[mid] < target)
      lower = mid + 1
    else if (sortedNums[mid] > target)
      upper = mid - 1
    else
      return mid

  }

  return -1
}

/*

  Some testing because of a binary search bug.
  Not a problem in Node.JS/JavaScript because MAX_SAFE_INT is '9.007.199.254.740.991' and max array lenght is 4,294,967,295 elements, but interesting to keep in mind.
  
  - 4,294,967,295 elements: https://www.oreilly.com/library/view/javascript-the-definitive/9781449393854/ch07.html#:~:text=JavaScript%20arrays%20are%20zero-based,array%20size%20of%204%2C294%2C967%2C295%20elements.
  - Binary Search Bug: https://www.youtube.com/watch?v=_eS-nNnkKfI

 */

function binarySearch2(sortedNums, target, lower, upper) {

  upper = upper ?? sortedNums.length - 1
  lower = lower ?? 0

  while (upper > lower) {

    // Still finds correct index
    const mid = lower + Math.floor((upper - lower) / 2)

    if (sortedNums[mid] < target)
      lower = mid + 1
    else if (sortedNums[mid] > target)
      upper = mid - 1
    else
      return mid

  }

  return -1
}



const sortedArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const sortedArray2 = [2, 5, 8, 12, 16, 23, 27, 31, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
const sortedArray3 = [-3, -2, 0, 13, 22, 34, 40, 51, 63, 78, 92, 105, 120, 135, 150]
const sortedArrayWithDuplicates = [2, 4, 8, 10, 10, 12, 12, 12, 15, 18, 20, 20, 22, 25]


console.log("BinarySearch1: ")
console.group()
console.log("Target: 2", "index: ", binarySearch(sortedArray1, 2), "value at index: ", sortedArray1[binarySearch(sortedArray1, 2)])
console.log("Target: 31", "index: ", binarySearch(sortedArray2, 31), "value at index: ", sortedArray2[binarySearch(sortedArray2, 31)])
console.log("Target: -2", "index: ", binarySearch(sortedArray3, -2), "value at index: ", sortedArray3[binarySearch(sortedArray3, -2)])
console.log("Target: 12", "index: ", binarySearch(sortedArrayWithDuplicates, 12), "value at index: ", sortedArrayWithDuplicates[binarySearch(sortedArrayWithDuplicates, 12)])
console.log("Target: 122 (not in array => index -1)", "index: ", binarySearch2(sortedArrayWithDuplicates, 122), "value at index: ", sortedArrayWithDuplicates[binarySearch2(sortedArrayWithDuplicates, 122)])
console.groupEnd()

console.log("BinarySearch2: ")
console.group()
console.log("Target: 2", "index: ", binarySearch2(sortedArray1, 2), "value at index: ", sortedArray1[binarySearch2(sortedArray1, 2)])
console.log("Target: 31", "index: ", binarySearch2(sortedArray2, 31), "value at index: ", sortedArray2[binarySearch2(sortedArray2, 31)])
console.log("Target: -2", "index: ", binarySearch2(sortedArray3, -2), "value at index: ", sortedArray3[binarySearch2(sortedArray3, -2)])
console.log("Target: 12", "index: ", binarySearch2(sortedArrayWithDuplicates, 12), "value at index: ", sortedArrayWithDuplicates[binarySearch2(sortedArrayWithDuplicates, 12)])
console.log("Target: 122 (not in array => index -1)", "index: ", binarySearch2(sortedArrayWithDuplicates, 122), "value at index: ", sortedArrayWithDuplicates[binarySearch2(sortedArrayWithDuplicates, 122)])
console.groupEnd()


module.exports = null